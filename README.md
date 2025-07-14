# 🕌 Islamic Prayer Times & Quran - Modern Glassmorphism UI

A stunning, modern web application that displays Islamic prayer times and daily Quranic verses with a next-level glassmorphism design. Built with React, featuring animated gradients, floating particles, and smooth transitions.

![Islamic Prayer Times App](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11.x-0055FF?style=for-the-badge&logo=framer)

## ✨ Features

### 🎨 Next-Level Design
- **Glassmorphism UI** - Modern glass-like transparent effects with backdrop blur
- **Gradient Animations** - Beautiful animated gradient backgrounds and text
- **Floating Particles** - Dynamic particle animations in the background
- **Smooth Transitions** - Buttery smooth animations using Framer Motion
- **Responsive Design** - Perfect on desktop, tablet, and mobile devices

### 🕌 Islamic Features
- **Prayer Times** - Displays all 5 daily prayers with beautiful icons
- **Location Detection** - Automatic location detection for accurate prayer times
- **Quranic Verses** - Daily random verses with multiple language support
- **Audio Recitation** - Play Quranic verse audio recitations
- **Multi-language Support** - English, Arabic, Bengali, and Urdu translations

### 🎯 Technical Features
- **Modern React 18** with hooks and functional components
- **TypeScript-ready** architecture
- **Vite** for lightning-fast development
- **TailwindCSS** for utility-first styling
- **Framer Motion** for advanced animations
- **TSParticles** for particle effects
- **Responsive Grid Layout** with CSS Grid and Flexbox
- **Islamic Color Palette** with gold, blue, and green themes

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zayeefzahid/islamic-prayer-app.git
   cd islamic-prayer-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
islamic-prayer-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   └── ParticleBackground.jsx
│   ├── assets/            # Images and static files
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles and animations
│   ├── index.css          # Base styles
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
└── README.md              # This file
```

## 🎨 Design System

### Color Palette
- **Primary Gold**: `#d4af37` - Islamic gold for highlights
- **Ocean Blue**: `#0f4c75` - Deep blue for backgrounds
- **Sky Blue**: `#3282b8` - Medium blue for gradients
- **Light Blue**: `#bbe1fa` - Light blue for accents
- **Emerald**: `#00b894` - Green for success states

### Typography
- **Headings**: Bold, gradient text with golden colors
- **Body**: Clean, readable white text on glass backgrounds
- **Arabic Text**: Larger font size with right-to-left alignment
- **Times**: Monospace font for prayer times

### Animations
- **Gradient Shift**: 3s infinite background animation
- **Float**: 6s vertical floating animation
- **Pulse Glow**: 2s glowing effect for important elements
- **Framer Motion**: Smooth enter/exit transitions

## 🔧 Configuration

### API Integration
The app currently uses mock data for development. To integrate with real APIs:

1. **Replace mock data** in `App.jsx` with actual API calls
2. **Configure CORS** for cross-origin requests
3. **Add error handling** for network failures
4. **Implement caching** for better performance

### Environment Variables
Create a `.env` file for API configuration:
```env
VITE_PRAYER_API_URL=your_prayer_api_url
VITE_QURAN_API_URL=your_quran_api_url
VITE_LOCATION_API_URL=your_location_api_url
```

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

The app uses TailwindCSS responsive utilities:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large screens (1280px+)

## 🚀 Deployment

### Build for Production
```bash
pnpm run build
# or
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy to Netlify
```bash
# Build the project
pnpm run build

# Deploy dist folder to Netlify
```

### Deploy to GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## 🛠️ Development

### Available Scripts
- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

### Adding New Features
1. Create components in `src/components/`
2. Add styles to `src/App.css`
3. Use Framer Motion for animations
4. Follow the glassmorphism design pattern

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Islamic APIs** for prayer times and Quranic data
- **Framer Motion** for smooth animations
- **TailwindCSS** for utility-first styling
- **TSParticles** for particle effects
- **shadcn/ui** for beautiful UI components

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the maintainers
- Check the documentation

---

**May Allah bless your prayers and guide your path** 🤲

Built with ❤️ for the Muslim community

