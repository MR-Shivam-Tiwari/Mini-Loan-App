const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');

router.post('/submit', async (req, res) => {
  try {
    const { loanAmount, loanTerm, startDate, userEmail } = req.body;
    const loan = new Loan({ loanAmount, loanTerm, startDate, userEmail });

    const repaymentAmount = loanAmount / loanTerm;
    const scheduledRepayments = [];
    for (let i = 1; i <= loanTerm; i++) {
      const repaymentDate = new Date(startDate);
      repaymentDate.setMonth(repaymentDate.getMonth() + i * 3);
      scheduledRepayments.push({
        repaymentDate,
        repaymentAmount,
        state: 'Unpaid'
      });
    }
    loan.scheduledRepayments = scheduledRepayments;

    await loan.save();
    res.json({ message: 'Loan submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Pay off a scheduled repayment
router.put('/:loanId/repayments/:repaymentId/pay', async (req, res) => {
  const { loanId, repaymentId } = req.params;
  try {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    const repayment = loan.scheduledRepayments.id(repaymentId);
    if (!repayment) {
      return res.status(404).json({ error: 'Repayment not found' });
    }

    if (repayment.state === 'Unpaid') {
      repayment.state = 'Paid';
      await loan.save();
      res.json({ message: 'Repayment paid successfully', updatedRepayment: repayment });
    } else {
      return res.status(400).json({ error: 'Repayment has already been paid' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});




router.get('/getloan', async (req, res) => {
  try {
    const userEmail = req.query.email; // Retrieve email from query parameters
    const loans = await Loan.find({ userEmail }); // Filter loans by userEmail
    res.json(loans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/checkloan', async (req, res) => {
  try {
    const loans = await Loan.find(); // Fetch all loans
    res.json(loans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:loanId/repayments', async (req, res) => {
  const loanId = req.params.loanId;
  try {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(loan.scheduledRepayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.put('/:loanId/approve', async (req, res) => {
  const loanId = req.params.loanId;
  try {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    // Update loan state to "APPROVED"
    loan.state = 'APPROVED';
    await loan.save();
    res.json({ message: 'Loan approved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
