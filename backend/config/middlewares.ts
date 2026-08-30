import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
	'strapi::logger',
	'strapi::errors',
	'strapi::security',
	{
		name: "strapi::cors",
		config: {
			origin: [
				"http://localhost:3000",
				"https://lms-delta-cyan.vercel.app/"
			],
			methods: [
				"GET",
				"POST",
				"PUT",
				"PATCH",
				"DELETE",
				"HEAD",
				"OPTIONS",
			],
			headers: [
				"Content-Type",
				"Authorization",
				"Origin",
				"Accept",
			],
			credentials: true,
		},
	},
	'strapi::poweredBy',
	'strapi::query',
	'strapi::body',
	'strapi::favicon',
	'strapi::public',
];

export default config;
