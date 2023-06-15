const mo_traffic = require('./mo_traffic')
const {MongoClient} = require('mongodb');


//MongoClient.db.colection = jest.fn();
//jest.mock('mongodb');

test("test getdata()", () => {

  //const mock = jest.fn();

  //let result = mock("foo");
  //mo_traffic.get();
  mo_traffic.getHandler();
  expect(mongodb.db.collection).toHaveBeenCalledWith(1);

});
