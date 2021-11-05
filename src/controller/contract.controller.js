const { ContractRepository } = require('../repository');

const findOne = async (req, res) => {
  const {
    profile,
    params: { id: contractId }
  } = req;

  try {
    const data = await ContractRepository.findOne(profile, contractId);

    if (!data) {
      return res.status(404).json({
        message: 'The contract doesn\'t exist or does not belong to you'
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: process.env.NODE_ENV === 'development'
        ? err.message
        : 'An error has occurred while processing the request'
    });
  }
};

const findAll = async (req, res) => {
  const { profile } = req;

  try {
    const data = await ContractRepository.findAll(profile);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: process.env.NODE_ENV === 'development'
        ? err.message
        : 'An error has occurred while processing the request'
    });
  }
};

module.exports = {
  findOne,
  findAll
};
