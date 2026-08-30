
import { apiRoutes } from "../../../extra/apiRoutes";

export default {

    async register(ctx: any) {

        const {
            username,
            email,
            password,
        } = ctx.request.body;


        if (!username || !email || !password) {
            return ctx.badRequest(
                "username, email and password required"
            );
        }


        const existingUser = await strapi
            .query("plugin::users-permissions.user")
            .findOne({
                where: {
                    email,
                },
            });


        if (existingUser) {
            return ctx.badRequest(
                "Email already exists"
            );
        }


        const user = await strapi
            .plugin("users-permissions")
            .service("user")
            .add({
                username,
                email,
                password,
                confirmed: true,
                blocked: false,
            });

        const jwtToken =
            await strapi
                .plugin("users-permissions")
                .service("jwt")
                .issue({
                    username: user.username,
                    email: user.email
                });


        ctx.body = {
            message: "Registered successfully",
            user,
            jwtToken
        };
    },

    async login(ctx: any) {

        try {
            console.log("login");

            const {
                email,
                password,
            } = ctx.request.body;


            const user = await strapi
                .query("plugin::users-permissions.user")
                .findOne({
                    where: {
                        email,
                    },
                });


            if (!user) {
                return ctx.badRequest(
                    "Invalid email"
                );
            }


            const validPassword =
                await strapi
                    .plugin("users-permissions")
                    .service("user")
                    .validatePassword(
                        password,
                        user.password
                    );


            if (!validPassword) {
                return ctx.badRequest(
                    "Invalid password"
                );
            }


            const jwtToken =
                await strapi
                    .plugin("users-permissions")
                    .service("jwt")
                    .issue({
                        email: user.email,
                        username: user.username
                    });


            ctx.body = {
                jwtToken,
                user
            };
        }
        catch (error) {
            strapi.log.error("Login error:", error);

            return ctx.internalServerError(
                "An unexpected error occurred. Please try again later."
            );

        }


    },

    async me(ctx: any) {

        ctx.body = {
            user: ctx.state.user,
        };

    },

    async home(ctx: any) {



        ctx.body = {
            message: "Welcome to Learing Management System",
            apiRoutes
        };
    },

};


