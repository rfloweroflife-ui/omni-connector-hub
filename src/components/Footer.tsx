import { Link } from "react-router-dom";
import { Leaf, Mail, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const links = {
    platform: [
      { label: "AI Chat", href: "/chat" },
      { label: "Grow Journal", href: "/journal" },
      { label: "Learning Center", href: "/learn" },
      { label: "Community", href: "/community" },
    ],
    shop: [
      { label: "Spore Syringes", href: "/shop?category=spores" },
      { label: "Agar Supplies", href: "/shop?category=agar" },
      { label: "Substrates", href: "/shop?category=substrates" },
      { label: "Equipment", href: "/shop?category=equipment" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Refund Policy", href: "/refunds" },
    ],
  };

  return (
    <footer className="border-t border-border/40 bg-card/50">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-mycelium flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold">ADI~DAS</span>
                <span className="text-[8px] text-muted-foreground tracking-widest uppercase">All Day I Dream About Spores</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your complete mycology companion. Cultivate excellence with AI-powered guidance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="mailto:hello@thegeneralspore.com" className="text-muted-foreground hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {links.platform.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {links.shop.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ADI~DAS (All Day I Dream About Spores). All rights reserved.</p>
          <p className="mt-1">For microscopy and research purposes only.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
