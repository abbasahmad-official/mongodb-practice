const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://127.0.0.1:27017"; // Replace with your connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    // 1. You must select the database from the client first!
    const db = client.db("newshow"); 
        //  const pr = await db.collection('products').updateMany({},
        //     {$set: { description : "This is a universal description for all products"}}
        // )


//5. get indexes
    //  let index = await db.collection("products").indexes() 
    //  console.log(index)
      
//6. check stats after index
    // let findings = await db.collection("products").find({$text: {$search: "laptop"}}).explain("executionStats")

//    console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)

    await db.collection("products").createIndex({
       name: "text",
       description: "text" 
    },{
         name: "text_index_product"
    }) 
    let index = await db.collection("products").indexes() 
   let  findings = await db.collection("products").find({$text: {$search: "laptop"}}).explain("executionStats")
   
   console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)


  } finally {
   
    await client.close();
  }
}

main().catch(console.error);
