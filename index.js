const express = require("express");
const PORT = 3000;

var app = express();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/url", (req, res, next) => {
    res.json(["A", "B", "C", "D"]);
});
