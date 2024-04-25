const express = require('express');
const app = express();

// Route to handle favicon requests
app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // Respond with No Content status code
});

// Your other routes and middleware...

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
