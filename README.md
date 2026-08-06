# 🚀 TaskFlow Pro - Modern Real-Time Task Management Web Application

TaskFlow Pro is a production-ready, full-stack task management web application built with **React 18**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. It features a modern **Glassmorphic UI design**, instant multi-device real-time updates, dark/light theme toggle, JWT authentication, task statistics dashboard, and rich filtering capabilities.

---

## 🌟 Key Features

### 1. 🔐 Authentication & Authorization
- User Registration & Login with form validation
- JWT (JSON Web Token) authentication with Bearer token headers
- Password hashing using `bcryptjs`
- Protected Routes preventing unauthorized view access
- Auto-logout mechanism on token expiration or invalidity

### 2. 📊 Interactive Dashboard & Statistics
- Dynamic welcome banner with personalized user name
- Stat cards displaying **Total Tasks**, **Pending Tasks**, **Completed Tasks**, and **Today's Tasks**
- Success rate percentages & recent activity timeline

### 3. 📝 Complete Task CRUD Operations
- **Create, Edit, Delete, & View** full task details
- One-click task status toggle (**Pending** ↔ **Completed**)
- Fields: Title, Description, Priority (Low, Medium, High), Status (Pending, In Progress, Completed), Due Date, Category, Created/Updated dates
- Delete safety confirmation modal

### 4. 🔍 Search, Filter & Sort
- Live search by title or description keywords
- Filter by **Status** (Pending, In Progress, Completed)
- Filter by **Priority** (Low, Medium, High)
- Filter by **Category** (Work, Personal, Urgent, Ideas, General, Education, Finance)
- Sort by **Due Date**, **Latest**, or **Oldest**
- Pagination support for large datasets

### 5. ⚡ Real-Time Socket.IO Synchronization
- Live synchronization across all open tabs and sessions
- Real-time event notifications (`task:created`, `task:updated`, `task:deleted`) using React Hot Toast
- Instant UI state reflection without needing page refreshes

### 6. 🎨 Premium Modern UI / UX
- **Glassmorphism Design System** with backdrop blurs and subtle borders
- Light & Dark Mode toggle with persistent local preferences
- Collapsible sidebar with mobile-friendly drawer navigation
- Skeleton loading states, empty states, and responsive layout across Desktop, Tablet, & Mobile

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (Glassmorphism & Dark Mode)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM v6
- **Real-Time Client**: Socket.IO Client
- **HTTP Client**: Axios (with Request & Response Interceptors)

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB + Mongoose (Includes automatic fallback to `mongodb-memory-server` if local MongoDB is not running!)
- **Authentication**: JWT + Bcryptjs
- **Real-Time Engine**: Socket.IO Server
- **CORS & Utilities**: CORS, Dotenv, Nodemon

---

## 📁 Project Directory Structure

```
intenship set 2/
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, Sidebar, StatCard, TaskCard, TaskModal, etc.)
│   │   ├── pages/            # Page views (Dashboard, Tasks, Login, Register, Profile, NotFound)
│   │   ├── context/          # Context Providers (AuthContext, TaskContext, SocketContext, ThemeContext)
│   │   ├── services/         # Axios API & Socket.IO client services
│   │   ├── hooks/            # Custom React hooks (useAuth, useTasks, useTheme)
│   │   ├── utils/            # Date formatting and helper utilities
│   │   ├── App.jsx           # Main routing & layout component
│   │   ├── main.jsx          # Vite React entry point
│   │   └── index.css         # Global CSS with Glassmorphism styles & Tailwind imports
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/
│   ├── config/               # Database connection setup (Mongoose + Memory Server fallback)
│   ├── controllers/          # Business logic handlers (authController, taskController)
│   ├── middleware/           # JWT auth protection & error handler middleware
│   ├── models/               # Mongoose schemas (User, Task)
│   ├── routes/               # Express API endpoints (authRoutes, taskRoutes)
│   ├── socket/               # Socket.IO connection & room handler
│   ├── utils/                # Token generation utilities
│   ├── server.js             # Main server bootstrap
│   └── package.json
│
└── README.md
```

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

---

### Step 1: Set up Backend (`server`)

1. Open terminal in the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables (Optional):
   A default `.env` file is already created. You can verify settings in `.env.example`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/taskmanager
   JWT_SECRET=supersecretjwtkey_taskmanager_2026
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```
   *Note: If local MongoDB is not running, the server automatically starts an in-memory MongoDB server so you can test immediately!*

4. Start the backend development server:
   ```bash
   npm run dev
   # Server will run on http://localhost:5000
   ```

---

### Step 2: Set up Frontend (`client`)

1. Open a new terminal in the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   # App will open at http://localhost:5173
   ```

---

## 🔌 API Endpoints Summary

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Login user & return JWT token | Public |
| `GET` | `/api/auth/profile` | Get logged-in user profile | Protected |

### Task Management Routes (`/api/tasks`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/tasks` | Get tasks with search, filter, sort & pagination | Protected |
| `GET` | `/api/tasks/:id` | Get single task details | Protected |
| `POST` | `/api/tasks` | Create a new task | Protected |
| `PUT` | `/api/tasks/:id` | Update existing task details | Protected |
| `PATCH` | `/api/tasks/:id/status` | Toggle/Update task status | Protected |
| `DELETE` | `/api/tasks/:id` | Delete a task | Protected |

---

## 🎨 Design & Theme Customization
- **Theme Switcher**: Click the Moon/Sun icon in the top Navbar to toggle between Light and Dark mode.
- **Responsive Navigation**: On mobile screens, tap the hamburger menu icon to toggle the slide-in glass drawer navigation.

---

## 🤝 Verification & Testing
1. Register a new user or use the **"Quick Fill Demo Credentials"** button on the login screen.
2. Open two browser tabs or windows side-by-side.
3. Create, update, or delete a task in one window and observe instant real-time synchronization in the other window via Socket.IO!
