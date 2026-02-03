import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  ShoppingBag, 
  Search,
  Filter,
  Star,
  ShoppingCart,
  Package,
  Leaf,
  FlaskConical,
  Box,
  Sparkles,
  BookOpen,
  AlertCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Import fallback images
import goldenOysterImg from "@/assets/golden-oyster.jpg";
import lionsManeImg from "@/assets/lions-mane.jpg";
import agarPlatesImg from "@/assets/agar-plates.jpg";
import substrateBagImg from "@/assets/substrate-bag.jpg";
import grainSpawnImg from "@/assets/grain-spawn.jpg";
import stillAirBoxImg from "@/assets/still-air-box.jpg";

// Map image paths to imported images
const imageMap: Record<string, string> = {
  "/src/assets/golden-oyster.jpg": goldenOysterImg,
  "/src/assets/lions-mane.jpg": lionsManeImg,
  "/src/assets/agar-plates.jpg": agarPlatesImg,
  "/src/assets/substrate-bag.jpg": substrateBagImg,
  "/src/assets/grain-spawn.jpg": grainSpawnImg,
  "/src/assets/still-air-box.jpg": stillAirBoxImg,
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  category: string;
  image_url: string | null;
  stock_quantity: number;
  is_active: boolean;
};

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  const categories = [
    { id: "spawn", label: "Spore Syringes", icon: Leaf },
    { id: "cultures", label: "Agar Supplies", icon: FlaskConical },
    { id: "substrate", label: "Substrates", icon: Box },
    { id: "equipment", label: "Equipment", icon: Package },
    { id: "books", label: "Books", icon: BookOpen },
  ];

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProductImage = (imageUrl: string | null) => {
    if (!imageUrl) return goldenOysterImg;
    return imageMap[imageUrl] || imageUrl;
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(c => c.id === category)?.label || category;
  };

  const ProductCard = ({ product }: { product: Product }) => {
    const inStock = product.stock_quantity > 0;
    const hasDiscount = product.sale_price && product.sale_price < product.price;
    
    return (
      <Card className="mystical-card overflow-hidden group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20">
        <div className="h-56 relative overflow-hidden">
          <img 
            src={getProductImage(product.image_url)} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          {hasDiscount && (
            <Badge className="absolute top-4 right-4 bg-spore-gold text-spore-gold-foreground shadow-lg">
              <Sparkles className="w-3 h-3 mr-1" />
              Sale
            </Badge>
          )}
          {product.stock_quantity > 0 && product.stock_quantity <= 10 && (
            <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground shadow-lg">
              Only {product.stock_quantity} left
            </Badge>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="outline" className="text-lg border-destructive text-destructive">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Badge variant="outline" className="text-xs mb-2 border-accent/30 text-accent">
                {getCategoryLabel(product.category)}
              </Badge>
              <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-1">
                {product.name}
              </CardTitle>
            </div>
          </div>
          <CardDescription className="line-clamp-2 text-muted-foreground/80">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-spore-gold/10 px-2 py-1 rounded-full">
              <Star className="w-4 h-4 text-spore-gold fill-spore-gold" />
              <span className="text-sm ml-1 font-medium text-spore-gold">4.8</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({Math.floor(Math.random() * 150 + 50)} reviews)
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Price</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-display font-bold text-accent">
                ${hasDiscount ? product.sale_price : product.price}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.price}
                </span>
              )}
            </div>
          </div>
          <Button 
            className={inStock ? "glow-purple" : ""} 
            disabled={!inStock}
            size="lg"
          >
            {inStock ? (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            ) : (
              "Notify Me"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const ProductSkeleton = () => (
    <Card className="mystical-card overflow-hidden">
      <Skeleton className="h-56 w-full" />
      <CardHeader className="pb-2">
        <Skeleton className="h-5 w-24 mb-2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent className="pb-2">
        <Skeleton className="h-6 w-32" />
      </CardContent>
      <CardFooter className="pt-4 border-t border-border/50">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32 ml-auto" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header with glass effect */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 border-accent/50 text-accent bg-accent/10 backdrop-blur-sm px-4 py-1.5">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Premium Supplies
          </Badge>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Cultivation <span className="gradient-text glow-text">Essentials</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Lab-tested spores, sterile supplies, and quality equipment for serious cultivators.
            Every product hand-selected by our expert team.
          </p>
          
          {/* Search with glass effect */}
          <div className="flex gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-input/50 border-border/50 backdrop-blur-sm text-lg focus:border-accent focus:ring-accent/20"
              />
            </div>
            <Button variant="outline" size="icon" className="h-14 w-14 border-border/50 bg-input/50 backdrop-blur-sm">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="glass-card p-8 text-center mb-12">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Failed to load products</h3>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
          </div>
        )}

        {/* Categories */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto p-2">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-6 py-3 rounded-full"
            >
              All Products
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat.id} 
                value={cat.id} 
                className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground px-6 py-3 rounded-full"
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Package className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your search.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-10">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => <ProductSkeleton key={i} />)
                ) : filteredProducts.filter((p) => p.category === cat.id).length > 0 ? (
                  filteredProducts
                    .filter((p) => p.category === cat.id)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <cat.icon className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No {cat.label.toLowerCase()} found</h3>
                    <p className="text-muted-foreground">Check back soon for new arrivals.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { icon: "🧫", title: "Lab Tested", desc: "Quality assured" },
            { icon: "📦", title: "Fast Shipping", desc: "2-3 day delivery" },
            { icon: "🔒", title: "Secure Checkout", desc: "SSL encrypted" },
            { icon: "💬", title: "Expert Support", desc: "24/7 AI chat" },
          ].map((item, i) => (
            <div key={i} className="glass-card p-6 text-center hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="font-medium text-foreground">{item.title}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
