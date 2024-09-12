//creates new field not on docs
db.customers.findOne({

  },
  {
    "full intro": {
      $concat: [
        "hello my name is: ",
        "$name"
      ]
    }
  })

//gets the same as above
db.customers.aggregate([
  {$match: {}},
  {$limit: 1},
  {$project: {
    "full intro": {
      $concat: [
        "hello my name is: ",
        "$name"
      ]
    }
  }}
])

//gets all other fields IN ADDITION to the new field
db.customers.aggregate([
  {$limit: 1},
  {$set: {
    "full intro": {
      $concat: [
        "hello my name is: ",
        "$name"
      ]
    }
  }}
])
