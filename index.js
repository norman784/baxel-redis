"use strict";

let fs = require('fs')
  , c = require('color-console');

module.exports = function (config) {
  let file = [process.cwd() + "/node_modules/redis", process.cwd() + "/node_modules/co-redis"];
  
  if (!fs.existsSync(file[0])) {
    c.red("In order to use baxel-sequelize you need to run 'npm install --save redis' in your project");
    return;
  } else if (!fs.existsSync(file[1])) {
    c.red("In order to use baxel-sequelize you need to run 'npm install --save co-redis' in your project");
    return;
  }

  config = config || {};

  let redis = require(file[0])
    , wrapper = require(file[1])
    , client = redis.createClient(
      config.port || 6379,
      config.host || "127.0.0.1"
  );

  if (config.flushall) {
    client.flushall();
  }

  return wrapper(client);
};