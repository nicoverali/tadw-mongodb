const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'peliculas'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('movies')
  return collection.insertOne(item)
}


const getPelis = () => {
  // hardcodeado: peliculas con "Toy" en el titulo
  const filter = {
   'title':{$regex: /Toy/}
  };
  const projection = {
    'title': 1, 
    '_id': 0
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}


module.exports = { init, insertItem, getPelis }
