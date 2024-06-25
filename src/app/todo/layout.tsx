import SideNav from '@/app/ui/navigation/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  //   return (
  //     <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
  //       <div className="w-full flex-none md:w-64">
  //         <SideNav />
  //       </div>
  //       <div className="flex-grow p-y-0 px-4 md:overflow-y-auto md:p-12 bg-stone-200">
  //         {children}
  //       </div>
  //     </div>
  //   );
  return (
    <>
      <SideNav />
      <main className="p-4">
        <div className=" border rounded-md">{children}</div>
      </main>
    </>
  );
}
