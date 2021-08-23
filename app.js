const express = require("express");
const { HttpError } = require("http-errors");
require("dotenv").config();
require("./src/utils/db");

/*
 * #Default EndPoint
 */
const app = express();
const port = process.env.PORT || 3000;
const router = require('./src/routers');

app.use(express.json());

/*
 * #Default EndPoint
 */
app.get("/", (req, res, next) => {
  res.send({
    status: 200,
    message: "welcom to #UpdevSend SMS...",
  });
});
/*
 * #EndPoint
 */
app.use("/v1/customer", router.customer);
app.use("/v1/config/function", router.function_ctr);
app.use("/v1/config/agent", router.agent);

app.use("/v1/subscription", router.subscription);
app.use("/v1/submit", router.submit);

app.use("/v1/group", router.group);
app.use("/v1/member", router.mumber);
/*
* #Http Error
-> capture les erreurs lié aux url.
*/
app.use((req, res, next) => {
  next(HttpError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`);
});
