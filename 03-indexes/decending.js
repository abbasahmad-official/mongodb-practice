const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://127.0.0.1:27017"; // Replace with your connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    // 1. You must select the database from the client first!
    const db = client.db("newshow"); 

   // 2. check if works
    // const produc = await db.collection("products").find().sort({price: -1}).toArray()
    
    //3. check sats before index
    //   const findings = await db.collection("products").find().sort({price: -1}).explain("executionStats")

    //4. add index
     await db.collection("products").createIndex({
        price: -1},
        {name: "price_index"
     })  
//5. get indexes
   let index = await db.collection("products").indexes()
      
//6. check stats after index
    let findings = await db.collection("products").find().sort({price: -1}).explain("executionStats")

   console.log(`indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)
  } finally {
   
    await client.close();
  }
}

main().catch(console.error);
