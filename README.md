# Divergence Frontend

A Next.js frontend that fetches content from the Strapi CMS backend.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and update if needed:

```bash
cp .env.local.example .env.local
```

3. Make sure your Strapi backend is running on `http://localhost:1337`

4. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3001` (port 3001 to avoid conflicts with Strapi on 1337).

## Features

- **Home Page**: Displays all articles from Strapi
- **Article Pages**: Dynamic pages for individual articles
- **Authors Page**: Lists all authors
- **Categories Page**: Lists all categories
- **Responsive Design**: Works on desktop and mobile
- **Image Support**: Displays images from Strapi uploads

## API Integration

The frontend fetches data from these Strapi endpoints:

- `GET /api/articles` - Get all articles
- `GET /api/articles?filters[slug]={slug}` - Get article by slug
- `GET /api/authors` - Get all authors
- `GET /api/categories` - Get all categories

## Project Structure

```
├── components/          # Reusable React components
├── lib/                # API utilities and helpers
├── pages/              # Next.js pages (routing)
├── public/             # Static files
├── styles/             # CSS styles
└── types/              # TypeScript type definitions
```

## Deployment

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

## Development Notes

- The frontend runs on port 3001 to avoid conflicts with Strapi (1337)
- Images are fetched from Strapi's upload directory
- Static Site Generation (SSG) is used with revalidation for performance
- TypeScript is configured for type safety
# nextJS-frontend
