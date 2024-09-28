import { withAuth } from "next-auth/middleware"

export default withAuth(
  {
    callbacks: {
      authorized: ({ token }) => {
        // If there's a token, the user is authenticated
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/", "/compatibility", "/celebrities", "/about"],
}