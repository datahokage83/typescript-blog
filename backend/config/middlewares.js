

// module.exports = [
//   'strapi::errors',
//   {
//     name: 'strapi::security',
//     config: {
//       contentSecurityPolicy: {
//         useDefaults: true,
//         directives: {
//           "connect-src": [
//             "'self'",
//             "https:",
//             "ws:",
//             "https://typescript-blog-backend.onrender.com",
//             "wss://typescript-blog-backend.onrender.com"
//           ],
//           "img-src": [
//             "'self'",
//             "data:",
//             "blob:",
//             "https://typescript-blog-backend.onrender.com"
//           ],
//           "media-src": [
//             "'self'",
//             "data:",
//             "blob:",
//             "https://typescript-blog-backend.onrender.com"
//           ],
//           "script-src": [
//             "'self'",
//             "'unsafe-inline'",
//             "https://typescript-blog-backend.onrender.com"
//           ],
//           "frame-src": ["'self'"],
//         },
//       },
//     },
//   },

//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::logger',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];

module.exports = [
  'strapi::errors',

  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": [
            "'self'",
            "https:",
            "ws:",
            "https://typescript-blog-backend.onrender.com",
            "wss://typescript-blog-backend.onrender.com"
          ],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://typescript-blog-backend.onrender.com"
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://typescript-blog-backend.onrender.com"
          ],
          "script-src": [
            "'self'",
            "'unsafe-inline'",
            "https://typescript-blog-backend.onrender.com"
          ],
          "frame-src": ["'self'"],
        },
      },
    },
  },

  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        '*', // allow everything OR replace with frontend domain
        // "https://your-frontend.vercel.app"
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeadersOnError: true,
    },
  },

  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
