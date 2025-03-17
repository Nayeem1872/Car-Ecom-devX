/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        // destination:"http://10.10.10.22:6002/api/:path*"
        destination:
          "http://vague-ailee-nurulabrar2369-cc6b8513.koyeb.app/api/:path*",
        // destination: "http://192.168.0.108:6002/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
