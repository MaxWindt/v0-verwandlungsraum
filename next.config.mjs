const repoName = "v0-verwandlungsraum";
const isGithubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure static assets resolve correctly when the site is served from a sub-path on GitHub Pages.
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  images: {
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