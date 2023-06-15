//import {jest} from '@jest/globals'


var tools = require('./mongo_tools');


describe("Tests The mongo tools.", ()=> {

  test("Check DBNAME", async ()=>{
    expect(tools.DB_NAME).toEqual('trafficDB');
    //expect(tools.DB_NAME).toHaveProperty('trafficDB');
  });
});


