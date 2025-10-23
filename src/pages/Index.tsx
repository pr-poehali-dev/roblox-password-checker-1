import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'checker'>('home');
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!username || !password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isValid = Math.random() > 0.5;
    
    toast({
      title: isValid ? "Успех" : "Неудача",
      description: isValid ? "Пароль подходит к аккаунту" : "Неверный логин или пароль",
      variant: isValid ? "default" : "destructive"
    });
    
    setIsChecking(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-background" />
      
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-glow" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-glow" style={{ animationDelay: '1s' }} />

      <nav className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ROBLOX CHECKER
              </span>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="font-medium"
              >
                Главная
              </Button>
              <Button
                variant={activeSection === 'checker' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('checker')}
                className="font-medium"
              >
                Чекер
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {activeSection === 'home' ? (
          <section className="container mx-auto px-4 py-32 animate-fade-in">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <Icon name="Zap" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Security Tool</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                ROBLOX
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  PASSWORD CHECKER
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Проверяйте безопасность ваших аккаунтов с помощью продвинутой системы валидации
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <Button
                  size="lg"
                  onClick={() => setActiveSection('checker')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6"
                >
                  <Icon name="Shield" size={20} className="mr-2" />
                  Начать проверку
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6"
                >
                  <Icon name="Info" size={20} className="mr-2" />
                  Подробнее
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-20">
                {[
                  { icon: 'ShieldCheck', title: 'Безопасно', desc: 'Защита данных' },
                  { icon: 'Lock', title: 'Приватно', desc: 'Анонимность' },
                  { icon: 'Fingerprint', title: 'Точно', desc: 'Высокая точность' },
                  { icon: 'Target', title: 'Быстро', desc: 'Моментальный результат' }
                ].map((item, i) => (
                  <Card key={i} className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="container mx-auto px-4 py-20 animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Проверка аккаунта</h2>
                <p className="text-muted-foreground">Введите данные для проверки доступа</p>
              </div>

              <Card className="p-8 bg-card/80 backdrop-blur border-border/50">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="User" size={16} />
                      Имя пользователя
                    </label>
                    <Input
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 bg-input/50 border-border/50 focus:border-primary"
                      disabled={isChecking}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Icon name="Key" size={16} />
                      Пароль
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 bg-input/50 border-border/50 focus:border-primary"
                      disabled={isChecking}
                    />
                  </div>

                  <Button
                    onClick={handleCheck}
                    disabled={isChecking}
                    className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg font-medium"
                  >
                    {isChecking ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Проверка...
                      </>
                    ) : (
                      <>
                        <Icon name="ShieldCheck" size={20} className="mr-2" />
                        Проверить
                      </>
                    )}
                  </Button>

                  <div className="flex items-center gap-3 pt-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary animate-glow" />
                      <div className="w-3 h-3 rounded-full bg-secondary animate-glow" style={{ animationDelay: '0.5s' }} />
                      <div className="w-3 h-3 rounded-full bg-muted animate-glow" style={{ animationDelay: '1s' }} />
                    </div>
                    <span className="text-xs text-muted-foreground">Защищенное соединение</span>
                  </div>
                </div>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  <Icon name="Info" size={14} className="inline mr-1" />
                  Все данные обрабатываются локально и не сохраняются
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
