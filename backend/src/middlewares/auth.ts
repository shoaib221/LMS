export default (config: any, { strapi }: any) => {


    return async (ctx: any, next: any) => {

        const authHeader = ctx.request.headers.authorization;

        if (!authHeader) {
            return ctx.unauthorized("Missing authorization token");
        }

        const token = authHeader.replace("Bearer ", "");

        try {
            const payload = await strapi
                .plugin("users-permissions")
                .service("jwt")
                .verify(token);


            const user = await strapi
                .query("plugin::users-permissions.user")
                .findOne({
                    where: {
                        email: payload.email
                    },
                });


            if (!user) {
                return ctx.unauthorized("User not found");
            }


            ctx.state.user = user;

            await next();

        } catch (err) {
            return ctx.unauthorized("Invalid token");
        }
    };
};