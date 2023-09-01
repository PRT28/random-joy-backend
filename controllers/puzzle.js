const Puzzle = require("../models/Puzzle")

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
            res.status(201).json(newPost);
        } else {
            const newPuzzle = new Puzzle({
                question,
                questionType,
                answer
            })

            await newPuzzle.save();
            res.status(201).json(newPost);
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

        const {puzzleId: id} = req.params;

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

            await newPuzzle.findByIdAndUpdate(id, newPuzzle)
                    .then(() => {
                        res.status(201).json(newPost);
                    })
        } else {
            const newPuzzle = new Puzzle({
                question,
                questionType,
                answer
            })

            await newPuzzle.findByIdAndUpdate(id, newPuzzle)
            .then(() => {
                res.status(201).json(newPost);
            })
        }
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

const getAllPuzzle = async (req, res) => {
    try {
      const puzzle = await Puzzle.find({});
      res.status(200).json(puzzle);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = {addPuzzle, checkAnswer, updatePuzzle, getAllPuzzle}