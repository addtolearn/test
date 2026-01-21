import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChevronRight, Info, Share2, ExternalLink, AppWindow } from "lucide-react";
import appLogo from "@/assets/app-logo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleExploreApps = () => {
    window.open("https://mitradigital.in/apps", "_blank");
  };

  const handleShareApp = () => {
    const appUrl = "https://mitradigital.in/apps";
    if (navigator.share) {
      navigator.share({
        title: "Mitra Calculator",
        text: "Check out Mitra Calculator - Your trusted financial companion for everyday money calculations!",
        url: appUrl,
      });
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(appUrl);
      alert("App link copied to clipboard!");
    }
  };

  const settingsItems = [
    {
      icon: Info,
      label: "About Mitra Calculator",
      description: "Version 1.0.0",
      action: () => setAboutOpen(true),
    },
    {
      icon: AppWindow,
      label: "Explore Apps",
      description: "Discover more apps",
      action: handleExploreApps,
    },
    {
      icon: Share2,
      label: "Share App",
      description: "Recommend to friends",
      action: handleShareApp,
    },
  ];

  return (
    <AppLayout>
      <PageHeader title="Settings" />

      <div className="px-4 py-6 max-w-md mx-auto space-y-4">
        {settingsItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-xl shadow-card text-left hover:shadow-elevated transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          );
        })}

        <div className="pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for India
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © Mitra Digital
          </p>
        </div>
      </div>

      {/* About Dialog */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">About Mitra Calculator</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <img src={appLogo} alt="Mitra Calculator" className="w-20 h-20 mx-auto rounded-2xl" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mitra Calculator is your trusted financial companion designed to simplify everyday money calculations.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From EMI and SIP to investment and savings planning, Mitra Calculator helps you make smarter financial decisions with ease.
            </p>
            <p className="text-xs text-muted-foreground">
              Version 1.0.0
            </p>
            <Button
              onClick={() => window.open("https://mitradigital.in", "_blank")}
              className="w-full gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
