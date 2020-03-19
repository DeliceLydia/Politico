import chai from 'chai';
import chaiHttp from 'chai-http';
import createToken from '../helpers/token';
import app from '../server';


chai.use(chaiHttp);
const {expect} = chai;

const party = {
    name : "PDC",
	hqaddress : "kacyiru",
	logourl : "ujfnjnj"
}
const payload = {
    userid : 1,
    email : "ephrem@gmail",
    isadmin : true
}
const token = createToken(payload);
    
describe('parties', ()=> {
        it('user should not be able to post a party if you are not admin', (done)=>{
            const payload = {
                userid : 2,
                email : "delice@gmail",
                isadmin : "false"
            }
            const token = createToken(payload);
            chai.request(app)
            .post('/api/v1/parties')
            .set('authorization', token)
            .send(party)
            .end((err, res) => {
                expect(res.status).to.be.eql(403);
                expect(res.body).to.be.an('Object');
                done();
            });
        })
        it('admin should not be able to post a party if there is no authorization', (done)=>{
            chai.request(app)
            .post('/api/v1/parties')
            .send(party)
            .end((err, res) => {
                expect(res.status).to.be.eql(401);
                expect(res.body).to.be.an('Object');
                done();
            });
        })
        it('admin should not be able to post if there is a missing info', (done)=>{
            const newParty = {
                name : "",
                hqaddress : "kacyiru",
                logourl : "ujfnjnj"
            }
            const payload = {
                userid : 1,
                email : "lydia@gmail",
                isadmin : "true"
            }
            const token = createToken(payload);
            chai.request(app)
            .post('/api/v1/parties')
            .set('authorization', token)
            .send(newParty)
            .end((err, res) => {
                expect(res.status).to.be.eql(400);
                expect(res.body).to.be.an('Object');
                done();
            });
        })
        it('admin should be able to create an account', (done)=>{
            chai.request(app)
            .post('/api/v1/parties')
            .set('authorization', token)
            .send(party)
            .end((err, res) => {
                expect(res.status).to.be.eql(201);
                expect(res.body).to.be.an('Object');
                done();
        })
    })
})
