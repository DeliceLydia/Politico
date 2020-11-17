import joi from 'joi';

const validateParty = {
  validation(party) {
    const schema = {
      name: joi.string().min(3).max(6).required(),
      hqaddress: joi.string().min(6).max(9).required(),
      logourl: joi.string().required(),
    };
    return joi.validate(party, schema);
  },
};
export default validateParty;
