const { MongoClient } = require("mongodb");
const mongourl = "mongodb://localhost:27017"
const client = new MongoClient(mongourl)

const timeDataDB = client.db("timeDataDB")
const priceDataColl = timeDataDB.collection("priceData")

//write a lot of data
//
let companies = ["GRN", "REHD", "BLEU", "PURP"]

let randomPrice = Math.random() * 20 + 20;

for (let rec = 0; rec < 500_000; rec++) {


  for (company of companies) {

    randomReturn = (Math.random() * .1 + 0.5)

    randomPrice = randomPrice * (1 + randomReturn)

    console.log(randomPrice)
    priceDataColl.insertOne({
      timestamp: new Date(),
      ticker: company,
      price: randomPrice,
    })
  }


}


//query
//
// db.priceData.aggregate([{
//   $match: {
//     $and: [{
//       "timestamp": { $gte: ISODate("2024-06-18T15:52:35.106Z") }
//     }]
//   }
// },
// {
//   $project: {
//     _id: 0,
//     date: { minutes: { $minute: "$timestamp" }, seconds: { $second: "$timestamp" } },
//     totalCount: { $sum: "$price" }
//   }
// }
// ])
