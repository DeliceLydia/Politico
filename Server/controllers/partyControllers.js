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
        const findName = parties.find(p => p.name === req.body.name);
        if(findName){return responseMessage.errorMessage(res, 400, 'Name already exist');}
        
        const findLogo = parties.find(l => l.logoUrl === req.body.logoUrl);
        if(findLogo){return responseMessage.errorMessage(res, 400, 'LogoUrl already exist');}

        const id = parseInt(parties.length + 1);
        const{name , hqAddress, logoUrl} = req.body;
        const newParty = {id, name, hqAddress, logoUrl};
        parties.push(newParty);
        return responseMessage.successUser(res, 201, 'party created successfully!', newParty);
     }
 }
 export default Parties;