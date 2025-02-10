# Message Integration Monorepo

This is a monorepo containing both the frontend and backend applications for the Message Integration project.

## Project Structure

```
message-integration/
├── frontend/          # React-Router-V7 frontend application
└── backend/          # NestJS backend application
```

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

## Getting Started

1. Install dependencies:
   - cd into frontend and backend

```bash
npm install
```

This will install dependencies for both frontend and backend applications.

## Development

The project uses npm workspaces to manage the monorepo structure. Each package (frontend and backend) can be developed independently or together.

### Frontend

The frontend application is built with React and Vite. To work on the frontend:

```bash
cd frontend
npm run dev
```

### Backend

The backend application is built with NestJS. To work on the backend:

```bash
cd backend
npm run start:dev
```
