const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(
  // "mongodb://localhost/the-caf",
  "mongodb://thecaf:114simpsons@ds143932.mlab.com:43932/thecaf",
  {
    keepAlive: true
    // useNewUrlParser: true
  }
);

module.exports.User = require("./user");
module.exports.Menu = require("./menu");
