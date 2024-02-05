require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/v1/index");
const morgan = require("morgan");
const ui = require("swagger-ui-express");
const YAML = require("yamljs");
// const document = YAML.load("./swagger.yaml");
const cors_proxy = require("cors-anywhere");
const env = process.env;

const app = express();
// app.use(morgan('tiny'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
app.use(express.json());

// const options = {
//   origin: "*",
// };

app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(cors(options));

app.use(routes);
app.listen(env.PORT, () => {
  console.info(`App listening at http://localhost:${env.PORT}`);
});

// const host = "0.0.0.0";

// Listen on a specific port via the PORT environment variable
// const port = 8000;
// cors_proxy
//   .createServer({
//     originWhitelist: [], // Allow all origins
//   })
//   .listen(port, host, function () {
//     console.log("Running CORS Anywhere on " + host + ":" + port);
//   });
// app.use("/doc", ui.serve, ui.setup(document));
// app.get("/api-docs", (req, res) => {
//   res.sendFile(__dirname + "/swagger.yaml");
// });

module.exports = app;
