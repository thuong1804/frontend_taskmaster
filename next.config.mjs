/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
      reactStrictMode: false,
      images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3005',
            pathname: '',
          },
        ],
      },
};


export default nextConfig;
