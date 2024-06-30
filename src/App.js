import "./App.css";
import HomePage from "./components/HomePage";
import ChatPage from "./components/ChatPage";

import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
