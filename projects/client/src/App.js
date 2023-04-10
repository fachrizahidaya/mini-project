import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import axios from 'axios'

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  
  return (
    <div className="App">
        <Navbar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {message}
      </header>
    </div>
  );
}

export default App;