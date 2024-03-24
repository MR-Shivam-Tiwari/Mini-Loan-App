import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <div className="flex-1 border-b">
        <div className="flex h-14 items-center px-4 border-b md:px-6">
          <a className="mr-4 md:mr-6 font-bold" href="/apply" rel="ugc">
            Mini Loan
          </a>
          <nav className="flex-1 hidden text-sm gap-10 font-medium md:flex">
            <a className="ml-2" href="/apply" rel="ugc">
              Apply Loan
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <button
              onClick={handleLogout}
              className="items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 hidden md:flex"
            >
              Log Out
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 md:hidden"
            >
              Log Out
            </button>
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-6 h-6 md:w-8 md:h-8"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
