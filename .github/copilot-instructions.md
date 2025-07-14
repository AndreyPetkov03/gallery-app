# Copilot Instructions for Gallery Project

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern gallery application built with:
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling
- **Supabase** for backend (database and file storage)
- **React** for UI components

## Architecture Guidelines
- Use App Router patterns (app directory structure)
- Implement server components where possible for better performance
- Use TypeScript for type safety
- Follow Tailwind CSS utility-first approach
- Implement responsive design patterns
- Use Supabase for authentication, database, and file storage

## Code Style
- Use functional components with hooks
- Prefer server components over client components when possible
- Use proper TypeScript interfaces and types
- Follow Next.js best practices for SEO and performance
- Use Tailwind classes for styling instead of custom CSS
- Implement proper error handling and loading states

## Gallery Features
- Image upload and management
- Gallery grid display with responsive design
- Image viewing with modal/lightbox
- User authentication with Supabase
- Image metadata storage
- Optimized image loading with Next.js Image component
