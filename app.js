const mongoose = require("mongoose");
var indexer = require('./indexer.js');

var config = require ('config');

var indexname = config.elasticsearch.elasticsearchIndices.COMPANY.index;
var indextype = config.elasticsearch.elasticsearchIndices.COMPANY.type;
var tableName = config.elasticsearch.elasticsearchIndices.COMPANY.collectionName;

const MONGODB_URI = "mongodb://localhost:27017/number-collection-dev";

mongoose
  .connect(
    MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
      writeConcern: {
        w: 0,
        j: false,
        wtimeout: 1000
      }
    }
  )
  .then(() => {
    console.log("connected on");

    indexer.IndexMongodbData(indexname,indextype,tableName); //Inserting bulk data into Elasticsearch, Kibana from mongodb
    //indexer.DeleteMappings(indexname);  //Deleting bulk data from Elasticsearch, Kibana from mongodb
})
  .catch((err) => {
    console.log(err);
  });




