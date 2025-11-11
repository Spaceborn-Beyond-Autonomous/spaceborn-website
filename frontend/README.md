# Spaceborn - Security Redefined

🛡️ **Advanced autonomous security drones with AI-powered intelligence, protecting what matters most with precision and reliability.**

This is an immersive, galaxy-themed website for Spaceborn, a cutting-edge autonomous security drone company. Built with Next.js, Tailwind CSS, shadcn/ui, and Three.js for stunning 3D visuals and interactive experiences.

## ✨ Features

- **🌌 Galaxy Theme**: Immersive cosmic design with deep space aesthetics
- **🎯 Three.js Integration**: Interactive 3D drone models and galaxy background
- **⚡ Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **🎨 Modern UI**: shadcn/ui components with custom cosmic styling
- **🚀 Performance**: Optimized loading and rendering for smooth experience

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS with custom cosmic theme
- **UI Components**: shadcn/ui with Radix UI primitives
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion
- **Typography**: Geist Sans & Geist Mono fonts
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with cosmic theme
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── GalaxyBackground.tsx
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ProductsSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── lib/
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── STYLE_GUIDE.md        # Design system documentation
└── tailwind.config.ts    # Tailwind configuration
```

## 🎨 Design System

The website follows a comprehensive design system with:

- **Color Palette**: Cosmic purples, blues, cyans, and pinks
- **Typography**: Modern, clean fonts with proper hierarchy
- **Spacing**: Consistent spacing scale for layouts
- **Components**: Reusable UI patterns with cosmic styling
- **Animations**: Smooth, purposeful motion design

See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for detailed documentation.

## 🌟 Key Sections

### 🏠 Hero Section
- Interactive 3D security drone model
- Compelling security-focused tagline and value proposition
- Animated security feature highlights
- Smooth scroll indicator

### ℹ️ About Section
- Security mission and vision statements
- Core security technology features
- Animated security statistics
- Company security values and approach

### 🛸 Products Section
- Interactive 3D security drone models
- Detailed security specifications
- Security feature comparisons
- Security capabilities

### 📞 Contact Section
- Modern contact form
- Company information
- Security operations center theme
- Real-time security status indicators

## 🎯 Performance Optimizations

- **Code Splitting**: Component-level splitting for optimal loading
- **Image Optimization**: Next.js Image component with WebP support
- **3D Optimization**: Efficient Three.js rendering and memory management
- **Animation Performance**: GPU-accelerated transforms
- **Bundle Optimization**: Tree shaking and minimal dependencies

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure build settings**:
   - Build Command: `pnpm build`
   - Output Directory: `.next`
3. **Deploy** automatically on push to main branch

### Other Platforms

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🔧 Customization

### Colors
Update the cosmic color palette in `tailwind.config.ts`:

```typescript
colors: {
  cosmic: {
    purple: "#6B46C1",
    blue: "#1E40AF",
    cyan: "#0891B2",
    pink: "#EC4899",
  },
}
```

### 3D Models
Replace or modify 3D models in the respective section components:
- `HeroSection.tsx` - Main hero drone
- `ProductsSection.tsx` - Product showcase models

### Content
Update company information, product details, and contact information in the respective components.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Follow the style guide
5. Test thoroughly
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🌟 Acknowledgments

- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful UI components
- **Three.js** - 3D graphics library
- **Framer Motion** - Animation library
- **Vercel** - Deployment platform

---

**Built with ❤️ for the future of autonomous security** 🛡️✨
