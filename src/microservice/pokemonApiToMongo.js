const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');

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

    // Set up the base URL and the number of entries to retrieve
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
    const numEntries = 1008;

    // Loop through the entries and insert each one into the MongoDB database
    for (let i = 1; i <= numEntries; i++) {
      const url = baseUrl + i;
      request.get(url, (error, response, body) => {
        if (error) {
          console.log(`Error while requesting ${url}: ${error}`);
        } else if (response.statusCode !== 200) {
          console.log(`Error while requesting ${url}: HTTP status code ${response.statusCode}`);
        } else {
          const pokemon = JSON.parse(body);
          pokemon._id = pokemon.id;
          pokemon.favorite = false; // Add the favorite field with a default value of false
          db.collection('pokemons').insertOne(pokemon, (err, res) => {
            if (err) {
              console.log(`Error while inserting ${url}: ${err}`);
            } else {
              console.log(`Inserted ${url} successfully`);
            }
          });
        }
      });
    }
  }
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
