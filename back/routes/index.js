const express = require("express");
const router = express.Router();
const userRoutes = require("../routes/user");
const clientRoutes = require("../routes/client");
const serviceRoutes = require("../routes/service");
const productRoutes = require("../routes/product");

router.use("/user", userRoutes);
router.use("/client", clientRoutes);
router.use("/service", serviceRoutes);
router.use("/product", productRoutes);

module.exports = router;
