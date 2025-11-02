import bcrypt from "bcrypt";

// --- CHANGE THE PASSWORD HERE ---
const passwordToHash = 'admin123'; // 🚨 **CHANGE THIS PASSWORD** 🚨
// ---------------------------------

async function generateHash() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(passwordToHash, salt);
        
        console.log("\n=========================================");
        console.log("!!! COPY THIS HASH FOR MONGO ATLAS !!!");
        console.log(`Hashed Password: ${hashedPass}`);
        console.log(`Original Password: ${passwordToHash}`);
        console.log("=========================================\n");
        
    } catch (error) {
        console.error("CRITICAL ERROR: Hashing failed.", error);
    }
}

generateHash();