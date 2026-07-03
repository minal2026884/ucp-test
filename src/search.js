const { shopifyQuery } =
  require("./shopify");

async function searchProducts(
  queryText
) {

  const query = `
  query {

    products(first: 50) {

      nodes {

        id
        title
        handle
        description

      }

    }

  }
  `;

  const data =
    await shopifyQuery(
      query
    );

  const products =
    data?.data?.products?.nodes || [];

  return products.filter(
    p =>
      p.title
        .toLowerCase()
        .includes(
          queryText.toLowerCase()
        )
  );
}

module.exports = {
  searchProducts
};