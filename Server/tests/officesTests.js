import chai from 'chai';
import chaiHttp from 'chai-http';
import createToken from '../helpers/token';
import app from '../server';

chai.use(chaiHttp);
const {expect} = chai;

const office = {
   type: "federal",
   name: "governor"
}
const payload = {
    userid : 1,
    email : "ephrem@gmail",
    isadmin : true
}
const token = createToken(payload);

describe('offices', ()=>{
    it('admin should be able to post office', (done)=>{
        chai.request(app)
            .post('/api/v1/offices')
            .set('authorization', token)
            .send(office)
            .end((err, res) => {
                expect(res.status).to.be.eql(201);
                expect(res.body).to.be.an('Object');
                expect(res.body.message).not.to.be.empty;
                expect(res.body.message).to.equals('office created successfully!');
                done();
    })
  })
  it('user is not allowed to post if is not admin', (done)=>{
    const payload = {
        userid : 1,
        email : "ephrem@gmail",
        isadmin : false
    }
    const token = createToken(payload);
    chai.request(app)
    .post('/api/v1/offices')
    .set('authorization', token)
    .send(office)
    .end((err, res) => {
        expect(res.status).to.be.eql(403);
        expect(res.body).to.be.an('Object');
        done();
     })
  })
  it('admin should not be able to post if used existed office name', (done)=>{
    const office = {
        type: "federal",
        name: "governor"
     }
     chai.request(app)
     .post('/api/v1/offices')
     .set('authorization', token)
     .send(office)
     .end((err, res) => {
         expect(res.status).to.be.eql(400);
         expect(res.body).to.be.an('Object');
         done();
      })
  })
  it('admin should not be able to post if sent empty string', (done)=>{
    const office = {
        type: "federal",
        name: ""
     }
     chai.request(app)
     .post('/api/v1/offices')
     .set('authorization', token)
     .send(office)
     .end((err, res) => {
         expect(res.status).to.be.eql(400);
         expect(res.body).to.be.an('Object');
         done();
      })
  })
// getOffices //
it('admin should be able to get all offices', (done)=>{
    chai.request(app)
     .get('/api/v1/offices')
     .set('authorization', token)
     .end((err, res) => {
         expect(res.status).to.be.eql(200);
         expect(res.body).to.be.an('Object');
         done();
      })
   })
it('admin should be able to get a specific office by id', (done)=>{
    chai.request(app)
     .get('/api/v1/offices/1')
     .set('authorization', token)
     .end((err, res) => {
         expect(res.status).to.be.eql(200);
         expect(res.body).to.be.an('Object');
         done();
      })
 })
 it('admin should not be able to get a specific office if find unexisted officeid', (done)=>{
    chai.request(app)
     .get('/api/v1/offices/10')
     .set('authorization', token)
     .end((err, res) => {
         expect(res.status).to.be.eql(404);
         expect(res.body).to.be.an('Object');
         done();
      })
  })
  it('admin should be able to get a specific office by id if is not admin', (done)=>{
    const payload = {
        userid : 1,
        email : "ephrem@gmail",
        isadmin : false
    }
    const token = createToken(payload);
    chai.request(app)
     .get('/api/v1/offices/1')
     .set('authorization', token)
     .end((err, res) => {
         expect(res.status).to.be.eql(403);
         expect(res.body).to.be.an('Object');
         done();
      })
 })
 it('admin should not be able to get offices if is not authorized', (done)=>{
    chai.request(app)
     .get('/api/v1/offices')
     .end((err, res) => {
         expect(res.status).to.be.eql(401);
         expect(res.body).to.be.an('Object');
         done();
      })
    })
//  deleteOffice //
it('admin should be able to delete', (done)=>{
    chai.request(app)
    .delete('/api/v1/offices/1')
    .set('authorization', token)
    .end((err, res) => {
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.an('Object');
        done();
     })
  })
it('admin should not be able to delete anexisted officeid', (done)=>{
    chai.request(app)
    .delete('/api/v1/offices/10')
    .set('authorization', token)
    .end((err, res) => {
        expect(res.status).to.be.eql(404);
        expect(res.body).to.be.an('Object');
        done();
     })
  })
  it('admin should not be able to delete office if is not admin', (done)=>{
    const payload = {
        userid : 1,
        email : "ephrem@gmail",
        isadmin : false
    }
    const token = createToken(payload);
    chai.request(app)
     .delete('/api/v1/offices/1')
     .set('authorization', token)
     .end((err, res) => {
         expect(res.status).to.be.eql(403);
         expect(res.body).to.be.an('Object');
         done();
      })
 })
})
