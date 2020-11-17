import createToken from '../helpers/token';
import payLoad from '../helpers/payLoad';
import bcrypt from 'bcrypt';
import { validateSignup, validateSignin } from '../validations/userValidations';
import responseMessage from '../helpers/response';
import sql from '../helpers/queries';
import pool from '../config/connect';


class UsersControllers {
  static async signup(req, res) {
    const { error } = validateSignup.validation(req.body);
    if (error) {
      const message = error.details.map((item) => item.message.replace(/"/g, '')).join(', ');
      return responseMessage.errorMessage(res, 400, message);
    }
    const emailValue = req.body.email;
    const userEmail = await pool.query(sql.findUser, [emailValue]);
    if (userEmail.rows[0]) { return responseMessage.errorMessage(res, 400, 'Email already exist'); }

    const numberValue = req.body.phonenumber;
    const checkNumber = await pool.query(sql.findNumber, [numberValue]);
    if (checkNumber.rows[0]) { return responseMessage.errorMessage(res, 400, 'phoneNumber already exist'); }

    const hash = bcrypt.hashSync(req.body.password.trim(), 10);
    const {
      firstname, lastname, othername, phonenumber, email, passporturl, isadmin,
    } = req.body;
    const newUser = {
      firstname, lastname, othername, phonenumber, email, password: hash, passporturl, isadmin,
    };
    const result = await pool.query(sql.addUser,
      [newUser.firstname, newUser.lastname, newUser.othername, newUser.phonenumber, newUser.email, newUser.password, newUser.passporturl, newUser.isadmin]);
    const userData = result.rows[0];
    const payload = payLoad(userData.userid, userData.email, userData.isadmin);
    res.header('Authorization', createToken(payload));
    return responseMessage.successWithData(res, 201, 'user created successfully!', createToken(payload), newUser);
  }

  static async signin(req, res) {
    const { error } = validateSignin.validation(req.body);
    if (error) {
      const message = error.details.map((item) => item.message.replace(/"/g, '')).join(', ');
      return responseMessage.errorMessage(res, 400, message);
    }

    const userEmail = req.body.email;
    const { rows } = await pool.query(sql.findUser, [userEmail]);
    if (!rows[0]) { return responseMessage.errorMessage(res, 400, 'you provided wrong credentials!'); }

    const password = bcrypt.compareSync(req.body.password.trim(), rows[0].password);
    if (!password) { return responseMessage.errorMessage(res, 400, 'you provided wrong credentials!'); }
    const { email } = rows[0];
    const payload = payLoad(rows[0].userid, rows[0].email, rows[0].isadmin);
    res.header('Authorization', createToken(payload));
    return responseMessage.successWithData(res, 200, 'signed in successfully!', createToken(payload), { email });
  }
}
export default UsersControllers;
