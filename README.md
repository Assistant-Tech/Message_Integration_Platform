# Message Integration Platform || Assistant Tech

This is a monorepo containing both the frontend and backend applications for the Message Integration project. The project is managed using [Turborepo](https://turbo.build/), allowing efficient development and shared package management.

## Project Structure

```
message-integration/
├── apps    // Main folder for projects
│   ├── backend  // Backend or server-side application
│   └── frontend  // Frontend or client-side application
└── packages  // Shared packages across client & server
    ├── eslint-config  // Shared ESLint configuration package
    └── shared-types   // Shared TypeScript types package
```

## Prerequisites

- Node.js version 20 or above (LTS version recommended)
- npm version 11.0 or above

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/message-integration.git
   cd message-integration
   ```

2. Install dependencies for the entire monorepo:
   ```bash
   npm install
   ```
   This will install dependencies for both frontend and backend applications.

## Development

The project uses npm workspaces and Turborepo to manage the monorepo structure. Each package (frontend and backend) can be developed independently or together.

## Running with Turborepo

Turborepo enables caching and parallel execution. Some useful commands:

- **Run all apps in parallel:**
  ```bash
  npm run dev
  ```
- **Build all apps:**
  ```bash
  npm run build
  ```
- **Lint all apps:**
  ```bash
  npm run lint
  ```

## Using Shared Packages

The `packages` directory contains shared configurations and utilities that can be used across the monorepo.

### **Shared ESLint Configuration**

The `eslint-config` package provides a unified ESLint configuration for both frontend and backend. To use it in any app, add the following to `.eslintrc.config.mjs`:

```javascript
import { config } from '@repo/eslint-config';

export default config;
```

### **Shared TypeScript Types**

The `shared-types` package contains TypeScript types shared across the frontend and backend. To use it:

- Import the package in your app:

  ```typescript
  import { SomeSharedType } from '@repo/shared-types';
  ```
