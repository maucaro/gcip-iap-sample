# IAP Federated Custom Login Sample

This is a sample login page that, when hosted, can be used as the Authentication URL for a backend service configured to use IAP with Identity Platform. [Reference](https://cloud.google.com/iap/docs/create-custom-auth-ui)

## Prerequisites
- Enable a backend service to use IAP with external identities. Refer to: [Enabling external identities](https://cloud.google.com/iap/docs/enable-external-identities). This sample was tested with a SAML provider but should aslo work with OIDC.
- Recent release of Node.js. This sample was developed and tested with v18.12.1.
- If using Firebase hosting, the Firebase CLI and a corresponding project.

## Installation
- Clone this repo
- Install packages. Run:
`npm update`
- Rename src/config-example.ts to src/config.ts and update it with your values
- Build. Run:
`npm run build`
- Deploy to Firebase hosting: 
`npm run deploy`
- Update the backend's Authentication URL to the deployed service. If using Firebase hosting, this will look like: 
`https://your-project.web.app/login-gcip.html`

