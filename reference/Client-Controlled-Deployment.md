# Client-Controlled Deployment
(AKA "On-Premisses", AKA "Bring Your Own Cloud")

With an enterprise account you can deploy BELA as a container in your own environment.

## Required Resources

Determine the required CPU, RAM, and disk resources for the BELA container using this simple [calculator](https://bela.live/container-sizing).

## BELA Data Volume

Provide a host directory to store all BELA's files. This directory must provide durability equivalent to Amazon EFS and must have a backup procedure enabled.

This host directory will be mounted as volume `\bela-data` in the BELA container below.

**Docker variant:**
Make the host directory accessible to the BELA container using group 0.
```bash
   HOST_DIRECTORY=\your-host-directory
   chgrp -R 0 $HOST_DIRECTORY  &&  chmod -R g+rwX $HOST_DIRECTORY
```

**Kubernetes variant**: Use the security context `fsGroup` setting with any non-zero group id.

**Openshift variant**: Volume access is automatically enabled by the SCC (Security Context Constraints) system.


> [!CAUTION]
> **The container must be configured as a single instance.** No more than one container can access the same file directory. The container cannot be configured for horizontal scaling. On Kubernetes, Openshift, etc, use the ReadWriteOnce access mode.

## Starting the BELA Container

This is a minimal example of how to start the BELA container using Docker.

Log in to Docker Hub using the `BELA_DOCKERHUB_TOKEN` provided with your BELA Enterprise account.

```bash
echo "$BELA_DOCKERHUB_TOKEN" | docker login -u juxhouse --password-stdin
```

Start the BELA container.

```
docker run --pull=always \
           -v $HOST_DIRECTORY:/bela-data \
           -p 8081:8081 \
           juxhouse/bela
```

## Configure DNS and SSL

Configure DNS to point to the host of the BELA container. BELA is tested with IPv4.

Make it an easy subdomain such as `bela.company.com`. If you make it an obscure host name, people will not remember it and that will defeat the purpose of the tool.

BELA serves plain HTTP on port 8081. Configure your reverse-proxy on the host to accept SSL connections using the default port (443) and forward them to BELA's HTTP port 8081.

BELA should now be accessible by HTTPS on the domain you configured.


## Configure BELA

When you run BELA for the first time, this file will be created in your host directory, mentioned above:
```bash
   $HOST_DIRECTORY\config\bela.properties
```

Edit it to configure access control and API integrations using this [template](/reference/bela.properties.md).

Restart the BELA container.

## Troubleshooting

Your host directory, mentioned above, will contain a `logs` folder with logs from BELA executions. It can provide error messages and insights.

Your BELA Enterprise account gives your admins access to the BELA team by popular instant messaging apps.
