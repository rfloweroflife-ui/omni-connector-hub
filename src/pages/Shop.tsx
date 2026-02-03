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
  Box
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
      description: "10ml sterile spore syringe for Pleurotus citrinopileatus cultivation.",
      price: 14.99,
      category: "spores",
      rating: 4.9,
      reviews: 127,
      inStock: true,
      badge: "Popular",
    },
    {
      id: 2,
      name: "Lion's Mane Culture Syringe",
      description: "10ml liquid culture syringe for fast colonization of Hericium erinaceus.",
      price: 16.99,
      category: "spores",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Pre-Poured Agar Plates (10 pack)",
      description: "MEA agar plates ready for inoculation. Sterile and antibiotic-free.",
      price: 24.99,
      category: "agar",
      rating: 4.7,
      reviews: 56,
      inStock: true,
    },
    {
      id: 4,
      name: "CVG Substrate (5 lb bag)",
      description: "Pasteurized coco coir, vermiculite, and gypsum substrate blend.",
      price: 18.99,
      category: "substrates",
      rating: 4.9,
      reviews: 203,
      inStock: true,
    },
    {
      id: 5,
      name: "Sterilized Grain Spawn Bag",
      description: "Ready-to-inoculate sterilized rye grain in filter patch bag.",
      price: 12.99,
      category: "substrates",
      rating: 4.8,
      reviews: 145,
      inStock: true,
      badge: "New",
    },
    {
      id: 6,
      name: "Still Air Box Kit",
      description: "Complete SAB kit with 66qt tote, arm holes, and sealing materials.",
      price: 34.99,
      category: "equipment",
      rating: 4.6,
      reviews: 78,
      inStock: false,
    },
  ];

  const filteredProducts = products.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-accent/50 text-accent">
            <ShoppingBag className="w-3 h-3 mr-1" />
            Premium Supplies
          </Badge>
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            Cultivation <span className="gradient-text">Essentials</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Lab-tested spores, sterile supplies, and quality equipment for serious cultivators.
          </p>
          
          {/* Search */}
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input/50 border-border/50"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="flex flex-wrap justify-center">
            <TabsTrigger value="all">All Products</TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="gap-2">
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="mystical-card overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-mycelium/20 relative flex items-center justify-center">
                    <Leaf className="w-16 h-16 text-accent/50" />
                    {product.badge && (
                      <Badge className="absolute top-3 right-3 bg-spore-gold text-spore-gold-foreground">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {categories.find(c => c.id === product.category)?.label}
                        </Badge>
                        <CardTitle className="text-lg group-hover:text-accent transition-colors">
                          {product.name}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-spore-gold fill-spore-gold" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-2xl font-display font-bold">${product.price}</span>
                    <Button 
                      className={product.inStock ? "glow-purple" : ""} 
                      disabled={!product.inStock}
                    >
                      {product.inStock ? (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      ) : (
                        "Out of Stock"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts
                  .filter((p) => p.category === cat.id)
                  .map((product) => (
                    <Card key={product.id} className="mystical-card overflow-hidden group">
                      <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-mycelium/20 relative flex items-center justify-center">
                        <Leaf className="w-16 h-16 text-accent/50" />
                        {product.badge && (
                          <Badge className="absolute top-3 right-3 bg-spore-gold text-spore-gold-foreground">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg group-hover:text-accent transition-colors">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-spore-gold fill-spore-gold" />
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-2xl font-display font-bold">${product.price}</span>
                        <Button disabled={!product.inStock}>
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
