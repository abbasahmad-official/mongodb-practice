const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb://127.0.0.1:27017"; // Replace with your connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    // await db.collection("tokens").indexes() 
    // await db.collection('tokens').deleteMany({});
    // 1. You must select the database from the client first!
    const db = client.db("newshow"); 
       const pr = await db.collection('tokens').insertMany([{
        email: "tree@gmail.com",
        token: "trefwfwfssffcadc",
        createdAt: new Date()
       },
   {
        email: "cat@gmail.com",
        token: "trefwfwfssffcadc",
        createdAt: new Date()
       },
       {
        email: "animal@gmail.com",
        token: "trefwfwfssffcadc",
        createdAt: new Date()
       }
] )


//5. get indexes
    //  let index = await db.collection("products").indexes() 
    //  console.log(index)
      
//6. check stats after index
    // let findings = await db.collection("products").find({$text: {$search: "laptop"}}).explain("executionStats")

//    console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)

    await db.collection("tokens").createIndex({
       createdAt: 1
    },{
        expireAfterSeconds: 20,
        name: "TTL_Index_reset_password"
    }) 
    let index = await db.collection("tokens").indexes() 
   let  findings = await db.collection("tokens").find({}).explain("executionStats")
   
   console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)


  } finally {
   
    await client.close();
  }
}

main().catch(console.error);
