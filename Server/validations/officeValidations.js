import joi from './node_modules/joi';

const validateOffice = {
  validation(office) {
    const schema = {
      type: joi.string().required(),
      name: joi.string().required(),
    };
    return joi.validate(office, schema);
  },
};
export default validateOffice;
