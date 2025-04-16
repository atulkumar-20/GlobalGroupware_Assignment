# React User Management System

A modern user management system built with React, TypeScript, and Vite. This application features a secure authentication system and user management interface with a kawaii-inspired design.

Live : https://globalgroupware-assignment.onrender.com

## Features

- 🔐 Secure Authentication System
- 👥 User Management Dashboard
- 🎨 Modern UI with Kawaii Design Elements
- 📱 Responsive Layout
- 🛡️ Protected Routes
- ✨ Form Validation
- 🔄 Real-time Data Updates

## Tech Stack

### Core
- React 19
- TypeScript
- Vite 6

### Styling & UI
- TailwindCSS 4
- Custom SVG Animations

### State Management & Routing
- React Router DOM 7
- React Context API

### Form Handling & Validation
- React Hook Form 7
- Zod 3
- @hookform/resolvers

### API Integration
- Axios

### Development Tools
- ESLint 9
- TypeScript ESLint
- React Refresh

## Prerequisites

- Node.js (version >=18.0.0)
- npm or yarn or pnpm

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-name]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory (if needed):
```env
VITE_API_URL=your_api_url_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React Context providers
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── utils/           # Helper functions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## Available Scripts

- `dev`: Start development server
- `build`: Build for production
- `preview`: Preview production build
- `lint`: Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| VITE_API_URL | API Base URL | Yes |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Reqres.in](https://reqres.in) for providing the test API
- Kawaii design inspiration
