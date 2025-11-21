import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import DepartmentLayout from './components/DepartmentLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

// General Pages
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';

// Sales Pages
import SalesDashboard from './pages/sales/Dashboard';
import LeadManagement from './pages/sales/LeadManagement';
import Campaigns from './pages/sales/Campaigns';
import FollowUps from './pages/sales/FollowUps';

// Finance Pages
import FinanceDashboard from './pages/finance/Dashboard';
import Repayment from './pages/finance/Repayment';
import Reconciliation from './pages/finance/Reconciliation';
import Disbursement from './pages/finance/Disbursement';
import ViewReceipt from './pages/finance/ViewReceipt';
import RecordPayment from './pages/finance/RecordPayment';
import DisbursementDetails from './pages/finance/DisbursementDetails';
import NewDisbursement from './pages/finance/NewDisbursement';

// Compliance Pages
import ComplianceDashboard from './pages/finance/Compliance';
import AuditTracking from './pages/compliance/AuditTracking';
import Reporting from './pages/compliance/Reporting';

// Legal Pages
import LegalDashboard from './pages/legal/Dashboard';
import DocumentValidation from './pages/legal/DocumentValidation';
import AgreementApprovals from './pages/legal/AgreementApprovals';

// Valuation Pages
import ValuationDashboard from './pages/valuation/Dashboard';
import FieldVerifications from './pages/valuation/FieldVerifications';
import PropertyChecks from './pages/valuation/PropertyChecks';

// Newly Created Department Pages
import OperationDashboard from './pages/operation/Dashboard';
import BorrowerDashboard from './pages/borrower/Dashboard';
import LoanDetails from './pages/borrower/LoanDetails';
import ChannelDashboard from './pages/channel/Dashboard';
import LeadPerformance from './pages/channel/LeadPerformance';
import FraudDashboard from './pages/fraud/Dashboard';
import FraudAlerts from './pages/fraud/Alerts';
import InvestigationDashboard from './pages/investigation/Dashboard';
import CaseFiles from './pages/investigation/CaseFiles';
import CollectionDashboard from './pages/collection/Dashboard';
import OverdueAccounts from './pages/collection/OverdueAccounts';
import RecoveryDashboard from './pages/recovery/Dashboard';
import AssignedCases from './pages/recovery/AssignedCases';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <DepartmentLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'profile', element: <ProfilePage /> },
      // Sales
      { path: 'sales', element: <SalesDashboard /> },
      { path: 'sales/leads', element: <LeadManagement /> },
      { path: 'sales/campaigns', element: <Campaigns /> },
      { path: 'sales/follow-ups', element: <FollowUps /> },
      // Finance
      { path: 'finance', element: <FinanceDashboard /> },
      { path: 'finance/repayment', element: <Repayment /> },
      { path: 'finance/repayment/:id/receipt', element: <ViewReceipt /> },
      { path: 'finance/repayment/:id/record', element: <RecordPayment /> },
      { path: 'finance/reconciliation', element: <Reconciliation /> },
      { path: 'finance/disbursement', element: <Disbursement /> },
      { path: 'finance/disbursement/new', element: <NewDisbursement /> },
      { path: 'finance/disbursement/:id', element: <DisbursementDetails /> },
      // Compliance (assuming it's under finance as per existing structure)
      { path: 'finance/compliance', element: <ComplianceDashboard /> },
      // Compliance (as its own section)
      { path: 'compliance', element: <ComplianceDashboard /> },
      { path: 'compliance/audit-tracking', element: <AuditTracking /> },
      { path: 'compliance/reporting', element: <Reporting /> },
      // Legal
      { path: 'legal', element: <LegalDashboard /> },
      { path: 'legal/documents', element: <DocumentValidation /> },
      { path: 'legal/agreements', element: <AgreementApprovals /> },
      // Valuation
      { path: 'valuation', element: <ValuationDashboard /> },
      { path: 'valuation/field-verifications', element: <FieldVerifications /> },
      { path: 'valuation/property-checks', element: <PropertyChecks /> },
      // Operation
      { path: 'operation', element: <OperationDashboard /> },
      // Borrower
      { path: 'borrower', element: <BorrowerDashboard /> },
      { path: 'borrower/loan-details', element: <LoanDetails /> },
      // Channel Partner
      { path: 'channel', element: <ChannelDashboard /> },
      { path: 'channel/performance', element: <LeadPerformance /> },
      // Fraud
      { path: 'fraud', element: <FraudDashboard /> },
      { path: 'fraud/alerts', element: <FraudAlerts /> },
      // Investigation
      { path: 'investigation', element: <InvestigationDashboard /> },
      { path: 'investigation/cases', element: <CaseFiles /> },
      // Collection
      { path: 'collection', element: <CollectionDashboard /> },
      { path: 'collection/overdue', element: <OverdueAccounts /> },
      // Recovery
      { path: 'recovery', element: <RecoveryDashboard /> },
      { path: 'recovery/cases', element: <AssignedCases /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;