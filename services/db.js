const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://rdwDbUser:rdwDbPass420@rdw-uhl2i.mongodb.net/test?retryWrites=true&w=majority";
const regListCollectionName = "regList";
const dbName = "test";

function getRegList(onSuccess) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    if (err) throw err;
    const collection = client.db(dbName).collection(regListCollectionName);
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(`getRegList result: \n${JSON.stringify(result)}`);
      onSuccess(result);
      client.close();
    });
  });
}

function insertNewName(name, onSuccess) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    if (err) throw err;
    const collection = client.db(dbName).collection(regListCollectionName);
    try {
      collection.insertOne({ name: name }, function (err, response) {
        if (err) {
          console.log("err2");
        } else {
          console.log(`Resp: ${response}`);
        }
      });
    } catch (err) {
      console.log("err1");
      throw err;
    }
    client.close();
    onSuccess();
    // collection.insertOne(name, (err, result) => {
    //   if (err) throw err;
    //   console.log(`insertNewName inserted: \n${name}`);
    // });
  });
}

function deleteParticipantById(id, onSuccess) {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect((err) => {
    if (err) throw err;
    const collection = client.db(dbName).collection(regListCollectionName);
    try {
      collection.deleteOne({ "_id": id });
      console.log("done");
    } catch (err) {
      console.log(`err: ${err}`);
      throw err;
    }
  });
  client.close();
  onSuccess();
}

module.exports.getRegList = getRegList;
module.exports.insertNewName = insertNewName;
module.exports.deleteParticipantById = deleteParticipantById;
