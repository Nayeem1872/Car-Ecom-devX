/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        // destination:"http://10.10.10.22:6002/api/:path*" 
        destination:"http://dev.aloitconsultants.com:6002/api/:path*" 
        // destination: "http://192.168.0.108:6002/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
