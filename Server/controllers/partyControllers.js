import validateParty from '../validations/partyValidations';
import responseMessage from '../helpers/response';
import parties from '../data/partyData';

 class Parties{
     static postParty(req, res){
        const { error } = validateParty.validation(req.body)
        if (error) {
            const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
            return responseMessage.errorMessage(res, 400, message);
        }
        const admin = req.user.isAdmin;
        if(admin !== 'true'){return responseMessage.errorMessage(res, 403, 'Strictly for the admin');}
        const findName = parties.find(p => p.name === req.body.name);
        if(findName){return responseMessage.errorMessage(res, 400, 'Name already exist');}
        
        const findLogo = parties.find(l => l.logoUrl === req.body.logoUrl);
        if(findLogo){return responseMessage.errorMessage(res, 400, 'LogoUrl already exist');}

        const partyId = parseInt(parties.length + 1);
        const{name , hqAddress, logoUrl} = req.body;
        const newParty = {partyId, name, hqAddress, logoUrl};
        parties.push(newParty);
        return responseMessage.successUser(res, 201, 'party created successfully!', {partyId: newParty.partyId, name: newParty.name, logoUrl: newParty.logoUrl} );
     }
     static getOne(req, res){
        const admin = req.user.isAdmin;
        if(admin !== 'true'){return responseMessage.errorMessage(res, 403, 'Strictly for the admin');}
        
        const party = parties.find(p => p.partyId === parseInt(req.params.partyId));
        if(!party){return responseMessage.errorMessage(res, 404, 'Political party not found');}
        else{return responseMessage.successUser(res, 200, {partyId: party.partyId, name: party.name, logoUrl: party.logoUrl});}
     }
     static getAll(req, res){
        const admin = req.user.isAdmin;
        if(admin !== 'true'){return responseMessage.errorMessage(res, 403, 'Strictly for the admin');}
        if(!parties){return responseMessage.errorMessage(res, 404, 'no Political party found');}
        else{return responseMessage.successUser(res, 200, parties);}

     }
     static DeleteOne(req,res){
        const admin = req.user.isAdmin;
        if(admin !== 'true'){return responseMessage.errorMessage(res, 403, 'Strictly for the admin');}
        const party = parties.find(p => p.partyId === parseInt(req.params.partyId));
        if(!party){return responseMessage.errorMessage(res, 404, 'Political party not found');}
        const index = parties.indexOf(party);
        parties.splice(index, 1);
        return responseMessage.successWithNoData(res, 200, 'Political party has been deleted successfully');
     }
 }
 export default Parties;