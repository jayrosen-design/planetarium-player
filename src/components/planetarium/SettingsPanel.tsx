import { X } from 'lucide-react';
import { usePlanetariumStore } from '@/store/planetariumStore';
import { Slider } from '@/components/ui/slider';

export function SettingsPanel() {
  const showSettings = usePlanetariumStore((s) => s.showSettings);
  const toggleSettings = usePlanetariumStore((s) => s.toggleSettings);
  const distance = usePlanetariumStore((s) => s.distance);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);
  const setDistance = usePlanetariumStore((s) => s.setDistance);
  const setScreenSize = usePlanetariumStore((s) => s.setScreenSize);
  const setCurveAmount = usePlanetariumStore((s) => s.setCurveAmount);

  if (!showSettings) return null;

  return (
    <div className="absolute right-4 top-4 bottom-20 w-72 z-30 glass-panel glow-border rounded-xl flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-sm font-semibold font-mono tracking-wider uppercase text-primary glow-text">
          Settings
        </h3>
        <button onClick={toggleSettings} className="p-1 rounded hover:bg-secondary transition-colors text-muted-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Distance</span>
            <span className="text-primary">{distance.toFixed(1)}</span>
          </div>
          <Slider
            value={[distance]}
            onValueChange={([v]) => setDistance(v)}
            min={-5}
            max={5}
            step={0.1}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Screen Size</span>
            <span className="text-primary">{screenSize.toFixed(1)}x</span>
          </div>
          <Slider
            value={[screenSize]}
            onValueChange={([v]) => setScreenSize(v)}
            min={0.5}
            max={3}
            step={0.1}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-muted-foreground">Curve Amount</span>
            <span className="text-primary">{curveAmount}°</span>
          </div>
          <Slider
            value={[curveAmount]}
            onValueChange={([v]) => setCurveAmount(v)}
            min={60}
            max={360}
            step={5}
          />
        </div>
      </div>
    </div>
  );
}
