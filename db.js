const { MongoClient } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'peliculas'

let db

const movieProjection = {
  '_id': 0,
  'title': 1, 
  'year': 1,
  'fullplot': 1,
  'cast': 1,
  'poster': 1, 
  'imdb': 1, 
  'tomatoes': 1, 
  'metacritic': 1, 
}

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('movies')
  return collection.insertOne(item)
}

const findMovie = (search) => {
  const filter = {
    $or: [
      {'title': {$regex: new RegExp(search, "ig")},},
      {'fullplot': {$regex: new RegExp(search, "ig")},},
      {'cast': {$regex: new RegExp(search, "ig")}},
    ]
  }

  return db.collection('movies')
    .find(filter, movieProjection)
    .toArray();
}

const complexSearch = () => {
  const filter = {
    "cast": "Robert De Niro",
    "countries":{ $not: /USA/},
    "imdb.rating":{$gt:7}
  }

  return db.collection('movies')
    .find(filter, movieProjection)
    .toArray();
}

const randomMovies = (num) => {
  return db.collection('movies')
    .aggregate([{$sample: {size: num}}, {$project: movieProjection}])
    .toArray()
}

const insertRandomMerge = async () => {
  let movies = await randomMovies(5)
  let merge = {
    title: "TADW Presenta: " + movies[0].title,
    fullplot: movies[1].fullplot,
    cast: movies[2].cast,
    poster: movies[3].poster,
    year: movies[4].year
  }
  
  let result = await insertItem(merge)

  if (!result.acknowledged) {
    throw Error("unable to insert merge movie to database")
  }

  return { merge, movies }
}


module.exports = { init, insertItem, complexSearch, findMovie, insertRandomMerge }
