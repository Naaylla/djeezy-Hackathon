const express = require('express');
const connectDB = require("./config/dbConection");
const dotenv = require("dotenv").config();
const errorHandler = require('./middleware/errorHandler');
const { getContract } = require('./blockchain/network/networkConnect');

connectDB();
getContract();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/campaigns", require("./routes/campaignRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server is running on port', port);
});
