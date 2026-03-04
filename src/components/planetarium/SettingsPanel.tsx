import { X, RotateCcw } from 'lucide-react';
import { usePlanetariumStore } from '@/store/planetariumStore';
import { Slider } from '@/components/ui/slider';

const BG_COLOR_PRESETS = [
  { label: 'Black', value: '#000000' },
  { label: 'Dark Blue', value: '#0a0a2e' },
  { label: 'Dark Gray', value: '#1a1a1a' },
  { label: 'Navy', value: '#0d1b2a' },
  { label: 'Deep Purple', value: '#1a0a2e' },
];

export function SettingsPanel() {
  const showSettings = usePlanetariumStore((s) => s.showSettings);
  const toggleSettings = usePlanetariumStore((s) => s.toggleSettings);
  const distance = usePlanetariumStore((s) => s.distance);
  const screenSize = usePlanetariumStore((s) => s.screenSize);
  const screenHeight = usePlanetariumStore((s) => s.screenHeight);
  const curveAmount = usePlanetariumStore((s) => s.curveAmount);
  const bgColor = usePlanetariumStore((s) => s.bgColor);
  const stretchToFill = usePlanetariumStore((s) => s.stretchToFill);
  const setDistance = usePlanetariumStore((s) => s.setDistance);
  const setScreenSize = usePlanetariumStore((s) => s.setScreenSize);
  const setScreenHeight = usePlanetariumStore((s) => s.setScreenHeight);
  const setCurveAmount = usePlanetariumStore((s) => s.setCurveAmount);
  const setBgColor = usePlanetariumStore((s) => s.setBgColor);
  const setStretchToFill = usePlanetariumStore((s) => s.setStretchToFill);
  const resetSettings = usePlanetariumStore((s) => s.resetSettings);

  if (!showSettings) return null;

  return (
    <div className="absolute right-4 top-4 bottom-24 w-[280px] z-30 glass-panel glow-border-purple rounded-2xl flex flex-col overflow-hidden transition-all animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
        <h3 className="text-xs font-semibold font-mono tracking-[0.2em] uppercase text-accent">
          Projection Controls
        </h3>
        <button
          onClick={toggleSettings}
          className="p-1.5 rounded-lg hover:bg-secondary/60 transition-all text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Controls */}
      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
        {/* Dome Curvature */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-medium text-foreground/80">Dome Curvature</span>
            <span className="text-xs font-mono text-primary glow-text">{curveAmount}°</span>
          </div>
          <Slider value={[curveAmount]} onValueChange={([v]) => setCurveAmount(v)} min={60} max={360} step={5} />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>Flat</span><span>360°</span>
          </div>
        </div>

        {/* Screen Scale */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-medium text-foreground/80">Screen Scale</span>
            <span className="text-xs font-mono text-primary glow-text">{screenSize.toFixed(1)}x</span>
          </div>
          <Slider value={[screenSize]} onValueChange={([v]) => setScreenSize(v)} min={0.5} max={3} step={0.1} />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>0.5x</span><span>3.0x</span>
          </div>
        </div>

        {/* Screen Height */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-medium text-foreground/80">Screen Height</span>
            <span className="text-xs font-mono text-primary glow-text">{screenHeight.toFixed(1)}x</span>
          </div>
          <Slider value={[screenHeight]} onValueChange={([v]) => setScreenHeight(v)} min={0.5} max={4} step={0.1} />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>0.5x</span><span>4.0x</span>
          </div>

          {/* Stretch to fill checkbox */}
          <label className="flex items-center gap-2 cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={stretchToFill}
              onChange={(e) => setStretchToFill(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-border accent-primary cursor-pointer"
            />
            <span className="text-[11px] text-muted-foreground">Stretch image to fill height (distort)</span>
          </label>
        </div>

        {/* Background Color */}
        <div className="space-y-3">
          <span className="text-xs font-medium text-foreground/80">Background Color</span>
          <div className="flex items-center gap-2 flex-wrap">
            {BG_COLOR_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setBgColor(preset.value)}
                className={`w-7 h-7 rounded-lg border-2 transition-all ${
                  bgColor === preset.value
                    ? 'border-primary glow-border-cyan scale-110'
                    : 'border-border/50 hover:border-muted-foreground'
                }`}
                style={{ backgroundColor: preset.value }}
                title={preset.label}
              />
            ))}
            {/* Custom color picker */}
            <div className="relative">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="absolute inset-0 w-7 h-7 opacity-0 cursor-pointer"
              />
              <div
                className={`w-7 h-7 rounded-lg border-2 border-dashed border-muted-foreground/40 flex items-center justify-center text-muted-foreground text-[10px] cursor-pointer`}
              >
                +
              </div>
            </div>
          </div>
        </div>

        {/* Seat Distance */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-medium text-foreground/80">Seat Distance</span>
            <span className="text-xs font-mono text-primary glow-text">{distance.toFixed(1)}</span>
          </div>
          <Slider value={[distance]} onValueChange={([v]) => setDistance(v)} min={-5} max={5} step={0.1} />
          <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
            <span>Near</span><span>Far</span>
          </div>
        </div>
      </div>

      {/* Reset button */}
      <div className="px-5 py-4 border-t border-border/50">
        <button
          onClick={resetSettings}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary/60 hover:bg-secondary text-sm text-muted-foreground hover:text-foreground transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Standard Planetarium</span>
        </button>
      </div>
    </div>
  );
}
