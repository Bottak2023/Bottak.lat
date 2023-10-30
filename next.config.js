// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  headers: { 
     "Access-Control-Allow-Origin": ["*"],
     "Access-Control-Allow-Methods": ["GET","DELETE","POST","PUT"] 
    },
    



}

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  nextConfig
})


// headers: async () => {
//   return [
//     {
//       // matching all API routes
//       source: "/api/:path*",
//       headers: [
//         // { key: "Access-Control-Allow-Credentials", value: "true" },
//         { key: "Access-Control-Allow-Origin", value: "*" },
//         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//       ]
//     }
//   ]
// }