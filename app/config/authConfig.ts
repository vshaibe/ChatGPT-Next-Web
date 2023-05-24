import { Configuration, RedirectRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: "957259b3-2460-4507-bf3d-483c21495ea4",
    authority:
      "https://login.microsoftonline.com/61fb942c-df9d-475d-ba36-f0f3f7701c30",
    redirectUri: "/",
  },
};

// export const msalConfig: Configuration = {
//     auth: {
//         clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
//         authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
//         redirectUri: '/'
//     }
// };
