const router = require("express").Router();
const Employee = require("../models/Employee");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newEmployee = new Employee({
    username: req.body.username,
    email: req.body.email,
    img:req.body.img,
    dob:req.body.dob,
    phone:req.body.phone,
    address:req.body.address
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN

router.post("/login", async (req, res) => {
  try {
    const employee = await Employee.findOne({ username: req.body.username });
    !employee && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      employee.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: employee._id,
        isAdmin: employee.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = employee._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;