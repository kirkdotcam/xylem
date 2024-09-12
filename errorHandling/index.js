const {MongoClient} = require("mongodb");

const MONGOURI = "mongodb+srv://camkirk:bananabanana@cluster0.lbpmbg9.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGOURI);

const fruitsCollection = client.db("test").collection("fruits"); 
// fruitsCollection.drop()



const documentKeys = {
    ID: "_id",
    NAME: "name",
    STOCK: "stock"

}



async function insertManyFailure(){
    const fruits = [{
        [documentKeys.ID]: "apple",
        [documentKeys.NAME]: "Fuji Apples"
    },
    {
        [documentKeys.ID]: "banana",
        [documentKeys.NAME]: "Blue Java Banana",
    },
    {
        [documentKeys.ID]: "mango",
        [documentKeys.NAME]: "Alphonso Mango"
    },
    {
        [documentKeys.ID]: "apple",
        [documentKeys.NAME]: "Granny Smith Apples"
    }
    ]

    try{
        
        const response = await fruitsCollection.insertMany(fruits)
        // console.log(response)

    } catch (error) {

        // console.error(error.writeErrors)
        
        let failedInserts = error.writeErrors
            .map((writeError) => writeError.err.index)
            .map((errorIndex) => fruits[errorIndex])
        
        // console.log(`failed insertions on: ${JSON.stringify(failedInserts)}`)

    }
    

}



async function upsertFailure(){
    const fruitQueryDocs = [{
        [documentKeys.ID]: "apple",
    },
    {
        [documentKeys.ID]: "banana",
    },
    {
        [documentKeys.ID]: "mango",
    },
    {
        [documentKeys.ID]: "kiwi",
    }
    ]

    let mutationDoc = function () {
        return {
            $inc: {
                [documentKeys.STOCK]: Math.floor(Math.random() * 100)
            }
        }
    }



    let fruitBulkWriteDocs = fruitQueryDocs.map((fruitIdDoc) => {
        return {
            updateOne:{
                filter: fruitIdDoc,
                update: mutationDoc(),
                upsert: true
            }
        }
    })

    console.log(`fruits bulk write Docs: ${JSON.stringify(fruitBulkWriteDocs, null,2)}`)

    try{

        const response = await fruitsCollection.bulkWrite(fruitBulkWriteDocs, {ordered: false})

    } catch (error) {
        console.error(error)
    }
    

}


function run(){
    // insertManyFailure()
    upsertFailure()
}

run()
