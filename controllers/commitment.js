const Commitment= require("../models/Commitment.js");
const shuffle = require('../middleware/helper.js');

/* CREATE */
const createCommitmentOrStatement = async (req, res) => {
  try {
    const {
      commitment_statement,
      commitment_text
    } = req.body;
    console.log(req.body)

    const { user } = req.user;
    if(commitment_statement!==1 && commitment_statement!==0 )
    {
        return res.status(400).json({"message":"Invalid commitment or statement type"})
    }
    let complete=true
    if(commitment_statement===0 )
    {
      complete=false
    }
    const newCategory = new Commitment({
        user_id:user._id,
        commitment_statement,
        commitment_text,
        complete
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
          {commitment_statement:0},
          {commitment_text: reg}
        ]});
       res.status(200).json(category);
      } else {
        const category = await Commitment.find({commitment_statement:0});
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
          {commitment_statement:1},
          {commitment_text: reg}
        ]});
        res.status(200).json(category);
      } else {
        const category = await Commitment.find({commitment_statement:1});
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
    const commitments = Commitment.find({
      $and: [
        {category_id: {
          $in: user.interests
        }},
        {
          is_commitment: true
        }
      ]
    });
    const output = shuffle(commitments)
    return res.status(200).json(output.slice(0, 3));
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

const randomStatement = async (req, res) => {
  const {user} = req.user;
  try {
    const commitments = Commitment.find({
      $and: [
        {category_id: {
          $in: user.interests
        }},
        {
          is_commitment: false
        }
      ]
    });
    const output = shuffle(commitments)
    return res.status(200).json(output.slice(0, 3));
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
  module.exports ={createCommitmentOrStatement,getAllCommitment,getAllStatement,deleteCommitment,updateCommitment,takeAction, randomCommitment, randomStatement}