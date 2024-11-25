# Microsoft Entra ID
To enable Single Sign-On (SSO) for BELA using Microsoft Entra ID as the identity provider, follow these steps to obtain the required credentials and configure your application:

## Create a new application
- Go to the [Azure Portal](https://portal.azure.com/) and access Microsoft Entra ID
- Go to "App registrations":
  - In the left sidebar, under the "Manage" section, click on "App registrations"
- Register a new app:
  - Click on the tab "New registration"
  - Enter a name for your application (e.g., "BELA SSO")
  - Select the "Supported Account Type" of your choosing
  - Under "Redirect URIs" add the URI where users will be redirected after authentication (e.g., https://{your-bela-host}/callback)
  - Click "Register"

## Get your Client ID and create a new Client Secret
Your Client ID will be on display, it is listed as "Application (client) ID". Now, to create a Client Secret:
- Go to "Certificates & secrets":
  - In the left sidebar, under the "Manage" section, click on "Certificates & secrets"
  - Click on "New client secret"
  - You may provide a "Description", and set the expiration date for the secret
  - Click on "Add"
  - You will now see a table with your secret. The column named value corresponds to the client secret

## Obtain the OpenID Configuration URL
Under your application overview, click on the "Endpoints" tab. The OpenID Connect configuration URL should be listed as "OpenID Connect metadata document". It looks like:
```
https://login.microsoftonline.com/{tenant-id}/v2.0/.well-known/openid-configuration
```

