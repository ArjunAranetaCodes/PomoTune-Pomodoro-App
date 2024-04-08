import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes:['/api/webhook/clerk', '/api/webhook/clerk/route.ts'],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};