
export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  imageUrl: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
