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
    const lastOrders = await Order.find().sort({ _id: -1 }).limit(4);
    res.json(lastOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// GET 4 Most Ordered Products

router.get('/mostorderedproducts', async (req, res) => {
  try {
    const mostOrderedProducts = await Order.aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.productId",
          totalQuantity: { $sum: "$products.quantity" },
          productName: { $first: "$products.productname" },
          image: { $first: "$products.Image" }
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 4 }
    ]);

    res.status(200).json(mostOrderedProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET user payment count
router.get("/userpaymentcount", async (req, res) => {
  try {
    const cashCount = await Order.countDocuments({ paymentMethod: "cash" });
    const cardCount = await Order.countDocuments({ paymentMethod: "card" });

    res.status(200).json({ cashCount, cardCount });
  } catch (err) {
    res.status(500).json(err);
  }
});




// GET 3 most Dominant Categories  according to ordered products

router.get('/mostdominantcategories', async (req, res) => {
  try {
    const mostDominantCategories = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalQuantity: { $sum: "$products.quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 3 }
    ]);

    res.status(200).json(mostDominantCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/product-counts', (req, res) => {
  Order.aggregate([
    // $unwind pour dérouler la liste des produits de chaque commande
    { $unwind: '$items' },
    // $lookup pour lier les informations du produit avec l'ID de produit de chaque commande
    {
      $lookup: {
        from: 'products', // nom de la collection de produits
        localField: 'items.product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    // $unwind pour dérouler les informations de chaque produit
    { $unwind: '$productDetails' },
    // $group pour regrouper les produits par catégorie et compter leur nombre
    {
      $group: {
        _id: '$productDetails.category', // groupement par catégorie
        count: { $sum: '$items.quantity' }, // compter le nombre total de produits
      },
    },
    // $sort pour trier les résultats par ordre décroissant de nombre de produits
    { $sort: { count: -1 } },
  ])
  .then(result => {
    res.status(200).json(result); // renvoyer les résultats de l'agrégation sous forme JSON
  })
  .catch(err => {
    console.error(err); // gérer les erreurs éventuelles
    res.status(500).json({ message: 'Internal server error' }); // renvoyer une réponse d'erreur générique
  });
});

  module.exports = router;
