var express = require('express')
var router = express.Router()
const mongodb = require('mongodb')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const post = await loadPostsCollection()
  res.send(await post.find({}).toArray())
  // res.send('respond with a resource')
})

const url = 'mongodb+srv://rdwDbUser:rdwDbPass420@rdw-uhl2i.mongodb.net/test?retryWrites=true&w=majority'

async function loadPostsCollection () {
  const client = await mongodb.MongoClient.connect(url, {
    useNewUrlParser: true
  })

  return client.db('rdw').collection('testcoll1')
}

// const MongoClient = require('mongodb').MongoClient
// const uri = 'mongodb+srv://rdwDbUser:<password>@rdw-uhl2i.mongodb.net/test?retryWrites=true&w=majority'
// const client = new MongoClient(uri, { useNewUrlParser: true })
// client.connect(err => {
//   const collection = client.db('test').collection('devices')
//   // perform actions on the collection object
//   client.close()
// })

module.exports = router
