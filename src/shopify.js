require("dotenv").config();

const SHOP =
  process.env.SHOPIFY_STORE;

const TOKEN =
  process.env.SHOPIFY_TOKEN;

async function shopifyQuery(
  query,
  variables = {}
) {

  const response =
    await fetch(
      `https://${SHOP}/api/2025-07/graphql.json`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "X-Shopify-Storefront-Access-Token":
            TOKEN,
        },

        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

  const data =
    await response.json();

  if (data.errors) {

    console.error(
      "Shopify GraphQL Error:",
      JSON.stringify(
        data.errors,
        null,
        2
      )
    );

    throw new Error(
      "Shopify API Error"
    );

  }

  return data;
}

module.exports = {
  shopifyQuery,
};