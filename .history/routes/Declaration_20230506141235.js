const Declaration = require("../models/Declaration");


const router = require("express").Router();

router.post("/Declaration", async (req, res) => {
  const newDeclaration = new Declaration({    
    Declaration:req.body.Declaration,
    date: req.body.date,
 

  });

  try {
    const savedDeclaration = await newDeclaration.save();
    res.status(201).json(savedDeclaration);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedDeclaration = await Declaration.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDeclaration);
  } catch (err) {
    res.status(500).json(err);
  }
});


//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Declaration.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET EMPLOYEE
router.get("/find/:id", async (req, res) => {
  try {
    const declaration = await Declaration.findById(req.params.id);
    const { password, ...others } = declaration._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Employees
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const Employees = query
      ? await Employee.find().sort({ _id: -1 }).limit(5)
      : await Employee.find();
    res.status(200).json(Employees);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
