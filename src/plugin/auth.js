import fastifyPlugin from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";



export default fastifyPlugin(async (fastify, opts) => {

    fastify.register(fastifyJwt, {
        namespace: "access",
        secret: fastify.config.ACCESS_TOKEN_SECRET,
        cookie: {
            cookieName: "accessToken",
        },
        sign: { expiresIn: "1d" }
    })

    fastify.register(fastifyJwt, {
        namespace: "refresh",
        secret: fastify.config.REFRESH_TOKEN_SECRET,
        cookie: {
            cookieName: "refreshToken",
        },
        sign: { expiresIn: "7d" }
    })


    
    fastify.decorate("authenticate", async function(request, reply) {
        try {
            await request.accessJwtVerify({ onlyCookie: true })
        } catch (err) {
            reply.unauthorized("Authentication required. Please log in.")
        }
    })
})