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
//        const pr = await db.collection('products').insertMany([{
//         brand: "Apple",
//         model: "iPhone 12",
//         price: 799
//        },
//    {
//         email: "cat@gmail.com",
//         token: "trefwfwfssffcadc",
//         createdAt: new Date()
//        },
//        {
//         email: "animal@gmail.com",
//         token: "trefwfwfssffcadc",
//         createdAt: new Date()
//        }
// ] )


//5. get indexes
    //  let index = await db.collection("products").indexes() 
    //  console.log(index)
      
//6. check stats after index
    // let findings = await db.collection("products").find({$text: {$search: "laptop"}}).explain("executionStats")

//    console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)
await db.collection("products").dropIndex("sparse_index")

    await db.collection("products").createIndex({
       brand: 1
    },{
        sparse: true,
        name: "sparse_index"
    }) 
    let index = await db.collection("products").indexes() 
   let  findings = await db.collection("products").find({brand: "Apple"}).explain("executionStats")

     console.log(` indexes: ${JSON.stringify(index)} \n\n stats: ${JSON.stringify(findings, null, 2)}`)


  } finally {
   
    await client.close();
  }
}

main().catch(console.error);
