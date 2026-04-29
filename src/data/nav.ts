export interface NavItem {
  label: string;
  href: string;
}

export const nav: NavItem[] = [
  { label: 'about', href: '/about' },
  { label: 'post ui monkey', href: '/post-ui-monkey' },
  { label: 'rss', href: '/rss.xml' },
];
