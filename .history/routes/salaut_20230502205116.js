const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");


const router = require("express").Router();




// GET 5 Most Ordered Products
router.get('/mostorderedproducts', async (req, res) => {
  try {
    const mostOrderedProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "productId",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          _id: 0,
          productId: "$_id",
          productName: "$product.productname",
          totalQuantity: 1,
        },
      },
      
    ]);

    res.status(200).json(mostOrderedProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});


  module.exports = router;
