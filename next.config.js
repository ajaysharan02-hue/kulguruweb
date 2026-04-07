/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost' },
            { protocol: 'http', hostname: 'localhost', port: '5000' },
            { protocol: 'http', hostname: '127.0.0.1' },
            { protocol: 'http', hostname: '127.0.0.1', port: '5000' },

            // ✅ ADD THIS
            {
                protocol: 'https',
                hostname: 'kulgurusp.in'
            },

            // agar backend subdomain pe hai
            {
                protocol: 'https',
                hostname: 'server.kulgurusp.in' // (agar use kar rahe ho)
            },

            { protocol: 'https', hostname: 'images.unsplash.com' }
        ]
    }
};

module.exports = nextConfig;
