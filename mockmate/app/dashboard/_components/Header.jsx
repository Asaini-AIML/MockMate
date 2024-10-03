"use client";
import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // Import Link for client-side navigation

function Header() {
  const path = usePathname();
  const router = useRouter();

  // Function to navigate to the home page (dashboard)
  const moveToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    console.log(path);
  }, [path]); // Log current path on change

  return (
    <div
      className="flex p-4 items-center justify-between bg-secondary shadow-sm h-16"
      style={{
        background:
          "linear-gradient(90deg, rgba(0, 74, 173, 0.5), rgba(54, 143, 216, 0.5))", // Gradient for Navbar
      }}
    >
      {/* Logo Section */}
      <Image
        className="cursor-pointer mt-24" // Adjust margin for better alignment
        onClick={moveToHome}
        src="/logo-removebg-preview.png" // Logo image located in the public folder
        alt="MockMate logo"
        width={220} // Adjust width if needed
        height={200}  // Adjust height if needed
        priority
      />

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6">
        {["Dashboard", "Questions", "Upgrade", "How it Works"].map((item, index) => {
          const pathName = `/dashboard/${item.toLowerCase().replace(" ", "")}`; // Create the path dynamically
          return (
            <li
              key={index}
              className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === pathName && "text-primary font-bold"
              }`}
            >
              <Link href={pathName}>{item}</Link> {/* Wrap link with Link component for navigation */}
            </li>
          );
        })}
      </ul>

      {/* User Button */}
      <UserButton />
    </div>
  );
}

export default Header;
