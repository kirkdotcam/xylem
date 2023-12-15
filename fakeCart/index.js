//express server
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const client = new MongoClient("mongodb://localhost:27017")

client.connect()

const db = client.db("test")
const cartsCollection = db.collection("carts")

const app = express();
const port = 3000;

// Set up a static route to serve files from the current directory
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Define a route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", 'index.html'));
});

app.post("/addNewItem", async (req,res)=>{
    console.log(req.body)
    const customerId = `${req.body.customerId}`
    const itemId = `${req.body.itemId}`



    let returnDoc = await cartsCollection.findOneAndUpdate(
        {customerId: `${customerId}`},
        {$addToSet: {"cart": {
            item: itemId, 
            count:1}}},
        {
            upsert: true,
            returnDocument: "after"
        }
    )
    
    return res.status(200).send(returnDoc)

})

app.post("/incItem", async (req, res)=>{
    const customerId = `${req.body.customerId}`
    const itemId = `${req.body.itemId}`
    const amount = parseInt(req.body.amount)

    let returnDoc = await cartsCollection.findOneAndUpdate(
        {
            customerId: customerId, 
            "cart.item": itemId},
        {$inc: {"cart.$.count": amount}},
        {
            returnDocument: "after",
        }
    )
    
    //secondaryQuery for cleanup. DONT await this
    cartsCollection.updateOne( 
        {customerId: "A123"},
        {$pull: {"cart": 
            {count: {$lte: 0}}
        }}
    )

    return res.status(200).send(returnDoc)
    
    


})

app.get("/seeCart/:customerId", async (req,res)=>{
    const customerId = `${req.params.customerId}`
    const cart = await cartsCollection.findOne({customerId})
    return res.status(200).send(cart)
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
