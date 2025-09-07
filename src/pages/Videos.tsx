import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { strapiService, type StrapiItem } from '@/services/strapi';

const Videos = () => {
  const [videos, setVideos] = useState<StrapiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt:desc');

  const mockVideosData: StrapiItem[] = [
    {
      id: 1,
      attributes: {
        title: 'Мастер-класс: Создание React приложения с нуля',
        content: 'Полный курс по разработке современного веб-приложения...',
        excerpt: 'Изучаем React, TypeScript и современные инструменты разработки',
        slug: 'react-masterclass-2024',
        publishedAt: '2024-09-02T14:00:00.000Z',
        createdAt: '2024-09-02T12:00:00.000Z',
        updatedAt: '2024-09-02T14:00:00.000Z',
        views: 3421,
        rating: 4.9,
        category: {
          data: {
            id: 1,
            attributes: {
              name: 'Обучение',
              slug: 'education'
            }
          }
        },
        tags: {
          data: [
            { id: 1, attributes: { name: 'React', slug: 'react' } },
            { id: 2, attributes: { name: 'TypeScript', slug: 'typescript' } }
          ]
        },
        image: {
          data: {
            id: 1,
            attributes: {
              url: '/img/c16c30d9-abb0-4bc1-9eab-f2a3bc8c5ad0.jpg',
              alternativeText: 'React masterclass'
            }
          }
        }
      }
    },
    {
      id: 2,
      attributes: {
        title: 'Интервью с основателем успешного стартапа',
        content: 'Беседа о создании компании, привлечении инвестиций и масштабировании...',
        excerpt: 'Секреты успеха от предпринимателя, который построил unicorn',
        slug: 'startup-founder-interview',
        publishedAt: '2024-09-01T18:30:00.000Z',
        createdAt: '2024-09-01T16:00:00.000Z',
        updatedAt: '2024-09-01T18:30:00.000Z',
        views: 2876,
        rating: 4.7,
        category: {
          data: {
            id: 2,
            attributes: {
              name: 'Интервью',
              slug: 'interview'
            }
          }
        },
        tags: {
          data: [
            { id: 3, attributes: { name: 'Стартап', slug: 'startup' } },
            { id: 4, attributes: { name: 'Предпринимательство', slug: 'entrepreneurship' } }
          ]
        },
        image: {
          data: {
            id: 2,
            attributes: {
              url: '/img/c16c30d9-abb0-4bc1-9eab-f2a3bc8c5ad0.jpg',
              alternativeText: 'Startup interview'
            }
          }
        }
      }
    }
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await strapiService.getVideos({
          page: 1,
          pageSize: 12,
          sort: sortBy
        });
        setVideos(response.data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setVideos(mockVideosData);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [sortBy]);

  const filteredVideos = videos.filter(item => 
    item.attributes.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.attributes.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const VideoCard = ({ item }: { item: StrapiItem }) => (
    <Card className="content-card hover-lift overflow-hidden cursor-pointer">
      <div className="relative">
        <img 
          src={item.attributes.image?.data?.attributes?.url || '/img/c16c30d9-abb0-4bc1-9eab-f2a3bc8c5ad0.jpg'}
          alt={item.attributes.image?.data?.attributes?.alternativeText || item.attributes.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
            <Icon name="Play" size={32} className="text-red-600 ml-1" />
          </div>
        </div>
        <Badge className="absolute top-3 left-3 bg-red-600 text-white">
          {item.attributes.category?.data?.attributes?.name || 'Видео'}
        </Badge>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
          45:30
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{new Date(item.attributes.publishedAt).toLocaleDateString('ru-RU')}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon name="Play" size={14} />
              <span>45:30</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={14} />
              <span>{item.attributes.views?.toLocaleString() || '0'}</span>
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
        <div className="flex items-center gap-1">
          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{item.attributes.rating || '0'}</span>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Icon name="ThumbsUp" size={16} />
          </Button>
          <Button size="sm" variant="outline">
            <Icon name="Share2" size={16} />
          </Button>
          <Button size="sm">Смотреть</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-600 rounded-lg p-3">
              <Icon name="Video" size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Видео</h1>
              <p className="text-muted-foreground">Образовательный и развлекательный видеоконтент</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
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
              <Icon name="Upload" size={16} />
              Загрузить видео
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{filteredVideos.length}</div>
              <div className="text-sm text-muted-foreground">Видео</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">12.5K</div>
              <div className="text-sm text-muted-foreground">Просмотров</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">2:45:30</div>
              <div className="text-sm text-muted-foreground">Общая длительность</div>
            </CardContent>
          </Card>
        </div>

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(item => (
              <VideoCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Videos;