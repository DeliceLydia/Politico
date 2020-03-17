import express from 'express';
import UsersControllers from '../controllers/usersControllers';
import PartyControllers from '../controllers/partyControllers';
import OfficeControllers from '../controllers/officesControllers';
import VotesControllers from '../controllers/votesControllers';
import auth from '../middleware/auth';

const router = express.Router();

// user Routes //
router.post('/api/v1/auth/signup', UsersControllers.signup);
router.post('/api/v1/auth/signin', UsersControllers.signin);

// Party Routes //
router.post('/api/v1/parties', auth, PartyControllers.postParty);
router.get('/api/v1/parties/:partyid', auth, PartyControllers.getOne);
router.get('/api/v1/parties', auth, PartyControllers.getAll);
router.delete('/api/v1/parties/:partyid', auth, PartyControllers.DeleteOne);

// Office Routes //
router.post('/api/v1/offices', auth, OfficeControllers.postOffice);
router.post('/api/v1/offices/:officeid/register', auth, OfficeControllers.CandidateRegister);
router.get('/api/v1/offices/:officeid', auth, OfficeControllers.getOne);
router.get('/api/v1/offices', auth, OfficeControllers.getAll);
router.delete('/api/v1/offices/:officeid', auth, OfficeControllers.deleteOne);

// votes Routes //
router.post('/api/v1/votes', auth, VotesControllers.vote);


export default router;
