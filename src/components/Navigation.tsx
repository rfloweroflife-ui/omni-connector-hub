import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  Leaf, 
  MessageCircle, 
  BookOpen, 
  FlaskConical, 
  ShoppingBag, 
  Users,
  LogIn,
  Sparkles,
  LogOut,
  User,
  Settings,
  Crown
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/chat", label: "AI Chat", icon: MessageCircle },
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/journal", label: "Grow Journal", icon: FlaskConical },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/community", label: "Community", icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    } else {
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
      navigate("/");
    }
  };

  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.display_name) {
      return user.user_metadata.display_name;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'border-b border-accent/10 bg-background/85 backdrop-blur-xl shadow-lg shadow-background/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container flex h-18 items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-accent to-mycelium flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg shadow-primary/30 group-hover:shadow-accent/40">
            <Leaf className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 group-hover:from-accent group-hover:to-primary transition-all duration-300">
              The General Spore
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 glass-card px-2 py-1.5">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`relative transition-all duration-300 ${
                  isActive(link.href) 
                    ? "text-accent bg-accent/15" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                }`}
              >
                <link.icon className="w-4 h-4 mr-2" />
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-accent rounded-full" />
                )}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {!loading && !user && (
            <>
              <Link to="/auth" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?mode=signup" className="hidden sm:block">
                <Button size="sm" className="glow-purple font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link to="/subscribe" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-spore-gold hover:text-spore-gold hover:bg-spore-gold/10">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/20 text-primary text-sm">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/journal")}>
                    <FlaskConical className="w-4 h-4 mr-2" />
                    My Journals
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/subscribe")}>
                    <Crown className="w-4 h-4 mr-2" />
                    Subscription
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="bg-accent/10 hover:bg-accent/20">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-accent/10">
              <div className="flex items-center gap-3 mb-8 mt-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-mycelium flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display text-lg font-semibold">The General Spore</span>
              </div>

              {/* User info in mobile menu */}
              {user && (
                <div className="mb-6 p-4 rounded-lg bg-card/50 border border-border/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{getUserDisplayName()}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start h-12 text-base ${
                        isActive(link.href) 
                          ? "bg-accent/15 text-accent border-l-2 border-accent" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      }`}
                    >
                      <link.icon className="w-5 h-5 mr-3" />
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <div className="border-t border-border/50 my-4" />
                
                {!user ? (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start h-12 text-base">
                        <LogIn className="w-5 h-5 mr-3" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full glow-purple h-12 text-base font-medium mt-2">
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get Started
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/subscribe" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start h-12 text-base text-spore-gold">
                        <Crown className="w-5 h-5 mr-3" />
                        Upgrade Plan
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-12 text-base text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sign Out
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
