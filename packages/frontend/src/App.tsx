import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes.tsx";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

import { AppContext, type AppContextType } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { onError } from "./lib/errorLib.ts";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
  
    navigate("/login");
  }

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (error) {
      if (error !== "No current user") {
        onError(error);
      }
    }
    setIsAuthenticating(false);
  }

  const navigate = useNavigate();

  return (
    !isAuthenticating && (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        <nav>
          <a className="navbar-brand fw-bold text-muted" href="/">Scratch</a>
        </nav>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated
              ? <>
                <LinkContainer to="/settings">
                  <Nav.Link>Settings</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
              : [
                <a key="signup" className="nav-link" href="/signup">Signup</a>,
                <a key="login" className="nav-link" href="/login">Login</a>
              ]
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
      >
        <Routes />
      </AppContext.Provider>
    </div>
    )
  );
}

export default App;