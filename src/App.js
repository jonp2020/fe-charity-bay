import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndividualItem from "./Pages/IndividualItem";
import LandingPage from "./Pages/LandingPage";
import { Router } from "@reach/router";
import PostIems from "./Pages/PostIems";
function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <LandingPage path="/" />
        <IndividualItem path="/item/:item_id" />
        <PostIems path="/post_item" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
