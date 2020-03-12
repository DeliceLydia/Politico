import validateOffice from '../validations/officeValidations';
import validateCandidate from '../validations/candValidations';
import responseMessage from '../helpers/response';
import sql from '../helpers/queries';
import pool from '../config/connect';


class OfficesControllers {
  static async postOffice(req, res) {
    const { error } = validateOffice.validation(req.body);
    if (error) {
      const message = error.details.map((item) => item.message.replace(/"/g, '')).join(', ');
      return responseMessage.errorMessage(res, 400, message);
    }
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }
    const nameValue = req.body.name;
    const partyName = await pool.query(sql.findPartyName, [nameValue]);
    if (partyName.rows[0]) { return responseMessage.errorMessage(res, 406, 'Name already exist'); }

    const { type, name } = req.body;
    const newOffice = { type, name };
    const result = await pool.query(sql.postOffice, [newOffice.type, newOffice.name]);
    return responseMessage.successUser(res, 201, 'office created successfully!', { officeid: result.rows[0].officeid, type: result.rows[0].type, name: result.rows[0].name });
  }

  static async CandidateRegister(req, res) {
    const { error } = validateCandidate.validation(req.body);
    if (error) {
      const message = error.details.map((item) => item.message.replace(/"/g, '')).join(', ');
      return responseMessage.errorMessage(res, 400, message);
    }
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }
    const idValue = req.body.id;
    const candidateId = await pool.query(sql.findCandidate, [idValue]);
    if (candidateId.rows[0]) { return responseMessage.errorMessage(res, 406, 'id already exist'); }

    const partyValue = req.body.partyid;
    const { rows } = await pool.query(sql.getOne, [partyValue]);
    if (!rows.length > 0) { return responseMessage.errorMessage(res, 404, 'Political party not found'); }
    const officeValue = req.params.officeid;
    const value = await pool.query(sql.findOffice, [officeValue]);
    if (value.length > 0) { return responseMessage.errorMessage(res, 404, 'Political office not found'); }

    const candidateValue = req.body.candidate;
    const valueCand = await pool.query(sql.findCandidate, [candidateValue]);
    if (valueCand.rows[0]) { return responseMessage.errorMessage(res, 406, 'Candidate already exist!'); }
    const { officeid, partyid, candidate } = req.body;
    const newCandidate = { officeid, partyid, candidate };
    await pool.query(sql.registerCand, [newCandidate.officeid, newCandidate.partyid, newCandidate.candidate]); return responseMessage.successUser(res, 201, 'candidate registered successfully!', { officeid, candidate });
  }

  static async getOne(req, res) {
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }
    const officeId = req.params.officeid;
    const { rows } = await pool.query(sql.findOffice, [officeId]);
    if (!rows.length > 0) { return responseMessage.errorMessage(res, 404, 'office not found'); } return responseMessage.successUser(res, 200, rows[0]);
  }

  static async getAll(req, res) {
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }
    const offices = await pool.query(sql.allOffices);
    if (!offices.rows[0]) { return responseMessage.errorMessage(res, 404, 'no Political office found'); }
    return responseMessage.successUser(res, 200, offices.rows);
  }

  static async deleteOne(req, res) {
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }
    const officeId = req.params.officeid;
    const { rows } = await pool.query(sql.findOffice, [officeId]);
    if (!rows.length > 0) { return responseMessage.errorMessage(res, 404, 'office not found'); }
    await pool.query(sql.deleteOffice, [officeId]);
    return responseMessage.successWithNoData(res, 200, 'Political office has been deleted successfully');
  }
}
export default OfficesControllers;
