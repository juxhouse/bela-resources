## 1. Set the url.prefix Property

Add a line to the [bela.properties](bela.properties.md) file of each BELA instance with a different URL prefix, for example:
```
url.prefix=customers
```
Now BELA will accept requests in this format:
```
https://{your-bela-host}/customers
```
Examples for three BELA instances using the same DNS subdomain and different URL prefixes:
```
https://bela.mycompany.com/customers
https://bela.mycompany.com/billing
https://bela.mycompany.com/operations
```

## 2. Configure Your Proxy

Configure your reverse proxy to route requests to each BELA instance according to its URL prefix.

[Back to bela.properties](bela.properties.md)
