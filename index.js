require("dotenv").config({ path: "./.env" });
const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");


// Connect MongoDB
const { dbConnect } = require("./databaseConfig/connectDatabase");
dbConnect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

const port = process.env.PORT || 8080;


// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:5173", // React frontend origin
  credentials: true,
}));


//routes

const authRoutes = require("./routes/auth.routes");
const adminOrderRoutes = require("./routes/admin/order.routes");
const adminProductRoutes = require("./routes/admin/product.routes");
const cartRoutes = require("./routes/user/cart.routes");
const orderRoutes = require("./routes/user/order.routes");
const buildRoutes = require("./routes/user/build.routes");


//use routes
app.use("/api", authRoutes);
app.use("/", adminOrderRoutes);
app.use("/", adminProductRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", buildRoutes);




app.get('/', (req, res) => {
  res.send('E-commeerce Backend is running!');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
