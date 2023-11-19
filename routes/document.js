const router = require("express").Router();

router.all("/", (req, res) => {
  res.send({
    swagger: "/api/documents/swagger",
    redoc: "/api/doucments/redoc",
    json: "/api/deocuments/json",
  });
});

// JSON
router.get("/json", (req, res) => {
  console.log('Here')
  res.sendFile("config/swagger.json", { root: "." });
});
// Redoc
const redoc = require("redoc-express");
router.use(
  "/redoc",
  redoc({ specUrl: "/api/documents/json", title: "API Docs" }),
);

// Swagger:
const swaggerUi = require("swagger-ui-express");
router.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(require("../config/swagger.json"), {
    swaggerOptions: { presistAthorization: true },
  }),
);
 
module.exports = router; 