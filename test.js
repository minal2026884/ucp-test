const SHOP = "milano-rockera.myshopify.com";
const TOKEN = "f3b80ed7359f02cd250663b552d782ff";

async function run() {
  const response = await fetch(
    `https://${SHOP}/api/2025-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({
        query: `
        {
          products(first: 100) {
            nodes {
              title
              handle
            }
          }
        }
        `,
      }),
    }
  );

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

run();