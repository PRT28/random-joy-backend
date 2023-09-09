const Report= require("../models/Report.js");
const Asset  =require( "../models/Asset.js");


/* CREATE */

const createReport = async (req, res) => {
    try {
      const {
        report_text,
        asset_id,
    } = req.body;
    const asset = await Asset.findById(asset_id);
    if(!asset){
        res.status(404).json({ message:"Asset doesnot exist."});
    }
    const user = req.user;
    if(!report_text ||  report_text==="" ) 
    {
        return res.status(400).json({"message":"Report test cannot be empty"})
    }
    const newCategory = new Report({
        user_id:user.id,
        report_text,
        asset_id,
        author:asset.user_id
        });
          await newCategory.save();
          res.status(201).json(newCategory);
      
    } catch(err) {    
        res.status(500).json({ error: err.message });
    }
  };
  /* READ */
  const getAllReports = async (req, res) => {
      try {
        const username = req.query.username
        if (username) {
          const reg = new RegExp(username)
          const report = await Report.aggregate([
            {
              $lookup: {
                from: 'assets',
                localField: 'asset_id',
                foreignField: '_id',
                as: 'assetDetails'
              }
            },
            {$unwind: "$assetDetails"},
            {
              $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'userDetails'
              }
            },
            {$unwind: "$userDetails"},
            {$match: {"userDetails.username": reg}}
          ]);
         
        res.status(200).json(report);
        }


else{
        const report = await Report.aggregate([
          {
            $lookup: {
              from: 'assets',
              localField: 'asset_id',
              foreignField: '_id',
              as: 'assetDetails'
            }
          },
          {$unwind: "$assetDetails"},
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'userDetails'
            }
          },
          {$unwind: "$userDetails"},
        ]);
        res.status(200).json(report);
      }
   

      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    };

    /*Update*/
    const takeAction = async (req, res) => {
        const{report_id}=req.params;
        const user=req.user
        if (user.role===2) {
            return  res.status(400).json({ message: "User does not have permission to exeute the command." });
           }
      try {
        const report = await Report.findOne({id:report_id});
        if (user.id===report.author) {
            return  res.status(400).json({ message: "Author of asset cannot take action on his asset report" });
           }
        report.$set('action', !report.action);
        report.save()
        return res.status(200).json(report);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    }

    const deleteReport = async (req, res) => {
      try {
        const {id} = req.params;
        const user=req.user
        if (user.role===2) {
              return  res.status(400).json({ message: "User does not have permission to exeute the command." });
        }
        await Report.findByIdAndDelete(id)
              .then(() => {
                res.status(200).json({
                    message: 'Report deleted successfully',
                    response: true
                })
            })
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    }
  
    module.exports ={createReport,getAllReports,takeAction, deleteReport}
