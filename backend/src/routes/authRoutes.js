require('dotenv').config();
const express = require("express");
const authRouter = express.Router();
const argon2 = require("argon2");
const { PrismaClient } = require("@prisma/client");
const {OAuth2Client} = require("google-auth-library");
const jwt = require("jsonwebtoken");


const prisma = new PrismaClient();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);





authRouter.post('/google',async (req,res) => {

    const accessToken = req.body?.accessToken;
    if(!accessToken){
        res.status(404).json({
            message : "404 access token not found"
        });
    }
    
    try{
        const ticket = await googleClient.verifyIdToken({
            idToken : accessToken,
            audience : process.env.GOOGLE_CLIENT_ID
        });

        console.log(ticket.getPayload());
        const { email, name, picture } = ticket.getPayload();

        let user = await prisma.users.findUnique({where : { email }});    
        if(!user){
            user = await prisma.users.create({
                data : {
                    email,
                    name,
                    profileUrl : picture
                }
            });
        }

        const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET);

        res.json({
            token 
        });


    } catch(error){
        console.log(error);
        res.status(400).json({
            status : "error",
            message : "Google authentication failed"
        })
    }
})

module.exports = authRouter;