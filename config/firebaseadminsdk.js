
var admin = require("firebase-admin");
var serviceAccount = require("./apparel-hub-firebase-adminsdk-quvmq-628e95b117.json");

// ! admin sdk need to be use when ever using a firebase function
const adminsdk = () => {
  return  admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://apparel-hub.firebaseio.com"
    });
}

module.exports = adminsdk;

