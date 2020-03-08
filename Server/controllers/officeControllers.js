import offices from '../data/OfficeData';
import validateOffice from '../validations/officeValidations';
import responseMessage from '../helpers/response';


class Offices{
    static postOffice(req, res){
        const { error } = validateOffice.validation(req.body)
        if (error) {
            const message = error.details.map(item => item.message.replace(/"/g, '')).join(', ');
            return responseMessage.errorMessage(res, 400, message);}
            
            const admin = req.user.isAdmin;
            if(admin !== 'true'){return responseMessage.errorMessage(res, 403, 'Strictly for the admin');}
            
            const findName = offices.find(p => p.name === req.body.name);
            if(findName){return responseMessage.errorMessage(res, 400, 'Name already exist');}

            const officeId = parseInt(offices.length + 1);
            const{type, name} = req.body;
            const newOffice = {officeId, type, name};
            offices.push(newOffice);
            return responseMessage.successUser(res, 201, 'office created successfully!', newOffice);
    }
    static getOne(req, res){
        const admin = req.user.isAdmin;
            if(admin !== 'true'){return responseMessage.errorMessage(res, 403, 'Strictly for the admin');}
            const office = offices.find(p => p.officeId === parseInt(req.params.officeId));
            if(!office){return responseMessage.errorMessage(res, 404, 'Political office not found');}
            else{return responseMessage.successUser(res, 200,office)};
    }
    static getAll(req, res){
        const admin = req.user.isAdmin;
            if(admin !== 'true'){return responseMessage.errorMessage(res, 403, 'Strictly for the admin');}
            if(!offices){return responseMessage.errorMessage(res, 404, 'no Political office found');}
            else{return responseMessage.successUser(res, 200, offices );}
    }
    static deleteOne(req, res){
        const admin = req.user.isAdmin;
            if(admin !== 'true'){return responseMessage.errorMessage(res, 403, 'Strictly for the admin');}
            const office = offices.find(p => p.officeId === parseInt(req.params.officeId));
            if(!office){return responseMessage.errorMessage(res, 404, 'Political office not found');}
            const index = offices.indexOf(office);
        offices.splice(index, 1);
        return responseMessage.successWithNoData(res, 200, 'Political office has been deleted successfully');
    }
}
export default Offices;
