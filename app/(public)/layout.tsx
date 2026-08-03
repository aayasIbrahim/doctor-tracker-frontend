import { Navbar } from "@/components/shared/navber";
import { getMe } from "@/services/getMe";
import React from "react";

async function PubliclayoutPage({ children }: { children: React.ReactNode }) {
  const user = await getMe();
  console.log("user", user);
  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
}

export default PubliclayoutPage;
