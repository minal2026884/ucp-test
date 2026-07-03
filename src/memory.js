const sessions = {};

function getMemory(
  userId = "default"
) {

  if (
    !sessions[userId]
  ) {

    sessions[userId] = {

      products: [],

      selectedProduct: null,

      cart: null

    };

  }

  return sessions[userId];

}

module.exports = {
  getMemory
};