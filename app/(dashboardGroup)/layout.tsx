// import { Navbar } from "@/components/shared/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { getMe } from "@/service/getMe";
import DashboardSidebar from "./_components/DashboardSidebar";
import { Navbar } from "@/components/shared/navber";
import { getMe } from "@/services/getMe";


const DashboardLayout = async (
    {
        children
    } : {
        children: React.ReactNode
    }
) => {
   const user = await getMe();
 
 return (
   <div className="h-screen flex flex-col overflow-hidden">
      {/* মেইন নেববার */}
      <Navbar user={user} />
      
      <SidebarProvider
        // style={{
        //   "--sidebar-width": "20rem",
        //   "--sidebar-width-mobile": "20rem",
        // } as React.CSSProperties}
      >
        <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden relative">
          
          {/* 📱 মোবাইলের জন্য টগল বাটন (ডেস্কটপে হাইড থাকবে) */}
          <div className="absolute top-3 left-3 z-50 md:hidden">
            <SidebarTrigger className="bg-background border shadow-sm p-2 rounded-md" />
          </div>

          {/* সাইডবার */}
          <DashboardSidebar user={user} />
          
          {/* মেইন কন্টেন্ট এরিয়া */}
          {/* pt-14 দেওয়া হয়েছে যেন মোবাইলে টগল বাটনের নিচে কন্টেন্ট না ঢোকে */}
          <main className="flex-1 min-w-0 h-full overflow-y-auto p-4 md:p-6 pt-14 md:pt-6">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout