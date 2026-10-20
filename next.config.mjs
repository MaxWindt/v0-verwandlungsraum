/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // The site is exported as plain static files (./out) and served by Cloudflare. All content comes from
  // the Payload CMS at build time (see scripts/fetch-content.mjs); there is no server at runtime.
  output: 'export',
  env: {
    // Origin of the CMS, needed by the editor preview (app/preview) to talk to the admin.
    NEXT_PUBLIC_CMS_URL:
      process.env.NEXT_PUBLIC_CMS_URL ||
      process.env.PAYLOAD_URL ||
      (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : ''),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Static export has no image optimizer. Uploaded images are already resized by the CMS.
    unoptimized: true,
  },
  // Explicitly provide an empty turbopack config so Next.js doesn't error
  // when a custom webpack configuration is present.
  turbopack: {},
  webpack: (config, { dev }) => {
    if (process.env.NODE_ENV === "development") {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "@dyad-sh/nextjs-webpack-component-tagger",
      });
    }
    return config;
  },
};

export default nextConfig;
