/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(); // Initialize the Firebase Admin SDK

exports.registerUser = functions.https.onRequest(async (req, res) => {
  try {
    const {email, password, teacher} = req.body;

    // Create the user using Firebase Authentication
    const userCredential = await admin.auth().createUser({
      email,
      password,
    });

    const user = userCredential.user;

    // Set custom claims for the user
    await admin.auth().setCustomUserClaims(user.uid, {teacher});

    res.status(200).send("User registered successfully.");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user.");
  }
});
