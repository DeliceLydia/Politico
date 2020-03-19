import joi from 'joi';

const validateVotes = {
  validation(voter) {
    const schema = {
      voterid: joi.number().required(),
      officeid: joi.number().required(),
      candidate: joi.number().required(),
    };
    return joi.validate(voter, schema);
  },
};
export default validateVotes;
