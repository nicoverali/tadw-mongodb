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

const getItems = () => {
  const collection = db.collection('movies')
  return collection.find({}).toArray()
}

const getPelis = () => {
  const filter = {
   //'year': 2010
   'title':{$regex: /Toy/}
  };
  const projection = {
    'title': 1, 
    'year': 1,
    '_id': 0
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}


const getPelisT = (titulo) => {
  const filter = {
   'title' : {$regex: titulo }
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




const updateQuantity = (id, quantity) => {
  const collection = db.collection('items')
  return collection.updateOne({ _id: ObjectId(id) }, { $inc: { quantity } })
}

module.exports = { init, insertItem, getItems, getPelis, getPelisT, updateQuantity }
