const { Op } = require('sequelize');
const { Profile, Contract } = require('../model');

const attributes = ['id', 'firstName', 'lastName', 'profession'];

/**
 * Returns a contract that belongs to the current user.
 * @param {profile: Object}
 * @param {contractId: number}
 * @returns {Object}
 */
const findOne = async (profile, contractId) => {
  const contract = await Contract.findOne({
    where: {
      id: contractId,
      [Op.or]: {
        ClientId: profile.id,
        ContractorId: profile.id
      }
    },
    include: [{
      model: Profile,
      as: 'Client',
      attributes
    }, {
      model: Profile,
      as: 'Contractor',
      attributes
    }]
  });

  return contract;
}

/**
 * Returns a list of contracts belonging to a user.
 * @param {profile: Object} input
 * @returns {Object[]}
 */
const findAll = async (profile) => {
  const contracts = await Contract.findAll({
    where: {
      [Op.or]: {
        ClientId: profile.id,
        ContractorId: profile.id
      },
      status: { [Op.ne]: 'terminated' }
    },
    include: [{
      model: Profile,
      as: 'Client',
      attributes
    }, {
      model: Profile,
      as: 'Contractor',
      attributes
    }]
  });

  return contracts;
};

module.exports = {
  findOne,
  findAll
};
