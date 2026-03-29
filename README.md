# WilkesLiberty Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15.1.2-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.3-38B2AC.svg)](https://tailwindcss.com/)

A modern, high-performance headless frontend for the WilkesLiberty business website, built with Next.js and integrated with a Drupal backend via GraphQL.

## 🚀 Overview

This application serves as the primary frontend interface for WilkesLiberty's digital presence, providing:

- **Headless Architecture**: Decoupled frontend consuming content from Drupal CMS
- **Modern Performance**: Built with Next.js 15 and React 19 for optimal speed
- **GraphQL Integration**: Efficient data fetching from Drupal backend
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Server-side rendering and meta optimization
- **Developer Experience**: TypeScript, ESLint, Prettier, and hot reloading

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.2 (App Router)
- **React**: 19.0.0
- **TypeScript**: 5.4.5
- **Styling**: Tailwind CSS 3.4.3 + Typography plugin
- **CMS Integration**: next-drupal 2.0.0-beta.1
- **Development**: Turbopack (enabled by default)
- **Linting**: ESLint + Prettier
- **Build Tool**: Next.js built-in bundler

## 📋 Prerequisites

- Node.js 18.17 or later (see `.nvmrc`)
- npm, yarn, or pnpm
- Access to WilkesLiberty Drupal backend
- Environment variables (see Configuration section)

## 🔧 Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd ui
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the required environment variables (see Configuration section below).

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Drupal Backend Configuration
NEXT_PUBLIC_DRUPAL_BASE_URL=https://your-drupal-site.com
NEXT_IMAGE_DOMAIN=your-drupal-site.com
DRUPAL_CLIENT_ID=your-client-id
DRUPAL_CLIENT_SECRET=your-client-secret

# Optional: Preview/Draft Mode
DRUPAL_PREVIEW_SECRET=your-preview-secret

# Development Settings
NODE_ENV=development
```

**⚠️ Security Note**: Never commit `.env.local` or any environment files containing secrets to version control.

### Drupal Integration

This frontend connects to a Drupal backend using:
- **GraphQL**: For content queries
- **JSON:API**: For content management
- **OAuth2**: For authentication

Ensure your Drupal instance has the following modules enabled:
- JSON:API
- GraphQL (if using GraphQL endpoints)
- Simple OAuth (for authentication)
- next-drupal module

## 🚀 Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Building
npm run build        # Create production build
npm run start        # Start production server
npm run preview      # Build and start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Development Best Practices

1. **Branch Strategy**: Create feature branches from `main`
2. **Code Review**: All changes require pull request approval
3. **Testing**: Run linting and formatting before commits
4. **Environment**: Use `.env.local` for local development settings

### File Structure

```
ui/
├── app/                    # Next.js App Router pages
│   ├── [...slug]/         # Dynamic catch-all routes
│   ├── api/               # API routes (draft, revalidate)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
├── styles/               # Global styles and Tailwind config
└── types/                # TypeScript type definitions
```

## 🌐 Deployment

### Production Deployment

1. **Environment Setup:**
   - Configure production environment variables
   - Ensure Drupal backend is accessible
   - Set up domain and SSL certificates

2. **Build and Deploy:**
   ```bash
   npm run build
   npm run start
   ```

3. **Recommended Platforms:**
   - **Vercel** (recommended for Next.js)
   - **Netlify**
   - **Custom server with PM2**

### Environment-Specific Configurations

- **Development**: Local development with hot reloading
- **Staging**: Pre-production testing environment
- **Production**: Live business website

## 🔐 Security Considerations

- **Environment Variables**: Never expose secrets in client-side code
- **CORS Configuration**: Ensure proper CORS settings on Drupal backend
- **Authentication**: Secure OAuth2 implementation for admin features
- **Content Security Policy**: Configure CSP headers for production

## 🤝 Contributing (Internal Team)

### Development Process

1. **Create Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Development:**
   - Make changes following coding standards
   - Test thoroughly in development environment
   - Run linting and formatting tools

3. **Code Review:**
   - Create pull request to `main` branch
   - Ensure all checks pass
   - Request review from team members
   - Address feedback and iterate

4. **Deployment:**
   - Merge approved PRs to `main`
   - Deploy to staging for final testing
   - Deploy to production after approval

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow Next.js recommended configuration
- **Prettier**: Consistent code formatting
- **Commit Messages**: Use conventional commit format

## 📚 Documentation

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **next-drupal Documentation**: [https://next-drupal.org](https://next-drupal.org)
- **Tailwind CSS Documentation**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Internal Wiki**: [Add internal documentation link]

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures:**
   - Check Node.js version compatibility
   - Ensure all environment variables are set
   - Clear `.next` cache: `rm -rf .next`

2. **Drupal Connection Issues:**
   - Verify backend URL and credentials
   - Check CORS configuration
   - Validate OAuth2 setup

3. **Development Server Issues:**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check port availability (default: 3000)
   - Verify environment variables

## 📞 Support

For internal support and questions:
- **Technical Issues**: Contact development team
- **Content Management**: Contact content administrators
- **Infrastructure**: Contact DevOps team

---

**WilkesLiberty Frontend** - Powering our digital presence with modern web technology.
# ui
