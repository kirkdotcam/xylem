
let myTensor = [
  [ [1, 1], [2,5] ],
  [ [4,5], [1,5] ],
  [ [8,5], [1,9] ],
  [ [1,7], [4, 9] ],
]

let myDoc = {
  tensorData: myTensor,
  custId: "0012"
}

db.tensors.insertOne(myDoc)

db.tensors.find()


//ex1: we know the positions we want to 
//apply mutations to
let queryDoc = {custId: "0012"}


let mutationDoc = {$mul: {
  "tensorData.1.1.0": -1,
  "tensorData.1.1.1": -1
}}


db.tensors.updateOne(queryDoc, mutationDoc)

//ex2: we don't know which tensor we want to mutate 

let queryDoc = { "tensorData": {$elemMatch: {$elemMatch: {$eq: 1} } }}
let mutationDoc = { $inc: {
  "tensorData.1.1.0": 1,
  "tensorData.1.0.1": 1
  }
}

db.tesnors.updateOne(queryDoc, mutationDoc)

//ex3: we don't know which tensor we want to mutate AND
//we don't know which element we want to mutate
//

let queryDoc = { "tensorData": {$elemMatch: {$elemMatch: {$eq: 1} } }}
let mutationDoc = {
  $mul: {
    "tensorData.$[posx].1": -1
  }
}
let optionsDoc = {
  arrayFilters: [{
    "posx.0.0": {
//TD
    }
  }]
}
