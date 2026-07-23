const connectDB = require("./config/db");
async function main() {
    await connectDB();
    console.log("Backend Ready");
}
main();