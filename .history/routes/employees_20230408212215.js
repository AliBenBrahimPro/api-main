const Employee = require("../models/Employee");


const router = require("express").Router();



//UPDATE
router.put("/:id",  async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET EMPLOYEE
router.get("/find/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const { password, ...others } = employee._doc;
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
