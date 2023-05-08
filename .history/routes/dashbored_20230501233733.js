const Order = require("../models/Order");


const router = require("express").Router();


// GET MONTHLY INCOME
//profit

router.get("/monthly-amounts", async (req, res) => {
    const currentDate = new Date();
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  
    try {
      const data = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: previousMonthStart,
              $lt: currentMonthStart
            }
          }
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            totalAmount: { $sum: "$amount" }
          }
        },
        {
          $project: {
            _id: 0,
            month: "$_id",
            totalAmount: 1
          }
        }
      ]);
      
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/stats", async (req, res) => {
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
  
  module.exports = mongoose.model("Order", OrderSchema);
  