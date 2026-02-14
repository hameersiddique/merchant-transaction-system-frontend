# Merchant Transaction System - Frontend

A Next.js app for merchants to manage their transactions. Built with React, TypeScript and Material-UI.

**Quick note**: I'm including the `.env` file in git for demo purposes. Obviously, don't do this in production! 

## Tech Stack
- Next.js 16.1.6
- TypeScript 5.x
- Material-UI v7.3.8
- Axios 1.13.5
- Tailwind CSS v4
- Docker

## Prerequisites
- Node.js v20+
- npm v9+
- Docker & Docker Compose (optional)
- Backend API running

## Quick Start
You can run this either locally with npm or using Docker. Pick whatever works for you.

### Option 1: Local with npm
# Clone and install
git clone <repository-url>
cd merchant-transaction-system-frontend
npm install
npm run dev


### Option 2: Docker
# Build and run
docker compose build --no-cache
docker compose up --build


Both options run on [http://localhost:3000](http://localhost:3000)

## Environment Variables
NODE_ENV=development
API_BASE_URL=http://localhost:3001


That's it. Docker-specific variables have defaults in docker-compose.yml.

## Project Structure
merchant-transaction-system-frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/           # Protected dashboard pages
│   │   │   ├── components/      # Dashboard-specific components
│   │   │   ├── services/        # Dashboard services
│   │   │   ├── types/           # TypeScript types
│   │   │   └── page.tsx         # Dashboard main page
│   │   ├── login/               # Login page and components
│   │   │   ├── components/
│   │   │   ├── types/
│   │   │   └── page.tsx
│   │   ├── register/            # Registration page
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── page.tsx
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   ├── components/              # Shared components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Pagination.tsx
│   ├── context/                 # React Context providers
│   │   └── AuthContext.tsx      # Authentication context
│   └── lib/                     # Utility libraries
│       ├── api/
│       │   ├── api.types.ts     # API type definitions
│       │   ├── client.ts        # Axios client setup
│       │   └── endpoints.ts     # API endpoint definitions
│       ├── constants/
│       │   ├── app.constants.ts
│       │   ├── index.ts
│       │   └── routes.constants.ts
│       ├── hooks/               # Custom React hooks
│       │   ├── index.ts
│       │   ├── usePagination.ts
│       │   └── useTransactions.ts
│       ├── utils/               # Utility functions
│       │   ├── formatters.ts
│       │   ├── index.ts
│       │   ├── jwt.ts
│       │   ├── storage.ts
│       │   └── validators.ts
│       ├── providers/
│       │   └── ThemeProvider.tsx
│       └── theme/
│           └── theme.ts          # MUI theme configuration
├── public/                       # Static assets
├── .env                          # Environment variables (create from .env.example)
├── .env.example                  # Environment variables template
├── docker-compose.yml            # Docker Compose configuration
├── Dockerfile                    # Docker container definition
├── next.config.ts                # Next.js configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file

## Features

**Authentication**
- Registration and login
- JWT-based auth
- Protected routes
- Auto logout on token expiry

**Dashboard**
- Transaction list with pagination (10/page)
- Create new transactions
- Currency selection (USD, EUR, KWD, etc.)
- Responsive design

**UX Stuff**
- Form validation
- Loading states
- Error notifications
- Mobile-friendly

## Decisions & Trade-offs

### Token Storage
Right now tokens are in localStorage and cookies. Yeah, I know localStorage isnt ideal for XSS protection but it works fine for this demo. In production, we would switch to httpOnly cookies only with a proper refresh token flow.

### No State Management Library
Using React Context instead of Redux because the app is small enough. If it grows, we would probably migrate to Redux Toolkit or Zustand.

### Client-side Validation Only
Frontend does basic validation but the backend is the source of truth. We're not using Zod or Yup yet to keep dependencies light.

### Material-UI
Went with MUI for speed. Its a bit heavy but gives us a professional look out of the box. For a production app with strict branding, we would probably build a custom component library.

### No Tests
Skipped tests to focus on functionality first. Not ideal but its a demo. Production would have Jest + React Testing Library + E2E tests.

## What I'd Do for Production

### Security
- Move tokens to httpOnly cookies exclusively
- Add refresh token rotation
- Implement CSRF protection
- Add rate limiting on login
- Set up proper CSP headers
- Regular dependency audits

### Performance
- Add Redis caching for transaction lists
- Implement React Query for better data fetching
- Code splitting with lazy loading
- CDN for static assets
- Optimize Material-UI bundle size

### Scale & Reliability
- Real-time updates via WebSocket
- Cursor-based pagination for large datasets
- Error tracking with Sentry
- Performance monitoring (Web Vitals)
- Proper logging (Winston or similar)
- CI/CD pipeline with automated tests

### Features
- Transaction filtering (date, amount, status)
- Bulk operations
- Export to CSV/PDF
- Analytics dashboard
- Email notifications
- Multi-language support (especially Arabic for Kuwait market)

### Infrastructure
- Kubernetes for auto-scaling
- Database read replicas
- Connection pooling
- Health checks and monitoring
- Proper secrets management

### Testing
- Unit tests (80%+ coverage)
- Integration tests for user flows
- E2E tests with Playwright
- Accessibility testing

### Compliance
- GDPR compliance (data export/deletion)
- Audit logging

## Running in Production

# Build
npm run build

# Start
npm start

# Or with Docker
NODE_ENV=production docker compose up --build


## Notes
This is a working prototype that demonstrates the core functionality. Its not production-ready as-is but shows the architecture and approach. The "Production Improvements" section above outlines what would need to happen before this handles real money and real users at scale.