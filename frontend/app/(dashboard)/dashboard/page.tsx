// frontend/app/(dashboard)/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Main Dashboard</h1>
      <p>This is a protected page. You should only see this if you are logged in.</p>
    </div>
  );
}