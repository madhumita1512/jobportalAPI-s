const {MongoClient} = require('mongodb')
let dbConnection
function connectToDb(callback) {
      dbConnection = MongoClient.connect("mongodb+srv://jobportal1234:jobportal1234@atlascluster.apog2kn.mongodb.net/JOBPORTAL") .then(function(client){
        dbConnection = client.db()
        callback()
    }).catch(function(error){
        callback(error)
    })
}
function getDb(){
    return dbConnection 
}
module.exports={connectToDb,getDb}