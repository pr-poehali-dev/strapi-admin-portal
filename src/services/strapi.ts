// Strapi API Service
const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.REACT_APP_STRAPI_TOKEN;

// Types for Strapi responses
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiItem {
  id: number;
  attributes: {
    title: string;
    content: string;
    excerpt?: string;
    slug: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    views?: number;
    rating?: number;
    category?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    tags?: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    author?: {
      data?: {
        id: number;
        attributes: {
          name: string;
          email: string;
        };
      };
    };
    image?: {
      data?: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          caption?: string;
        };
      };
    };
    video?: {
      data?: {
        id: number;
        attributes: {
          url: string;
          duration?: string;
        };
      };
    };
  };
}

// API headers
const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }
  
  return headers;
};

// Generic fetch function
const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Content queries
export const strapiService = {
  // Get all news
  getNews: async (params?: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, any>;
  }): Promise<StrapiResponse<StrapiItem[]>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.sort) searchParams.append('sort', params.sort);
    
    // Populate related fields
    searchParams.append('populate[0]', 'image');
    searchParams.append('populate[1]', 'category');
    searchParams.append('populate[2]', 'tags');
    searchParams.append('populate[3]', 'author');
    
    return apiRequest<StrapiResponse<StrapiItem[]>>(`/news?${searchParams.toString()}`);
  },

  // Get single news item
  getNewsItem: async (slug: string): Promise<StrapiResponse<StrapiItem>> => {
    const searchParams = new URLSearchParams();
    searchParams.append('filters[slug][$eq]', slug);
    searchParams.append('populate', '*');
    
    const response = await apiRequest<StrapiResponse<StrapiItem[]>>(`/news?${searchParams.toString()}`);
    
    if (!response.data.length) {
      throw new Error('News item not found');
    }
    
    return { data: response.data[0], meta: response.meta };
  },

  // Get all articles
  getArticles: async (params?: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, any>;
  }): Promise<StrapiResponse<StrapiItem[]>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.sort) searchParams.append('sort', params.sort);
    
    searchParams.append('populate[0]', 'image');
    searchParams.append('populate[1]', 'category');
    searchParams.append('populate[2]', 'tags');
    searchParams.append('populate[3]', 'author');
    
    return apiRequest<StrapiResponse<StrapiItem[]>>(`/articles?${searchParams.toString()}`);
  },

  // Get single article
  getArticle: async (slug: string): Promise<StrapiResponse<StrapiItem>> => {
    const searchParams = new URLSearchParams();
    searchParams.append('filters[slug][$eq]', slug);
    searchParams.append('populate', '*');
    
    const response = await apiRequest<StrapiResponse<StrapiItem[]>>(`/articles?${searchParams.toString()}`);
    
    if (!response.data.length) {
      throw new Error('Article not found');
    }
    
    return { data: response.data[0], meta: response.meta };
  },

  // Get all stories
  getStories: async (params?: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, any>;
  }): Promise<StrapiResponse<StrapiItem[]>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.sort) searchParams.append('sort', params.sort);
    
    searchParams.append('populate[0]', 'image');
    searchParams.append('populate[1]', 'category');
    searchParams.append('populate[2]', 'tags');
    searchParams.append('populate[3]', 'author');
    
    return apiRequest<StrapiResponse<StrapiItem[]>>(`/stories?${searchParams.toString()}`);
  },

  // Get single story
  getStory: async (slug: string): Promise<StrapiResponse<StrapiItem>> => {
    const searchParams = new URLSearchParams();
    searchParams.append('filters[slug][$eq]', slug);
    searchParams.append('populate', '*');
    
    const response = await apiRequest<StrapiResponse<StrapiItem[]>>(`/stories?${searchParams.toString()}`);
    
    if (!response.data.length) {
      throw new Error('Story not found');
    }
    
    return { data: response.data[0], meta: response.meta };
  },

  // Get all videos
  getVideos: async (params?: {
    page?: number;
    pageSize?: number;
    sort?: string;
    filters?: Record<string, any>;
  }): Promise<StrapiResponse<StrapiItem[]>> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString());
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
    if (params?.sort) searchParams.append('sort', params.sort);
    
    searchParams.append('populate[0]', 'image');
    searchParams.append('populate[1]', 'video');
    searchParams.append('populate[2]', 'category');
    searchParams.append('populate[3]', 'tags');
    searchParams.append('populate[4]', 'author');
    
    return apiRequest<StrapiResponse<StrapiItem[]>>(`/videos?${searchParams.toString()}`);
  },

  // Get single video
  getVideo: async (slug: string): Promise<StrapiResponse<StrapiItem>> => {
    const searchParams = new URLSearchParams();
    searchParams.append('filters[slug][$eq]', slug);
    searchParams.append('populate', '*');
    
    const response = await apiRequest<StrapiResponse<StrapiItem[]>>(`/videos?${searchParams.toString()}`);
    
    if (!response.data.length) {
      throw new Error('Video not found');
    }
    
    return { data: response.data[0], meta: response.meta };
  },

  // Search across all content types
  search: async (query: string, contentTypes?: string[]): Promise<{
    news: StrapiItem[];
    articles: StrapiItem[];
    stories: StrapiItem[];
    videos: StrapiItem[];
  }> => {
    const types = contentTypes || ['news', 'articles', 'stories', 'videos'];
    const results = await Promise.allSettled(
      types.map(async (type) => {
        const searchParams = new URLSearchParams();
        searchParams.append('filters[$or][0][title][$containsi]', query);
        searchParams.append('filters[$or][1][content][$containsi]', query);
        searchParams.append('filters[$or][2][excerpt][$containsi]', query);
        searchParams.append('populate', '*');
        searchParams.append('pagination[pageSize]', '10');
        
        const response = await apiRequest<StrapiResponse<StrapiItem[]>>(`/${type}?${searchParams.toString()}`);
        return { type, data: response.data };
      })
    );

    const searchResults = {
      news: [] as StrapiItem[],
      articles: [] as StrapiItem[],
      stories: [] as StrapiItem[],
      videos: [] as StrapiItem[],
    };

    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        const { type, data } = result.value;
        searchResults[type as keyof typeof searchResults] = data;
      }
    });

    return searchResults;
  },

  // Get categories
  getCategories: async (): Promise<StrapiResponse<Array<{
    id: number;
    attributes: {
      name: string;
      slug: string;
      description?: string;
    };
  }>>> => {
    return apiRequest<StrapiResponse<Array<{
      id: number;
      attributes: {
        name: string;
        slug: string;
        description?: string;
      };
    }>>>('/categories');
  },

  // Get tags
  getTags: async (): Promise<StrapiResponse<Array<{
    id: number;
    attributes: {
      name: string;
      slug: string;
    };
  }>>> => {
    return apiRequest<StrapiResponse<Array<{
      id: number;
      attributes: {
        name: string;
        slug: string;
      };
    }>>>('/tags');
  },

  // User session tracking for non-authenticated users
  trackSession: async (sessionId: string, action: {
    type: 'view' | 'like' | 'share';
    contentType: 'news' | 'articles' | 'stories' | 'videos';
    contentId: number;
    metadata?: Record<string, any>;
  }) => {
    return apiRequest('/user-sessions', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          sessionId,
          action: action.type,
          contentType: action.contentType,
          contentId: action.contentId,
          metadata: action.metadata,
          timestamp: new Date().toISOString(),
        },
      }),
    });
  },

  // Get content statistics
  getStats: async (): Promise<{
    totalViews: number;
    totalContent: number;
    activeUsers: number;
    averageRating: number;
  }> => {
    // This would be implemented as custom endpoints in Strapi
    try {
      const response = await apiRequest<{
        totalViews: number;
        totalContent: number;
        activeUsers: number;
        averageRating: number;
      }>('/content-stats');
      return response;
    } catch (error) {
      // Fallback to mock data if custom endpoint not available
      return {
        totalViews: 2458,
        totalContent: 347,
        activeUsers: 89,
        averageRating: 4.7,
      };
    }
  },
};

// Authentication service
export const authService = {
  login: async (identifier: string, password: string) => {
    return apiRequest('/auth/local', {
      method: 'POST',
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
  },

  register: async (username: string, email: string, password: string) => {
    return apiRequest('/auth/local/register', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
  },

  forgotPassword: async (email: string) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    });
  },

  resetPassword: async (code: string, password: string, passwordConfirmation: string) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation,
      }),
    });
  },
};