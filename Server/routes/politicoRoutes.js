import express from 'express'
import Users from '../controllers/userControllers';
import Parties from '../controllers/partyControllers';
import Offices from '../controllers/officeControllers';
import auth from '../middleware/auth';

const politico_router = express.Router();

// user Routes //
politico_router.post('/api/v1/auth/signup', Users.signup);
politico_router.post('/api/v1/auth/signin', Users.signin);

// Party Routes //
politico_router.post('/api/v1/parties', auth, Parties.postParty);
politico_router.get('/api/v1/parties/:partyId', auth, Parties.getOne);
politico_router.get('/api/v1/parties', auth, Parties.getAll);
politico_router.delete('/api/v1/parties/:partyId', auth, Parties.DeleteOne);

// Office Routes //
politico_router.post('/api/v1/offices', auth, Offices.postOffice);
politico_router.get('/api/v1/offices/:officeId', auth, Offices.getOne);
politico_router.get('/api/v1/offices', auth, Offices.getAll);
politico_router.delete('/api/v1/offices/:officeId', auth, Offices.deleteOne);




export default politico_router;