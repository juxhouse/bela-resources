# bela.properties

Use the bela.properties file to provide settings for BELA, such as client IDs and secrets.

Place it in the directory that is mounted onto the `\bela-data` mount point 
when running the BELA Docker image.
```
{your-data-path}/config/bela.properties
```

## Example

Below is a sample bela.properties file with configuration details:

```properties
owner.email=user@example.com              # The email address of the application owner.

architecture.api.token=your-api-token     # Token for accessing BELA's architecture API endpoint. You can set any string you like here.

openid.configuration.url=https://{host}/.well-known/openid-configuration # URL for your SSO provider's OpenID configuration.
openid.client.id=your-client-id           # Client ID for BELA, as provided by your SSO provider.
openid.client.secret=your-client-secret   # Client secret for BELA, as provided by your SSO provider.

openai.api.url=openai-api-url       # URL for OpenAI's chat completion API endpoint.
openai.api.token=openai-api-token   # API token for authenticating with OpenAI.
```
