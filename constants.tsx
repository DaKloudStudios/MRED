
import { ServiceCategory, Project, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Start a Project', href: '#contact' },
];

export const SERVICES: ServiceCategory[] = [
  {
    category: 'Commercial Construction',
    items: [
      { title: 'Tenant Improvements (TI’s)', description: 'Strategic interior renovations tailored to specific business operations and branding requirements.' },
      { title: 'Design & Build', description: 'Single-source responsibility for the entire project lifecycle, from initial architectural planning to final completion.' },
      { title: 'Commercial Remodels', description: 'Comprehensive structural and aesthetic updates for established commercial environments.' },
      { title: 'Build-Outs', description: 'Turning raw shell spaces into functional, high-performance professional environments.' }
    ]
  },
  {
    category: 'Residential Construction',
    items: [
      { title: 'Full Remodels', description: 'Complete structural transformations of existing residential properties.' },
      { title: 'New Construction', description: 'Turnkey development of modern residential structures from the ground up.' },
      { title: 'Custom Homes', description: 'Unique architectural builds designed specifically for the owner’s vision and lifestyle.' },
      { title: 'Additions', description: 'Expanding living space through seamless structural extensions and secondary units.' }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Commercial Development',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/MRED4.webp'
  },
  {
    id: '2',
    title: 'Modern Office Interior',
    location: 'Henderson, NV',
    category: 'Commercial',
    imageUrl: '/images/MRED3.webp'
  },
  {
    id: '3',
    title: 'Design-Build Project',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/MRED1.webp'
  },
  {
    id: '4',
    title: 'Executive Workspace',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/ME.webp'
  },
  {
    id: '5',
    title: 'Industrial Facility',
    location: 'North Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/MDRED2.webp'
  },
  {
    id: '6',
    title: 'Retail Expansion',
    location: 'Summerlin, NV',
    category: 'Commercial',
    imageUrl: '/images/485163252_982090220727178_6762656864850734073_n.webp'
  },
  {
    id: '7',
    title: 'Tenant Improvement',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/485100761_982090207393846_6980853226460417027_n.webp'
  },
  {
    id: '8',
    title: 'Custom Residence',
    location: 'Seven Hills, NV',
    category: 'Residential',
    imageUrl: '/images/484827290_982090524060481_4425155738135494186_n.webp'
  },
  {
    id: '9',
    title: 'Modern Living Space',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/484814331_982090507393816_2714571011854995559_n.webp'
  },
  {
    id: '10',
    title: 'Luxury Kitchen Remodel',
    location: 'Henderson, NV',
    category: 'Residential',
    imageUrl: '/images/484804830_982090487393818_9116493074043048104_n.webp'
  },
  {
    id: '11',
    title: 'Architectural Detail',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/483525836_982090517393815_6830754627101651057_n.webp'
  },
  {
    id: '12',
    title: 'Corporate Headquarters',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/469458549_1066482135176855_8410746743405783440_n.webp'
  },
  {
    id: '13',
    title: 'Facility Upgrade',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/469548089_1067595858398816_3275149458858370112_n.webp'
  },
  {
    id: '14',
    title: 'Structural Planning',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/481178960_972889064980627_6996856093205795468_n.webp'
  },
  {
    id: '15',
    title: 'Site Execution',
    location: 'Henderson, NV',
    category: 'Commercial',
    imageUrl: '/images/481316724_972889108313956_3836058292520930219_n.webp'
  },
  {
    id: '16',
    title: 'Foundation Work',
    location: 'Las Vegas, NV',
    category: 'Commercial',
    imageUrl: '/images/482015347_976447734624760_3333127928408194325_n.webp'
  },
  {
    id: 'fargo-after-1',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/1.webp'
  },
  {
    id: 'fargo-after-2',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/10.webp'
  },
  {
    id: 'fargo-after-3',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/11.webp'
  },
  {
    id: 'fargo-after-4',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/12.webp'
  },
  {
    id: 'fargo-after-5',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/13.webp'
  },
  {
    id: 'fargo-after-6',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/14.webp'
  },
  {
    id: 'fargo-after-7',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/15.webp'
  },
  {
    id: 'fargo-after-8',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/16.webp'
  },
  {
    id: 'fargo-after-9',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/17.webp'
  },
  {
    id: 'fargo-after-10',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/18.webp'
  },
  {
    id: 'fargo-after-11',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/19.webp'
  },
  {
    id: 'fargo-after-12',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/2.webp'
  },
  {
    id: 'fargo-after-13',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/20.webp'
  },
  {
    id: 'fargo-after-14',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/21.webp'
  },
  {
    id: 'fargo-after-15',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/22.webp'
  },
  {
    id: 'fargo-after-16',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/23.webp'
  },
  {
    id: 'fargo-after-17',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/24.webp'
  },
  {
    id: 'fargo-after-18',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/25.webp'
  },
  {
    id: 'fargo-after-19',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/26.webp'
  },
  {
    id: 'fargo-after-20',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/27.webp'
  },
  {
    id: 'fargo-after-21',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/28.webp'
  },
  {
    id: 'fargo-after-22',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/29.webp'
  },
  {
    id: 'fargo-after-23',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/3.webp'
  },
  {
    id: 'fargo-after-24',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/30.webp'
  },
  {
    id: 'fargo-after-25',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/31.webp'
  },
  {
    id: 'fargo-after-26',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/32.webp'
  },
  {
    id: 'fargo-after-27',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/33.webp'
  },
  {
    id: 'fargo-after-28',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/34.webp'
  },
  {
    id: 'fargo-after-29',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/4.webp'
  },
  {
    id: 'fargo-after-30',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/5.webp'
  },
  {
    id: 'fargo-after-31',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/6.webp'
  },
  {
    id: 'fargo-after-32',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/7.webp'
  },
  {
    id: 'fargo-after-33',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/8.webp'
  },
  {
    id: 'fargo-after-34',
    title: '6336 Fargo - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/6336_fargo/after/9.webp'
  },
  {
    id: 'plata-after-1',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7471.webp'
  },
  {
    id: 'plata-after-2',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7474.webp'
  },
  {
    id: 'plata-after-3',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7477.webp'
  },
  {
    id: 'plata-after-4',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7480.webp'
  },
  {
    id: 'plata-after-5',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7486.webp'
  },
  {
    id: 'plata-after-6',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7489.webp'
  },
  {
    id: 'plata-after-7',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7495.webp'
  },
  {
    id: 'plata-after-8',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7498-copy.webp'
  },
  {
    id: 'plata-after-9',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7501.webp'
  },
  {
    id: 'plata-after-10',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7504.webp'
  },
  {
    id: 'plata-after-11',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7507.webp'
  },
  {
    id: 'plata-after-12',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7510.webp'
  },
  {
    id: 'plata-after-13',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7516.webp'
  },
  {
    id: 'plata-after-14',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7519.webp'
  },
  {
    id: 'plata-after-15',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7522.webp'
  },
  {
    id: 'plata-after-16',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7525.webp'
  },
  {
    id: 'plata-after-17',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7526.webp'
  },
  {
    id: 'plata-after-18',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7529.webp'
  },
  {
    id: 'plata-after-19',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7532.webp'
  },
  {
    id: 'plata-after-20',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7536.webp'
  },
  {
    id: 'plata-after-21',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7541.webp'
  },
  {
    id: 'plata-after-22',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7547.webp'
  },
  {
    id: 'plata-after-23',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7549.webp'
  },
  {
    id: 'plata-after-24',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7553.webp'
  },
  {
    id: 'plata-after-25',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7556.webp'
  },
  {
    id: 'plata-after-26',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7559.webp'
  },
  {
    id: 'plata-after-27',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7562.webp'
  },
  {
    id: 'plata-after-28',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7565.webp'
  },
  {
    id: 'plata-after-29',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7568.webp'
  },
  {
    id: 'plata-after-30',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7570.webp'
  },
  {
    id: 'plata-after-31',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7573.webp'
  },
  {
    id: 'plata-after-32',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7576.webp'
  },
  {
    id: 'plata-after-33',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7579.webp'
  },
  {
    id: 'plata-after-34',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7582.webp'
  },
  {
    id: 'plata-after-35',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7585.webp'
  },
  {
    id: 'plata-after-36',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7588.webp'
  },
  {
    id: 'plata-after-37',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7591.webp'
  },
  {
    id: 'plata-after-38',
    title: '4475 Plata - Completed',
    location: 'Las Vegas, NV',
    category: 'Residential',
    imageUrl: '/images/4475_plata/after/DSC_7595.webp'
  }
];

export const CONTACT_INFO = {
  address: '4425 E Sahara Ave, Suite #1, Las Vegas, NV 89104',
  phone: '+1 (702) 445-7552',
  email: 'mredlasvegas@gmail.com',
  facebook: 'https://www.facebook.com/profile.php?id=100067786260829',
  googleBusiness: 'https://maps.app.goo.gl/gft4qobCuXBw4WnV9'
};
