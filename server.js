/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: _______mohamad-mishal_______________ Student ID: __120173224____________ Date: __16-03-2024____________
*
* Published URL: ___________________________________________________________
*
********************************************************************************/
const legoData = require("./modules/legoSets");
async function initializeLegoData() {
    try {
        await legoData.initialize();
        console.log("Lego data initialized successfully");
    } catch (error) {
        console.error("Error initializing lego data:", error);
    }
}
initializeLegoData();

const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Route to display my information
app.get('/', (req, res) => {
    res.render('home');
});

// Route to display the about page
app.get('/about', (req, res) => {
    res.render('about');
});

// Route to get all Lego sets
app.get('/lego/sets', async (req, res) => {
    const theme = req.query.theme;
    try {
        if (theme) {
            const setsByTheme = await legoData.getSetsByTheme(theme);
            res.render('sets', { sets: setsByTheme });
        } else {
            const allSets = await legoData.getAllSets();
            res.render('sets', { sets: allSets });
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Route for getSetByNum
app.get('/lego/sets/:setNum', async (req, res) => {
    const setNum = req.params.setNum;
    try {
        const set = await legoData.getSetByNum(setNum);
        res.render('set', { set });
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Route for 404 error
app.get('*', (req, res) => {
    let errorMessage = "";
    const statusCode = 404; 
    if (req.originalUrl.startsWith('/lego/sets?theme=')) {
        errorMessage = "No Sets found for the specific theme.";
    }
    else if (req.originalUrl.startsWith('/lego/sets/')) {
        errorMessage = "No Sets found for specific set.";
    }
    else {
        errorMessage = "No view matched.";
    }
    res.status(statusCode).render('404', { message: errorMessage });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});
