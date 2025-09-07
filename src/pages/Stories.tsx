import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { strapiService, type StrapiItem } from '@/services/strapi';

const Stories = () => {
  const [stories, setStories] = useState<StrapiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt:desc');

  const mockStoriesData: StrapiItem[] = [
    {
      id: 1,
      attributes: {
        title: 'История успеха молодого предпринимателя',
        content: 'Рассказ о том, как студент создал миллионную компанию...',
        excerpt: 'От идеи в общежитии до международного успеха за 3 года',
        slug: 'young-entrepreneur-success',
        publishedAt: '2024-09-04T16:00:00.000Z',
        createdAt: '2024-09-04T14:00:00.000Z',
        updatedAt: '2024-09-04T16:00:00.000Z',
        views: 1876,
        rating: 4.8,
        category: {
          data: {
            id: 1,
            attributes: {
              name: 'Биография',
              slug: 'biography'
            }
          }
        },
        tags: {
          data: [
            { id: 1, attributes: { name: 'Успех', slug: 'success' } },
            { id: 2, attributes: { name: 'Стартап', slug: 'startup' } }
          ]
        },
        image: {
          data: {
            id: 1,
            attributes: {
              url: '/img/98f9aa19-2022-4b79-9b01-3a4a398614f0.jpg',
              alternativeText: 'Success story'
            }
          }
        }
      }
    },
    {
      id: 2,
      attributes: {
        title: 'Путешествие к вершине Эвереста',
        content: 'Личная история альпиниста о покорении высочайшей вершины мира...',
        excerpt: 'Две попытки, один успех и множество уроков жизни',
        slug: 'everest-journey',
        publishedAt: '2024-09-03T10:30:00.000Z',
        createdAt: '2024-09-03T09:00:00.000Z',
        updatedAt: '2024-09-03T10:30:00.000Z',
        views: 2145,
        rating: 4.9,
        category: {
          data: {
            id: 2,
            attributes: {
              name: 'Приключения',
              slug: 'adventure'
            }
          }
        },
        tags: {
          data: [
            { id: 3, attributes: { name: 'Альпинизм', slug: 'climbing' } },
            { id: 4, attributes: { name: 'Мотивация', slug: 'motivation' } }
          ]
        },
        image: {
          data: {
            id: 2,
            attributes: {
              url: '/img/98f9aa19-2022-4b79-9b01-3a4a398614f0.jpg',
              alternativeText: 'Mountain climbing'
            }
          }
        }
      }
    }
  ];

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await strapiService.getStories({
          page: 1,
          pageSize: 12,
          sort: sortBy
        });
        setStories(response.data);
      } catch (error) {
        console.error('Failed to fetch stories:', error);
        setStories(mockStoriesData);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [sortBy]);

  const filteredStories = stories.filter(item => 
    item.attributes.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.attributes.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const StoryCard = ({ item }: { item: StrapiItem }) => (
    <Card className="content-card hover-lift overflow-hidden cursor-pointer">
      <div className="relative">
        <img 
          src={item.attributes.image?.data?.attributes?.url || '/img/98f9aa19-2022-4b79-9b01-3a4a398614f0.jpg'}
          alt={item.attributes.image?.data?.attributes?.alternativeText || item.attributes.title}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-purple-600 text-white">
          {item.attributes.category?.data?.attributes?.name || 'Рассказ'}
        </Badge>
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2">
          <Icon name="Book" size={16} className="text-gray-600" />
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{new Date(item.attributes.publishedAt).toLocaleDateString('ru-RU')}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>8 мин</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 rounded-lg p-3">
              <Icon name="Book" size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Рассказы</h1>
              <p className="text-muted-foreground">Истории, которые вдохновляют и мотивируют</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск рассказов..."
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
              <Icon name="Edit" size={16} />
              Написать рассказ
            </Button>
          </div>
        </div>
      </header>

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map(item => (
              <StoryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Stories;