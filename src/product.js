const { shopifyQuery } =
  require("./shopify");

async function getProduct(
  handle
) {

  const query = `
  query ProductByHandle(
    $handle:String!
  ) {

    productByHandle(
      handle:$handle
    ) {

      id
      title
      handle

      variants(
        first:20
      ) {

        nodes {

          id

          availableForSale

          price {

            amount
            currencyCode

          }

        }

      }

    }

  }
  `;

  const data =
    await shopifyQuery(
      query,
      { handle }
    );

  return data.data.productByHandle;
}

module.exports = {
  getProduct
};