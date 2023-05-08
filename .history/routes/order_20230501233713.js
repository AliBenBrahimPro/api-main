const Order = require("../models/Order");


const router = require("express").Router();

//CREATE

router.post("/",  async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET last ORDER
router.get('/last', async (req, res) => {
  try {
    const lastOrder = await Order.findOne().sort({ _id: -1 }).limit(1);
    res.json(lastOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//GET One Order

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error finding order" });
  }
});

// //GET ALL

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
