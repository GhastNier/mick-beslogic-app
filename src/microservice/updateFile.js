const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// Set up the MongoDB client and database
const mongoUrl = "mongodb+srv://ghastnier:268ab5J0EmXsbPHx@cluster0.glgdodb.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoUrl, { useUnifiedTopology: true });

// Connect to the MongoDB database
mongoClient.connect(function(err, client) {
  if (err) {
    console.log('Failed to connect to MongoDB: ' + err);
  } else {
    console.log('Connected to MongoDB successfully');
    const db = client.db('pokeapi');

    // Update the favorite field of a specific Pokemon based on its _id field
    const pokemonId = '602f7d73b13c2027c74e45bf'; // replace with the _id of the Pokemon to update
    db.collection('pokemons').updateOne({ _id: mongoClient.ObjectID(pokemonId) }, { $set: { favorite: true } }, (err, result) => {
      if (err) {
        console.log(`Error while updating Pokemon with _id ${pokemonId}: ${err}`);
      } else if (result.matchedCount === 0) {
        console.log(`No Pokemon found with _id ${pokemonId}`);
      } else {
        console.log(`Updated ${result.modifiedCount} Pokemon with _id ${pokemonId}`);
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
