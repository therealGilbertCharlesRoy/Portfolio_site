# Gilbert - Web Developer & 3D Creator Portfolio

A high-performance modern developer portfolio built with React 19, Vite, Tailwind CSS, and Framer Motion.

---

## Deploying to GitHub Pages

The application is pre-configured with `base: './'` in `vite.config.ts`, ensuring all scripts, styles, and assets resolve correctly under GitHub Pages subpaths.

### Option A: Using `gh-pages` (Simplest 1-Command Deploy)

1. Clone or pull this repository to your computer:
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   cd <YOUR-REPO-NAME>
   npm install
   ```

2. Run the deployment command:
   ```bash
   npm run deploy
   ```
   *This automatically builds the project (`dist/`) and pushes it directly to the `gh-pages` branch.*

3. On GitHub:
   - Go to your repository &rarr; **Settings** &rarr; **Pages**
   - Under **Build and deployment** &rarr; **Source**: Select **Deploy from a branch**
   - Branch: Select **`gh-pages`** / **`/ (root)`** &rarr; click **Save**.
   - Your site will be live at `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`!

---

### Option B: Automatic Deployment via GitHub Actions

If you want GitHub to automatically rebuild whenever you push to `main`:
1. In your GitHub repository, click **Add file** &rarr; **Create new file**.
2. Type file name: `.github/workflows/deploy.yml`
3. Paste the following configuration:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci || npm install
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - id: deployment
        uses: actions/deploy-pages@v4
```

4. Click **Commit changes**.
5. In **Settings** &rarr; **Pages**, change **Source** to **GitHub Actions**. Done!
