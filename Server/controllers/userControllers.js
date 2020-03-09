import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {validateSignup, validateSignin} from '../validations/userValidations';
import users from '../data/userData';
import responseMessage from '../helpers/response';

dotenv.config();

class Users {
    static signup(req, res) {
        const { error } = validateSignup.validation(req.body)
        if (error) {
            const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
            return responseMessage.errorMessage(res, 400, message);
        }
        const user = users.find(u => u.email === req.body.email);
        if (user) { return responseMessage.errorMessage(res, 400, 'Email already exist'); }
        const hash = bcrypt.hashSync(req.body.password.trim(),10);
        const userId = parseInt(users.length + 1);
        const{firstname, lastname, othername, phoneNumber, email, passportUrl, isAdmin} = req.body;
        const newUser = {userId, firstname, lastname, othername, phoneNumber, email, password: hash, passportUrl, isAdmin};
        const payload = {email: newUser.email, isAdmin: newUser.isAdmin};
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });
        users.push(newUser);
        return responseMessage.successWithData(res, 201, 'user created successfully!', token, newUser );

    }
    static signin(req,res) {
        const { error } = validateSignin.validation(req.body)
        if (error) {
            const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
            return responseMessage.errorMessage(res, 400, message);
        }
        
        const user = users.find(u => u.email === req.body.email);
        
        if(!user){return responseMessage.errorMessage(res, 400, 'Incorrect email or password');}

        const password = bcrypt.compareSync(req.body.password.trim(), user.password);
        if(!password) {return responseMessage.errorMessage(res, 400, 'incorrect email or password');}

        const payload = {email: user.email, isAdmin: user.isAdmin};
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });
        return responseMessage.successWithData(res, 200, 'signed in successfully!', token, {email: user.email} );

    }
}
export default Users;
