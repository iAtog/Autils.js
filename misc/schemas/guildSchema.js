const mongoose = require('mongoose');
const settingsSchema = mongoose.Schema({
   guild: String,
   settings: Object
}, {collection: "settings"});
module.exports = mongoose.model("settings", settingsSchema);