const Commitment= require("../models/Commitment.js");

/* CREATE */
const createCommitmentOrStatement = async (req, res) => {
  try {
    const {
      commitment_statement,
      commitment_text
    } = req.body;
    console.log(req.body)

    const user = req.user;
    if(commitment_statement!==1 && commitment_statement!==0 )
    {
        return res.status(400).json({"message":"Invalid commitment or statement type"})
    }
    const newCategory = new Commitment({
        user_id:user.id,
        commitment_statement,
        commitment_text
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
      const category = await Commitment.find({commitment_statement:0});
      res.status(200).json(category);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
  const getAllStatement = async (req, res) => {
    try {
      const category = await Commitment.find({commitment_statement:1});
      res.status(200).json(category);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  module.exports ={createCommitmentOrStatement,getAllCommitment,getAllStatement}