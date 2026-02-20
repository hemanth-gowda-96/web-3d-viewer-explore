# Deploying to Cloudflare Pages

This guide outlines how to deploy the **Web 3D Viewer (Explore)** application to Cloudflare Pages.

## Prerequisites
- A Cloudflare account
- [Node.js](https://nodejs.org/) installed
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed globally (`npm install -g wrangler`) or available via `npx`
- Logged into Wrangler (`npx wrangler login`)

## 1. Project Configuration
Because this application is a React Single Page Application (SPA) using React Router, we need to ensure that Cloudflare routes all paths to the `index.html` file so that React Router can handle the client-side navigation (e.g., navigating to `/signin` or `/dashboard`).

This is automatically handled by the `public/_redirects` file which contains:
```text
/* /index.html 200
```
This file is copied to the `dist` folder during the build process.

## 2. Environment Variables
Before deploying or running the application, make sure your `.env.local` contains valid Supabase credentials:
```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

> **Note**: For production deployments on Cloudflare, you must add these environment variables directly in the Cloudflare Pages dashboard under **Settings > Environment variables**.

## 3. Building and Deploying
To manually deploy the application from your local machine, run the following command:

```bash
npm run build && npx wrangler pages deploy dist
```

1. Wrangler will ask if you want to create a new project or use an existing one. Select **Create a new project** (if this is the first deployment).
2. Enter the project name (e.g., `web-3d-viewer-explore`).
3. Production branch defaults are usually fine.
4. Wrangler will upload the `dist` folder and provide you with a live deployment URL (e.g., `https://...pages.dev`).

### Continuous Deployment (Git Integration)
Alternatively, you can connect your GitHub/GitLab repository directly in the Cloudflare dashboard:
1. Go to **Workers & Pages > Overview** and click **Create application**.
2. Select the **Pages** tab and click **Connect to Git**.
3. Select your repository.
4. Set the **Build command** to: `npm run build`
5. Set the **Build output directory** to: `dist`
6. Click **Save and Deploy**. 
7. _Don't forget to add your Supabase Environment Variables in the settings!_
