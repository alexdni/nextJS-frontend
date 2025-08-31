const API_URL = process.env.STRAPI_API_URL || 'http://localhost:1337/api';

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    url: string;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
  author?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  category?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  blocks?: Array<{
    __component: string;
    id: number;
    body?: string;
    title?: string;
  }>;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const queryString = new URLSearchParams(urlParamsObject).toString();
    const requestUrl = `${API_URL}${path}${
      queryString ? `?${queryString}` : ''
    }`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
  }
}

// Get all articles with populated fields
export async function getArticles() {
  const data = await fetchAPI('/articles', {
    populate: '*',
  });
  return data;
}

// Get single article by slug with populated fields
export async function getArticle(slug: string) {
  const data = await fetchAPI('/articles', {
    'filters[slug][$eq]': slug,
    populate: '*',
  });
  return data?.data?.[0] || null;
}

// Get all authors
export async function getAuthors() {
  const data = await fetchAPI('/authors');
  return data;
}

// Get all categories
export async function getCategories() {
  const data = await fetchAPI('/categories');
  return data;
}

// Get global data
export async function getGlobal() {
  const data = await fetchAPI('/global', {
    populate: ['favicon', 'defaultSeo'],
  });
  return data?.data || null;
}
