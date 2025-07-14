# 🚀 Deployment Guide

This guide will help you deploy the Islamic Prayer Times App to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Project built and tested locally

## 🌐 GitHub Pages Deployment

### 1. Install gh-pages
```bash
npm install --save-dev gh-pages
```

### 2. Update vite.config.js
Add the base path for GitHub Pages:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/islamic-prayer-app/', // Replace with your repo name
})
```

### 3. Deploy
```bash
npm run deploy
```

Your app will be available at: `https://yourusername.github.io/islamic-prayer-app/`

## ▲ Vercel Deployment

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Deploy
```bash
vercel --prod
```

### 3. Configure Environment Variables (if needed)
- Go to Vercel dashboard
- Add environment variables for API keys
- Redeploy if needed

## 🌍 Netlify Deployment

### 1. Build the project
```bash
npm run build
```

### 2. Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### 3. Or use Netlify Drop
- Go to [netlify.com/drop](https://netlify.com/drop)
- Drag and drop the `dist` folder

## 🔧 Environment Variables

Create a `.env` file for production:
```env
VITE_PRAYER_API_URL=https://api.aladhan.com/v1
VITE_QURAN_API_URL=https://quranapi.pages.dev/api
VITE_LOCATION_API_URL=http://ip-api.com/json
```

## 🔄 Continuous Deployment

### GitHub Actions for GitHub Pages
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 📱 Mobile App (Optional)

### Using Capacitor
```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Initialize
npx cap init

# Add platforms
npx cap add ios
npx cap add android

# Build and sync
npm run build
npx cap sync
```

## 🔍 Performance Optimization

### 1. Enable Gzip Compression
Most hosting platforms enable this by default.

### 2. Optimize Images
- Use WebP format when possible
- Compress images before deployment

### 3. Code Splitting
Vite handles this automatically, but you can optimize further:
```javascript
// Lazy load components
const LazyComponent = lazy(() => import('./Component'))
```

## 🛡️ Security Considerations

### 1. API Keys
- Never commit API keys to the repository
- Use environment variables
- Rotate keys regularly

### 2. HTTPS
- Always use HTTPS in production
- Most hosting platforms provide this automatically

### 3. Content Security Policy
Add to your `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 📊 Analytics (Optional)

### Google Analytics
Add to `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔧 Troubleshooting

### Common Issues

1. **Blank page after deployment**
   - Check the base path in vite.config.js
   - Ensure all assets are loading correctly

2. **API CORS errors**
   - Use a proxy or CORS-enabled endpoints
   - Consider using serverless functions

3. **Large bundle size**
   - Enable tree shaking
   - Use dynamic imports for large libraries

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run lint
```

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Test the build locally first: `npm run build && npm run preview`
4. Open an issue on GitHub with error details

---

**Happy Deploying!** 🚀

