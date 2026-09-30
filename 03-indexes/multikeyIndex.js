const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://127.0.0.1:27017"; // Replace with your connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    // 1. You must select the database from the client first!
    const db = client.db("newshow"); 
         const pr = await db.collection('products').insertMany([
      {
    name: "iPhone 18",
    sku: "0031",
    tags: ["apple", "phone", "ios"]

  },
  {
  name: "MacBook Prro",
  sku: "0032",
  tags: ["laptop", "macbook"]
},
    {
    name: "air pods",
    sku: "0033",
    tags: ["earbuds", "earphones", "apple", "bluetooth"]
   
  },

])


//5. get indexes
     let index = await db.collection("products").indexes() 
      
//6. check stats after index
    let findings = await db.collection("products").find({tags: "apple"}).explain("executionStats")

   console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)

    await db.collection("products").createIndex({
       tags: 1
    },{
         name: "multikey_index"
    }) 
     index = await db.collection("products").indexes() 
     findings = await db.collection("products").find({tags: "apple"}).explain("executionStats")
     console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)


  } finally {
   
    await client.close();
  }
}

main().catch(console.error);
