# bela.properties

Use the bela.properties file to provide settings for BELA, such as client IDs and secrets.

Place it in the config directory in the host directory that is mounted onto the `\bela-data` mount point when running the BELA Docker image:
```
{host-directory}/config/bela.properties
```

## Example

Below is a sample bela.properties file with configuration details:

```properties
# The email address of the application owner.
owner.email=user@example.com

# URL for your SSO provider's OpenID configuration.
openid.configuration.url=https://{host}/.well-known/openid-configuration
# Client ID for BELA, as provided by your SSO provider.
openid.client.id=your-client-id
# Client secret for BELA, as provided by your SSO provider.
openid.client.secret=your-client-secret

# Enable this instead of the openid configs above if you want to use user+password authentication.
# auth.passwords=true

# Token for accessing BELA's architecture API endpoint. You can set any string you like here.
architecture.api.token=your-api-token

# URL for OpenAI's chat completion API endpoint.
openai.api.url=https://api.openai.com/v1/chat/completions
# API token for authenticating with OpenAI.
openai.api.token=openai-api-token
```
