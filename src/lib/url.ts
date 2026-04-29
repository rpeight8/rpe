const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const withBase = (path: string): string => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
};
