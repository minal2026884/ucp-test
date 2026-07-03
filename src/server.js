const express =
  require("express");

const { agent } =
  require("./agent");

const app =
  express();

app.use(
  express.json()
);

app.get(
  "/",
  (req, res) => {

    res.json({
      success: true,
      message:
        "Shopify Agent Running"
    });

  }
);

app.post(
  "/agent",
  async (req, res) => {

    try {

      const {
        userId,
        message
      } = req.body;

      if (!message) {

        return res
          .status(400)
          .json({
            success: false,
            message:
              "message is required"
          });

      }

      const result =
        await agent(
          message,
          userId || "default"
        );

      res.json(
        result
      );

    } catch (error) {

      console.error(
        error
      );

      res.status(500)
        .json({

          success: false,

          error:
            error.message

        });

    }

  }
);

const PORT =
  process.env.PORT ||
  3000;

app.listen(
  PORT,
  () => {

    console.log(
      `Server running on http://localhost:${PORT}`
    );

  }
);