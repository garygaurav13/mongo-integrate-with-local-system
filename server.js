const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

// MongoDB connection details
const mongoUri = "mongodb://0.0.0.0:27017";
const dbName = "ghost"; // Replace with your database name
const collectionName = "school"; // Replace with your collection name

app.get("/", async (req, res) => {
	const client = new MongoClient(mongoUri);
  
	try {
	  console.log("Connecting to MongoDB...");
	  await client.connect();
	  const db = client.db(dbName);
	  const collection = db.collection(collectionName);
  
	  console.log(`Connected to database: ${collection}`);
	  console.log(`Accessing collection: ${collectionName}`);
  
	  // Fetch all data from the collection
	  const data = await collection.find({}).toArray();
	  
	  console.log("Fetched data:", data);  // Log the result
	  res.json(data);
	} catch (error) {
	  console.error("Error connecting to the database:", error.message);
	  res.status(500).send("Error connecting to the database: " + error.message);
	} finally {
	  await client.close();
	}
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
