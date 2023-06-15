module.exports = {
//export default {

  DB_NAME         : "trafficDB",
  COLLECTION_NAME : "traffic",

  get_url: function () {
    const mongodb_user = process.env.MONGODB_USER;
    const mongodb_password = process.env.MONGODB_PASSWORD;
    const mongodb_uri = process.env.MONGODB_URI;

    return uri = "mongodb+srv://"+ mongodb_user+":" + mongodb_password+ "@"+ mongodb_uri + "/test?retryWrites=true&w=majority";
    console.log("URI:" + uri);
  },
  bar: function () {
    // whatever
  }
};

