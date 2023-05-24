"use client";
import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";

import * as msal from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig";
import { MsalProvider } from "@azure/msal-react";
import { useState } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

const serverConfig = getServerSideConfig();

const msalInstance = new msal.PublicClientApplication(msalConfig);

function SignInButton() {
  const { instance } = useMsal();
  return <button onClick={() => instance.loginRedirect()}>Sign In</button>;
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
