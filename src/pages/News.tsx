import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Icon from '@/components/ui/icon';
import { strapiService, type StrapiItem } from '@/services/strapi';

const News = () => {
  const [news, setNews] = useState<StrapiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt:desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data fallback
  const mockNewsData: StrapiItem[] = [
    {
      id: 1,
      attributes: {
        title: 'Революция в веб-технологиях 2024',
        content: 'Подробный обзор новейших технологий и фреймворков...',
        excerpt: 'Анализируем главные тренды в разработке и их влияние на индустрию',
        slug: 'revolution-web-tech-2024',
        publishedAt: '2024-09-07T10:00:00.000Z',
        createdAt: '2024-09-07T09:00:00.000Z',
        updatedAt: '2024-09-07T10:00:00.000Z',
        views: 1542,
        rating: 4.8,
        category: {
          data: {
            id: 1,
            attributes: {
              name: 'Технологии',
              slug: 'tech'
            }
          }
        },
        tags: {
          data: [
            { id: 1, attributes: { name: 'React', slug: 'react' } },
            { id: 2, attributes: { name: 'AI', slug: 'ai' } }
          ]
        },
        image: {
          data: {
            id: 1,
            attributes: {
              url: '/img/c12febfd-72a2-4651-b288-3ed565ad81d8.jpg',
              alternativeText: 'Tech news'
            }
          }
        }
      }
    },
    {
      id: 2,
      attributes: {
        title: 'Новые возможности ИИ в 2024',
        content: 'Искусственный интеллект продолжает развиваться...',
        excerpt: 'Обзор последних достижений в области машинного обучения',
        slug: 'ai-capabilities-2024',
        publishedAt: '2024-09-06T14:30:00.000Z',
        createdAt: '2024-09-06T13:00:00.000Z',
        updatedAt: '2024-09-06T14:30:00.000Z',
        views: 987,
        rating: 4.6,
        category: {
          data: {
            id: 2,
            attributes: {
              name: 'ИИ',
              slug: 'ai'
            }
          }
        },
        tags: {
          data: [
            { id: 3, attributes: { name: 'Machine Learning', slug: 'ml' } },
            { id: 4, attributes: { name: 'Innovation', slug: 'innovation' } }
          ]
        },
        image: {
          data: {
            id: 2,
            attributes: {
              url: '/img/c12febfd-72a2-4651-b288-3ed565ad81d8.jpg',
              alternativeText: 'AI news'
            }
          }
        }
      }
    }
  ];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await strapiService.getNews({
          page: currentPage,
          pageSize: 12,
          sort: sortBy
        });
        
        setNews(response.data);
        setTotalPages(response.meta?.pagination?.pageCount || 1);
      } catch (error) {
        console.error('Failed to fetch news:', error);
        // Fallback to mock data
        setNews(mockNewsData);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [currentPage, sortBy]);

  const filteredNews = news.filter(item => 
    item.attributes.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.attributes.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NewsCard = ({ item }: { item: StrapiItem }) => (
    <Card className="content-card hover-lift overflow-hidden cursor-pointer">
      <div className="relative">
        <img 
          src={item.attributes.image?.data?.attributes?.url || '/img/c12febfd-72a2-4651-b288-3ed565ad81d8.jpg'}
          alt={item.attributes.image?.data?.attributes?.alternativeText || item.attributes.title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
          {item.attributes.category?.data?.attributes?.name || 'Новости'}
        </Badge>
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2">
          <Icon name="Bookmark" size={16} className="text-gray-600" />
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{new Date(item.attributes.publishedAt).toLocaleDateString('ru-RU')}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={14} />
              <span>{item.attributes.views?.toLocaleString() || '0'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="text-yellow-500" />
              <span>{item.attributes.rating || '0'}</span>
            </div>
          </div>
        </div>
        
        <CardTitle className="line-clamp-2 leading-6">{item.attributes.title}</CardTitle>
        <CardDescription className="content-text line-clamp-3">
          {item.attributes.excerpt}
        </CardDescription>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {item.attributes.tags?.data?.slice(0, 3).map(tag => (
            <Badge key={tag.id} variant="outline" className="text-xs">
              {tag.attributes.name}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 flex items-center justify-between">
        <Button variant="outline" size="sm">
          <Icon name="MessageCircle" size={16} />
          <span className="ml-1">12</span>
        </Button>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Icon name="Heart" size={16} />
          </Button>
          <Button size="sm" variant="outline">
            <Icon name="Share2" size={16} />
          </Button>
          <Button size="sm">Читать</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 rounded-lg p-3">
              <Icon name="Newspaper" size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Новости</h1>
              <p className="text-muted-foreground">Последние события и тренды</p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск новостей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                <SelectItem value="tech">Технологии</SelectItem>
                <SelectItem value="ai">ИИ</SelectItem>
                <SelectItem value="business">Бизнес</SelectItem>
                <SelectItem value="science">Наука</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publishedAt:desc">Новые</SelectItem>
                <SelectItem value="publishedAt:asc">Старые</SelectItem>
                <SelectItem value="views:desc">Популярные</SelectItem>
                <SelectItem value="rating:desc">Лучшие</SelectItem>
              </SelectContent>
            </Select>
            
            <Button>
              <Icon name="Filter" size={16} />
              Фильтры
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{filteredNews.length}</div>
                  <div className="text-sm text-muted-foreground">Новостей</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">1.2K</div>
                  <div className="text-sm text-muted-foreground">Просмотров</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-sm text-muted-foreground">Комментариев</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">4.7</div>
                  <div className="text-sm text-muted-foreground">Рейтинг</div>
                </CardContent>
              </Card>
            </div>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredNews.map(item => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const page = i + 1;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {totalPages > 5 && <PaginationEllipsis />}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default News;