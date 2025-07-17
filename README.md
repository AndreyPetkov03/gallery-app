# Gallery App

A modern, full-stack gallery application built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. This project demonstrates modern web development practices with a focus on performance, security, and user experience.

## 🚀 Features

### Core Functionality
- 🖼️ **Image Upload & Management** - Drag-and-drop image upload with real-time progress tracking
- � **Community Gallery** - Explore and discover images from other users
- 🔐 **Secure Authentication** - Email/password authentication with Supabase Auth
- 👤 **User Profiles** - Personalized user profiles with auto-generated gradient avatars
- 📱 **Responsive Design** - Fully responsive design that works on all devices
- 🎨 **Modern UI** - Clean, professional interface with dark theme

### Technical Features
- ⚡ **Next.js 15 App Router** - Latest Next.js features with optimal performance
- 🛡️ **Row Level Security** - Database-level security with PostgreSQL RLS
- 🖼️ **Image Optimization** - Automatic image compression and optimization
- 📦 **Type Safety** - Full TypeScript implementation with strict type checking
- 🔄 **Real-time Updates** - Live data synchronization with Supabase Realtime
- 🎯 **SEO Optimized** - Server-side rendering and meta tag optimization

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router and Server Components
- **TypeScript** - Static type checking and enhanced development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React 18** - Latest React features including Suspense and Server Components

### Backend
- **Supabase** - Complete backend-as-a-service solution
  - **PostgreSQL Database** - Robust relational database with advanced features
  - **Supabase Auth** - Authentication and user management
  - **Supabase Storage** - File storage with automatic optimization
  - **Row Level Security** - Database-level security policies
  - **Realtime** - Live data synchronization capabilities

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Git** - Version control with GitHub integration

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js 18.0.0 or higher** - [Download here](https://nodejs.org/)
- **npm, yarn, pnpm, or bun** - Package manager of your choice
- **Supabase account** - [Create account](https://supabase.com)
- **Git** - For version control

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/AndreyPetkov03/gallery-app.git
cd gallery-app
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up Supabase:**
   
   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to Settings → API to find your project URL and anon key
   
   c. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. **Set up the database:**
   
   Execute the SQL setup script in your Supabase dashboard:
   - Go to SQL Editor in your Supabase dashboard
   - Run the contents of `supabase-setup.sql`

5. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. **Open your browser:**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📁 Project Structure

```
gallery/
├── public/                 # Static assets
│   ├── Gallery Logo.svg   # Application logo
│   └── *.svg              # Other icons and images
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── favicon.ico    # App favicon
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable React components
│   │   ├── AuthenticatedApp.tsx    # Main authenticated app wrapper
│   │   ├── AuthForm.tsx            # Authentication form
│   │   ├── AuthProvider.tsx        # Auth context provider
│   │   ├── GradientBackground.tsx  # Gradient background component
│   │   ├── ImageGallery.tsx        # Personal image gallery
│   │   ├── ImageUpload.tsx         # Image upload functionality
│   │   ├── LoadingSpinner.tsx      # Loading indicator
│   │   ├── SharedGallery.tsx       # Community gallery
│   │   ├── UploadModal.tsx         # Upload modal dialog
│   │   ├── UserAvatar.tsx          # User avatar component
│   │   ├── UserDashboard.tsx       # Main dashboard
│   │   └── UserProfileModal.tsx    # User profile modal
│   ├── lib/               # Utility functions and configurations
│   │   └── supabase.ts    # Supabase client configuration
│   └── types/             # TypeScript type definitions
│       └── index.ts       # Main type definitions
├── .env.local             # Environment variables (create this)
├── .gitignore             # Git ignore rules
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── supabase-setup.sql     # Database setup script
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

### Architecture Overview

The application follows modern React and Next.js patterns:

- **App Router**: Uses Next.js 13+ app directory structure
- **Server Components**: Leverages server-side rendering for better performance
- **Component Architecture**: Modular, reusable components with clear separation of concerns
- **Type Safety**: Comprehensive TypeScript implementation
- **State Management**: React Context for global state, local state for components
- **Authentication**: Supabase Auth with secure JWT tokens
- **Database**: PostgreSQL with Row Level Security policies
- **File Storage**: Supabase Storage with automatic optimization

### Key Features Implementation

#### Authentication System
- Email/password authentication with Supabase Auth
- Automatic profile creation with database triggers
- JWT token management with automatic refresh
- Protected routes and API endpoints

#### Image Management
- Drag-and-drop upload with progress tracking
- Automatic image optimization and compression
- Secure file storage with Supabase Storage
- Image metadata stored in PostgreSQL

#### User Experience
- Responsive design with Tailwind CSS
- Dark theme with modern aesthetics
- Loading states and error handling
- Accessibility features (ARIA labels, keyboard navigation)

## 🛡️ Security

The application implements multiple layers of security:

- **Row Level Security (RLS)** - Database-level access control
- **JWT Authentication** - Secure token-based authentication
- **Input Validation** - Client and server-side validation
- **HTTPS Enforcement** - Secure data transmission
- **Environment Variables** - Secure configuration management

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. **Push your code to GitHub**
2. **Connect your GitHub repository to Vercel**
3. **Add environment variables in Vercel dashboard:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy automatically with each push**

### Alternative Deployment Options

- **Netlify** - Great for static sites with serverless functions
- **AWS Amplify** - Full-stack deployment with AWS integration
- **Digital Ocean App Platform** - Simple container-based deployment
- **Railway** - Developer-friendly deployment platform

### Production Considerations

- Configure proper domain and SSL certificates
- Set up monitoring and error tracking
- Configure backup strategies for your Supabase database
- Implement proper logging and analytics

## 📚 Learn More

### Documentation
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Supabase Documentation](https://supabase.com/docs) - Learn about Supabase services
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS utilities
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - Learn about TypeScript

### Related Resources
- [React Documentation](https://react.dev) - Learn React fundamentals
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Learn about PostgreSQL
- [Vercel Documentation](https://vercel.com/docs) - Learn about deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Andrey Petkov**
- GitHub: [@AndreyPetkov03](https://github.com/AndreyPetkov03)
- Email: andrey.petkov@example.com

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing React framework
- [Supabase Team](https://supabase.com/) for the excellent backend-as-a-service
- [Tailwind CSS Team](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel Team](https://vercel.com/) for the seamless deployment platform

---

**Built with ❤️ using modern web technologies**
