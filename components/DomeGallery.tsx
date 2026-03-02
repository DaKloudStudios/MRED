
import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

interface ImageItem {
  src: string;
  alt?: string;
}

interface DomeGalleryProps {
  images?: (string | ImageItem)[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  autoRotateSpeed?: number;
}

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
  autoRotateSpeed: 0.15
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: (string | ImageItem)[], seg: number, isMobile: boolean) {
  const stepX = isMobile ? 3 : 2;

  // Total units around sphere is seg * 2
  const totalUnits = seg * 2;

  // Calculate how many columns fit
  const colCount = Math.floor(totalUnits / stepX);

  // Center the grid
  const startIdx = -((colCount - 1) * stepX) / 2;

  const xCols = Array.from({ length: colCount }, (_, i) => startIdx + i * stepX);

  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  // Seamless Pattern Optimization:
  // On mobile, use size 3.05 (vs step 3) and 2.05 (vs vertical step 2) 
  // to creating a slight overlap and eliminate black gaps.
  const itemSizeX = isMobile ? 3.05 : 2;
  const itemSizeY = isMobile ? 2.05 : 2;

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: itemSizeX, sizeY: itemSizeY }));
  });

  const totalSlots = coords.length;
  if (!pool || pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }

  const normalizedImages = pool.map(image => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return { src: image.src || '', alt: image.alt || '' };
  });

  // Since we need to fill the entire sphere (usually ~175 slots) 
  // but only have ~52 unique images, we must loop them. 
  // We shuffle the pool first so the sequence is completely random.
  let allImages: typeof normalizedImages = [];
  while (allImages.length < totalSlots) {
    const shuffledPool = [...normalizedImages];
    for (let i = shuffledPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
    }
    allImages.push(...shuffledPool);
  }

  // Draw exactly `totalSlots` number of images to complete the 360 sphere
  const usedImages = allImages.slice(0, totalSlots);

  // Final swap pass to ensure no identical images accidentally landed directly 
  // next to each other during the array concatenation
  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt
  }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#060010',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '250px',
  openedImageHeight = '350px',
  imageBorderRadius = '30px',
  openedImageBorderRadius = '30px',
  grayscale = true,
  autoRotateSpeed = DEFAULTS.autoRotateSpeed
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<any>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const visualRotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });

  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);

  // Responsive State
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use 21 segments for mobile to ensure (21 * 2 = 42) is divisible by stepX (3),
  // creating a perfect seamless wrap without gaps.
  const effectiveSegments = isMobile ? 21 : segments;

  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.style.overflow = 'hidden';
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    document.body.style.overflow = '';
  }, []);

  const items = useMemo(() => buildItems(images, effectiveSegments, isMobile), [images, effectiveSegments, isMobile]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height);
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h;
      let basis;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(visualRotationRef.current.x, visualRotationRef.current.y);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius
  ]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      if (!draggingRef.current && !inertiaRAF.current && !openingRef.current) {
        rotationRef.current.y = wrapAngleSigned(rotationRef.current.y - autoRotateSpeed * (dt / 16.66));
      }

      let dy = rotationRef.current.y - visualRotationRef.current.y;
      dy = ((dy + 540) % 360) - 180;

      const dx = rotationRef.current.x - visualRotationRef.current.x;

      const lerpFactor = draggingRef.current ? 0.4 : 0.08;

      visualRotationRef.current.x += dx * lerpFactor;
      visualRotationRef.current.y += dy * lerpFactor;

      applyTransform(visualRotationRef.current.x, wrapAngleSigned(visualRotationRef.current.y));

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    }
  }, [autoRotateSpeed]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      // Adjust momentum multiplier for mobile
      const momentumMult = isMobile ? 60 : 80;
      let vX = clamp(vx, -MAX_V, MAX_V) * momentumMult;
      let vY = clamp(vy, -MAX_V, MAX_V) * momentumMult;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia, isMobile]
  );

  useGesture(
    {
      onDragStart: () => {
        if (focusedElRef.current) return;
        stopInertia();
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
      },
      onDrag: ({ active, movement: [mx, my], velocity: [vx, vy], direction: [dx, dy] }) => {
        if (focusedElRef.current) return;

        // Mark as moved if distance is significant (prevents click triggers on tiny drags)
        if (!movedRef.current) {
          const dist2 = mx * mx + my * my;
          if (dist2 > 16) movedRef.current = true;
        }

        // Sensitivity Adjustment:
        // On mobile, we want 1 pixel of drag to result in MORE rotation than desktop
        // because screen space is smaller.
        // Lowering sensitivity number = Faster rotation
        const effectiveSensitivity = isMobile ? dragSensitivity * 0.75 : dragSensitivity;

        const nextX = clamp(
          startRotRef.current.x - my / effectiveSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(startRotRef.current.y + mx / effectiveSensitivity);

        // Direct transform update
        rotationRef.current = { x: nextX, y: nextY };

        if (!active) {
          draggingRef.current = false;
          // On release, trigger inertia
          if (movedRef.current) {
            // Pass accumulated velocity
            // If it was a very slow drag, vel is low.
            startInertia(vx * dx, vy * dy);
            lastDragEndAt.current = performance.now();
          }
          movedRef.current = false;
        }
      }
    },
    {
      target: mainRef,
      // CRITICAL FIX: passive: false allows us to use touch-action: none effectively
      // and prevent the browser from hijacking the scroll.
      eventOptions: { passive: false },
      drag: {
        from: () => [0, 0], // Always start movement from 0 on new drag
        filterTaps: true,
        tapsThreshold: 10,
        preventDefault: true // Explicitly prevent default browser behavior
      }
    }
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;
    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement as HTMLElement;
      const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement;
      if (!overlay) return;

      const refDiv = parent.querySelector('.item__image--reference');
      const originalPos = originalTilePositionRef.current;

      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current!.getBoundingClientRect();

      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height
      };

      const animatingOverlay = document.createElement('div');
      animatingOverlay.className = 'enlarge-closing';
      animatingOverlay.style.cssText = `position:absolute;left:${overlayRelativeToRoot.left}px;top:${overlayRelativeToRoot.top}px;width:${overlayRelativeToRoot.width}px;height:${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;

      const originalImg = overlay.querySelector('img');
      if (originalImg) {
        const img = originalImg.cloneNode() as HTMLImageElement;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        animatingOverlay.appendChild(img);
      }

      overlay.remove();
      rootRef.current!.appendChild(animatingOverlay);
      void animatingOverlay.getBoundingClientRect();

      let targetLeft = 0, targetTop = 0, targetW = 0, targetH = 0;
      if (originalPos) {
        targetLeft = originalPos.left - rootRect.left;
        targetTop = originalPos.top - rootRect.top;
        targetW = originalPos.width;
        targetH = originalPos.height;
      }

      requestAnimationFrame(() => {
        animatingOverlay.style.left = targetLeft + 'px';
        animatingOverlay.style.top = targetTop + 'px';
        animatingOverlay.style.width = targetW + 'px';
        animatingOverlay.style.height = targetH + 'px';
        animatingOverlay.style.opacity = '0';
      });

      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;
        if (refDiv) refDiv.remove();
        parent.style.transition = 'none';
        el.style.transition = 'none';
        parent.style.setProperty('--rot-y-delta', '0deg');
        parent.style.setProperty('--rot-x-delta', '0deg');

        requestAnimationFrame(() => {
          el.style.visibility = '';
          el.style.opacity = '0';
          el.style.zIndex = '';
          focusedElRef.current = null;
          rootRef.current?.removeAttribute('data-enlarging');

          requestAnimationFrame(() => {
            parent.style.transition = '';
            el.style.transition = 'opacity 300ms ease-out';
            requestAnimationFrame(() => {
              el.style.opacity = '1';
              setTimeout(() => {
                el.style.transition = '';
                el.style.opacity = '';
                openingRef.current = false;
                unlockScroll();
              }, 300);
            });
          });
        });
      };

      animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
    };

    scrim.addEventListener('click', close);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      scrim.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [enlargeTransitionMs, unlockScroll]);

  const openItemFromElement = useCallback(
    (el: HTMLElement) => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();

      const parent = el.parentElement as HTMLElement;
      focusedElRef.current = el;
      el.setAttribute('data-focused', 'true');

      const offsetX = getDataNumber(parent, 'offsetX', 0);
      const offsetY = getDataNumber(parent, 'offsetY', 0);
      const sizeX = getDataNumber(parent, 'sizeX', 2);
      const sizeY = getDataNumber(parent, 'sizeY', 2);

      const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, effectiveSegments);
      const parentY = normalizeAngle(parentRot.rotateY);
      const globalY = normalizeAngle(visualRotationRef.current.y);

      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;
      if (rotY > 180) rotY -= 360;

      const rotX = -parentRot.rotateX - visualRotationRef.current.x;

      parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
      parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

      const refDiv = document.createElement('div');
      refDiv.className = 'item__image item__image--reference';
      refDiv.style.opacity = '0';
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
      parent.appendChild(refDiv);
      void refDiv.offsetHeight;

      const tileR = refDiv.getBoundingClientRect();
      const mainR = mainRef.current?.getBoundingClientRect();
      const frameR = frameRef.current?.getBoundingClientRect();

      if (!mainR || !frameR || tileR.width <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        parent.removeChild(refDiv);
        unlockScroll();
        return;
      }

      originalTilePositionRef.current = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };

      el.style.visibility = 'hidden';
      el.style.zIndex = '0';

      const overlay = document.createElement('div');
      overlay.className = 'enlarge';
      overlay.style.position = 'absolute';
      overlay.style.left = (frameR.left - mainR.left) + 'px';
      overlay.style.top = (frameR.top - mainR.top) + 'px';
      overlay.style.width = frameR.width + 'px';
      overlay.style.height = frameR.height + 'px';
      overlay.style.opacity = '0';
      overlay.style.zIndex = '30';
      overlay.style.willChange = 'transform, opacity';
      overlay.style.transformOrigin = 'top left';
      overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;

      const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
      const img = document.createElement('img');
      img.src = rawSrc;
      overlay.appendChild(img);
      viewerRef.current?.appendChild(overlay);

      const tx0 = tileR.left - frameR.left;
      const ty0 = tileR.top - frameR.top;
      const sx0 = tileR.width / frameR.width;
      const sy0 = tileR.height / frameR.height;
      const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
      const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

      overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

      requestAnimationFrame(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = '1';
        overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
        rootRef.current?.setAttribute('data-enlarging', 'true');
      });
    },
    [enlargeTransitionMs, lockScroll, effectiveSegments, unlockScroll]
  );

  const onTileClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItemFromElement(e.currentTarget as HTMLElement);
    },
    [openItemFromElement]
  );

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={{
        ['--segments-x' as any]: effectiveSegments,
        ['--segments-y' as any]: effectiveSegments,
        ['--overlay-blur-color' as any]: overlayBlurColor,
        ['--tile-radius' as any]: imageBorderRadius,
        ['--enlarge-radius' as any]: openedImageBorderRadius,
        ['--image-filter' as any]: grayscale ? 'grayscale(1)' : 'none'
      }}
    >
      <main
        ref={mainRef}
        className="sphere-main"
        style={{ touchAction: 'none' }}
      >
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                data-src={it.src}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={{
                  ['--offset-x' as any]: it.x,
                  ['--offset-y' as any]: it.y,
                  ['--item-size-x' as any]: it.sizeX,
                  ['--item-size-y' as any]: it.sizeY
                }}
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={it.alt || 'Open image'}
                  onClick={onTileClick}
                >
                  <img src={it.src} draggable={false} alt={it.alt} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div
            ref={frameRef}
            className="frame"
            style={{
              width: isMobile ? '85vw' : openedImageWidth,
              height: isMobile ? '75vh' : openedImageHeight,
              maxWidth: '95vw',
              maxHeight: '95vh'
            }}
          />
        </div>
      </main>
    </div>
  );
}
