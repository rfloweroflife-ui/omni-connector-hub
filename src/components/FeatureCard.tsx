import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
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
    <Link to={link} className="group">
      <Card className="mystical-card h-full transition-all duration-300 hover:border-accent/50 hover:scale-[1.02]">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            </div>
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          </div>
          <CardTitle className="font-display text-xl group-hover:text-accent transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-muted-foreground mb-4">
            {description}
          </CardDescription>
          <div className="flex items-center text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
            Explore
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FeatureCard;
