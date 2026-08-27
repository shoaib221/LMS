export default {
    routes: [
        {
            method: "GET",
            path: "/",
            handler: "auth.home",
            config: {
                auth: false,
            },
        },
    ],
};

