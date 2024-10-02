# Checkpoints

Checkpoints is a technique to freeze the application state, including
memory, ports and file descriptors, and write to the disk, allowing the user to
restart the application almost instantly.

When running Bela using docker, we can use the [docker
checkpoint](https://docs.docker.com/reference/cli/docker/checkpoint/)
experimental feature.

## Installing CRIU

CRIU must be installed to perform docker checkpoints, as that is the
underlying tehcnology used to perform checkpoints. To install it on
Ubuntu, simply run:

```sh
sudo apt install criu
```

On other operations, systems follow instructions on the official
documentation:

https://criu.org/Installation

Also, you will need to run the following to perform checkpoints on Bela:

```sh
mkdir -p /etc/criu
echo tcp-established >> /etc/criu/runc.conf
```

This will pass the `--tcp-established` flag, which is required to create
checkpoints of applications with open sockets.


## Enabling experimental features

Because checkpoint is an experimental feature, you will need to enable
experimental features before performing checkpoints using docker:

- Edit the /etc/docker/daemon.json (it might be in another place depending on
  your installation)

```json
{
     "experimental" : true
}
```

- Reconfigure the docker daemon:

```sh
sudo systemctl daemon-reload
```

## On starting with docker

There are no special requirements for performing checkpoints, except for
one small catch: do not pass `--rm` starting the application!

## Creating checkpoints


Just run the following:

```sh
docker checkpoint create <container name> <checkpoint name> 
```

Notice that running this command will stop the container. If you just want
to make the checkpoint while keeping the container running, add the
`--leave-running=true` flag

You can run the following command to list existing checkpoints:

```sh
docker checkpoint ls <container name>
```

## Restarting from checkpoint


```sh
docker start --checkpoint <checkpoint name> <container name>
```

After restarting the application it is important to send a signal so that
Bela knows it has restarted and resyncs its memory with  the latest
snapshot and journals.

```
docker kill container-name --signal SIGHUP
```

## Troubleshooting

```
Error response from daemon: Cannot checkpoint container bela: runc did not terminate successfully: exit status 1: criu failed: type NOTIFY errno 0 path= /run/containerd/io.containerd.runtime.v2.task/moby/.../criu-dump.log: unknown
```

This error means you didn't set the  `tcp-established` flag on /etc/criu/runc.conf. Make sure the flag is set.

```
Error response from daemon: Cannot checkpoint container bela: failed to read checkpoint reader: open .../cgroup.img: no such file or directory
```

This error happens if you start Bela passing the `--rm`. Checkpoints won't
work if this flag is passed because docker will automatically remove the
container resources when it is stopped.


