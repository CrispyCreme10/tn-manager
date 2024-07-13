import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /**
       * The user's session token
       */
    sessionToken: string,

    /**
     * The user's id
     */
    userId: string
  }
}