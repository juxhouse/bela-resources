# bela.properties

The bela.properties file provides settings for BELA, supplying information such as client IDs and secrets.

- [Path](#path)
- [Example](#example)


## Path

When running BELA using its Docker image, mount a volume pointing to the bela-data directory. Inside this directory, create a config folder to contain the bela.properties file. The expected file path is:
```
{your-path}/bela-data/config/bela.properties
```

## Example

Below is a sample bela.properties file with configuration details:

```properties

# General BELA's configuration

# The email address of the application owner.
owner.email=user@example.com

# Token for accessing the architecture API endpoint.
architecture.api.token=your-api-token

# OpenID configuration

# URL for your SSO provider's OpenID configuration.
openid.configuration.url=https://{host}/.well-known/openid-configuration

# Client ID for BELA, as provided by your SSO provider.
openid.client.id=your-client-id 

# Client secret for BELA, as provided by your SSO provider.
openid.client.secret=your-client-secret 

# OpenAI configuration

# URL for OpenAI's chat completion API endpoint.
openai.api.url=openai-api-url

# API token for authenticating with OpenAI.
openai.api.token=openai-api-token
```
