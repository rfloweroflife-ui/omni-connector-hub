import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Sparkles
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Import product images
import goldenOysterImg from "@/assets/golden-oyster.jpg";
import lionsManeImg from "@/assets/lions-mane.jpg";
import agarPlatesImg from "@/assets/agar-plates.jpg";
import substrateBagImg from "@/assets/substrate-bag.jpg";
import grainSpawnImg from "@/assets/grain-spawn.jpg";
import stillAirBoxImg from "@/assets/still-air-box.jpg";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "spores", label: "Spore Syringes", icon: Leaf },
    { id: "agar", label: "Agar Supplies", icon: FlaskConical },
    { id: "substrates", label: "Substrates", icon: Box },
    { id: "equipment", label: "Equipment", icon: Package },
  ];

  const products = [
    {
      id: 1,
      name: "Golden Oyster Spore Syringe",
      description: "10ml sterile spore syringe for Pleurotus citrinopileatus cultivation. Vibrant yellow fruiting bodies.",
      price: 14.99,
      category: "spores",
      rating: 4.9,
      reviews: 127,
      inStock: true,
      badge: "Popular",
      image: goldenOysterImg,
    },
    {
      id: 2,
      name: "Lion's Mane Culture Syringe",
      description: "10ml liquid culture syringe for fast colonization of Hericium erinaceus. Brain-boosting medicinal.",
      price: 16.99,
      category: "spores",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      badge: "Best Seller",
      image: lionsManeImg,
    },
    {
      id: 3,
      name: "Pre-Poured Agar Plates (10 pack)",
      description: "MEA agar plates ready for inoculation. Sterile and antibiotic-free for clean transfers.",
      price: 24.99,
      category: "agar",
      rating: 4.7,
      reviews: 56,
      inStock: true,
      image: agarPlatesImg,
    },
    {
      id: 4,
      name: "CVG Substrate (5 lb bag)",
      description: "Pasteurized coco coir, vermiculite, and gypsum substrate blend. Perfect field capacity.",
      price: 18.99,
      category: "substrates",
      rating: 4.9,
      reviews: 203,
      inStock: true,
      image: substrateBagImg,
    },
    {
      id: 5,
      name: "Sterilized Grain Spawn Bag",
      description: "Ready-to-inoculate sterilized rye grain in filter patch bag. Fast colonization.",
      price: 12.99,
      category: "substrates",
      rating: 4.8,
      reviews: 145,
      inStock: true,
      badge: "New",
      image: grainSpawnImg,
    },
    {
      id: 6,
      name: "Still Air Box Kit",
      description: "Complete SAB kit with 66qt tote, arm holes, and sealing materials. Essential for sterile work.",
      price: 34.99,
      category: "equipment",
      rating: 4.6,
      reviews: 78,
      inStock: false,
      image: stillAirBoxImg,
    },
  ];

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <Card className="mystical-card overflow-hidden group hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20">
      <div className="h-56 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        {product.badge && (
          <Badge className="absolute top-4 right-4 bg-spore-gold text-spore-gold-foreground shadow-lg">
            <Sparkles className="w-3 h-3 mr-1" />
            {product.badge}
          </Badge>
        )}
        {!product.inStock && (
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
              {categories.find(c => c.id === product.category)?.label}
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
            <span className="text-sm ml-1 font-medium text-spore-gold">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-3xl font-display font-bold text-accent">${product.price}</span>
        </div>
        <Button 
          className={product.inStock ? "glow-purple" : ""} 
          disabled={!product.inStock}
          size="lg"
        >
          {product.inStock ? (
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
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-10">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts
                  .filter((p) => p.category === cat.id)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
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
