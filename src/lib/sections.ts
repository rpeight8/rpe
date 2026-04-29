import type { CollectionEntry } from 'astro:content';

export type SectionEntry = CollectionEntry<'sections'>;

const INDEX_FILE_RE = /[\\/]index\.mdx?$/;

export const isIndexEntry = (entry: SectionEntry): boolean =>
  INDEX_FILE_RE.test(entry.filePath ?? '');

export const isDirectChild = (
  entry: SectionEntry,
  parentPath: string,
): boolean => {
  if (entry.id === parentPath) return false;
  const prefix = parentPath ? `${parentPath}/` : '';
  if (parentPath && !entry.id.startsWith(prefix)) return false;
  const rest = entry.id.slice(prefix.length);
  if (!rest) return false;
  return !rest.includes('/');
};

export const getDirectChildren = (
  all: SectionEntry[],
  parentPath: string,
): SectionEntry[] =>
  all
    .filter((e) => isDirectChild(e, parentPath))
    .sort((a, b) => {
      const oa = a.data.order ?? Number.POSITIVE_INFINITY;
      const ob = b.data.order ?? Number.POSITIVE_INFINITY;
      if (oa !== ob) return oa - ob;
      return a.data.title.localeCompare(b.data.title);
    });

export interface Crumb {
  label: string;
  href: string;
}

export const breadcrumbs = (
  slug: string,
  all: SectionEntry[],
): Crumb[] => {
  const segments = slug.split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ label: 'home', href: '/' }];
  let acc = '';
  for (let i = 0; i < segments.length; i++) {
    acc = acc ? `${acc}/${segments[i]}` : segments[i];
    const entry = all.find((e) => e.id === acc);
    crumbs.push({
      label: entry?.data.title ?? segments[i],
      href: `/${acc}`,
    });
  }
  return crumbs;
};
