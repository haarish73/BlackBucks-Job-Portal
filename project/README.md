# MERN Job Portal

A full-stack job portal application built with MongoDB, Express.js, React, and Node.js.

## Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **Role-based Access**: Separate interfaces for employers and job seekers
- **Job Management**: Employers can post, edit, and delete job listings
- **Job Search**: Advanced search and filtering capabilities
- **Job Applications**: Job seekers can apply to jobs and track applications
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
   - Copy `backend/.env` and update the values:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A secure secret key for JWT tokens

### Running the Application

1. Start the backend server (runs on port 5000):
```bash
npm run backend
```

2. In a new terminal, start the frontend development server (runs on port 3000):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs (with search/filter)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (employers only)
- `PUT /api/jobs/:id` - Update job (job owner only)
- `DELETE /api/jobs/:id` - Delete job (job owner only)
- `POST /api/jobs/:id/apply` - Apply to job (job seekers only)
- `GET /api/jobs/my/posted` - Get user's posted jobs (employers)
- `GET /api/jobs/my/applications` - Get user's applications (job seekers)

## User Roles

### Employers
- Post job listings
- Manage posted jobs
- View applications for their jobs

### Job Seekers
- Search and filter jobs
- Apply to jobs
- Track application status

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CORS protection