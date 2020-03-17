import joi from './node_modules/joi';

const validateCandidate = {
  validation(candidate) {
    const schema = {
      officeid: joi.number().required(),
      partyid: joi.number().required(),
      candidate: joi.number().required(),
    };
    return joi.validate(candidate, schema);
  },
};
export default validateCandidate;
