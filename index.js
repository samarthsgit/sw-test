import express from "express";
import dotenv from "dotenv";
import webPush from "web-push";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const apiKeys = {
    publicKey: "BJOR8g3cXGI1gRGL2JU_yBMQJHcVEe2ujdkpsg4F33uADVsrivewgLTxw2MVaraGcgnXkWX9raI0tGWbeINWzSo",
    privateKey: "Ek-WgXI5NsRHSFlxM46yXgkpMVS2gdbRY1aS94TxRLQ"
}

webPush.setVapidDetails(
    'mailto:samarthchouksey18@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey
);

app.listen(3000, () => {
    console.log("Listening at Port 3000");
});

app.get("/", (req, res) => {
    res.render('index.ejs');
});

const subscriptionData = [];

app.post("/save-subscription", (req, res) => {
    const subscription = req.body;
    subscriptionData.push(subscription);
});

app.get("/send-notification", (req, res) => {
    webPush.sendNotification(subscriptionData[0], "Hello World!", {
        urgency: 'high'
    });
    res.json({"status": "Success", "message": "Message sent to push service"});
})