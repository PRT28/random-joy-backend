const Commitment= require("../models/Commitment.js");
const shuffle = require('../middleware/helper.js');

/* CREATE */
const createCommitmentOrStatement = async (req, res) => {
  try {
    const {
      is_commitment,
      suggestion_text,
      category_id
    } = req.body;
    console.log(req.body)

    const { user } = req.user;
    if(is_commitment!==1 && is_commitment!==0 )
    {
        return res.status(400).json({"message":"Invalid commitment or statement type"})
    }
    let complete=true
    if(is_commitment===0 )
    {
      complete=false
    }
    const newCategory = new Commitment({
        user_id:user._id,
        is_commitment,
        suggestion_text,
        complete,
        add_user:user._id,
        mod_user:user._id,
        category_id
      });
        await newCategory.save();
        res.status(201).json(newCategory);
    
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};
/* READ */
const getAllCommitment = async (req, res) => {
    try {
      const { search } = req.query
      if ( search ) {
        const reg = new RegExp(search)
        const category = await Commitment.find({$and: [
          {is_commitment:0},
          {suggestion_text_: reg}
        ]});
       res.status(200).json(category);
      } else {
        const category = await Commitment.find({is_commitment:0});
        res.status(200).json(category);
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  const getAllStatement = async (req, res) => {
    try {
      const { search } = req.query
      if ( search ) {
        const reg = new RegExp(search)
        const category = await Commitment.find({$and: [
          {is_commitment:1},
          {suggestion_text: reg}
        ]});
        res.status(200).json(category);
      } else {
        const category = await Commitment.find({is_commitment:1});
        res.status(200).json(category);
      }
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  const deleteCommitment = async (req, res) => {
    try {
      const {id}=req.params;
      const { user } = req.user;
      if(user.role===2)
    {
      return res.status(400).json({ message: "Only Admins Are allowed to Delete." });
    }
    else{
      await Commitment.findByIdAndDelete(id);
      const cat=Commitment.find({})
      res.status(200).json(cat);
    }
    }catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  /* UPDATE */
const updateCommitment = async (req, res) => {
  const {id} = req.params;
  try {
    const {
      commitment_statement,
      commitment_text
    } = req.body;
    const { user } = req.user
    if(!user || user.role==2)
    {
      return  res.status(400).json({ message: "Only Admins Are allowed to update Commitment and statement." });
    }
    const old = await Commitment.findById(id);
    
    if(!old){
     return res.status(400).json({ message: "Commitment or statement do not exists donot exists."});
    }
    

      await Commitment.findByIdAndUpdate(id, {commitment_statement,commitment_text,user_id:user._id}).then(() => res.status(201).json({
          success: true,
          message: "Commitment or statement updated successfully"
        }))
  
  
  } catch(err) {    
      res.status(500).json({ error: err.message });
  }
};
const takeAction = async (req, res) => {
  const{id}=req.params;
  try {
    const commitment = await Commitment.findById(id);
    commitment.$set('complete', true);
    commitment.save()
    return res.status(200).json(commitment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const randomCommitment = async (req, res) => {
  const {user} = req.user;
  try {
    if (user.interests.length !== 0) {
      const commitments = await Commitment.find({
        $and: [
          {category_id: {
            $in: user.interests
          }},
          {
            is_commitment: 0
          }
        ]
      });
      const output = shuffle(commitments)
      return res.status(200).json(output.slice(0, 3));
    } else {
      const commitments = await Commitment.find({
        is_commitment: 0
      });
      const output = shuffle(commitments)
      return res.status(200).json(output.slice(0, 3));
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const randomStatement = async (req, res) => {
  const {user} = req.user;
  try {
    if (user.interests.length !== 0) {
      const commitments = await Commitment.find({
        $and: [
          {category_id: {
            $in: user.interests
          }},
          {
            is_commitment: 1
          }
        ]
      });
      const output = shuffle(commitments)
      return res.status(200).json(output.slice(0, 3));
    } else {
      const commitments = await Commitment.find({
        is_commitment: 1
      });
      const output = shuffle(commitments)
      return res.status(200).json(output.slice(0, 3));
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
  module.exports ={createCommitmentOrStatement,getAllCommitment,getAllStatement,deleteCommitment,updateCommitment,takeAction, randomCommitment, randomStatement}