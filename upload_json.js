const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Initialize Firebase Admin SDK
const serviceAccountPath = path.join(__dirname, "firebase-adminsdk.json");
const jsonFilePath = path.join(__dirname, "ddata.json");

// Ensure Firebase credentials file exists
if (!fs.existsSync(serviceAccountPath)) {
    console.error("❌ Firebase Admin SDK JSON file not found!");
    process.exit(1);
}

// Ensure JSON data file exists
if (!fs.existsSync(jsonFilePath)) {
    console.error("❌ ddata.json file not found!");
    process.exit(1);
}

const serviceAccount = require(serviceAccountPath);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const leadsCollection = db.collection("leads");

// Function to upload JSON data
const uploadJSON = async () => {
    try {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

        for (let i = 0; i < jsonData.length; i++) {
            await leadsCollection.add(jsonData[i]);
            console.log(`✅ Uploaded ${i + 1}/${jsonData.length}:`, jsonData[i]);
        }

        console.log("🎉 JSON Upload Complete!");
    } catch (error) {
        console.error("❌ Error uploading JSON:", error);
    }
};

// Run the upload function
uploadJSON();
