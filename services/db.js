const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://rdwDbUser:rdwDbPass420@rdw-uhl2i.mongodb.net/test?retryWrites=true&w=majority";
const regListCollectionName = "regList";
const dbName = "test";

function getRegList(onSuccess) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    if (err) throw err;
    const collection = client.db(dbName).collection(regListCollectionName);

    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(`getRegList result: \n${result}`);
      onSuccess(result);
      client.close();
    });
  });
}

module.exports = getRegList;
