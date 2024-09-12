//meant to be run in mongosh
let timedataDB = db.getMongo().getDB("timedataDB")

timedataDB.createCollection("priceData", {
  timeseries: {
    timeField: "timestamp",
    metaField: "ticker",
    granularity: "seconds"
  }
})



