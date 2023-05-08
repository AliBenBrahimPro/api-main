const router = require("express").Router();
const Employee = require("../models/Employee");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newEmployee = new Employee({
    username: req.body.username,
    email: req.body.email,
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
    const emp = await Employee.findOne({ username: req.body.username });
    !emp && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      emp.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: emp._id,
        isAdmin: emp.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    const { password, ...others } = emp._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;