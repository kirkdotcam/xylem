// you don't have to run this! its so you know what the data _should_ look like
db.users.insertOne({

  name: "Cam",
  age: 33,
  accDetails: {
    score: 120,
    createdDate: new Date()
  }
})

db.users.drop()
//update on an emtpy collection modifies nothing
db.users.updateOne({
    name: "Cam",
    age: {$gt: 40}
  },
  {
    $set: {
      "accDetails.retired": true
    }
  }
)

//upsert creates a new doc on failing to match anything
db.users.updateOne({
    name: "Cam",
    age: {$gt: 40}
  },
  {
    $set: {
      "accDetails.retired": true
    }
  },
  {
    upsert: true
  }
)

db.users.drop()
// $setOnInsert correctly adds additional fields on upsert so that 
// your data has consistent field values and schema shape
db.users.updateOne({
    name: "Cam",
    age: {$gt: 40}
  },
  {
    $set: {
      "accDetails.retired": true
    },
    $setOnInsert:{
      age: 33,
      "accDetails.score": null,
      "accDetails.createdDate": new Date()
    }
  },
  {
    upsert: true
  }
)
