# Okta
To enable Single Sign-On (SSO) for BELA using Okta as the identity provider, follow these steps to obtain the required credentials and configure your application:

## Create a new application
- Go to Applications:
  - In the left sidebar, click on "Applications"
- Create application
  - Click on "Create Application"
  - Enter a name for your application (e.g., "BELA SSO")
  - Choose "Single Page Web Applications" as the application type and click "Create"

## Get the Client ID and Secret

After creating the application, you need to click on the tab "Settings" to be directed to your new applcation settings page.

 - Under "Basic Information", you can get the Client ID and Client Secret

 - Under "Application URIs" add the URI where users will be redirected after authentication (e.g., https://{your-bela-host}/callback)

- Click "Save Changes"

## Obtain the OpenID Configuration URL

Still on the "Settings" tab, scroll down untill you find "Advanced Settings". Click on it, then click on the "Endpoints" tab. There, find the OpenID Configuration. It looks like:
```
https://{your-okta-domain}/.well-known/openid-configuration
```