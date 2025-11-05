# Leveraging Telemetry/APM Tools with BELA

BELA extracts data from your Telemetry/APM (Application Performance Monitoring) tools such as Datadog, Dynatrace, Elastic APM, AppDynamics, etc.

BELA combines that with data from other sources such as CMDBs, Code Repos and Service Catalogs, to provide the following features.


## Powerful Visualization and Dynamic Exploration

Telemetry/APM tools are great for debugging simple scenarios with just a few elements:

But their diagrams get cluttered fast as scenarios get more complex:

Some Telemetry/APM tools display elements in circles, because that's easy to do, but it doesn't really convey any useful architectural insight:

BELA specializes in the visualization and dynamic exploration of complex architectures with millions of elements.


## Meaningful Visualization

Telemetry/APM elements are more physical and low-level. BELA elements are more logical and high-level.

BELA knows the difference between dataflow direction and dependency direction, for example, to provide correct, useful architectural insight. Telemetry/APM tools mix-up dataflow and dependency direction and have no hope of showing a coherent architecture diagram.

At the code level, Telemetry/APM tools don't distinguish between a call and a callback, for example. They work off the runtime stack, so they don't know the difference between a direct dependency and an injected dependency. BELA analyses source code and compiled code to correctly detect only actual dependencies.


## Tools and Guidance for Better Organization

Telemetry/APM elements exist in a single global space and are grouped coarsely, at best, by attributes like type, tier or physical location.

BELA provides multi-level containers that organize your Telemetry/APM data together your with code projects, code elements, libs, services, endpoints, etc, cohesively into your own architectural divisions.

BELA does not restrict you to a particular architectural style and adapts to the style you choose: Domains/Subdomains, Products, Business Units, Services, Capabilities, etc.
