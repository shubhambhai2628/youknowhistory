# 📚 You Know History - Full Stack Quiz Application

A complete, production-ready web application for testing knowledge of History, Geography, and Politics with a comprehensive MCQ quiz system, user authentication, leaderboard, and admin panel.

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎯 Core Features
- **User Authentication**: JWT-based signup/login system
- **Random Quiz System**: 25 randomized MCQs per test (4 marks each = 100 total)
- **Multi-Category Questions**: History, Geography, and Politics
- **Smart Randomization**: Questions and options shuffled for fairness
- **Progress Tracking**: Visual progress bar and question navigator
- **Optional Timer**: 30-minute countdown with pause/resume
- **Detailed Results**: Score breakdown, category-wise performance
- **Answer Review**: Complete review with explanations
- **WhatsApp Sharing**: Share your scores with friends
- **Leaderboard**: Top scorers for 7 days, 30 days, and all-time
- **User Profile**: Complete history and statistics

### 👨‍💼 Admin Features
- **Question Management**: Add, edit, delete questions
- **Bulk Operations**: Import/export questions as JSON
- **Advanced Filters**: Search and filter by category/difficulty
- **Statistics Dashboard**: Track question distribution

### 🎨 UI/UX Features
- **Vintage Theme**: Beautiful dark blue, golden, and parchment color scheme
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-first, works on all devices
- **Smooth Animations**: Engaging transitions and micro-interactions
- **SEO Optimized**: Proper meta tags and Open Graph support

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### Step 1: Clone/Download the Project

Navigate to the project directory:
```bash
cd you-know-history
```

### Step 2: Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   
   Create a `.env` file in the `backend` directory:
   ```bash
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/you-know-history
   
   # For MongoDB Atlas (cloud)
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/you-know-history
   
   # JWT Secret (use a strong random string)
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
   
   # Server Port
   PORT=5000
   
   # Environment
   NODE_ENV=development
   ```

4. **Seed the database** with sample questions:
   ```bash
   npm run seed
   ```
   
   This will add 50+ sample MCQ questions across all categories.

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:5000`

### Step 3: Frontend Setup

1. **Open a new terminal** and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   
   Create a `.env` file in the `frontend` directory:
   ```bash
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The application will open at `http://localhost:5173`

## 🎮 Usage

### For Users

1. **Sign Up**: Create a new account with your name, email, and password
2. **Login**: Sign in with your credentials
3. **Take Quiz**: Click "Start Quiz" on the dashboard
4. **Answer Questions**: Navigate through 25 randomized questions
5. **View Results**: See your score, grade, and category breakdown
6. **Review Answers**: Check explanations for all questions
7. **Check Leaderboard**: See where you rank
8. **View Profile**: Track your progress and history

### For Admins

1. **Set Admin Status**: Manually update `isAdmin: true` in MongoDB for your user:
   ```javascript
   // In MongoDB Compass or mongo shell
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { isAdmin: true } }
   )
   ```

2. **Access Admin Panel**: Navigate to `/admin` route
3. **Manage Questions**: Add, edit, or delete questions
4. **Export/Import**: Backup or restore question database

## 📁 Project Structure

```
you-know-history/
├── backend/
│   ├── data/
│   │   └── seedQuestions.js      # Sample MCQ questions
│   ├── middleware/
│   │   └── auth.js                # JWT middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Question.js            # Question schema
│   │   └── Attempt.js             # Quiz attempt schema
│   ├── routes/
│   │   ├── auth.js                # Authentication routes
│   │   ├── quiz.js                # Quiz routes
│   │   ├── user.js                # User routes
│   │   ├── leaderboard.js         # Leaderboard routes
│   │   └── admin.js               # Admin routes
│   ├── .env                       # Environment variables
│   ├── .env.example              # ENV template
│   ├── server.js                  # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js           # API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation
│   │   │   ├── Loader.jsx         # Loading spinner
│   │   │   ├── ProgressBar.jsx    # Quiz progress
│   │   │   ├── Timer.jsx          # Quiz timer
│   │   │   └── ProtectedRoute.jsx # Auth wrapper
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Auth state
│   │   │   └── ThemeContext.jsx   # Dark mode
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── Login.jsx          # Login page
│   │   │   ├── Signup.jsx         # Signup page
│   │   │   ├── Dashboard.jsx      # User dashboard
│   │   │   ├── Quiz.jsx           # Quiz interface
│   │   │   ├── Result.jsx         # Results page
│   │   │   ├── Review.jsx         # Answer review
│   │   │   ├── Leaderboard.jsx    # Rankings
│   │   │   ├── Profile.jsx        # User profile
│   │   │   ├── AdminDashboard.jsx # Admin home
│   │   │   ├── AdminQuestionForm.jsx # Add/Edit questions
│   │   │   └── NotFound.jsx       # 404 page
│   │   ├── App.jsx                # Main app & routing
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── .env                       # Environment variables
│   ├── .env.example              # ENV template
│   ├── index.html                 # HTML template
│   ├── tailwind.config.js         # Tailwind config
│   ├── vite.config.js             # Vite config
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Quiz
- `GET /api/quiz/random` - Get 25 random questions (Protected)
- `POST /api/quiz/submit` - Submit quiz answers (Protected)

### User
- `GET /api/user/profile` - Get user profile (Protected)
- `GET /api/user/history` - Get quiz history (Protected)
- `GET /api/user/stats` - Get user statistics (Protected)

### Leaderboard
- `GET /api/leaderboard?period=7d|30d|all` - Get top scorers (Public)

### Admin (Protected + Admin Only)
- `GET /api/admin/questions` - Get all questions
- `POST /api/admin/questions` - Add new question
- `PUT /api/admin/questions/:id` - Update question
- `DELETE /api/admin/questions/:id` - Delete question
- `POST /api/admin/import` - Import questions
- `GET /api/admin/export` - Export questions

## 🏗️ Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🚢 Deployment

### Option 1: Vercel (Frontend) + Render (Backend)

**Frontend (Vercel)**:
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api`

**Backend (Render)**:
1. Push your code to GitHub
2. Create new Web Service in [Render](https://render.com)
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables (MONGODB_URI, JWT_SECRET, etc.)

### Option 2: Single Server (VPS/Cloud)

Deploy both frontend and backend on the same server using PM2 or Docker.

## 🧪 Testing

To test the application:

1. **Create a test user**:
   - Sign up with any email/password
   - Or use Postman to create users via API

2. **Create an admin user**:
   ```javascript
   // In MongoDB
   db.users.updateOne(
     { email: "admin@test.com" },
     { $set: { isAdmin: true } }
   )
   ```

3. **Take a quiz**:
   - Login → Dashboard → Start Quiz
   - Answer questions → Submit → View Results

4. **Test admin features**:
   - Login as admin → Navigate to /admin
   - Add/Edit/Delete questions

## 🛠️ Technologies Used

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icons

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/you-know-history
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

This is a complete project ready for use. Feel free to:
- Add more questions to the database
- Customize the theme colors
- Add new features (e.g., timed challenges, badges)
- Improve the UI/UX

## 📄 License

MIT License - feel free to use this project for learning or production.

## 👨‍💻 Author

Built as a comprehensive full-stack application demonstrating modern web development practices.

## 🙏 Acknowledgments

- Questions sourced from general knowledge
- UI inspired by vintage educational materials
- Built with modern web technologies

---

**Happy Quizzing! 📚✨**
