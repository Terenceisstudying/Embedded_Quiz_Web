# 🚀 Deploying to GitHub Pages

This guide will help you deploy your Embedded Systems Quiz app to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Your code already pushed to GitHub repository: `https://github.com/Terenceisstudying/Embedded_Quiz_Web.git`

## 🎯 Deployment Steps

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/Terenceisstudying/Embedded_Quiz_Web`
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"

### Step 2: Push Your Code

The GitHub Actions workflow is already set up! Just push your code:

```bash
git add .
git commit -m "Add anime theme and GitHub Pages deployment"
git push origin main
```

### Step 3: Wait for Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually takes 1-2 minutes)
4. Once complete, your site will be live! ✨

### Step 4: Access Your Live Site

Your quiz app will be available at:
```
https://terenceisstudying.github.io/Embedded_Quiz_Web/
```

## 🔄 Updating Your Site

Every time you push to the `main` branch, GitHub Actions will automatically:
1. Build your app
2. Deploy the latest version to GitHub Pages

So just commit and push your changes, and your live site updates automatically!

## 🎨 What's New - Anime Theme

Your quiz now features:
- ⚡ Vibrant anime-inspired color palette
- 💥 Manga-style title effects
- ✨ Floating particles background
- 🎯 Speed lines effect
- 🌈 Rainbow gradient borders
- 🚀 Smooth animations

## 📁 Project Structure

```
quiz-web-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment workflow
├── Question_Bank/
│   ├── Embedded_quiz_bank.md   # Source of truth for questions
│   ├── convert_quiz_bank.py    # Convert markdown to JSON
│   └── *.png                   # Question images
├── src/
│   ├── data/
│   │   └── quiz_data.json      # Generated quiz data
│   ├── components/             # React components
│   └── index.css               # Anime theme styling
└── vite.config.js              # GitHub Pages config
```

## 🛠️ Troubleshooting

### Site shows 404 error
- Make sure GitHub Pages is enabled in repository settings
- Check that the workflow completed successfully in Actions tab
- Verify the `base` path in `vite.config.js` matches your repo name

### CSS/Images not loading
- Ensure `base: '/Embedded_Quiz_Web/'` is set correctly in `vite.config.js`
- Clear browser cache and reload

### Deployment failed
- Check the Actions tab for error logs
- Ensure all dependencies are listed in `package.json`
- Make sure Node.js version matches in workflow (currently set to 20)

## 📝 Manual Deployment (Alternative Method)

If you prefer manual deployment:

```bash
# Build the app
npm run build

# Install gh-pages package (one-time)
npm install -D gh-pages

# Add deploy script to package.json
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## 🎓 Next Steps

1. **Update Quiz Questions**: Edit `Question_Bank/Embedded_quiz_bank.md`
2. **Regenerate Data**: Run `python Question_Bank/convert_quiz_bank.py`
3. **Push Changes**: `git add . && git commit -m "Update questions" && git push`
4. **Live in 2 minutes**: GitHub Actions handles the rest!

---

**Your App URL**: https://terenceisstudying.github.io/Embedded_Quiz_Web/

Happy quizzing! 🎉
