let connect = require("./connection.js");
 
let find = async (collection, param) => {
 
  let { db_client, db_connection } = await connect()
 
  return new Promise((resolve, reject) => {
    db_connection.collection(collection).find(param).toArray((err, result) => {
      if (err) reject(err)
 
      db_client.close()
      resolve(result)
    })
  })
}
 
let findOne = async (collection, param) => {
 
  let { db_client, db_connection } = await connect()
 
  console.log("finOne param: ", param)
  return new Promise((resolve, reject) => {
    db_connection.collection(collection).findOne(param, (err, result) => {
      if (err) reject(err)
 
      db_client.close()
      resolve(result)
    })
  })
}
 
let insertOne = async (collection, param) => {
  let { db_client, db_connection } = await connect()
 
  return new Promise((resolve, reject) => {
 
    db_connection.collection(collection).insertOne(param, function (err, response) {
      if (err) reject(err);
 
      db_client.close()
      resolve(response)
    })
  })
}
 
module.exports = {
  find, insertOne, findOne
}