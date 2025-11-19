// // module.exports = [
// //   'strapi::logger',
// //   'strapi::errors',
// //   'strapi::security',
// //   'strapi::cors',
// //   'strapi::poweredBy',
// //   'strapi::query',
// //   'strapi::body',
// //   'strapi::session',
// //   'strapi::favicon',
// //   'strapi::public',
// // ];

// module.exports = [
//   'strapi::logger',
//   'strapi::errors',
//   {
//     name: 'strapi::security',
//     config: {
//       contentSecurityPolicy: {
//         directives: {
//           "script-src": ["'self'", "editor.unlayer.com"],
//           "frame-src": ["'self'", "editor.unlayer.com"],
//           "img-src": [
//             "'self'",
//             "data:",
//             "cdn.jsdelivr.net",
//             "strapi.io",
//             "s3.amazonaws.com",
//           ],
//         },
//       },
//     },
//   },
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];
// module.exports = [
//   'strapi::logger',
//   'strapi::errors',
//   {
//     name: 'strapi::security',
//     config: {
//       contentSecurityPolicy: {
//         directives: {
//           "script-src": ["'self'", "editor.unlayer.com"],
//           "frame-src": ["'self'", "editor.unlayer.com"],
//           "img-src": [
//             "'self'",
//             "data:",
//             "cdn.jsdelivr.net",
//             "strapi.io",
//             "s3.amazonaws.com",
//           ],
//         },
//       },
//     },
//   },
//   {
//     name: 'strapi::cors',
//     config: {
//       enabled: true,
//       origin: [
//         'http://localhost:3000',
//         'http://127.0.0.1:3000',
//         'https://your-frontend-domain.com', // ✅ add production domain later
//       ],
//       methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//       headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
//       keepHeaderOnError: true,
//     },
//   },
//   'strapi::poweredBy',
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
            "http:",
            "https:",
            "ws:",
            "http://localhost:1337",
            "ws://localhost:1337"
          ],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "http://localhost:1337"
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "http://localhost:1337"
          ],
          "script-src": ["'self'", "'unsafe-inline'", "http://localhost:1337"],
          "frame-src": ["'self'"],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
