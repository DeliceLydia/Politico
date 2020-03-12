import validateVotes from '../validations/votesValidations';
import responseMessage from '../helpers/response';
import sql from '../helpers/queries';
import pool from '../config/connect';

class VotesControllers {
  static async vote(req, res) {
    const { error } = validateVotes.validation(req.body);
    if (error) {
      const message = error.details.map((item) => item.message.replace(/"/g, '')).join(', ');
      return responseMessage.errorMessage(res, 400, message);
    }
    const officeId = req.body.officeid;
    const { rows } = await pool.query(sql.findOffice, [officeId]);
    if (!rows.length > 0) { return responseMessage.errorMessage(res, 404, 'office not found'); }
    const officeValue = req.body.officeid;
    const office = await pool.query(sql.voterOffice, [officeValue]);
    if (office.rows[0]) { return responseMessage.errorMessage(res, 406, 'sorry you can not vote more than once on the same office!'); }
    const {
      createdon, voterid, officeid, candidate,
    } = req.body;
    const newVote = {
      createdon, voterid, officeid, candidate,
    };
    await pool.query(sql.postVote, [newVote.createdon, newVote.voterid, newVote.officeid, newVote.candidate]);
    return responseMessage.successUser(res, 201, 'voted successfully!', { officeid, candidate, voterid });
  }
}
export default VotesControllers;
