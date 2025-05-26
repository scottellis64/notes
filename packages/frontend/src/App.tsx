import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes.tsx";
import Nav from "react-bootstrap/Nav";
import "./App.css";

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        <nav>
          <a className="navbar-brand fw-bold text-muted" href="/">Scratch</a>
        </nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <a className="nav-link" href="/signup">Signup</a>
            <a className="nav-link" href="/login">Login</a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;