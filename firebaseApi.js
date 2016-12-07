ar admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("config/ezgarage-a71b7-firebase-adminsdk-ukbue-d42780731d.json"),
  databaseURL: "https://ezgarage-a71b7.firebaseio.com"
});