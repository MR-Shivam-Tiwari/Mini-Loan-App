import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoanApproval() {
  const [isLoading, setIsLoading] = useState(false);
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/checkloan");
        setLoans(response.data);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchLoans();
  }, []);
  const handleApprove = async (loanId) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/${loanId}/approve`
      );
      console.log(response.data); // Handle success response
      // Update the UI to indicate approval
      setLoans((prevLoans) =>
        prevLoans.map((loan) => {
          if (loan._id === loanId) {
            return { ...loan, state: "APPROVED" };
          }
          return loan;
        })
      );
      alert("Loan approved successfully");
    } catch (error) {
      console.error("Error approving loan:", error);
      // Handle error, show error message to the user, etc.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex-1 border-b">
        <div className="flex h-14 items-center px-4 border-b md:px-6">
          <a className="mr-4 md:mr-6 font-bold" href="/approval" rel="ugc">
            Mini Loan
          </a>
          <nav className="flex-1 hidden text-sm gap-10 font-medium md:flex">
            <a className="ml-2" href="/approval" rel="ugc">
              Approve Loan
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
      <div className="p-3">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
              Pending applications
            </h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {loans.map((loan) => (
              <div
                key={loan._id}
                className="flex flex-col gap-6 p-3 border rounded-md"
              >
                <div className="grid gap-2">
                  <div className="font-semibold text-lg">{loan.username}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Applied on {new Date(loan.startDate).toDateString()}
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="font-semibold">
                    Loan amount: ${loan.loanAmount}
                  </div>
                  <div className="font-semibold">
                    Term: {loan.loanTerm} months
                  </div>
                </div>
                <div className="">
                  {loan.state === "PENDING" && (
                    <div className="flex justify-center gap-4">
                      <button
                        className="inline-flex items-center w-full justify-center  text-sm font-medium bg-green-500 h-9 rounded-md px-3"
                        onClick={() => handleApprove(loan._id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Approving..." : "Approve"}
                      </button>
                      <button className="inline-flex items-center w-full justify-center whitespace-nowrap bg-red-500 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                        Reject
                      </button>
                    </div>
                  )}
                  {loan.state === "APPROVED" && (
                    <div className="flex justify-center">
                      <button className="inline-flex items-center w-full justify-center whitespace-nowrap text-sm font-medium bg-green-500 h-9 rounded-md px-3">
                        Approved
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanApproval;
