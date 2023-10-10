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
      role,
      zip_code    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      status:true,
      password: passwordHash,
      gender,
      zip_code,
      role,
      interests: [],
      completed_task: 0,
      uncompleted_task: 0,
      last_seen_ad: new Date().toISOString(),
      is_skipped: false,
  
    });
    const savedUser = await newUser.save();
    const {password: pwd, ...filteredUser} = savedUser 
    res.status(201).json(filteredUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
const login = async (req, res) => {
  try {
    console.log(req.body)
    const {email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const user = {
        username: 'randomjoy_superadmin',
        email,
        status: true,
        zip_code: 0,
        gender: 'male',
        role: 0
      }
      const token = jwt.sign({user}, process.env.JWT_SECRET,{
        expiresIn: "24h",
      });
      return ({
         token,
         user 
      })
    }
    const user = await User.findOne({ email: email});
    if (!user) return res.status(400).json({ msg: "User does not exist. " });
    // if (user.status===false) return res.status(400).json({ msg: "Account is diabled" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({user}, process.env.JWT_SECRET,{
        expiresIn: "24h",
      });
    delete user["password"];
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAllUser = async (req, res) => {
  try {
    const search = req.query.search
    if (search) {
      const reg = new RegExp(search)
      const user = await User.find({$or: [
        {username: reg},
        {email: reg}
      ]});
      res.status(200).json(user); 
    } else {
      const user = await User.find({})
      res.status(200).json(user);
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changeUserStatus = async (req, res) => {
  try {
    const{id}=req.params.id
    const user = await User.findById(id);
    user.status = !user.status;
    await User.findByIdAndUpdate(id, user)
    .then(() => {
        res.status(201).json({
          success: true,
          message: !user.status ? 'User Deactivated Successfully' : 'User Activated Successfully'
        });
    })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const authDetails = (req, res) => {
  res.status(200).json({ ...req.user });
}

const updateUser= async (req, res) => {
  try {
    const{id}=req.params.id
    const {
      username,
      email,
      password,
      gender,
      zip_code,
    } = req.body;
    const { user } = req.user;
    if(!user){
      return  res.status(403).json({"message":"unauthorize"})
    }
    const user_present = await User.findById(id);
    if((user_present._id===user._id)||(user_present.role>user.role ))
    {
      await User.findByIdAndUpdate(id,{
        username,
        email,
        password,
        gender,
        zip_code,
        role:user.role
      } )
      .then(() => {
          res.status(201).json({
            success: true,
            message: "User updated Successfully"
          });
      })
    }
    else{
        res.status(403).json({"message":"unauthorize"})
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const permanentDeleteUser=async (req, res) => {
  try {
    const{id}=req.params.id
    const { user } = req.user;
    const user_present = await User.findById(id);
    if((user_present._id===user._id)||(user_present.role>user.role ))
    {
      await User.findByIdAndDelete(id)
      .then(() => {
          res.status(201).json({
            success: true,
            message: "User Deleted Successfully"
          });
      })
    }
    else{
        res.status(403).json({"message":"unauthorize"})
    }


  }catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const updateUserInterest = async (req, res) => {

  try {
    const {id} = req.params.id
    const interests = req.body
    const user = await User.findById(id);
    user.interests = interests;
    await User.findByIdAndUpdate(id, user).then(() => {
      res.status(201).json({
        success: true,
        message: "User Interests Updated Successfully"
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

const skipInterest = async (req, res) => {
  try {
    const {id} = req.params.id;
    const user = await User.findById(id);
    user.is_skipped = true;
    await User.findByIdAndUpdate(id, user).then(() => {
      res.status(201).json({
        success: true,
        message: "Interest selection skipped"
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports={register,login,getAllUser, changeUserStatus,authDetails,updateUser,permanentDeleteUser, updateUserInterest, skipInterest}
