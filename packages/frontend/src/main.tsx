import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Amplify } from "aws-amplify";
import config from "./config.ts";

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import NotFound from './containers/NotFound.tsx'
import Login from './containers/Login.tsx';
import Signup from './containers/Signup.tsx';
import NewNote from './containers/NewNote.tsx';
import Notes from './containers/Notes.tsx';
import Settings from './containers/Settings.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/login",
        element: <Login />,
      }, {
        path: "/signup",
        element: <Signup />,
      }, {
        path: "/notes/new",
        element: <NewNote />,
      }, {
        path: "/notes/:id",
        element: <Notes />,
      }, {
        path: "/settings",
        element: <Settings />,
      }]
  }
]);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
