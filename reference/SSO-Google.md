# Google
To enable Single Sign-On (SSO) for BELA using Google as the identity provider, follow these steps:

## Create a Google Cloud Project
- Access Google Cloud Console: Go to the [Google Cloud Console](https://console.developers.google.com/)
- Create a New Project:
  - Click on the project dropdown at the top of the page
  - Select "New Project"
  - Enter a name for your project (e.g., "BELA SSO") and click "Create"

## Create a Client ID and Secret
- Go to Credentials:
  - In the left sidebar, click on "Credentials"
- Create Credentials:
  - Click on "Create Credentials" and select "OAuth client ID"
- Configure Consent Screen:
  - If prompted, configure the OAuth consent screen with the information for BELA within your company. For "Support Email", for example, enter the email of the person or group responsible for the BELA installation inside your company.
  - Save the changes
- Select Application Type:
  - Choose "Web application" as the application type
- Set Redirect URIs:
  - Under "Authorized redirect URIs," enter https://{your-bela-host}/callback
- Create the Credentials:
  - Click "Create." You will see your Client ID and Client Secret. Make sure to save these credentials securely

## Obtain the OpenID Configuration URL
The OpenID Connect configuration URL for Google is:
```
https://accounts.google.com/.well-known/openid-configuration
```

## Configuring BELA SSO
Now you have the information needed to configure [BELA SSO](/reference/Client-Controlled-Deployment.md).
