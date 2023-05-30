"use client";
import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";

import * as msal from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig";
import { MsalProvider } from "@azure/msal-react";
import { useState } from "react";
import Locale from "./locales";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

const serverConfig = getServerSideConfig();

const msalInstance = new msal.PublicClientApplication(msalConfig);

function SignInButton() {
  const { instance } = useMsal();
  return (
    <div>
      <form className="sign-in">
        <h2>🍰 Welcome to In-Fab ChatGPT 🍰</h2>
        <h3>Log in to continue</h3>
        <div className="form-group d-flex align-items-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => instance.loginRedirect()}
          >
            {Locale.Login}
          </button>
        </div>

        <style jsx>{`
          .sign-in {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
            padding: 40px;
            margin: 0 auto;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08),
              0 3px 3px 0 rgba(0, 0, 0, 0.12);
          }
          .btn {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 20px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.3s;
          }

          .btn:hover {
            background-color: #0056b3;
          }
        `}</style>
      </form>
    </div>
  );
}

export default async function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>
        <Home />
        {serverConfig?.isVercel && <Analytics />}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
}
