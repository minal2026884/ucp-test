const { searchProducts } =
  require("./search");

(async () => {

  try {

    const products =
      await searchProducts(
        "watch"
      );

    console.log(
      JSON.stringify(
        products,
        null,
        2
      )
    );

  } catch (e) {

    console.error(e);

  }

})();