## 1. Set Up the context.path Property

Add this line to your [bela.properties](bela.properties.md) files to give each BELA instance a different context-path:
```
context.path={context-path}
```
Now BELA will accept requests in this format:
```
https://{your-bela-host}/{context-path}
```
Examples for three different BELA instances:
```
https://bela.mycompany.com/customers
https://bela.mycompany.com/billing
https://bela.mycompany.com/operations
```

## 2. Configure Your Proxy

Configure your reverse proxy to route requests to each BELA instance according to its context-path.

[Back to bela.properties](bela.properties.md)
