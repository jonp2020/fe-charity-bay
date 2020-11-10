import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import IndividualItem from './Pages/IndividualItem';
import LandingPage from './Pages/LandingPage';
import About from './Pages/About';
import { Router } from '@reach/router';
import Purchase from './Pages/Purchase';
import { AuthProvider } from './contexts/AuthContext';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import PostItem from './Pages/PostItem';
import ResetPassword from './Pages/ResetPassword';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <div className="central-area">
          <Router primary={false}>
            <LandingPage path="/" />
            <Dashboard path="/dashboard" />
            <IndividualItem path="/item/:item_id" />
            <About path="/about" />
            <Purchase path="/purchase/:item_id" />
            <SignUp path="/signup" />
            <LogIn path="/login" />
            <ResetPassword path="/reset-password" />
            <PostItem path="/post_item" />
          </Router>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
