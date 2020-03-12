import pool from '../config/connect';


const createTables = () => {
  const users = `
    CREATE TABLE IF NOT EXISTS users(
        userid SERIAL PRIMARY KEY,
        firstname VARCHAR(20) NOT NULL,
        lastname VARCHAR(20) NOT NULL,
        othername VARCHAR(20) NOT NULL,
        phonenumber VARCHAR(10) UNIQUE NOT NULL,
        email VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(300) NOT NULL,
        passporturl VARCHAR(30) UNIQUE NOT NULL,
        isadmin BOOLEAN
        
    );`;
  const parties = `
  CREATE TABLE IF NOT EXISTS parties(
       partyId SERIAL PRIMARY KEY,
       name VARCHAR(20) NOT NULL,
       hqAddress VARCHAR(20) NOT NULL,
       logoUrl VARCHAR(20) NOT NULL
  );`;
  const offices = `
 CREATE TABLE IF NOT EXISTS offices(
     officeid SERIAL PRIMARY KEY,
     type VARCHAR(20) NOT NULL,
     name VARCHAR(20) NOT NULL
 );`;
  const candidates = `
 CREATE TABLE IF NOT EXISTS candidates(
     id SERIAL PRIMARY KEY,
     officeid INT NOT NULL,
     partyid INT NOT NULL,
     candidate INT NOT NULL
 );`;
  const votes = `
 CREATE TABLE IF NOT EXISTS votes(
     id SERIAL PRIMARY KEY,
     createdon VARCHAR(20) NOT NULL,
     voterid INT NOT NULL,
     officeid INT NOT NULL,
     candidate INT NOT NULL
 );`;
  const queries = `${users};${parties};${offices};${candidates};${votes};`;
  pool.query(queries).then((res) => {
    console.log(res);
    pool.end();
    return res;
  })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
const dropTables = () => {
  const drop = `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS parties CASCADE;
        DROP TABLE IF EXISTS offices CASCADE;
        DROP TABLE IF EXISTS candidates CASCADE;
        DROP TABLE IF EXISTS votes CASCADE;
    `;
  const Queries = `${drop}`;
  pool.query(Queries).then((res) => {
    pool.end();
    return res;
  })
    .catch(() => {
      pool.end();
    });
};
export { createTables, dropTables };
require('make-runnable');
