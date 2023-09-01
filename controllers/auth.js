const bcrypt= require("bcrypt");
const jwt=require ("jsonwebtoken");
const User= require("../models/User.js");

/* REGISTER USER */
 const register = async (req, res) => {
    console.log(req.body)
  try {
    const {
      username,
      email,
      password,
      gender,
      zip_code,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      status:true,
      password: passwordHash,
      gender,
      zip_code,
      role:1
    });
    const savedUser = await newUser.save();
    delete savedUser["password"];
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
const login = async (req, res) => {
  try {
    console.log(req.body)
    const {email, password } = req.body;
    const user = await User.findOne({ email: email});
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET,{
        expiresIn: "24h",
      });
    delete user["password"];
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={register,login}