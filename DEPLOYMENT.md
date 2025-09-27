# Vercel Deployment Guide - Aimers Foundation Website

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free tier available)
- Completed Google Sheets integration setup

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Prepare Your Repository
1. **Commit all changes** to your Git repository:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your Git provider (GitHub recommended)
3. Click **"New Project"**
4. **Import** your `aimers-foundations` repository
5. Configure project settings:
   - **Project Name**: `aimers-foundation`
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

### Step 3: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (usually 1-2 minutes)
3. Your site will be live at `https://aimers-foundation.vercel.app`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login and Deploy
```bash
vercel login
cd "d:\Aimers Foundation\aimers-foundations"
vercel
```

Follow the prompts:
- **Set up and deploy**: Yes
- **Which scope**: Your account
- **Link to existing project**: No
- **Project name**: aimers-foundation
- **Directory**: `./` (default)

## 🔧 Configuration Files Created

### 1. `.gitignore` (Updated)
- Added Vercel-specific exclusions
- Environment variables protection
- Build artifacts and cache directories
- Editor and OS files

### 2. `vercel.json` (New)
- Optimized routing for SPA (Single Page Application)
- Static asset caching (1 year for immutable assets)
- Security headers for production
- Clean URLs and trailing slash handling

## 🌍 Custom Domain Setup (Optional)

### Step 1: Add Domain in Vercel
1. Go to your project dashboard
2. Click **"Domains"** tab
3. Add your custom domain (e.g., `aimersfoundation.com`)

### Step 2: Configure DNS
Update your domain's DNS settings:
```
Type: CNAME
Name: www (or @)
Value: cname.vercel-dns.com
```

## 📊 Environment Variables (If Using Google Sheets)

If you're using sensitive configuration:

### Step 1: Add Environment Variables
1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add any sensitive variables:
   - `VITE_GOOGLE_SCRIPT_URL` (if you want to hide the Google Apps Script URL)

### Step 2: Update Code (Optional)
If using environment variables, update `src/services/googleSheets.js`:
```javascript
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'your-fallback-url';
```

## 🚀 Automatic Deployments

Vercel automatically deploys when you push to your repository:

### Production Deployments
- **Main/Master branch** → Production deployment
- Automatic HTTPS certificate
- Global CDN distribution

### Preview Deployments  
- **Other branches** → Preview deployments
- **Pull requests** → Preview deployments
- Perfect for testing changes

## 📈 Performance Optimizations

### Already Configured:
- ✅ **Static Asset Caching**: 1 year cache for CSS/JS/images
- ✅ **Gzip Compression**: Automatic compression
- ✅ **Global CDN**: Fast loading worldwide
- ✅ **HTTP/2**: Modern protocol support
- ✅ **Security Headers**: XSS and clickjacking protection

### Additional Optimizations:
- **Image Optimization**: Use Vercel's image optimization for future images
- **Analytics**: Enable Vercel Analytics for visitor insights
- **Speed Insights**: Monitor Core Web Vitals

## 🔍 Monitoring & Analytics

### Vercel Dashboard Features:
- **Deployment History**: Track all deployments
- **Build Logs**: Debug deployment issues
- **Function Logs**: Monitor serverless functions (if added)
- **Analytics**: Visitor statistics (paid feature)
- **Speed Insights**: Performance monitoring

### Integration with Google Sheets:
- Form submissions will continue to work
- Email notifications remain functional
- No additional configuration needed

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Build Errors
**Problem**: Deployment fails during build
**Solution**: 
```bash
# Test build locally first
npm run build
npm run preview
```

#### 2. Routing Issues
**Problem**: Direct URL access shows 404
**Solution**: `vercel.json` handles this (already configured)

#### 3. Environment Variables
**Problem**: Google Sheets integration not working
**Solution**: Verify Google Apps Script URL is correct

#### 4. Form Submissions
**Problem**: Contact form not submitting
**Solution**: 
- Check browser console for errors
- Verify Google Apps Script is deployed and accessible
- Test with simple form data first

### Debug Commands:
```bash
# Check build output
npm run build

# Preview production build locally
npm run preview

# Check for console errors
# Open browser dev tools → Console tab
```

## 📱 Mobile & Performance Testing

### Testing Checklist:
- [ ] **Mobile Responsive**: Test on various screen sizes
- [ ] **Form Functionality**: Test contact form submission
- [ ] **Page Load Speed**: Check with Google PageSpeed Insights
- [ ] **Cross-browser**: Test on Chrome, Firefox, Safari, Edge
- [ ] **Google Sheets**: Verify form data is saved correctly

### Performance Tools:
- **Google PageSpeed Insights**: https://pagespeed.web.dev
- **GTmetrix**: https://gtmetrix.com
- **WebPageTest**: https://webpagetest.org

## 🎯 Post-Deployment Checklist

### Immediate Tasks:
- [ ] **Test Website**: Verify all sections load correctly
- [ ] **Test Contact Form**: Submit a test form and check Google Sheets
- [ ] **Check Email Notifications**: Verify admin receives emails
- [ ] **Mobile Testing**: Test on actual mobile devices
- [ ] **Social Sharing**: Test Open Graph tags

### Optional Enhancements:
- [ ] **Custom Domain**: Set up professional domain name
- [ ] **Analytics**: Add Google Analytics or Vercel Analytics
- [ ] **SEO**: Submit to Google Search Console
- [ ] **Backup**: Export Google Sheets data regularly
- [ ] **Monitoring**: Set up uptime monitoring

## 🌟 Success!

Your Aimers Foundation website is now live on Vercel with:
- ⚡ **Lightning fast** global CDN delivery
- 🔒 **Secure HTTPS** with automatic certificates
- 📱 **Mobile optimized** responsive design
- 📊 **Google Sheets** integration for lead management
- 🚀 **Automatic deployments** from Git
- 💰 **Free hosting** on Vercel's generous free tier

### Your Live URLs:
- **Production**: `https://your-project-name.vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

---

**Need Help?**
- **Vercel Docs**: https://vercel.com/docs
- **Support**: foundationaimers@gmail.com
- **Technical Issues**: Check Vercel deployment logs

🎉 **Congratulations! Your professional education website is now live!** 🎉