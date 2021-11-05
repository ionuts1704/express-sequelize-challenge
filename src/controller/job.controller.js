const { JobRepository } = require('../repository');

const findUnpaid = async (req, res) => {
  const { profile } = req;

  try {
    const data = await JobRepository.findUnpaid(profile);
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: process.env.NODE_ENV === 'development'
        ? err.message
        : 'An error has occurred while processing the request'
    });
  }
};

const pay = async (req, res) => {
  const { profile, params: { job_id: jobId } } = req;

  if (profile.type !== 'client') {
    return res.status(403).json({
      message: 'Only clients can pay for jobs'
    });
  }

  try {
    await JobRepository.pay(profile, jobId)
    return res.status(200).json({
      message: 'The job has been successfully paid'
    });
  } catch (err) {
    res.status(422).json({
      message: err.message
    });
  }
};

module.exports = {
  findUnpaid,
  pay
};
