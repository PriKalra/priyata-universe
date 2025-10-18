import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BuyMeACoffeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuyMeACoffeeModal = ({ isOpen, onClose }: BuyMeACoffeeModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200">
          <h3 className="text-2xl font-light text-zinc-900">Audio Posts & Updates</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-zinc-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="relative w-full" style={{ height: 'calc(90vh - 88px)' }}>
          <iframe
            src="https://buymeacoffee.com/priyata/posts"
            className="w-full h-full border-0"
            title="Buy Me a Coffee Posts"
          />
        </div>
      </div>
    </div>
  );
};
