const session = require("express-session");
const MemoryStore = session.MemoryStore;
module.exports = session({
    secret: 'your_secret_key', // Change this to a secret key for session encryption
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore(),
});