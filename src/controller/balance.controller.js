const validator = require('validator')
const { BalanceRepository } = require('../repository')

const deposit = async (req, res) => {
  const {
    profile,
    params: { userId },
    body: { amount }
  } = req;

  if (!(validator.isInt(userId) && validator.isDecimal(String(amount)))) {
    return res.status(422).json({
      message: 'Invalid parameters'
    });
  }

  try {
    const success = await BalanceRepository.deposit(profile, userId, amount);

    if (!success) {
      return res.status(422).json({
        message: 'Could not complete the deposit'
      });
    }

    return res.status(200).json({
      message: 'Deposit completed successfully'
    });
  } catch (err) {
    res.status(500).json({
      message: process.env.NODE_ENV === 'development'
        ? err.message
        : 'An error has occurred while processing the request'
    });
  }
};

module.exports = {
  deposit
};
