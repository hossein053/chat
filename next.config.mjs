/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
    images: {
        domains: ['localhost:3002'],
        loader: 'default',
        unoptimized: true,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    i18n: {
        locales: ["en", "it"],
        defaultLocale: "en",
    },
    reactStrictMode: true,
};

export default nextConfig;
