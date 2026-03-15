import "@fastify/cookie";
import type { FastifyReply, FastifyRequest } from "fastify";

export const postLogout = async (
	_request: FastifyRequest,
	reply: FastifyReply,
) => {
	return reply
		.setCookie("accessToken", "", {
			httpOnly: true,
			sameSite: "strict",
			path: "/",
			maxAge: 0,
		})
		.status(200)
		.send({ status: 200, message: "Logout successful" });
};
