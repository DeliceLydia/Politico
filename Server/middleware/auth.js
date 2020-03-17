import jwt from './node_modules/jsonwebtoken';
import dotenv from './node_modules/dotenv';

dotenv.config();

const auth = (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header || header === '') return res.status(401).json({ status: 401, error: 'you are not authorized, provide the token!' });
  
      const token = jwt.verify(header, process.env.SECRET_KEY);
      req.user = token;
      next();
    } catch {
      return res.status(401).json({ status: 401, error: 'your token is Invalid!' });
    }
    return false;
  };
  
  export default auth;