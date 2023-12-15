//this isn't part of the app, just the queries written in plain js

//addItemToCart
db.carts.findOneAndUpdate(
    {customerId: "A123"},
    {$addToSet: {"cart": {item: "banana", count:0}}},
    {
        upsert: true,
        returnDocument: "after"
    }
);

//remove all items w/ no count
db.carts.updateOne( 
    {customerId: "A123"},
    {$pull: {"cart": 
        {count: {$lte: 0}}
    }}
)

//incrementItems
db.carts.findOneAndUpdate(
    {customerId: "A123", "cart.item":"banana"},
    {$inc: {"cart.$.count": -1}},
    {
        upsert: true,
        returnDocument: "after",
    }
)