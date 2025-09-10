const express = require('express');
const app = express();
// root route
app.get('/user', (req, res) => {
    res.send("hi");
});
// hello route
app.post('/user', (req, res) => {
    res.send("successfully posted");
});
// test route
app.delete('/user', (req, res) => {
    res.send("successfully deleted");
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
