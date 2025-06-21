import { authMiddleware } from "@civic/auth/nextjs/middleware";

export default authMiddleware();

// This config matches no routes, so it effectively doesn't apply any restrictions.
export const config = {
  matcher: [],
};