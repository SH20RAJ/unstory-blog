import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "unstory_admin_session";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  
  if (!session) return false;
  
  // In a real app, you would verify a signed JWT or a session in DB.
  // For this starter, we check if the cookie matches the ADMIN_PASSWORD env var.
  return session.value === process.env.ADMIN_PASSWORD;
}

export async function loginAsAdmin(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return true;
  }
  return false;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
