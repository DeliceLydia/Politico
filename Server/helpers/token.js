import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = payload => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24hrs' });

export default createToken;