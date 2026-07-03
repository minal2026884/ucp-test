const sessions = {};

function getSession(userId = "default") {

  if (!sessions[userId]) {

    sessions[userId] = {

      products: [],

      selectedProduct: null,

      cart: null,

      cartItems: []

    };

  }

  return sessions[userId];
}

module.exports = {
  getSession
};