import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../server';

dotenv.config();
chai.use(chaiHttp);
const {expect} = chai;

const user= {
    firstname : "delice",
    lastname : "lydia",
    othername: "dede",
    phonenumber: "0788846798",
    email : "lydia@gmail.com",
    password: "Lydie1@",
    passporturl: "LP452354",
    isadmin : true
 }

//  signup //
describe('signup', ()=>{
    it('server should be able to run', (done)=>{
        chai.request(app)
        .get('/')
        .end((err, res)=> {
            expect(res.status).to.be.eql(200, 'Response status is wrong');
            expect(res.body.message).to.equals('Welcome to the Politico application');
            done();
        })
    })
    it('citizen will be able to create an account', (done)=>{
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res)=>{
            expect(res.status).to.be.eql(201);
            expect(res.body).to.be.an('Object');
            expect(res.body.message).not.to.be.empty;
            expect(res.body.message).to.equals('user created successfully!');
            done();
        })
    })
    it('citizen will not be able to create an account when using an existing email', (done)=>{
        const user ={
            firstname : "delice",
            lastname : "lydia",
            othername: "dede",
            phonenumber: "0758846798",
            email : "lydia@gmail.com",
            password: "Lydie1@",
            passporturl: "LP45235",
            isadmin : "false"
        }
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res)=>{
            expect(res.status).to.be.eql(400);  
            expect(res.body).to.be.an('Object');       
            done();
        })
    })
    it('citizen will not be able to create an account when provided a weak password', (done)=>{
        const user ={
            firstname : "delice",
            lastname : "lydia",
            othername: "dede",
            phonenumber: "0758846798",
            email : "lydia@gmail.com",
            password: "lydie",
            passporturl: "LP45235",
            isadmin : "false"
        }
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res)=>{
            expect(res.status).to.be.eql(400);  
            expect(res.body).to.be.an('Object');       
            done();
        })
    })
    it('citizen will not be able to create an account when using an existing phonenumber', (done)=>{
        const user ={
            firstname : "delice",
            lastname : "lydia",
            othername: "dede",
            phonenumber: "0788846798",
            email : "delice@gmail.com",
            password: "Lydie1@",
            passporturl: "LP45235d",
            isadmin : "false"
        }
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res)=>{
            expect(res.status).to.be.eql(400);  
            expect(res.body).to.be.an('Object');       
            done();
        })
    })
    it('citizen will not be able to create an account when there is an empty string', (done)=>{
        const user ={
            firstname : "",
            lastname : "lydia",
            othername: "dede",
            phonenumber: "0728846798",
            email : "delice@gmail.com",
            password: "Lydie1@",
            passporturl: "LP45235d",
            isadmin : "false"
        }
        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res)=>{
            expect(res.status).to.be.eql(400);  
            expect(res.body).to.be.an('Object');       
            done();
        })
    })
})
// signin //
describe('signin', ()=>{
    it('user should be able to signin', (done)=>{
     const returningUser = {
        email: "lydia@gmail.com",
        password: 'Lydie1@'
     };
     chai.request(app)
     .post('/api/v1/auth/signin')
     .send(returningUser)
     .end((err, res)=>{
        expect(res.status).to.be.eql(200);
        expect(res.body).to.be.an('Object');
        expect(res.body.message).not.to.be.empty;
        expect(res.body.message).to.equals('signed in successfully!');
        done();
     })
    })
    it('user should not be able to signin when provided unexisted email',(done)=>{
        const returningUser = {
            email: 'lydie@gmail.com',
            password: 'Lydie1@'
         };
         chai.request(app)
     .post('/api/v1/auth/signin')
     .send(returningUser)
     .end((err, res)=>{
        expect(res.status).to.be.eql(400);
        expect(res.body).to.be.an('Object');
        done();
    })
})
it('user should not be able to signin when provided wrong password',(done)=>{
    const returningUser = {
        email: 'lydia@gmail.com',
        password: 'Lydie1'
     };
     chai.request(app)
 .post('/api/v1/auth/signin')
 .send(returningUser)
 .end((err, res)=>{
    expect(res.status).to.be.eql(400);
    expect(res.body).to.be.an('Object');
    done();
       })
   })
})