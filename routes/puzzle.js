const express = require("express");
const {
    addPuzzle,
    updatePuzzle,
    checkAnswer,
    getAllPuzzle,
    deletePuzzle
} = require("../controllers/puzzle");

const  verifyToken  = require( "../middleware/auth.js");

const router = express.Router();

router.post('/add', verifyToken, addPuzzle);
router.put('/update', verifyToken, updatePuzzle),
router.post('/checkAnswer', verifyToken, checkAnswer)
router.get('/', verifyToken, getAllPuzzle)
router.delete('/delete', verifyToken, deletePuzzle)

module.exports = router;
