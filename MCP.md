# BELA MCP Connector — Capabilities Summary

The BELA MCP server exposes **6 tools** that allow querying the architectural structure and elements mapped in the platform. Below is a description of each tool with real examples obtained during testing.

## MCP Server Configuration

To connect to the BELA MCP server, configure it as an **HTTP** server with the following settings. The server URL is `https://jux.bela.live/prod/mcp`. Authentication is done via an `Authorization` header, which must be set to the API token available to workspace admins. In most MCP clients, this is configured as a custom header entry, where the header name is `Authorization` and the value is the token itself. Without this header, all tool calls will be rejected. Admins can retrieve their API token from the BELA workspace settings.

| Setting | Value |
|---|---|
| Type | HTTP |
| URL | `https://jux.bela.live/prod/mcp` |
| Header name | `Authorization` |
| Header value | `<your API token>` |

## Available Tools

### 1. `bela-resources-get`
Retrieves the essential BELA documentation, providing links to fundamental concepts and tutorials.
- **Usage**: Called with no parameters.
- **Example Response**: Returns a list of recommended documents, such as `README.md` and `Concepts.md` from the project's GitHub repository.

### 2. `element-search`
Searches for elements in the architecture by name or type, returning both "built" elements (extracted from code) and "modeled" elements (manually created).
- **Parameters**: `query` (search term).
- **Real Example**: Searching for `"Steel Production Domain [system-domain]"` returned the modeled element with ID `4296`. Searching for `"bela-backend"` returned the Clojure project `clojure-deps-project/bela-backend`.

### 3. `element-context-get`
Returns the full context of an element, including its containers and all incoming and outgoing dependencies.
- **Parameters**: `elementId` (element path or numeric ID).
- **Real Example**: Querying ID `4296` (Steel Production Domain) returned dozens of sub-elements such as `Authentication`, `Payment`, `Risk-Management`, and `Inventory Management`. Querying `clojure-deps-project/bela-backend` showed that the project depends on the `grouping/libs` grouping and the Maven package `maven/com.taoensso`.

### 4. `with-containers-up`
Returns the upward containment hierarchy of an element, showing all its containers up to the organization root.
- **Parameters**: `elementId`.
- **Real Example**: For `clojure-deps-project/bela-backend`, the returned hierarchy was `["clojure-deps-project/bela-backend", "org/org"]`. For domain `4296`, it was `[4296, 9166695, "org/org"]`.

### 5. `deps-out`
Lists all dependencies going out of an element (what it depends on). Can be filtered by a specific target element.
- **Parameters**: `elementId` and optionally `filterElementId`.
- **Real Example**: The outgoing dependencies of `project/bela-frontend` returned 2,878 synthetic connections to the `grouping/external-npm` grouping.

### 6. `deps-in`
Lists all dependencies coming into an element (who depends on it). Can be filtered by a specific source element.
- **Parameters**: `elementId` and optionally `filterElementId`.
- **Real Example**: Querying who depends on `grouping/libs` returned multiple projects, including `clojure-deps-project/empire` (9,173 dependencies), `assembly/CodeAnalyzer` (328), and `clojure-deps-project/bela-backend` (188).

## Summary

The BELA MCP connector is a powerful tool for architectural exploration. It enables navigation from the macro organization level (domains and subdomains) down to technical details (projects, packages, and libraries), helping identify bottlenecks, couplings, and the overall dependency structure of a software ecosystem.