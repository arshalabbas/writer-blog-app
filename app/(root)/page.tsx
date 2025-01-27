import LogoutButton from "@/components/logout-button";
import { auth } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Writers - Write. Share. Inspire.",
};

const Home = async () => {
  const session = await auth();

  return (
    <div className="pt-[100px]">
      {session?.user?.email} <LogoutButton />
    </div>
  );
};

export default Home;
