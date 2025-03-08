/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        // destination: "https://nerim.cloud/api/:path*",
        // destination:"http://nerim.aloitconsultants.com/api/:path*",
        destination:"http://10.10.10.22:6002/api/:path*" 
        // destination: "http://192.168.0.107:8005/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
