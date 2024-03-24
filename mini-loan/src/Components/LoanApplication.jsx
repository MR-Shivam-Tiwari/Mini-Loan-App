import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
function LoanApplication() {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isLoanSubmitted, setIsLoanSubmitted] = useState(false);
  const [loans, setLoans] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve email from localStorage
      const userEmail = localStorage.getItem("email");

      // Send loan submission request with email
      const response = await axios.post("http://localhost:5000/api/submit", {
        loanAmount,
        loanTerm,
        startDate,
        userEmail, // Include userEmail in the request
      });

      console.log(response.data);
      setIsLoanSubmitted(true);
      // Redirect user to a new page or show a success message
    } catch (error) {
      console.error("Error submitting loan request:", error);
    }
  };

  const fetchLoans = async () => {
    try {
      const userEmail = localStorage.getItem('email'); // Retrieve email from localStorage
      const response = await axios.get(`http://localhost:5000/api/getloan?email=${userEmail}`);
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching loans:", error);
    }
  };
  
  useEffect(() => {
    fetchLoans();
  }, [isLoanSubmitted]);
  
  const handlePayButtonClick = (loanId) => {
    navigate(`/loandetails/${loanId}`);
  };
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center p-3">
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm w-full  max-w-2xl"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 p-4">
            <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
              Request a loan
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter your loan details below.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-6 ">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount"
                >
                  Loan amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="Enter the loan amount"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="term"
                >
                  Loan term in month
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="term"
                  placeholder="Enter the duration of the loan in months"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="start"
                >
                  Start date
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="start"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <div className="text-xs ml-2">
                  Specify the start date for the loan.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-6">
              <button
                className="inline-flex items-center bg-black text-white w-full justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {isLoanSubmitted && (
            <div className="my-4 flex justify-center">
              <div className="whitespace-nowrap rounded-lg bg-green-900/10 py-1.5 px-3 font-sans text-sm sm:text-xs font-bold uppercase">
                Your loan request submitted.
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-3">
        <div className="space-y-6">
          {loans.map((loan, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
                <div className="flex items-center  justify-between gap-3">
                  <div className="whitespace-nowrap flex items-center  rounded-lg bg-green-900/10 py-1.5 px-3 font-sans text-sm sm:text-xs font-bold uppercase">
                    <div className="font-bold">Loan request for</div> &nbsp;- $
                    {loan.loanAmount}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="whitespace-nowrap  flex items-center rounded-lg bg-green-900/10 py-1.5 px-3 font-sans text-sm sm:text-xs font-bold uppercase">
                    <div className="font-bold">Term</div> &nbsp;-{" "}
                    {loan.loanTerm} months
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="whitespace-nowrap flex items-center rounded-lg bg-green-900/10 py-1.5 px-3 font-sans text-sm sm:text-xs font-bold uppercase">
                    <div className="font-bold">Startdate</div> &nbsp; - &nbsp;
                    {new Date(loan.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="whitespace-nowrap flex items-center rounded-lg bg-yellow-200 py-1.5 px-3 font-sans text-sm sm:text-xs font-bold uppercase">
                    {loan.state}
                  </div>
                </div>
              </div>

              <div className="flex justify-between space-y-1.5 p-6">
                <div>
                  <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                    Repayments
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Scheduled repayment dates and amounts.
                  </p>
                </div>
                <div key={loan._id}>
                  {/* Loan details rendering */}
                  <button
                    className="inline-flex items-center bg-black text-white justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    onClick={() => handlePayButtonClick(loan._id)}
                  >
                    Pay
                  </button>
                </div>
              </div>
              <div className="px-6">
                <div className=" w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="">
                      <tr className="border-b flex justify-between ">
                        <th className="h-12 px-4  font-medium ">Date</th>
                        <th className="h-12 px-4  font-medium  ">Amount</th>
                        <th className="h-12 px-4  font-medium  ">Status</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {loan.scheduledRepayments.map((repayment, index) => (
                        <tr
                          key={index}
                          className="border-b flex justify-between"
                        >
                          <td>
                            {new Date(
                              repayment.repaymentDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </td>
                          <td>${repayment.repaymentAmount.toFixed(2)}</td>
                          <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                            <div class="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-green-100 text-green-800 dark:[&amp;:has(.bg-green-100)]:bg-green-200 dark:text-green-100">
                              {repayment.state}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoanApplication;
