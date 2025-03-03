import { FastifyRequest, FastifyInstance } from 'fastify';
import { FastifyReply } from 'fastify';
import { z } from 'zod';
import { prisma } from "@/lib/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '@/env';





export class UserControllers {
    async createUser(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6, { message: "A senha deve ter no Min 6 caracteres" })
        })
        const { name, email, password } = bodySchema.parse(request.body);
        const passwordHash = await bcrypt.hash(password, 6)

        try {
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash,
                }
            })
            return reply.send({ message: 'Usuário registrado com sucesso!', user })
        } catch (error) {
            return reply.status(400).send({ message: 'Erro ao registrar usuário', error })
        }
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6, { message: "A senha deve ter no Min 6 caracteres" })
        })


        const { email, password } = bodySchema.parse(request.body)

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            return reply.status(401).send({ messege: 'Usuário não encontrado | user not found ' })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return reply.status(401).send({ messege: 'Senha incorreta | Incorrect password ' })
        }

        const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
            expiresIn: '1d'
        })

        return reply.send({ token })

    }
}
