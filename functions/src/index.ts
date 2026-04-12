import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const onNewMessage = functions.firestore
    .document("messages/{messageId}")
    .onCreate(async (snap, context) => {
        const message = snap.data();
        if (message.sender === "user") {
            // Here you would call Gemini API
            console.log("Processing AI response for: ", message.text);

            // Simulation of AI response logic
            return admin.firestore().collection("messages").add({
                userId: message.userId,
                text: "AI Response processing...",
                sender: "ai",
                timestamp: admin.firestore.Timestamp.now(),
            });
        }
    });

export const checkSubscriptions = functions.pubsub
    .schedule("every 24 hours")
    .onRun(async (context) => {
        // Logic to check expiring subscriptions
        console.log("Checking subscriptions...");
    });
