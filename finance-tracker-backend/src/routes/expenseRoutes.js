const express = require('express');
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All routes below are protected

router.post('/', createExpense);
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
