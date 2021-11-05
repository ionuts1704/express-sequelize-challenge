const { Profile } = require('../model');

const getProfileMiddleware = async (req, res, next) => {
  const profile = await Profile.findOne({
    where: { id: req.get('profile_id') || 0 }
  });

  if (!profile) {
    return res.status(401).end();
  }

  req.profile = profile;

  next();
};

module.exports = getProfileMiddleware;
