import { createCivicAuthPlugin } from "@civic/auth/nextjs"

const nextConfig = {
  /* config options here */
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "e51aee70-31c4-4d4b-8b26-0a3d6b38f28e"
});

export default withCivicAuth(nextConfig)