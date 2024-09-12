db.users.insertOne({
  name: "Cam",
  age: 33,
  accDetails: {
    score: 120,
    createdDate: new Date()
  }
})

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
