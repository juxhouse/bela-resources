# BELA Container Health Checks

You can use BELA's `/api/health` endpoint to configure startup, readiness and liveness probes for container orchestrators such as Kubernetes.

For speed, BELA keeps all data in RAM at all times, so startup will take approximately 1 min per GB of RAM used.

The example setting below sets the maximum startup time at 30 min.

```
startupProbe:
  httpGet:
    path: /api/health
    port: 8080
  failureThreshold: 900         # 900 × 2s = 30 minutes
  periodSeconds: 2
  timeoutSeconds: 2

readinessProbe:
  httpGet:
    path: /api/health
    port: 8080
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 3

livenessProbe:
  httpGet:
    path: /api/health
    port: 8080
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 5
```

#### Important
If you have configured a [URL Prefix](/reference/URL-Prefix.md), you must include it in the paths above.
