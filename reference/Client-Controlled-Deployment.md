# Client-Controlled Deployment
(AKA "On-premisses", AKA "Bring Your Own Cloud")

With an enterprise account you can deploy BELA in your own environment.

### Single Sign-On (SSO)

BELA uses the OpenID Connect protocol as its SSO standard. You will need to register BELA in your SSO provider, also you will have to allow BELA's redirect URI: `https://{host}/callback`.

Next, you have to create a `bela.properties` file with the following keys and values:

|Key|Value|
|---|-----|
| openid.client.id | The `client-id` for BELA created in your own SSO provider
| openid.client.secret | The `client-secret` for BELA created in your own SSO provider
| openid.configuration.url | The configuration URL of your SSO provider. It follows the pattern: `https://{host}/.well-known/openid-configuration`
