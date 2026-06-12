import express from 'express'
import { loginmiddleware } from './middleware/loginMiddleware';
import jwt from 'jsonwebtoken';
import { JWT_TOKEN } from '@repo/backend-common/config';
import { createUserScheme, signinScheme, createroom } from "@repo/common/types"
import { prisma } from '@repo/db/config';

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {

    const data = createUserScheme.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error.message });
        return;
    }
    const user = await prisma.user.create({
        data: {
            name: data.data.name,
            password: data.data.password
        }
    })
    res.json({ user });
})

app.post('/login', async (req, res) => {
    const data = signinScheme.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error });
        return;
    }
    const user = await prisma.user.findFirst({
        where: {
            name: data.data.name,
            password: data.data.password
        }
    })

    if (!user) {
        res.status(401).json({ error: "Invalid username or password" });
        return;
    }

    const token = jwt.sign(user?.id as unknown as String, JWT_TOKEN);
    res.json({ token });
})

app.post('/room', loginmiddleware, async (req, res) => {
    const data = createroom.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({ error: data.error });
        return;
    }
    await prisma.room.create({
        data: {
            slug: data.data.name,
            userId: Number(data.data.userId),
        }
    })
    res.send("room created")
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
})