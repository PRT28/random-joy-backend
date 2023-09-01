const express = require("express");
const {
    addPuzzle,
    updatePuzzle,
    checkAnswer,
    getAllPuzzle
} = require("../controllers/puzzle");

const  verifyToken  = require( "../middleware/auth.js");

const router = express.Router();

router.post('/add', verifyToken, addPuzzle);
router.put('/update', verifyToken, updatePuzzle),
router.post('/checkAnswer', verifyToken, checkAnswer)
router.get('/getAllPuzzle', verifyToken, getAllPuzzle)

module.exports = router;
