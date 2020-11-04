import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IndividualItem from './Pages/IndividualItem'
import { Router } from "@reach/router";
function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <IndividualItem path="/item/:item_id" />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
