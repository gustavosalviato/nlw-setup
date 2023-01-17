import Fastify from "fastify";
import { prisma } from "./lib/client";
import cors from '@fastify/cors'

const app = Fastify()

app.register(cors)

app.get('/habits', async () => {
    const habits = await prisma.habit.findMany()

    return habits
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('Server is running in port 3333! 🚀')
})

