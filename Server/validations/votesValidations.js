import joi from './node_modules/joi';

const validateVotes = {
  validation(voter) {
    const schema = {
      createdon: joi.string().required(),
      voterid: joi.number().required(),
      officeid: joi.number().required(),
      candidate: joi.number().required(),
    };
    return joi.validate(voter, schema);
  },
};
export default validateVotes;
