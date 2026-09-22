/// <reference types="vite/client" />

export function fixAssetUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
  // Normalize path by stripping leading slashes and legacy src/assets prefixes
  let cleanPath = url;
  while (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }
  if (cleanPath.startsWith('src/assets/images/')) {
    cleanPath = 'images/' + cleanPath.replace('src/assets/images/', '');
  }

  const baseUrl = import.meta.env.BASE_URL || './';
  const prefix = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
  
  return prefix + cleanPath;
}
