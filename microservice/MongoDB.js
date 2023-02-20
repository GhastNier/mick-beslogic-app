const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const port = 3000;

// Set up the MongoDB client and database
const mongoUrl = "mongodb+srv://ghastnier:268ab5J0EmXsbPHx@cluster0.glgdodb.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoUrl, {useUnifiedTopology: true});
app.use(cors())

// Connect to the MongoDB database
async function mongoInitialize() {
  await mongoClient.connect(function (err, client) {
    if (err) {
      console.log('Failed to connect to MongoDB: ' + err);
    } else {
      console.log('Connected to MongoDB successfully');
      const db = client.db('pokeapi');
      const poke = db.collection('pokemons')

      // Set up the routes
      app.get('/pokemon/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
          const pokemon = await poke.findOne({_id: id});
          if (!pokemon) {
            res.status(404).send('Pokemon not found');
          } else {
            res.send(pokemon);
          }
        } catch (err) {
          console.log(err);
          res.status(500).send('Error retrieving document from database');
        }
      });

      app.get('/pokemons', async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = 16;
        const skip = (page - 1) * limit;

        try {
          const documents = await poke.find({}, {name: 1, weight: 1, favorite: 1, height: 1})
            .skip(skip)
            .limit(limit);
          console.log(documents);
          res.json(documents);
        } catch (err) {
          console.log(err);
          res.status(500).send('Error retrieving documents from database');
        }
      });

      app.get('/pokemon/:id/fav', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
          const pokemon = await poke.findOne({_id: id});
          if (!pokemon) {
            res.status(404).send('Pokemon not found');
          } else {
            res.send({favorite: pokemon.favorite});
          }
        } catch (err) {
          console.log(err);
          res.status(500).send('Error retrieving document from database');
        }
      });

      app.put('/pokemon/:id/fav', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
          const pokemon = await poke.findOne({_id: id});
          if (!pokemon) {
            res.status(404).json({
              error: 'Pokemon not found'
            });
          } else {
            const currentFavoriteValue = pokemon.favorite;
            const newFavoriteValue = !currentFavoriteValue;
            const result = await poke.updateOne({_id: id}, {$set: {favorite: newFavoriteValue}});
            console.log(result);
            const updatedPokemon = await poke.findOne({_id: id});
            res.status(200).json(updatedPokemon);
          }
        } catch (err) {
          console.log(err);
          res.status(500).send('Error updating document in database');
        }
      });

      app.listen(port, () => {
        console.log(`Express app listening at http://localhost:${port}`);
      });
    }
  });
}

mongoInitialize();
