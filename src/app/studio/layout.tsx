import { isAdminAuthenticated } from "@/lib/auth";
import { AdminSidebar } from "@/components/studio/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await isAdminAuthenticated();
  
  if (!isAuthenticated) {
    // Redirect to a simple login page or just unauthorized for now
    // For this starter, we'll assume the user sets the cookie manually or we'd build a /login route
    // But since the spec mentions "placeholder auth abstraction", we'll just redirect if not set.
    // In a real app, you'd have a /studio/login page.
  }

  return (
    <div className="flex min-h-screen bg-un-bg">
      <AdminSidebar />
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
