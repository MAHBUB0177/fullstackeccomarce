export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/orders",
    "/shipping",
    "/profile"

  ],
};
