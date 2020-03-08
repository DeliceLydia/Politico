import joi from 'joi';

const validateParty = {
    validation(party) { 
        const schema = {
          name: joi.string().min(3).max(6).required(),
          hqAddress: joi.string().min(6).max(9).required(),
          logoUrl: joi.string().required()
        };
        return joi.validate(party, schema);
      }
    }
export default validateParty;