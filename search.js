import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { getAccessToken } from "./auth.js";

const token = await getAccessToken();

const transport = new StreamableHTTPClientTransport(
  new URL("https://catalog.shopify.com/api/ucp/mcp"),
  {
    requestInit: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  }
);

export const client = new Client({
  name: "ucp-test",
  version: "1.0.0",
});

await client.connect(transport);

console.log("✅ Connected to Shopify Catalog MCP");