# Leveraging Telemetry/APM Tools with BELA

BELA uses data from your Telemetry/APM (Application Performance Monitoring) tools such as Datadog, Dynatrace, Elastic APM, AppDynamics, etc, to provide the following features.

## Powerful Visualization and Dynamic Exploration

Telemetry/APM tools are great to debug simple scenarios with up to a dozen nodes:

But their diagrams get cluttered fast as scenarios get more complex:

Some Telemetry/APM tools display elements in circular diagrams, because they are easy to draw, but they aren't really useful:

BELA specializes in visualization and dynamic exploration of complex architectures with millions of elements.

## Meaningful Visualization

Telemetry/APM elements are more physical and low-level. BELA elements are more logical and high-level.

Telemetry/APM tools can't distinguish between a call and a callback, for example. They don't show.

BELA distinguishes between dataflow direction and dependency direction, producing correct, useful architectural visualization.

## Better Organization

Telemetry/APM tools have . Their elements float in a global soup of elements and are, at best, grouped by type or physical location.

BELA provides multi-level grouping containers that organize Telemetry/APM data together with code projects, code elements, libs, services, endpoints, etc, into your own architectural divisions such as Domains, Products, Business Units, etc (BELA is agnostic of architectural style).
