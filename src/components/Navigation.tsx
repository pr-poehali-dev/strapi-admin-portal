import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isAuthenticated?: boolean;
}

const Navigation = ({ searchQuery, setSearchQuery, isAuthenticated = false }: NavigationProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/news', label: 'Новости', icon: 'Newspaper' },
    { path: '/articles', label: 'Статьи', icon: 'FileText' },
    { path: '/stories', label: 'Рассказы', icon: 'Book' },
    { path: '/videos', label: 'Видео', icon: 'Video' },
  ];

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <Icon name="Newspaper" size={24} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">ContentHub</h1>
          </Link>
          
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
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-1">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}>
              <Button 
                variant={location.pathname === item.path ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
              >
                <Icon name={item.icon as any} size={16} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;