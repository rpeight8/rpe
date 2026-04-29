import type { CollectionEntry } from 'astro:content';

export type SectionEntry = CollectionEntry<'sections'>;

const INDEX_SUFFIX = '/index';

export const isIndexEntry = (id: string): boolean =>
  id === 'index' || id.endsWith(INDEX_SUFFIX);

export const entryToUrlPath = (id: string): string => {
  if (id === 'index') return '';
  if (id.endsWith(INDEX_SUFFIX)) return id.slice(0, -INDEX_SUFFIX.length);
  return id;
};

export const isDirectChild = (entryId: string, parentPath: string): boolean => {
  const prefix = parentPath ? `${parentPath}/` : '';
  if (parentPath && !entryId.startsWith(prefix)) return false;
  if (parentPath && entryId === `${parentPath}${INDEX_SUFFIX}`) return false;
  const rest = entryId.slice(prefix.length);
  if (!rest) return false;
  if (!rest.includes('/')) return true;
  return rest.endsWith(INDEX_SUFFIX) && !rest.slice(0, -INDEX_SUFFIX.length).includes('/');
};

export const getDirectChildren = (
  all: SectionEntry[],
  parentPath: string,
): SectionEntry[] =>
  all
    .filter((e) => isDirectChild(e.id, parentPath))
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
    const entry = all.find(
      (e) => e.id === acc || e.id === `${acc}${INDEX_SUFFIX}`,
    );
    crumbs.push({
      label: entry?.data.title ?? segments[i],
      href: `/${acc}`,
    });
  }
  return crumbs;
};
