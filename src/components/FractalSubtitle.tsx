import { Sparkles } from "lucide-react";

export const FractalSubtitle = () => {
  return (
    <div className="fractal-input-container">
      <div className="fractal-shadow" />
      <div className="fractal-content">
        <Sparkles className="h-5 w-5 text-purple-600" />
        <span className="fractal-text">
          Poet • Scientist • Explorer of In-Betweens
        </span>
      </div>
    </div>
  );
};
