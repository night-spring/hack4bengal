import { createCivicAuthPlugin } from "@civic/auth/nextjs"

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "e51aee70-31c4-4d4b-8b26-0a3d6b38f28e",
  redirectUrl:"/app"
});

export default withCivicAuth(nextConfig)