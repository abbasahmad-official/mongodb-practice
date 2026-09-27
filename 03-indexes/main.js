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
//     brand: "Apple",
//     price: 250000,
//     stock: 20,
//     rating: 4.8
//   },
//   {
//     name: "MacBook Air M3",
//     category: "Laptop",
//     brand: "Apple",
//     price: 300000,
//     stock: 10,
//     rating: 4.9
//   },
//   {
//     name: "Dell XPS 15",
//     category: "Laptop",
//     brand: "Dell",
//     price: 280000,
//     stock: 8,
//     rating: 4.6
//   }
      
//     ]);
    // let produc = await db.collection("products").find().toArray();
    // console.log(produc.length);
    

  } finally {
    await client.close();
  }
}

main().catch(console.error);
