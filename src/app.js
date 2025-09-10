const express = require('express');
const app = express();
// root route
app.get('/', (req, res) => {
    res.send("hi");
});
// hello route
app.get('/hello', (req, res) => {
    res.send("hello hello hello");
});
// test route
app.get('/test', (req, res) => {
    res.send("hello test");
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
