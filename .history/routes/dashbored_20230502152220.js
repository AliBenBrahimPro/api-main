const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");


const router = require("express").Router();


// GET MONTHLY INCOME
router.get("/income", async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Get order (count)
router.get("/number_Order", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Total Stock
router.get("/totalstock", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(400).json({ message: "No products found" });
    }
    let totalStockValue = 0;

    products.forEach((product) => {
      const productStockValue = product.price * product.stock;
      totalStockValue += productStockValue;
    });

    res.status(200).json({ totalStockValue });
  } catch (err) {
    res.status(500).json(err);
  }
});
  

//GET user(count)
router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET last 5 ORDERS
router.get('/lastfiveorder', async (req, res) => {
  try {
    const lastOrders = await Order.find().sort({ _id: -1 }).limit(5);
    res.json(lastOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  module.exports = router;
