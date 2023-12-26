const { MongoClient } = require('mongodb');

let dbConnection;
const uri = "mongodb+srv://kishorkumar12180:zWny2Yk3gu290gvK@clusterx.slzhe4r.mongodb.net/?retryWrites=true&w=majority";

// connecting to database 

module.exports = {
    // this function connects to the database
    connectToDb: (callback) => {
        // this function basically returns a promise
        MongoClient.connect(uri).
        then((client) => {
            dbConnection = client.db();
            return callback();
        }).
        catch((err) => {
            console.log(err);
            return callback(err);
        })
    },
    // this function retrieves data from database
    getDb: () => {return dbConnection;}
}