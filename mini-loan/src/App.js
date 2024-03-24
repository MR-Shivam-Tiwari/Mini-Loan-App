import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoanApplication from "./Components/LoanApplication";
import LoanApproval from "./Components/LoanApproval";
import LoanDetails from "./Components/LoanDetails";
import RepaymentSubmission from "./Components/RepaymentSubmission";
import Login from "./Auth/Login";
import Register from "./Auth/Register";


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/apply" element={<LoanApplication />} />
          <Route exact path="/approval" element={<LoanApproval />} />
          <Route exact path="/loandetails/:loanId" element={<LoanDetails />} />
          <Route exact path="/repaymentsubmission" element={<RepaymentSubmission />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

        </Routes>

      </Router>
    </div>
  );
}

export default App;
