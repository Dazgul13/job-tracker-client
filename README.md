# Job Tracker - React

A modern, responsive job application tracking system built with React, featuring a beautiful UI, dark/light theme support, and real-time notifications.

![Job Tracker Dashboard](https://img.shields.io/badge/React-18+-blue.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-purple.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Features

### 🎨 Modern UI/UX
- **Beautiful Gradient Background** - Custom gradient design with theme support
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Fade-in effects and hover transitions
- **Card-based Layout** - Clean, modern card design with glassmorphism effects

### 🌙 Theme System
- **Light/Dark Mode Toggle** - Floating theme toggle button
- **Persistent Theme** - Remembers user preference in localStorage
- **Dynamic Styling** - CSS custom properties for seamless theme switching

### 📊 Dashboard Features
- **Job Statistics** - Visual overview of application status
- **Dynamic Cards** - Real-time statistics for submitted, interview, accepted, and rejected applications
- **Interactive Job Cards** - Hover effects and status badges

### 🔔 Notifications
- **Toast Notifications** - Success, error, warning, and info messages using Notyf
- **User Feedback** - Instant feedback for all user actions
- **Custom Icons** - Bootstrap Icons integration

### 🔐 Authentication
- **Secure Login/Register** - JWT token-based authentication
- **Protected Routes** - Automatic redirection for unauthenticated users
- **Session Management** - Persistent login state

### 📝 Job Management
- **Add Jobs** - Comprehensive form with validation
- **Edit Jobs** - Update existing job applications
- **Status Tracking** - Track application progress (Submitted, Interview, Rejected, Accepted)
- **Notes System** - Add personal notes to each application

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API server (separate repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd job-tracker-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Dependencies

### Core Dependencies
- **React** (^19.1.1) - JavaScript library for building user interfaces
- **React Router DOM** (^7.8.2) - Declarative routing for React
- **Bootstrap** (^5.3.8) - CSS framework for responsive design
- **React Bootstrap** (^2.10.10) - Bootstrap components for React
- **Axios** (^1.11.0) - HTTP client for API requests
- **Notyf** (latest) - Toast notification library

### Development Dependencies
- **React Scripts** (5.0.1) - Build tools and configuration
- **Testing Library** - Testing utilities for React components

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navigation.js    # Main navigation bar
│   ├── JobCard.js       # Individual job display card
│   ├── AddJobForm.js    # Form for adding new jobs
│   ├── EditJobForm.js   # Form for editing jobs
│   ├── Loading.js       # Loading spinner component
│   └── FloatingThemeToggle.js # Theme toggle button
├── pages/               # Page components
│   ├── Home.js         # Dashboard/home page
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   ├── AddJob.js       # Add job page
│   └── EditJob.js      # Edit job page
├── context/            # React Context providers
│   ├── UserContext.js  # User authentication context
│   └── ThemeContext.js # Theme management context
├── services/           # External services
│   └── notificationService.js # Notification utilities
├── api.js             # API configuration
├── App.js             # Main application component
├── App.css            # Global styles and theme variables
└── index.js           # Application entry point
```

## 🎨 Styling & Theming

### CSS Custom Properties
The application uses CSS custom properties for dynamic theming:

```css
:root {
  --bg-gradient: linear-gradient(to right top, #051937, #002f4c, #00434a, #005430, #446005);
  --card-bg: rgba(255, 255, 255, 0.95);
  --text-primary: #2c3e50;
  /* ... more variables */
}

[data-theme="dark"] {
  --bg-gradient: linear-gradient(to right top, #0a0a0a, #1a1a2e, #16213e, #0f3460, #533483);
  --card-bg: rgba(40, 40, 40, 0.95);
  --text-primary: #ffffff;
  /* ... dark theme variables */
}
```

### Key Design Elements
- **Glassmorphism Effects** - Backdrop blur and transparency
- **Gradient Backgrounds** - Custom gradient with theme variations
- **Smooth Transitions** - 0.3s ease transitions throughout
- **Hover Effects** - Interactive elements with transform and shadow effects

## 🔧 Configuration

### API Configuration
Update `src/api.js` to point to your backend server:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-url',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_APP_NAME=Job Tracker
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Collapsible navigation menu
- Responsive grid layouts
- Touch-friendly buttons and interactions
- Optimized typography scaling

## 🔔 Notification System

The app uses Notyf for toast notifications with custom styling:

```javascript
import { showSuccess, showError, showWarning, showInfo } from './services/notificationService';

// Usage examples
showSuccess('Job added successfully!');
showError('Failed to save job');
showWarning('Please fill all required fields');
showInfo('Loading your applications...');
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## 🚀 Building for Production

Create a production build:

```bash
npm run build
```

The build folder will contain the optimized production files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Bootstrap Team** - For the responsive CSS framework
- **Notyf** - For the beautiful notification system
- **Bootstrap Icons** - For the comprehensive icon library



