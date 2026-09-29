const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://127.0.0.1:27017"; // Replace with your connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    // 1. You must select the database from the client first!
    const db = client.db("newshow"); 

       // 2. Now db.collection() will work perfectly
//     const pr = await db.collection('products').insertMany([
//       {
//     name: "iPhone 15",
//     category: "Phone",
//     sku: "0012",
//     brand: "Apple",
//     price: 250000,
//     stock: 20,
//     rating: 4.8
//   },
//   {
//     name: "MacBook Air M3",
//     category: "Laptop",
//     sku: "0013",
//     brand: "Apple",
//     price: 300000,
//     stock: 10,
//     rating: 4.9
//   },
//   {
//     name: "Dell XPS 15",
//     category: "Laptop",
//     sku: "0014",
//     brand: "Dell",
//     price: 280000,
//     stock: 8,
//     rating: 4.6
//   }])


//5. get indexes
     let index = await db.collection("products").indexes() 
      
//6. check stats after index
    let findings = await db.collection("products").find({sku: "0012"}).explain("executionStats")

   console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)

    // await db.collection("products").createIndex({
    //     sku : 1
    // },{
    //     unique: true,
    //     name: "sku_uniqueIndex"
    // }) 
    //  index = await db.collection("products").indexes() 
    //  console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)


  } finally {
   
    await client.close();
  }
}

main().catch(console.error);
