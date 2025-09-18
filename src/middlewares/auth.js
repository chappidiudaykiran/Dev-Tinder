const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    // verify token
      const decoded = jwt.verify(token, "Uday@123$");
      const user = await User.findById(decoded._id); // match login payload

    if (!user) {
      return res.status(401).send("Unauthorized: User not found");
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
