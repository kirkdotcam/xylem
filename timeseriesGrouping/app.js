const {MongoClient} = require("mongodb");
const mongourl = "mongodb://localhost:27017"
const client = new MongoClient(mongourl)

const timeDataDB = client.db("timeDataDB")
const priceDataColl = timeDataDB.collection("priceData")

//write a lot of data
//
let companies = ["NTNX", "AEMD", "BLEU", "PURP"]
let stockType = ["preferred", "common"]

for (let rec = 0; rec < 1_000_000; rec++){
  
  let randomCompany = companies[Math.floor(Math.random() * companies.length)]

  let randomPrice = Math.random()*20 + 20;
  let randomType = stockType[Math.floor(Math.random()*stockType.length)]
  
  db.priceData.insertOne({
    timestamp: new Date(),
    ticker: randomCompany,
    price: randomPrice,
    stockType: randomType 
  })

}


//query
//
db.priceData.aggregate([{
  $match: {
    $and: [{
      "timestamp": {$gte: ISODate("2024-06-18T15:52:35.106Z")}
    }]
  }},
  {
  $project: {
    _id: 0,
    date: { minutes: {$minute: "$timestamp"} ,seconds: {$second: "$timestamp"}},
    totalCount: {$sum: "$price" }
  }
}
])
