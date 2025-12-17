# GitHub Pages Deployment Guide

This guide will help you deploy the SCCF website to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- The repository is already initialized and committed locally

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it `sccf_website` (or any name you prefer)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Navigate to your project directory
cd C:\Users\gauta\sccf_website

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/sccf_website.git

# Push your code to GitHub
git push -u origin main
```

**Note**: If you haven't set up GitHub authentication, you may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

## Step 4: Access Your Website

After enabling GitHub Pages:
- Your site will be available at: `https://YOUR_USERNAME.github.io/sccf_website/`
- It may take a few minutes for the site to be published
- You'll see a green checkmark when it's ready

## Updating Your Website

Whenever you make changes:

```bash
# Stage your changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

GitHub Pages will automatically rebuild your site with the new changes (usually within 1-2 minutes).

## Custom Domain (Optional)

If you have a custom domain (e.g., `suchitracancercare.org`):

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Follow GitHub's instructions to configure DNS records
4. GitHub will provide the DNS records you need to add

## Troubleshooting

### Site not loading?
- Wait 5-10 minutes after first deployment
- Check the **Actions** tab in your repository for build status
- Verify the branch is set to `main` in Pages settings

### Images not showing?
- Ensure image paths are relative (e.g., `logo.jpg` not `/logo.jpg`)
- Check that image files are committed to the repository

### Need help?
- Check [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review your repository's **Actions** tab for any errors

