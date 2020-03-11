const sql = {};


const findUser = 'SELECT * FROM users WHERE email = $1';
const addUser = `INSERT INTO users(firstname, lastname, othername, phonenumber, email, password, passporturl, isadmin) 
VALUES ( $1, $2, $3, $4, $5, $6, $7, $8) Returning*`;
const findNumber = 'SELECT * FROM users WHERE phonenumber = $1';

// parties //
const postParty = 'INSERT INTO parties(name, hqAddress, logourl) VALUES ($1, $2, $3)Returning*';
const findPartyName = 'SELECT * FROM parties WHERE name = $1';
const findLogo = 'SELECT * FROM parties WHERE logourl = $1';
const getAll = 'SELECT * FROM parties';
const getOne = 'SELECT * FROM parties WHERE partyid = $1';
const deleteOne = 'DELETE FROM parties WHERE partyid = $1';

// office //
const postOffice = 'INSERT INTO offices(type, name) VALUES ($1, $2)Returning*';
const findOffice = 'SELECT * FROM offices WHERE officeid = $1';
const allOffices = 'SELECT * FROM offices';
const deleteOffice = 'DELETE FROM offices WHERE officeid = $1';


// candidates //
const registerCand = 'INSERT INTO candidates(officeid, partyid, candidate) VALUES ($1, $2, $3)Returning*';
const findCandidate = 'SELECT * FROM candidates WHERE id = $1';


sql.findUser = findUser;
sql.addUser = addUser;
sql.findNumber = findNumber;
sql.postParty = postParty;
sql.findPartyName = findPartyName;
sql.findLogo = findLogo;
sql.getAll = getAll;
sql.getOne = getOne;
sql.deleteOne = deleteOne;
sql.postOffice = postOffice;
sql.findOffice = findOffice;
sql.allOffices = allOffices;
sql.deleteOffice = deleteOffice;
sql.registerCand = registerCand;
sql.findCandidate = findCandidate;


export default sql;
