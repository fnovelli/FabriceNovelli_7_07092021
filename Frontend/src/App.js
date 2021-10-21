import logo from  './icons/icon-left-font-monochrome-white.png';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Register } from "./components/";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/register" exact component={() => <Register />} />
        </Switch>
        <Footer />
      </Router>


      </header>
    </div>
  );
}

export default App;
