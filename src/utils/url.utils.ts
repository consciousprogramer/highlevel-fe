import { API_BASE_URL } from "./api/endpoints/base.endpoints.utils";

export const buildApiUrls = (routePath: string) => {
  if (!routePath.startsWith("/"))
    throw new Error("route path must start with a '/'");
  return `${API_BASE_URL}${routePath}`;
};

/**
 * build `base` api urls for a `resource:string`
 */
export const buildResourceBaseUrls = (routePath: string) => {
  if (!routePath.startsWith("/"))
    throw new Error("resource name must start with a '/'");
  return `${API_BASE_URL}${routePath}`;
};

/**
 * build api urls for a `resource:string`
 */
export const buildResourceApiUrls = (resource: string) => {
  const resourceBaseUrl = buildResourceBaseUrls(resource);
  return (routePath: string) => {
    if (!routePath.startsWith("/"))
      throw new Error("route path must start with a '/'");
    return `${resourceBaseUrl}${routePath}`;
  };
};

export const generateQueryString = (query: Record<string, string>) => {
  return new URLSearchParams(query).toString();
};
