## 1. Set the context.path Property

Add a line to the [bela.properties](bela.properties.md) file of each BELA instance with a different context path, for example:
```
context.path=customers
```
Now BELA will accept requests in this format:
```
https://{your-bela-host}/customers
```
Examples for three BELA instances using the same DNS subdomain and different context paths:
```
https://bela.mycompany.com/customers
https://bela.mycompany.com/billing
https://bela.mycompany.com/operations
```

## 2. Configure Your Proxy

Configure your reverse proxy to route requests to each BELA instance according to its context path.

[Back to bela.properties](bela.properties.md)
