// app/newsletter/login/page.tsx
import { redirect } from "next/navigation"; // For server-side redirect
import { cookies } from "next/headers"; // To read cookies on the server
import jwt from "jsonwebtoken"; // To verify the JWT

import LoginPageClient from "./loginPageClient"; // Assuming your LoginPage component is renamed to LoginPageClient.tsx

const JWT_SECRET = process.env.JWT_SECRET;

export default async function LoginPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token");

  let isAuthenticated = false;
  if (authToken) {
    try {
      jwt.verify(authToken.value, JWT_SECRET);
      isAuthenticated = true;
    } catch (error) {
      // Token is invalid or expired.
      // In a page.tsx, you can't directly delete cookies via `cookies().delete()`.
      // You'd typically let the user attempt to log in again, or redirect them to a logout
      // route that clears the cookie. For now, we'll just treat them as unauthenticated.
      console.log(
        "Invalid or expired token on login page, treating as unauthenticated."
      );
    }
  }

  // If the user is authenticated, redirect them to the dashboard
  if (isAuthenticated) {
    redirect("/newsletter/dashboard"); // Server-side redirect
  }

  // If not authenticated, render the client login form
  return <LoginPageClient />;
}
