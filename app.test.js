//import {jest} from '@jest/globals'


var mo_traffic = require('./routes/mo_traffic');
const server = require('./app');

const supertest = require('supertest');
//import supertest from 'supertest';

const requestWithSupertest = supertest(server);

//const {MongoClient} = require('mongodb');
//import MongoClient from 'mongodb';





//import * as server from './app';
//import * as mo_object from './routes/mo_traffic';
//import supertest from 'supertest';

//const requestWithSupertest = supertest(server);

//import MongoClient from 'mongodb';



describe("This will test the GET function", ()=> {

  test("GET /motraffic should get a bunch of data", async ()=>{

    //const res = await requestWithSupertest.get('/motraffic');
    //console.log(res);
    //expect(res.status).toEqual(200);

    //expect(res.body).toHaveProperty('users')
    //expect(res.type).toEqual(expect.stringContaining('json'));
    //expect(motraffic.getData).toHaveBeenCalledTimes(1);

  });

  test("GET /mttraffic should get a bunch of data", async ()=>{
    //const res = await requestWithSupertest.get('/mttraffic');
    //console.log(res);
  });
  test("GET /cputemp should get a bunch of data", async ()=>{
    //const res = await requestWithSupertest.get('/cputemp');
    //console.log(res);
  });
  test("GET /cpuusage should get a bunch of data", async ()=>{
    //const res = await requestWithSupertest.get('/cpuusage');
    //console.log(res);
  });
  test("GET /memusage should get a bunch of data", async ()=>{
    //const res = await requestWithSupertest.get('/memusage');
    //console.log(res);
  });
  test("GET /diskusage should get a bunch of data", async ()=>{
    //const res = await requestWithSupertest.get('/diskusage');
    //console.log(res);
  });
});
