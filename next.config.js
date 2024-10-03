/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    // Used to guard against accidentally leaking SANITY_API_READ_TOKEN to the browser
    taint: true,
  },
  logging: {
    fetches: { fullUrl: false },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io", 
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", 
      },
      {
        protocol: "https",
        hostname: "cdn.builder.io"
      },
    ],
  },
};
