const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  loanAmount: {
    type: Number,
    required: true
  },
  loanTerm: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  userEmail: { // Add userEmail field to store user's email
    type: String,
    required: true
  },
  state: {
    type: String,
    default: 'PENDING'
  },
  scheduledRepayments: [{
    repaymentDate: {
      type: Date,
      required: true
    },
    repaymentAmount: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      default: 'Unpaid'
    }
  }]
});

module.exports = mongoose.model('Loan', loanSchema);