# Leveraging Telemetry/APM Data with BELA

BELA ingests data from Telemetry/APM platforms like Datadog, Dynatrace, Elastic APM and AppDynamics, and combines it with source-of-truth systems such as CMDBs, code repositories and service catalogs.

The result is a unified architectural model — enabling insights and navigation that APM tools alone cannot provide.

## From Small Flows to Scalable Architecture Maps

APM tools are useful for debugging small flows, with a few elements:

<Diagram Here>

As APM topology views grow, they become cluttured and unmanageable:

<Diagram Here>

Some tools fall back to circular layouts — visually interesting, architecturally meaningless:

<Diagram Here>

BELA scales to millions of elements, preserving structure, hierarchy, and navigability far beyond the limits of APM views.


## From Call Traces to Structure

APM tools observe only runtime behavior — stack traces and network calls — so they don't know the difference:

 - between a direct dependency call and an injected one
 - between a framework-driven invocation and business logic coupling
 - between an http request and a webhook callback

APM tools mix up call direction with actual dependency direction (architectural coupling).

BELA correctly separates the two — enabling accurate, stable, navigable architectural views.

BELA analyzes telemetry data but also source code and compiled artifacts, mapping only true dependencies and structural relationships, not incidental runtime paths.


## From a Global Soup to Structure and Governance

APM tools present all elements in a single flat universe, sometimes grouped only by type or physical layer.

BELA organizes everything — telemetry, services, repos, libraries, endpoints — into your actual architecture model, whether that's:

 - Domains and Subdomains
 - Products and Capabilities
 - Business Units and Business Areas
 - Services and Modules
 - Etc

You define your architecture. BELA maps your telemetry into it.
