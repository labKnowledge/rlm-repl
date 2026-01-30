# RLM-REPL Documentation Website

This directory contains the Docusaurus documentation website for RLM-REPL.

## Development

```bash
cd website
npm install
npm start
```

This starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
cd website
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

### GitHub Pages

```bash
cd website
npm run deploy
```

This will build the site and deploy it to GitHub Pages. Make sure you have:

1. Set `baseUrl` in `docusaurus.config.ts` to match your repository name
2. Set `organizationName` and `projectName` correctly
3. Enabled GitHub Pages in your repository settings

### Other Hosting

After building (`npm run build`), copy the `build` directory to your hosting service.

## Documentation Structure

The documentation files are in `docs/` and are automatically synced from the main `docs/` directory in the repository root.
