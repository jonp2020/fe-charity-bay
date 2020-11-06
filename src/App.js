import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import IndividualItem from './Pages/IndividualItem';
import LandingPage from './Pages/LandingPage';
import About from './Pages/About';
import { Router } from '@reach/router';
import Purchase from './Pages/Purchase';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <div className="central-area">
          <Router primary={false}>
            <LandingPage path="/" />
            <IndividualItem path="/item/:item_id" />
            <About path="/about" />
            <Purchase path="/purchase/:item_id" />
          </Router>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
