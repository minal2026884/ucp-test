const { askGemini } =
  require("./gemini");

const {
  searchProducts
} = require("./search");

const {
  getProduct
} = require("./product");

const {
  addToCart
} = require("./addToCart");

const {
  getSession
} = require("./session");

async function agent(
  userMessage,
  userId = "default"
) {

  const session =
    getSession(userId);

  const prompt = `
You are a Shopify shopping agent.

User message:

"${userMessage}"

Available intents:

search
select
add_to_cart
show_cart
checkout

Return ONLY JSON.

Search example:

{
 "intent":"search",
 "query":"watch"
}

Select example:

{
 "intent":"select",
 "product":"men watch"
}

Add example:

{
 "intent":"add_to_cart"
}

Checkout example:

{
 "intent":"checkout"
}
`;

  const raw =
    await askGemini(
      prompt
    );

  const cleaned =
    raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  let action;

  try {

    action =
      JSON.parse(
        cleaned
      );

  } catch {

    return {

      success: false,

      message:
        "Invalid Gemini response",

      raw

    };

  }

  // SEARCH

  if (
    action.intent ===
    "search"
  ) {

    const products =
      await searchProducts(
        action.query
      );

    session.products =
      products;

    return {

      success: true,

      type:
        "selection_required",

      products

    };

  }

  // SELECT

  if (
    action.intent ===
    "select"
  ) {

    const selected =
      session.products.find(
        p =>
          p.title
            .toLowerCase()
            .includes(
              action.product
                .toLowerCase()
            )
      );

    if (!selected) {

      return {

        success: false,

        message:
          "Product not found"

      };

    }

    session.selectedProduct =
      selected;

    return {

      success: true,

      type:
        "product_selected",

      product:
        selected

    };

  }

  // ADD TO CART

  if (
    action.intent ===
    "add_to_cart"
  ) {

    if (
      !session.selectedProduct
    ) {

      return {

        success: false,

        message:
          "Select product first"

      };

    }

    const product =
      await getProduct(
        session.selectedProduct.handle
      );

    const variant =
      product
        .variants
        .nodes[0];

    const cart =
      await addToCart(
        variant.id
      );

    session.cart =
      cart;

    session.cartItems.push(
      session.selectedProduct
    );

    return {

      success: true,

      type:
        "cart_updated",

      checkoutUrl:
        cart.checkoutUrl

    };

  }

  // SHOW CART

  if (
    action.intent ===
    "show_cart"
  ) {

    return {

      success: true,

      cart:
        session.cartItems

    };

  }

  // CHECKOUT

  if (
    action.intent ===
    "checkout"
  ) {

    if (
      !session.cart
    ) {

      return {

        success: false,

        message:
          "Cart empty"

      };

    }

    return {

      success: true,

      checkoutUrl:
        session.cart.checkoutUrl

    };

  }

  return {

    success: false,

    message:
      "Unknown intent"

  };
}

module.exports = {
  agent
};