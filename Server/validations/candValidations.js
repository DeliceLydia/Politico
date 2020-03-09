import joi from 'joi';

const validateCandidate = {
    validation(candidate) { 
        const schema = {
          partyId: joi.number().required(),
          candidateId: joi.number().required()
        };
        return joi.validate(candidate, schema);
      }
    }
export default validateCandidate;