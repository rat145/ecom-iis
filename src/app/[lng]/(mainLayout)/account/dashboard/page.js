"use client";
import AccountDashboard from "@/components/account/dashboard";
import { withCustomerAuth } from "@/utils/hoc/withAuth";

const Dashboard = () => {
  return (
    <>
      <AccountDashboard />
    </>
  );
};

export default withCustomerAuth(Dashboard);
