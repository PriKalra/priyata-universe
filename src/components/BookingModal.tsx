import { useState } from "react";
import { X, Coffee, Bitcoin, CreditCard, Calendar, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Package {
  name: string;
  price: string;
  priceNum: number;
  duration: string;
  description: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: Package | null;
}

const packages: Package[] = [
  {
    name: "Career Coffee Chat",
    price: "€20",
    priceNum: 20,
    duration: "30 min",
    description: "Quick career guidance session"
  },
  {
    name: "Technical Deep Dive",
    price: "€50",
    priceNum: 50,
    duration: "60 min",
    description: "In-depth technical mentoring"
  },
  {
    name: "Product Leadership",
    price: "€75",
    priceNum: 75,
    duration: "90 min",
    description: "Strategic product & leadership coaching"
  }
];

const BITCOIN_ADDRESS = "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq";
const BUYMEACOFFEE_URL = "https://buymeacoffee.com/priyata";
const CALENDLY_URL = "https://calendly.com/priyata"; // User can update this

export const BookingModal = ({ isOpen, onClose, selectedPackage }: BookingModalProps) => {
  const [step, setStep] = useState<'package' | 'payment'>('package');
  const [chosen, setChosen] = useState<Package | null>(selectedPackage || null);
  const { toast } = useToast();

  if (!isOpen) return null;

  const handlePackageSelect = (pkg: Package) => {
    setChosen(pkg);
    setStep('payment');
  };

  const handleBuyMeACoffee = () => {
    const coffeeCount = Math.ceil((chosen?.priceNum || 20) / 5);
    window.open(`${BUYMEACOFFEE_URL}?quantity=${coffeeCount}`, '_blank');
    toast({
      title: "Redirecting to Buy Me a Coffee",
      description: `After payment, email me to schedule your ${chosen?.name} session.`
    });
  };

  const handleBitcoin = () => {
    navigator.clipboard.writeText(BITCOIN_ADDRESS);
    toast({
      title: "Bitcoin address copied!",
      description: "Send the equivalent amount and email me your transaction ID to schedule."
    });
  };

  const handleCalendly = () => {
    window.open(CALENDLY_URL, '_blank');
  };

  const handleBack = () => {
    setStep('package');
  };

  const handleClose = () => {
    setStep('package');
    setChosen(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="bg-background border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {step === 'package' ? 'Book a Session' : 'Choose Payment Method'}
            </h3>
            {step === 'payment' && chosen && (
              <p className="text-sm text-muted-foreground mt-1">
                {chosen.name} • {chosen.price} • {chosen.duration}
              </p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'package' ? (
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm mb-4">
                Select a mentorship package to continue:
              </p>
              {packages.map((pkg) => (
                <button
                  key={pkg.name}
                  onClick={() => handlePackageSelect(pkg)}
                  className="w-full p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {pkg.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-primary">{pkg.price}</span>
                      <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Buy Me a Coffee */}
              <button
                onClick={handleBuyMeACoffee}
                className="w-full p-4 rounded-xl border border-border hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all text-left group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-yellow-500 transition-colors">
                    Buy Me a Coffee
                  </h4>
                  <p className="text-sm text-muted-foreground">Quick & easy payment</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Bitcoin */}
              <button
                onClick={handleBitcoin}
                className="w-full p-4 rounded-xl border border-border hover:border-orange-500/50 hover:bg-orange-500/5 transition-all text-left group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Bitcoin className="w-6 h-6 text-orange-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-orange-500 transition-colors">
                    Pay with Bitcoin
                  </h4>
                  <p className="text-sm text-muted-foreground">Copy address to send payment</p>
                </div>
                <span className="text-xs bg-muted px-2 py-1 rounded">Copy</span>
              </button>

              {/* Schedule First */}
              <button
                onClick={handleCalendly}
                className="w-full p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Schedule First, Pay Later
                  </h4>
                  <p className="text-sm text-muted-foreground">Book a time, then arrange payment</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Back button */}
              <div className="pt-4 border-t border-border mt-4">
                <Button variant="ghost" onClick={handleBack} className="w-full">
                  ← Choose a different package
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 pb-6">
          <p className="text-xs text-muted-foreground text-center">
            After payment, you'll receive a confirmation email with scheduling details.
          </p>
        </div>
      </div>
    </div>
  );
};
