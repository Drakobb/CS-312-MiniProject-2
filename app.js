const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Home route - displays the index.ejs page
app.get('/', (req, res) => {
    res.render('index');
});

// Route to fetch and display a random cocktail
app.get('/random', (req, res) => {
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(response => {
            // Extracting the cocktail data
            const cocktail = response.data.drinks[0]; 
            // Passing cocktail data to the EJS template
            res.render('cocktail', { cocktail }); 
        })
        .catch(error => {
            console.error('Error fetching cocktail data:', error);
            res.render('error', { message: 'Error fetching cocktail data. Please try again.' });
        });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
