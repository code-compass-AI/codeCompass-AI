require('dotenv').config();
const express = require("express");
const authRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

const prisma = new PrismaClient();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function checkApiKey(userId) {
    const chcekKey = await prisma.users.findUnique({
        where: { id: userId },
        select: { mistralKey: true }
    });

    return chcekKey?.mistralKey !== "EMPTY" && chcekKey?.mistralKey !== null;
}

authRouter.post('/google', async (req, res) => {
    const accessToken = req.body?.accessToken;
    if (!accessToken) {
        return res.status(400).json({ message: "400 Bad Request: Access token not found" });
    }

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: accessToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        console.log(ticket.getPayload());
        const { email, name, picture } = ticket.getPayload();

        let user = await prisma.users.findUnique({ where: { email } });
        if (!user) {
            user = await prisma.users.create({
                data: { email, name, profileUrl: picture }
            });
        }

        const hasApiKey = await checkApiKey(user.id);
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

        res.json({ token, hasApiKey });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "error",
            message: "Google authentication failed"
        });
    }
});

authRouter.post('/addapikey', authMiddleware, async (req, res) => {
    const apiKey = req.body?.apiKey;
    if (!apiKey) {
        return res.status(400).json({ message: "400 Bad Request: API key not found" });
    }

    try {
        await prisma.users.update({
            where: { id: req.userId },
            data: { mistralKey: apiKey }
        });

        res.json({ message: "API key added successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "500 Internal Server Error" });
    }
});

module.exports = authRouter;
