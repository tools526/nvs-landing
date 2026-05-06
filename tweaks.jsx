// Tweaks for NVS landing — accent color, background tone, density, dark mode
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#7C5CFF",
  "tone": "warm",
  "density": "compact",
  "dark": true,
  "italicAccent": true
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  '#D97757': { ink: '#B85A3B', soft: '#F2D4C2', tint: '#FBE9DD' },
  '#1F3A8A': { ink: '#152A66', soft: '#C8D2EC', tint: '#E0E7F7' },
  '#2D5F3F': { ink: '#1F4530', soft: '#C1D7C8', tint: '#DCE7DF' },
  '#7C5CFF': { ink: '#5A3FD9', soft: '#D6CCFA', tint: '#ECE6FF' },
  '#1A1A1A': { ink: '#000000', soft: '#CDCDCD', tint: '#E8E8E8' },
};

function NvsTweaks() {
  const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.density = t.density;
    root.dataset.tone = t.tone;
    root.dataset.theme = t.dark ? 'dark' : 'light';
    const preset = ACCENT_PRESETS[t.accent] || ACCENT_PRESETS['#D97757'];
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--accent-ink', preset.ink);
    root.style.setProperty('--accent-soft', preset.soft);
    root.style.setProperty('--accent-tint', preset.tint);
  }, [t]);

  return (
    <window.TweaksPanel title="Tweaks">
      <window.TweakSection title="Accent">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.keys(ACCENT_PRESETS).map(c => (
            <button
              key={c}
              onClick={() => setTweak('accent', c)}
              style={{
                width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
                background: c,
                border: t.accent === c ? '2px solid #fff' : '2px solid transparent',
                outline: t.accent === c ? '2px solid #1B1A17' : 'none',
              }}
              title={c}
            />
          ))}
        </div>
      </window.TweakSection>

      <window.TweakSection title="Background tone">
        <window.TweakRadio
          value={t.tone}
          onChange={v => setTweak('tone', v)}
          options={[
            { value: 'warm', label: 'Warm' },
            { value: 'cool', label: 'Cool' },
            { value: 'white', label: 'White' },
          ]}
        />
      </window.TweakSection>

      <window.TweakSection title="Density">
        <window.TweakRadio
          value={t.density}
          onChange={v => setTweak('density', v)}
          options={[
            { value: 'comfy', label: 'Comfy' },
            { value: 'compact', label: 'Compact' },
          ]}
        />
      </window.TweakSection>

      <window.TweakSection title="Theme">
        <window.TweakToggle
          checked={t.dark}
          onChange={v => setTweak('dark', v)}
          label="Dark mode"
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

window.NvsTweaks = NvsTweaks;
