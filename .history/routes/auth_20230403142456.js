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

router.post('/login', async (req, res) => {
  try{
      const Employee = await Employee.findOne(
          {
              userName: req.body.user_name
          }
      );

      !Employee && res.status(401).json("Wrong User Name");

      const hashedPassword = CryptoJS.AES.decrypt(
        Employee.password,
          process.env.PASS_SEC
      );


      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.password;
      
      originalPassword != inputPassword && 
          res.status(401).json("Wrong Password");

      const accessToken = jwt.sign(
      {
          id: user._id,
          isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );

      const { password, ...others } = user._doc;  
      res.status(200).json({...others, accessToken});

  }catch(err){
      res.status(500).json(err);
  }

});
module.exports = router;