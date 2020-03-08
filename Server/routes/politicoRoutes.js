import express from 'express'
import Users from '../controllers/userControllers';
import parties from '../controllers/partyControllers';
import auth from '../middleware/auth';

const politico_router = express.Router();

// user Routes //
politico_router.post('/api/v1/auth/signup', Users.signup);
politico_router.post('/api/v1/auth/signin', Users.signin);

// Party Routes //
politico_router.post('/api/v1/parties', auth, parties.postParty);
politico_router.get('/api/v1/parties/:partyId', auth, parties.getOne);
politico_router.get('/api/v1/parties', auth, parties.getAll);
politico_router.delete('/api/v1/parties/:partyId', auth, parties.DeleteOne);



export default politico_router;