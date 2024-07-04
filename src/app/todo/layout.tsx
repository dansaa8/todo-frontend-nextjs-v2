import SideNav from '@/app/ui/navigation/sidenav';

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <SideNav />
      <main className="overflow-y-auto flex flex-col flex-grow">{children}</main>
    </div>
  );
}
