
const nextConfig = {
    env: {
        SERVER: process.env.SERVER,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      },
    reactStrictMode: true, 
    images: {
        domains: ['res.cloudinary.com'],
    },
   
};

export default nextConfig;
