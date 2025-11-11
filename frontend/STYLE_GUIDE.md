# Spaceborn Design System & Style Guide

## Brand Identity
**Spaceborn** represents advanced autonomous security technology, embodying protection, intelligence, and reliability in security solutions.

## Color Palette

### Primary Colors
- **Deep Space Black**: `#0f0f23` - Primary background, represents the void of space
- **Cosmic Purple**: `#8B5CF6` - Primary brand color, represents innovation and technology
- **Stellar Blue**: `#1E40AF` - Secondary brand color, represents intelligence and depth
- **Nebula Cyan**: `#0891B2` - Accent color, represents exploration and discovery
- **Aurora Pink**: `#EC4899` - Highlight color, represents energy and dynamism

### Neutral Colors
- **Pure White**: `#FFFFFF` - Primary text and highlights
- **Cosmic Gray**: `#9CA3AF` - Secondary text and subtle elements
- **Dark Matter**: `#1F2937` - Card backgrounds and containers

### Gradient Combinations
- **Primary Gradient**: `from-cosmic-purple to-cosmic-blue`
- **Secondary Gradient**: `from-cosmic-cyan to-cosmic-pink`
- **Background Gradient**: `from-slate-900 via-purple-900 to-slate-900`

## Typography

### Font Stack
- **Primary**: Geist Sans (Modern, clean, futuristic)
- **Monospace**: Geist Mono (Code and technical specifications)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

### Type Scale
- **Hero**: `text-5xl lg:text-7xl` (80px-112px) - Main headlines
- **Section Headers**: `text-4xl lg:text-6xl` (64px-96px) - Section titles
- **Subsection**: `text-3xl` (48px) - Subsection headers
- **Body Large**: `text-xl` (20px) - Important body text
- **Body**: `text-base` (16px) - Standard body text
- **Small**: `text-sm` (14px) - Captions and metadata

## Layout & Spacing

### Container Widths
- **Max Width**: `max-w-7xl` (1280px)
- **Content Width**: `max-w-4xl` (896px) for text-heavy sections
- **Form Width**: `max-w-2xl` (672px) for forms and narrow content

### Spacing Scale
- **Section Padding**: `py-20` (80px vertical)
- **Container Padding**: `px-4 sm:px-6 lg:px-8`
- **Component Spacing**: `space-y-6` to `space-y-12`
- **Grid Gaps**: `gap-6` to `gap-12`

## Component Patterns

### Cards
- **Background**: `bg-white/5 backdrop-blur-sm`
- **Border**: `border border-white/10`
- **Hover**: `hover:border-cosmic-purple/50`
- **Rounded**: `rounded-2xl`
- **Padding**: `p-6` to `p-8`

### Buttons
- **Primary**: Gradient background with hover scale effect
- **Secondary**: Outline style with cosmic colors
- **Sizes**: `size="sm"`, `size="lg"`
- **Animations**: `hover:scale-105` and `group-hover:translate-x-1`

### Navigation
- **Fixed**: `fixed top-0 w-full z-50`
- **Backdrop**: `bg-black/80 backdrop-blur-md` when scrolled
- **Transitions**: Smooth color and position transitions

## Animation Guidelines

### Timing Functions
- **Ease Out**: `ease-out` for entrances
- **Ease In Out**: `ease-in-out` for continuous animations
- **Duration**: `duration-300` for interactions, `duration-800` for page loads

### Animation Types
- **Float**: Subtle vertical movement for 3D elements
- **Pulse**: Breathing effect for status indicators
- **Scale**: Hover effects on interactive elements
- **Slide**: Page transitions and reveals
- **Rotate**: Continuous rotation for decorative elements

### Framer Motion Patterns
```jsx
// Page entrance
initial={{ opacity: 0, y: 50 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// Staggered children
transition={{ duration: 0.8, delay: index * 0.2 }}

// Hover interactions
whileHover={{ scale: 1.05, y: -5 }}
```

## Three.js Integration

### Scene Setup
- **Background**: Transparent to show CSS gradients
- **Lighting**: Ambient + point lights with cosmic colors
- **Camera**: Positioned for optimal model viewing
- **Controls**: OrbitControls with auto-rotation

### Material Guidelines
- **Metalness**: 0.7-0.9 for futuristic appearance
- **Roughness**: 0.1-0.4 for polished surfaces
- **Emissive**: Subtle glow effects with brand colors
- **Colors**: Match brand palette

## Responsive Design

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Grid Patterns
- **Mobile**: Single column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns

### Typography Scaling
- Mobile: Smaller font sizes with adjusted line heights
- Desktop: Full scale with optimal reading widths

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Interactive elements have sufficient contrast
- Focus states are clearly visible

### Motion
- Respects `prefers-reduced-motion`
- Essential animations only
- No flashing or strobing effects

### Navigation
- Keyboard accessible
- Screen reader friendly
- Semantic HTML structure

## Performance Guidelines

### Images
- WebP format preferred
- Lazy loading for below-fold content
- Responsive image sizing

### Animations
- GPU-accelerated transforms
- Minimal DOM manipulation
- Efficient Three.js rendering

### Code Splitting
- Component-level splitting
- Dynamic imports for heavy features
- Optimized bundle sizes

## Usage Examples

### Section Header Pattern
```jsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
  className="text-center mb-16"
>
  <h2 className="text-4xl lg:text-6xl font-bold mb-6">
    <span className="bg-linear-to-r from-cosmic-purple to-cosmic-cyan bg-clip-text text-transparent">
      Section Title
    </span>
  </h2>
</motion.div>
```

### Interactive Card Pattern
```jsx
<motion.div
  whileHover={{ scale: 1.05, y: -10 }}
  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cosmic-purple/50 transition-all duration-300"
>
  {/* Card content */}
</motion.div>
```

This style guide ensures consistency across the Spaceborn website while maintaining the futuristic, space-themed aesthetic that represents the brand's innovative approach to autonomous security drone technology.