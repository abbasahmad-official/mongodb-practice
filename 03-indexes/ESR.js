const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://127.0.0.1:27017"; // Replace with your connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    // 1. You must select the database from the client first!
    const db = client.db("newshow"); 
//          const pr = await db.collection('products').insertMany([
//       {
//     name: "iPhone 17",
//     category: "Phone",
//     sku: "0021",
//     brand: "Apple",
//     price: 250000,
//     stock: 20,
//     rating: 4.8,
//     active: true
//   },
//   {
//     name: "Air M3",
//     category: "Laptop",
//     sku: "0023",
//     brand: "Apple",
//     price: 300000,
//     stock: 10,
//     rating: 4.9,
//     active: true
//   },
//     {
//     name: "false product",
//     category: "Laptop",
//     sku: "0024",
//     brand: "Samsung",
//     price: 300000,
//     stock: 10,
//     rating: 4.9,
//     active: false
//   },

// ])



//5. get indexes
    //  let index = await db.collection("products").indexes() 
      
//6. check stats after index
    // let findings = await db.collection("products").find({category: "Laptop", price: {$gte: 20000}}, {rating: -1}).explain("executionStats")

//    console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)

    // await db.collection("products").createIndex({
    //     category: 1,
    //     rating: -1,
    //     price: 1
    // },{
    //     name: "ESR_index"
    // }) 
  let  index = await db.collection("products").indexes() 
  let   findings = await db.collection("products").find({category: "Laptop", price: {$gte: 20000}}).sort({rating: -1}).explain("executionStats")
     console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)


  } finally {
   
    await client.close();
  }
}

main().catch(console.error);
