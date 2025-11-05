# Leveraging Telemetry/APM Data with BELA

BELA ingests data from Telemetry/APM platforms such as Datadog, Dynatrace, Elastic APM and AppDynamics, and combines it with data from source–of–truth systems like CMDBs, code repositories, and service catalogs.

This unified model enables architectural insights and navigation beyond what APM tools can provide.

## Meaningful Architecture Maps

APM tools are useful for debugging small flows with few elements:

<Diagram Here>

As environments grow, their topology maps quickly become noisy and hard to interpret:

<Diagram Here>

Some APM tools resort to circular layouts — visually interesting, but architecturally meaningless:

<Diagram Here>

BELA scales to architectures with millions of elements, maintaining structure and navigability far beyond what APM maps can support.


## Meaningful Visualization

Telemetry/APM elements are more physical and low-level. BELA elements are more logical and high-level.

BELA knows the difference between dataflow direction and dependency direction, for example, to provide correct, useful architectural insight. Telemetry/APM tools mix-up dataflow and dependency direction and have no hope of showing a coherent architecture diagram.

At the code level, Telemetry/APM tools don't distinguish between a call and a callback, for example. They work off the runtime stack, so they don't know the difference between a direct dependency and an injected dependency. BELA analyses source code and compiled code to correctly detect only actual dependencies.


# Structure and Governance — Not a Global Soup

APM tools present all elements in a single flat universe, sometimes grouped only by type or physical layer.

BELA organizes everything — telemetry, services, repos, libraries, endpoints — into your actual architecture model, whether that's:

 - Domains / Subdomains
 - Products and Capabilities
 - Business Units
 - Services and Modules

You define your architecture. BELA maps your telemetry into it.
