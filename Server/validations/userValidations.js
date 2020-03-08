import joi from 'joi';

const validateSignup = {
    validation(signup) {
        const schema = {
            firstname: joi.string().min(4).max(6).trim().required(),
            lastname: joi.string().min(4).max(6).trim().required(),
            othername: joi.string().min(4).max(6).trim().required(),
            phoneNumber: joi.string().min(8).max(10).trim().required(),
            email: joi.string().email({ minDomainAtoms: 2 }).trim().required(),
            password:  joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).trim().required(),
            passportUrl: joi.string().trim().required(),
            isAdmin: joi.boolean().optional()
        }; 
        return joi.validate(signup, schema);
    }
}
const validateSignin = {
    validation(returningUser) { 
        const schema = {
          email: joi.string().required(),
          password: joi.string().required(),
        };
        return joi.validate(returningUser, schema);
      }
    }
export {validateSignup, validateSignin};