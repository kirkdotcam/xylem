import mongoose from "mongoose";

const uri = "mongodb://localhost"

const client = await mongoose.connect(uri)

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  sku: String
})

const productModel = new mongoose.model("Prodcuts", productSchema)

const productId = new mongoose.Types.ObjectId()


const coolBike = new productModel({ _id: productId, name: "Surley Bridge Club", sku: "2847SDLKFJ" })

await coolBike.save()

coolBike.name = "Surley Bike"
delete coolBike.sku


await coolBike.save()

console.log(coolBike)
