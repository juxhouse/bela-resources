# BELA MCP Connector

The BELA server exposes Model Context Protocol (MCP) tools that make your AI agents more effective and MUCH more efficient.

Your agents will query true code structure and dependencies FAST and CORRECTLY, instead of using tools like grep on huge projects and the LLM itself to parse code.

## Connection Configuration

Connect your agents to BELA MCP using these settings.

| Setting | Value |
|---|---|
| URL | `https://{your-bela-host}/mcp` |
| Authorization Header | `Authorization {your-bela-api-token}` |

Get your token from `BELA > Sources > Use API`.

## Some of the Available Tools

### `bela-resources-get`
Retrieves the essential BELA documentation, providing links to fundamental concepts and tutorials.

### `element-search`
Searches for elements in the architecture by name or type, returning both "built" elements (extracted from code) and "modeled" elements (manually created).

### `element-context-get`
Returns the full context of an element, including its containers and all incoming and outgoing dependencies.

### `with-containers-up`
Returns the upward containment hierarchy of an element, showing all its containers up to the organization root.

### `deps-in` / `deps-out`
Lists all dependencies to and from an element. Can be filtered by a specific target element.


## Summary

The BELA MCP connector is a powerful tool for architectural exploration. It enables navigation from the macro organization level (domains and subdomains) down to technical details (projects, packages, and libraries), allowing AI agents to correctly identify bottlenecks, couplings, and the overall dependency structure of a software ecosystem.
