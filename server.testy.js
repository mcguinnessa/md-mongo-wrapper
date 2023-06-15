//const server = require('./server');
//var {motraffic, simpleFunction, complexFunction, getData} = require('./routes/mo_traffic');
//const server = require('./app');
//import { MongoMemoryServer } from 'mongodb-memory-server';
//const MongoMemoryServer = require('mongodb-memory-server');
import {jest} from '@jest/globals'
import * as server from './app';
import * as mo_object from './routes/mo_traffic';
//import motraffic from './routes/mo_traffic';
//import simpleFunction from './routes/mo_traffic';
//import complexFunction from './routes/mo_traffic';
//import getData from './routes/mo_traffic';

//const supertest = require('supertest');
import supertest from 'supertest';

const requestWithSupertest = supertest(server);

//const {MongoClient} = require('mongodb');
import MongoClient from 'mongodb';


//const mockSimpleFunction = jest.fn(x => return "failure");


describe("This will test the GET function", ()=> {


//  test("GET /motraffic should get a bunch of data", async ()=>{
//
//    const res = await requestWithSupertest.get('/motraffic');
//    expect(res.status).toEqual(200);
//
//    expect(res.body).toHaveProperty('users')
//    expect(res.type).toEqual(expect.stringContaining('json'));
//    expect(getData).toHaveBeenCalledTimes(1);
//
//  });

  test("Tests straight-forward case", async ()=>{
     //const res =simpleFunction();
     const res = mo_object.simpleFunction();
     expect(res).toBe("success");
  });

  test("Tests straight-forward Mock case", async ()=>{

     //simpleFunction = jest.fn().mockImplementation(()=> { return "failure";});
     //mo_object.simpleFunction = jest.fn().mockImplementation(()=> { return "failure";});

    //jest.mock('./routes/mo_traffic', () => {
//    jest.doMock('./routes/mo_traffic', () => {
//      //const originalModule = jest.requireActual('./routes/mo_traffic');
//
//      return {
//       // __esModule: true,
//      //  ...originalModule,
//      //  getData: jest.fn(() => {
//      //    console.log('Test');
//      //    return "this is a bunch of data";
//      // }),
//       simpleFunction: jest.fn(() => {
//         console.log('Test');
//         return "well!";
//       }),
//     };
//   });  

     jest.mock('./routes/mo_traffic');

     //const res = simpleFunction();
     const res = mo_object.simpleFunction();
     expect(res).toBe("failure");

     //expect(simpleFunction).toHaveBeenCalledTimes(1);
     expect(mo_object.simpleFunction).toHaveBeenCalledTimes(1);
  });

  test("Tests function that calls function case", async ()=>{

     const res = mo_object.complexFunction();
     expect(res).toBe("success");
  });

  test("Tests function that calls function Mock case", async ()=>{

     //simpleFunction = jest.fn().mockImplementation(()=> { return "failure";});
     mo_object.simpleFunction = jest.fn().mockImplementation(()=> { return "failure";});

     //const res = complexFunction();
     const res = mo_object.complexFunction();
     expect(res).toBe("failure");
     //expect(simpleFunction).toHaveBeenCalledTimes(1);
     expect(mo_object.simpleFunction).toHaveBeenCalledTimes(1);
  });
});
