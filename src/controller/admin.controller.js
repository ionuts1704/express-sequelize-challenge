const validator = require('validator');
const { AdminRepository } = require('../repository');

const getBestProfession = async (req, res) => {
  const { query: { start: startDate, end: endDate } } = req;

  if (!(validator.isDate(startDate) && validator.isDate(endDate))) {
    return res.status(422).json({
      message: 'Invalid parameters'
    });
  }

  try {
    const data = await AdminRepository.getBestProfession(startDate, endDate)
    res.status(200).json({
      data
    });
  } catch (err) {
    res.status(500).json({
      message: process.env.NODE_ENV === 'development'
        ? err.message
        : 'An error has occurred while processing the request'
    });
  }
}

const getBestClients = async (req, res) => {
  const { query: { start: startDate, end: endDate, limit = 2 } } = req;

  if (!(validator.isDate(startDate) && validator.isDate(endDate) && validator.isInt(limit))) {
    return res.status(422).json({
      message: 'Invalid parameters'
    });
  }

  try {
    const data = await AdminRepository.getBestClients(startDate, endDate, limit);
    res.status(200).json({
      data
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
  getBestProfession,
  getBestClients
};
