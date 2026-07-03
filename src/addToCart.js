const { shopifyQuery } =
  require("./shopify");

async function addToCart(
  variantId
) {

  const mutation = `
  mutation CartCreate(
    $variantId:ID!
  ) {

    cartCreate(
      input:{

        lines:[
          {
            quantity:1,
            merchandiseId:$variantId
          }
        ]

      }
    ) {

      cart {

        id
        checkoutUrl

      }

    }

  }
  `;

  const data =
    await shopifyQuery(
      mutation,
      { variantId }
    );

  return data
    .data
    .cartCreate
    .cart;
}

module.exports = {
  addToCart
};