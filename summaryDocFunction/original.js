exports = async function() {
  
    let atlas = context.services.get("mongodb-atlas")
    let tododb = atlas.db("todo")
    let itemsCollection = tododb.collection("Item")
    let summaryCollection = tododb.collection("Summary")
  
    //group the data by 
    const agg = [
      {
        '$group': {
          '_id': '$owner_id', 
          'completeTask': {
            '$sum': {
              '$cond': {
                'if': {
                  '$eq': [
                    '$isComplete', true
                  ]
                }, 
                'then': 1, 
                'else': 0
              }
            }
          }, 
          'incompleteTask': {
            '$sum': {
              '$cond': {
                'if': {
                  '$eq': [
                    '$isComplete', false
                  ]
                }, 
                'then': 1, 
                'else': 0
              }
            }
          }
        }
      }
    ];
  
    
    
    let summaryData = await itemsCollection.aggregate(agg).toArray()
    
    let results = []
    for (let summaryDoc of summaryData) {
      let queryDoc= {_id: summaryDoc._id}
      let mutation = {$set: {
        completeTask: summaryDoc.completeTask,
        incompleteTask: summaryDoc.incompleteTask
      }}
      let optionDoc = {upsert: true}
      
      let response = await summaryCollection.updateOne(queryDoc, mutation, optionDoc)
      results.push(response)
    }
    
    return results
    
    
    
  };
  