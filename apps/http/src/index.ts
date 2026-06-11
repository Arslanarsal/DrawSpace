import express from 'express'
import { loginmiddleware } from './middleware/loginMiddleware';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '@repo/backend-common/config';
import {createUserScheme  , signinScheme , createroom} from "@repo/common/types"

const app = express();

app.get('/login', (req, res) => {
   const data  = signinScheme.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error });
        return;
    }
   const userId = "12345"; 
   const token = jwt.sign(userId , JWT_TOKEN);
   res.json({ token });
})

app.get('/sigup', (req, res) => {

    const data  = createUserScheme.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error });
        return;
    }
   // db call to create user
})

app.get('/room', loginmiddleware ,(req, res) => {
    const data  = createroom.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error });
        return;
    }
    res.send("room created")
})

app.listen(3001 , ()=>{
    console.log("Server is running on port 3001");
})