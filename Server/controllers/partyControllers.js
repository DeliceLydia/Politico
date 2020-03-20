import validateParty from '../validations/partyValidations';
import responseMessage from '../helpers/response';
import sql from '../helpers/queries';
import pool from '../config/connect';


class PartyControllers {
  static async postParty(req, res) {
    const { error } = validateParty.validation(req.body);
    if (error) {
      const message = error.details.map((item) => item.message.replace(/"/g, '')).join(', ');
      return responseMessage.errorMessage(res, 400, message);
    }
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }

    const nameValue = req.body.name;
    const partyName = await pool.query(sql.findPartyName, [nameValue]);
    if (partyName.rows[0]) { return responseMessage.errorMessage(res, 400, 'Name already exist'); }

    const logoValue = req.body.logourl;
    const partyLogo = await pool.query(sql.findLogo, [logoValue]);
    if (partyLogo.rows[0]) { return responseMessage.errorMessage(res, 400, 'LogoUrl already exist'); }

    const { name, hqaddress, logourl } = req.body;
    const newParty = { name, hqaddress, logourl };
    const result = await pool.query(sql.postParty, [newParty.name, newParty.hqaddress, newParty.logourl]);
    return responseMessage.successUser(res, 201, 'party posted successfully!', { partyid: result.rows[0].partyid, name: result.rows[0].name });
  }

  static async getOne(req, res) {
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }
    const partyValue = req.params.partyid;
    const { rows } = await pool.query(sql.getOne, [partyValue]);
    if (!rows.length > 0) { return responseMessage.errorMessage(res, 404, 'Political party not found'); }
    return responseMessage.successUser(res, 200, 'political party was found successfully!', { partyid: rows[0].partyid, name: rows[0].name, logourl: rows[0].logoUrl });
  }

  static async getAll(req, res) {
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }
    const parties = await pool.query(sql.getAll);
    if (!parties.rows[0]) { return responseMessage.errorMessage(res, 404, 'no Political party found'); }
    return responseMessage.successUser(res, 200,'political party was found successfully!', parties.rows);
  }

  static async DeleteOne(req, res) {
    const admin = req.user.isadmin;
    if (admin !== true) { return responseMessage.errorMessage(res, 403, 'Strictly for the admin'); }
    const partyValue = req.params.partyid;
    const { rows } = await pool.query(sql.getOne, [partyValue]);
    if (!rows.length > 0) { return responseMessage.errorMessage(res, 404, 'Political party not found'); }
    await pool.query(sql.deleteOne, [partyValue]);
    return responseMessage.successWithNoData(res, 200, 'Political party has been deleted successfully');
  }
}
export default PartyControllers;
