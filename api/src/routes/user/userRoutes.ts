import { randomUUID } from "node:crypto";
import { z } from "zod";
import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";

export const userRoutes = async (app: FastifyTypedInstance) => {
    app.get("/users", {
        schema: {
            tags: ["users"],
            description: "List all users",
            response: {
                200: z.array(
                    z.object({
                        id: z.string(),
                        name: z.string(),
                        email: z.string(),
                    })
                )
            }
        }},
        async (_, reply) => {

            const users = await ap

            return reply.status(200).send(users);
        }
    );
    app.post("/users", {
        schema: {
            tags: ["users"],
            description: "Create a new user",
            body: z.object({
                name: z.string(),
                email: z.email(),
            }),
            response: {
                201: z.null().describe("User created."),
            }
        }},
        async (request, reply) => {
            const { name, email } = request.body;
            
            users.push({
                id: randomUUID(),
                email,
                name,
            });

            return reply.status(201).send(null);
        }
    );
}
