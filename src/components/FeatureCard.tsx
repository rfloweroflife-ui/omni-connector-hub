import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  link: string;
}

const FeatureCard = ({ icon: Icon, title, description, badge, link }: FeatureCardProps) => {
  return (
    <Link to={link} className="group block">
      <Card className="mystical-card h-full transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/20 relative overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center group-hover:from-accent/40 group-hover:to-primary/30 transition-all duration-500 shadow-lg shadow-primary/20 group-hover:shadow-accent/30">
              <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-300" />
            </div>
            <Badge 
              variant="secondary" 
              className="text-xs bg-accent/10 text-accent border border-accent/20 group-hover:bg-accent/20 transition-colors"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {badge}
            </Badge>
          </div>
          <CardTitle className="font-display text-xl group-hover:text-accent transition-colors duration-300 tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </CardDescription>
          <div className="flex items-center text-sm font-medium text-accent/70 group-hover:text-accent transition-all duration-300">
            <span className="group-hover:mr-2 transition-all duration-300">Explore</span>
            <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </CardContent>
        
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </Link>
  );
};

export default FeatureCard;
