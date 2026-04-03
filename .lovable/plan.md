

## Particle Title Color Consistency

**Problem**: The particle title uses `hsl(210, 25%, 88%)` — a cool blue-gray — while the cosmic background theme uses cyan (`hsl(186, 76%, 52%)`) and purple (`hsl(260, 76%, 62%)`) as its glow colors. This creates a visual disconnect.

**Solution**: Update the particle color rendering to use the cosmic theme palette, blending between the cyan glow and purple secondary glow with subtle variation per particle.

### Changes — `src/components/ParticleTitle.tsx`

**Lines 160-169** — Replace the static blue-gray fill with cosmic-themed coloring:

- Each particle gets a hue that oscillates between the cosmic cyan (~186) and cosmic purple (~260) based on its `phase`, creating a gradient across the text
- Increase saturation from 25% to 60-75% to match the vibrant cosmic glow colors
- Keep lightness high (80-95%) for readability but add the cosmic tint
- Add a faint `shadowBlur` glow (2-3px) on particles to echo the `cosmic-glow` text-shadow effect from the CSS theme
- Result: the title shimmers between cyan and purple tones, perfectly matching the background's comet trails, neurons, and spiral elements

### Technical detail

```js
// Replace line 164-166:
const hue = 186 + Math.sin(p.phase) * 37; // oscillates 149–223, centered on cosmic cyan→purple
const sat = 65 + Math.sin(time * 0.8 + p.phase) * 10;
const lightness = 85 + Math.sin(time * 0.8 + p.phase) * 8;
ctx.fillStyle = `hsl(${hue}, ${sat}%, ${lightness}%)`;
ctx.shadowBlur = 3;
ctx.shadowColor = `hsl(${hue}, 76%, 52%)`;
```

Single file change, ~10 lines modified.

