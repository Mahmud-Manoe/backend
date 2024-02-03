require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/v1/index");
const morgan = require('morgan');
const ui = require("swagger-ui-express");
const YAML = require("yamljs");
// const document = YAML.load("./swagger.yaml");

const env = process.env;

const app = express();
// app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(routes);
app.listen(env.PORT, () => {
  console.info(`App listening at http://localhost:${env.PORT}`);
});
// app.use("/doc", ui.serve, ui.setup(document));
// app.get("/api-docs", (req, res) => {
//   res.sendFile(__dirname + "/swagger.yaml");
// });

module.exports = app;

