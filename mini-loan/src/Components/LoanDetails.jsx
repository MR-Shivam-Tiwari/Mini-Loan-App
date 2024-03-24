import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

function LoanDetails() {
  const [modalOpen, setModalOpen] = useState(false);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  const [scheduledRepayments, setScheduledRepayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null); // Track the selected payment ID

  const { loanId } = useParams();

  const fetchScheduledRepayments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/${loanId}/repayments`
      );
      setScheduledRepayments(response.data);
    } catch (error) {
      console.error("Error fetching scheduled repayments:", error);
    }
  };

  useEffect(() => {
    fetchScheduledRepayments();
  }, [loanId]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleSubmitRepayment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/${loanId}/repayments/${selectedPaymentId}/pay`,
        { repaymentAmount }
      );
      // Update the state with the updated repayment information
      const updatedRepayments = scheduledRepayments.map((repayment) =>
        repayment._id === selectedPaymentId
          ? response.data.updatedRepayment
          : repayment
      );
      setScheduledRepayments(updatedRepayments);
      setModalOpen(false); // Close the modal after successful submission
      setRepaymentAmount(0); // Reset repayment amount
    } catch (error) {
      console.error("Error submitting repayment:", error);
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="p-4">
        <div
          className="p-6 border rounded border-gray-200 dark:border-gray-800"
          id="d7i0bjx6aam"
        >
          <h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight mb-3">
            Loan Details
          </h3>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Due date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Amount
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {scheduledRepayments.map((repayment, index) => (
                  <tr
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    key={index}
                  >
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      {new Date(repayment.repaymentDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      $ {repayment.repaymentAmount}
                    </td>
                    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                      <div class="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-green-100 text-green-800 dark:[&amp;:has(.bg-green-100)]:bg-green-200 dark:text-green-100">
                        {repayment.state}
                      </div>
                    </td>
                    <div className=" p-4 flex items-center justify-center">
                      {repayment.state === "Unpaid" && (
                        <button
                        className="px-5 py-1 border rounded bg-slate-400"
                          onClick={() => {
                            setModalOpen(true);
                            setSelectedPaymentId(repayment._id);
                          }}
                        >
                          Pay
                        </button>
                      )}
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
            {modalOpen && selectedPaymentId && (
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                    onClick={toggleModal}
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <div className="z-50 relative bg-white rounded-lg max-w-md p-6">
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                      onClick={toggleModal}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                    <form>
                      <div
                        className="rounded-lg p-3 mt-3 border bg-card text-card-foreground shadow-sm w-full max-w-3xl"
                        data-v0-t="card"
                      >
                        <div className="flex flex-col space-y-1.5 p-6">
                          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
                            Submit repayment
                          </h3>
                        </div>
                        <div className="p-6">
                          <div className="space-y-2">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="amount"
                            >
                              Repayment amount
                            </label>
                            <input
                              type="number"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              id="amount"
                              placeholder="Enter the amount"
                              prefix="Enter the amount"
                              value={
                                scheduledRepayments.find(
                                  (repayment) =>
                                    repayment._id === selectedPaymentId
                                ).repaymentAmount
                              }
                              onChange={(e) =>
                                setRepaymentAmount(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="flex items-center p-6">
                          <button
                            onClick={handleSubmitRepayment}
                            className="inline-flex bg-black text-white w-full items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                          >
                            Submit repayment
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetails;
