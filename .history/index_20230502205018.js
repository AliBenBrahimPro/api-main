const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const employeeRoute = require("./routes/employees");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const dashboredRoute=require("./routes/dashbored")
const  bodyParser = require('body-parser')
const cors = require("cors");
dotenv.config();

mongoose
  .connect(process.env.MANGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });



app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(bodyParser.json());

  app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  })

  
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/Employees", employeeRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/Dashbored", dashboredRoute);
app.use("/api/salut", dashboredRoute);



app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend Server running on port ${process.env.PORT}`);
});
