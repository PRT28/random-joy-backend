const Puzzle = require("../models/Puzzle")
const User = require('../models/User.js');
const shuffle = require('../middleware/helper.js');

const addPuzzle = async (req, res) => {
    try {
        const {
            question,
            questionType,
            optionA,
            optionB,
            optionC,
            optionD,
            answer
        } = req.body

        if (questionType === 0) {
            const newPuzzle = new Puzzle({
                question,
                questionType,
                optionA,
                optionB,
                optionC,
                optionD,
                answer
            })

            await newPuzzle.save();
            res.status(201).json(newPuzzle);
        } else {
            const newPuzzle = new Puzzle({
                question,
                questionType,
                answer
            })

            await newPuzzle.save();
            res.status(201).json(newPuzzle);
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

const checkAnswer = async (req, res) => {
    try {
        const {puzzleId: id} = req.params;
        const { answer } = req.body
        const puzzle = await Puzzle.find({id});
        if (typeof answer === typeof puzzle.answer) {
            res.status(500).json({
                answerMatch: false,
                message: 'Invalid type of answer'
            })
        } else {
            if ((typeof answer === "boolean" && typeof puzzle.answer === "boolean") && answer === puzzle.answer) {
                res.status(200).json({
                    answerMatch: true,
                    message: 'Correct answer!!'
                })
            } else if (answer.toLowerCase() === puzzle.answer.toLowerCase()) {
                res.status(200).json({
                    answerMatch: true,
                    message: 'Correct answer!!'
                })
            } else {
                res.status(417).json({
                    answerMatch: false,
                    message: 'Wrong answer!!'
                })
            }
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

const updatePuzzle = async (req, res) => {
    try {
        const {
            question,
            questionType,
            optionA,
            optionB,
            optionC,
            optionD,
            answer
        } = req.body

        const {puzzleId: id} = req.query;

        if (questionType === 0) {
            const newPuzzle = {
                question,
                questionType,
                optionA,
                optionB,
                optionC,
                optionD,
                answer
            }

            await Puzzle.findByIdAndUpdate(id, newPuzzle)
                    .then(() => {
                        res.status(201).json(newPuzzle);
                    })
        } else {
            const newPuzzle = {
                question,
                questionType,
                answer
            }

            await Puzzle.findByIdAndUpdate(id, newPuzzle)
            .then(() => {
                res.status(201).json(newPuzzle);
            })
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

const getAllPuzzle = async (req, res) => {
    try {
        const { search } = req.query;
        if (search) {
            const reg = new RegExp(search)
            const puzzle = await Puzzle.find({question: reg});
            res.status(200).json(puzzle);
        } else {
            const puzzle = await Puzzle.find({});
            res.status(200).json(puzzle);
        }   
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deletePuzzle = async (req, res) => {
    try {
        const {id} = req.query;
        const user=req.user
        if (user.role===2) {
            return  res.status(400).json({ message: "User does not have permission to exeute the command." });
        }
        await Puzzle.findByIdAndDelete(id)
            .then(() => {
                res.status(200).json({
                    message: 'Puzzle deleted successfully',
                    response: true
                })
            })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  }


  const randomPuzzle = async (req, res) => {
    try {
    const {user} = req.user
      const assets = await Puzzle.find({});
      const output = shuffle(assets);
      const asset = output[0];
      await User.findByIdAndUpdate(user._id, {completed_task: user.completed_task + 1})

      return res.status(200).json(asset);
    } catch(err){
      res.status(404).json({ message: err.message });
    }
  };

module.exports = {addPuzzle, checkAnswer, updatePuzzle, getAllPuzzle, deletePuzzle, randomPuzzle}
