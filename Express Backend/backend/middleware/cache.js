const redis = require("redis");
const sendResponseError = require("./middleware");

const redisClient = redis.createClient();

(async () => {
  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  redisClient.connect();
  redisClient.on("connect", () => console.log("Redis Client Connected"));
})();

async function cacheData(req, res, next) {
  try {
    const cachedResults = await redisClient.get(process.env.KEY);
    if (cachedResults) {
      res.send(JSON.parse(cachedResults));
      console.log("Cache Data Sent");
    } else {
      console.log("No Cache Data Found");
      next();
    }
  } catch (error) {
    sendResponseError(500, "Cache Server Error", res);
    console.error("Cache Server Error", error);
  }
}

module.exports = { redisClient, cacheData };
