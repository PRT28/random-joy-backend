const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: "Y8XHl6RwvSi2JKif3nhO-8kogBk",
  });
  module.exports=cloudinary