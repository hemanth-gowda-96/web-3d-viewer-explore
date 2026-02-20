import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { PostLogin } from './pages/PostLogin';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';

function ProtectedRoute({ children }) {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

function Header() {
  const location = useLocation();
  const { session, signOut } = useAuth();
  const isSignInPage = location.pathname === '/signin';

  return (
    <header className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img src="/logo/zerothdesign.png" alt="Zeroth Designs Logo" className="h-16 w-auto" />
        </Link>
        <div className="h-12 w-px bg-border hidden md:block"></div>
        <Link to="/">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl hover:opacity-80 transition-opacity">
            3D Model Viewer
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground mr-2">Welcome, {session.user.email}</span>
            <button
              onClick={signOut}
              className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2 cursor-pointer"
            >
              Sign Out
            </button>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-10 px-6 py-2"
            >
              Dashboard
            </Link>
          </div>
        ) : isSignInPage ? (
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
          >
            Back
          </Link>
        ) : (
          <Link
            to="/signin"
            className="inline-flex items-center justify-center rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 h-10 px-6 py-2"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <div className="max-w-7xl mx-auto w-full p-4 md:p-8 flex-grow flex flex-col space-y-8">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <PostLogin />
                </ProtectedRoute>
              } />
            </Routes>
          </div>

          <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground mt-auto">
            <p>© 2025 Zeroth Designs. All rights Reserved.</p>
            <div className="flex gap-4">
              <a href="https://zerothdesigns.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Website</a>
              <a href="https://www.linkedin.com/company/zerothdesigns" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            </div>
            <p>Built for Conscious Engineering.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
