const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.user.employeeId);
    if (!employee || (employee._id.toString() !== req.params.id && !employee.isAdmin)) {
      return res.status(403).json("You are not allowed to do that!");
    }
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

const verifyTokenAndAdmin = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.user.employeeId);
    if (!employee || !employee.isAdmin) {
      return res.status(403).json("You are not allowed to do that!");
    }
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
