import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

// Mock data for demonstration
const mockNews = [
  {
    id: 1,
    title: 'Новые технологии в веб-разработке',
    excerpt: 'Обзор последних трендов и инструментов для современной разработки',
    image: '/img/c12febfd-72a2-4651-b288-3ed565ad81d8.jpg',
    category: 'Технологии',
    date: '2024-09-07',
    views: 1205,
    rating: 4.8
  },
  {
    id: 2,
    title: 'Будущее искусственного интеллекта',
    excerpt: 'Как ИИ изменит нашу повседневную жизнь в ближайшие годы',
    image: '/img/c12febfd-72a2-4651-b288-3ed565ad81d8.jpg',
    category: 'ИИ',
    date: '2024-09-06',
    views: 856,
    rating: 4.6
  }
];

const mockArticles = [
  {
    id: 1,
    title: 'Глубокий анализ современных CMS',
    excerpt: 'Подробное сравнение популярных систем управления контентом',
    image: '/img/c12febfd-72a2-4651-b288-3ed565ad81d8.jpg',
    category: 'Аналитика',
    date: '2024-09-05',
    readTime: '15 мин',
    rating: 4.9
  }
];

const mockStories = [
  {
    id: 1,
    title: 'История успешного стартапа',
    excerpt: 'От идеи до миллионных инвестиций за два года',
    image: '/img/98f9aa19-2022-4b79-9b01-3a4a398614f0.jpg',
    category: 'Биография',
    date: '2024-09-04',
    rating: 4.7
  }
];

const mockVideos = [
  {
    id: 1,
    title: 'Мастер-класс по React',
    excerpt: 'Создание современного приложения с нуля',
    image: '/img/c16c30d9-abb0-4bc1-9eab-f2a3bc8c5ad0.jpg',
    category: 'Обучение',
    duration: '45:30',
    views: 2340,
    rating: 4.8
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ContentCard = ({ item, type }: { item: any, type: string }) => (
    <Card className="content-card hover-lift overflow-hidden">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        {type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <Icon name="Play" size={24} className="text-primary ml-1" />
            </div>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {item.category}
        </Badge>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{item.date}</span>
          <div className="flex items-center gap-2">
            {item.views && (
              <div className="flex items-center gap-1">
                <Icon name="Eye" size={14} />
                <span>{item.views.toLocaleString()}</span>
              </div>
            )}
            {item.duration && (
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                <span>{item.duration}</span>
              </div>
            )}
            {item.readTime && (
              <div className="flex items-center gap-1">
                <Icon name="BookOpen" size={14} />
                <span>{item.readTime}</span>
              </div>
            )}
          </div>
        </div>
        
        <CardTitle className="line-clamp-2 leading-6">{item.title}</CardTitle>
        <CardDescription className="content-text line-clamp-3">
          {item.excerpt}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{item.rating}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <div className="bg-primary rounded-lg p-2">
                  <Icon name="Newspaper" size={24} className="text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">ContentHub</h1>
              </Link>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Поиск контента..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Button variant="outline">
                    <Icon name="Bell" size={18} />
                  </Button>
                  <Button variant="outline">
                    <Icon name="User" size={18} />
                    Профиль
                  </Button>
                  <Button>
                    <Icon name="Settings" size={18} />
                    Админ
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline">Войти</Button>
                  <Button>Регистрация</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Современная платформа управления контентом
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Создавайте, управляйте и делитесь контентом с мощными инструментами для новостей, статей, рассказов и видео
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Link to="/news" className="text-center p-4 hover-lift rounded-lg transition-all">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Icon name="Newspaper" size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Новости</h3>
              <p className="text-sm text-muted-foreground">Актуальные события</p>
            </Link>
            
            <Link to="/articles" className="text-center p-4 hover-lift rounded-lg transition-all">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Icon name="FileText" size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Статьи</h3>
              <p className="text-sm text-muted-foreground">Глубокая аналитика</p>
            </Link>
            
            <Link to="/stories" className="text-center p-4 hover-lift rounded-lg transition-all">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Icon name="Book" size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Рассказы</h3>
              <p className="text-sm text-muted-foreground">Истории и биографии</p>
            </Link>
            
            <Link to="/videos" className="text-center p-4 hover-lift rounded-lg transition-all">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Icon name="Video" size={24} className="text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Видео</h3>
              <p className="text-sm text-muted-foreground">Видеоконтент</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Dashboard */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">2,458</div>
                <div className="text-sm text-muted-foreground">Просмотров сегодня</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">347</div>
                <div className="text-sm text-muted-foreground">Активных читателей</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">89</div>
                <div className="text-sm text-muted-foreground">Новых подписчиков</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">4.7</div>
                <div className="text-sm text-muted-foreground">Средний рейтинг</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-12">
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Icon name="Newspaper" size={16} />
                Новости
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <Icon name="FileText" size={16} />
                Статьи
              </TabsTrigger>
              <TabsTrigger value="stories" className="flex items-center gap-2">
                <Icon name="Book" size={16} />
                Рассказы
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Icon name="Video" size={16} />
                Видео
              </TabsTrigger>
            </TabsList>

            <TabsContent value="news">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Последние новости</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Filter" size={16} />
                    Фильтры
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="SortDesc" size={16} />
                    Сортировка
                  </Button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockNews.map(item => (
                  <ContentCard key={item.id} item={item} type="news" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="articles">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Аналитические статьи</h2>
                <Button variant="outline" size="sm">
                  <Icon name="Plus" size={16} />
                  Добавить статью
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArticles.map(item => (
                  <ContentCard key={item.id} item={item} type="article" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stories">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Истории и рассказы</h2>
                <Button variant="outline" size="sm">
                  <Icon name="Edit" size={16} />
                  Создать рассказ
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockStories.map(item => (
                  <ContentCard key={item.id} item={item} type="story" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Видеоконтент</h2>
                <Button variant="outline" size="sm">
                  <Icon name="Upload" size={16} />
                  Загрузить видео
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVideos.map(item => (
                  <ContentCard key={item.id} item={item} type="video" />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Возможности платформы</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift">
              <CardHeader>
                <div className="bg-blue-100 rounded-lg p-3 w-fit mb-3">
                  <Icon name="MessageCircle" size={24} className="text-blue-600" />
                </div>
                <CardTitle>Система комментариев</CardTitle>
                <CardDescription>
                  Интерактивное общение с читателями и модерация комментариев
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader>
                <div className="bg-green-100 rounded-lg p-3 w-fit mb-3">
                  <Icon name="Tag" size={24} className="text-green-600" />
                </div>
                <CardTitle>Система тегов</CardTitle>
                <CardDescription>
                  Организация контента по категориям и упрощение поиска
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader>
                <div className="bg-purple-100 rounded-lg p-3 w-fit mb-3">
                  <Icon name="Search" size={24} className="text-purple-600" />
                </div>
                <CardTitle>Умный поиск</CardTitle>
                <CardDescription>
                  Быстрый поиск по всему контенту с фильтрами и сортировкой
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader>
                <div className="bg-red-100 rounded-lg p-3 w-fit mb-3">
                  <Icon name="Heart" size={24} className="text-red-600" />
                </div>
                <CardTitle>Избранное</CardTitle>
                <CardDescription>
                  Сохранение интересного контента для последующего чтения
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader>
                <div className="bg-yellow-100 rounded-lg p-3 w-fit mb-3">
                  <Icon name="Star" size={24} className="text-yellow-600" />
                </div>
                <CardTitle>Система рейтингов</CardTitle>
                <CardDescription>
                  Оценка контента пользователями и аналитика популярности
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="hover-lift">
              <CardHeader>
                <div className="bg-indigo-100 rounded-lg p-3 w-fit mb-3">
                  <Icon name="Users" size={24} className="text-indigo-600" />
                </div>
                <CardTitle>Подписки</CardTitle>
                <CardDescription>
                  Уведомления о новом контенте любимых авторов
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-white mb-4">ContentHub</h3>
              <p className="text-sm">
                Современная платформа для создания и управления контентом
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Контент</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Новости</a></li>
                <li><a href="#" className="hover:text-white">Статьи</a></li>
                <li><a href="#" className="hover:text-white">Рассказы</a></li>
                <li><a href="#" className="hover:text-white">Видео</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Для авторов</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Создать контент</a></li>
                <li><a href="#" className="hover:text-white">Аналитика</a></li>
                <li><a href="#" className="hover:text-white">Монетизация</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">API</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Документация</a></li>
                <li><a href="#" className="hover:text-white">Strapi интеграция</a></li>
                <li><a href="#" className="hover:text-white">Примеры</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 ContentHub. Powered by Strapi & React</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;