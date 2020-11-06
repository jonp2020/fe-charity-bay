import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndividualItem from "./Pages/IndividualItem";
import LandingPage from "./Pages/LandingPage";
import About from "./Pages/About";
import { Router } from "@reach/router";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="central-area">
        <Router primary={false}>
          <LandingPage path="/" />
          <IndividualItem path="/item/:item_id" />
          <About path="/about" />
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
