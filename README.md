# Gallery App

A modern, responsive gallery application built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🖼️ **Image Upload & Management** - Upload, organize, and manage your images
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔐 **Authentication** - Secure user authentication with Supabase
- 🎨 **Modern UI** - Beautiful, clean interface with Tailwind CSS
- ⚡ **Fast Performance** - Optimized with Next.js App Router
- 📦 **Type Safety** - Built with TypeScript for better development experience

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Backend**: Supabase (Database, Authentication, File Storage)
- **UI**: React with modern hooks and components
- **Styling**: Tailwind CSS with responsive design

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, pnpm, or bun
- Supabase account (for backend services)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. Set up your Supabase project:
   - Create a new project at [supabase.com](https://supabase.com)
   - Copy your project URL and anon key
   - Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                 # Utility functions and configurations
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## Development

The project uses:

- **App Router** - Next.js 13+ app directory structure
- **Server Components** - For better performance and SEO
- **TypeScript** - For type safety and better development experience
- **Tailwind CSS** - For utility-first styling
- **ESLint** - For code linting and formatting

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Supabase Documentation](https://supabase.com/docs) - learn about Supabase services
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS utilities
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - learn about TypeScript

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
