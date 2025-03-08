"use client";
import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  Activity,
} from "lucide-react";
import AnalyticsChart from "../components/AnalyticsChart";
import DashboardCard from "../components/DashboardCard";

const weeklyData = [
  { name: "Mon", value: 5400 },
  { name: "Tue", value: 7600 },
  { name: "Wed", value: 6200 },
  { name: "Thu", value: 8900 },
  { name: "Fri", value: 7800 },
  { name: "Sat", value: 10500 },
  { name: "Sun", value: 12200 },
];

const monthlyData = [
  { name: "Jan", value: 34000 },
  { name: "Feb", value: 28000 },
  { name: "Mar", value: 42000 },
  { name: "Apr", value: 38000 },
  { name: "May", value: 53000 },
  { name: "Jun", value: 48000 },
  { name: "Jul", value: 57000 },
  { name: "Aug", value: 63000 },
];

const Dashboard = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, here's an overview of your metrics
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Users"
          value="12,345"
          icon={<Users size={18} />}
          delay={0}
        />
        <DashboardCard
          title="Revenue"
          value="$48,290"
          icon={<CreditCard size={18} />}
          delay={1}
        />
        <DashboardCard
          title="Growth"
          value="+12.5%"
          icon={<TrendingUp size={18} />}
          delay={2}
        />
        <DashboardCard
          title="Engagement"
          value="87%"
          icon={<Activity size={18} />}
          delay={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AnalyticsChart
          title="Weekly Revenue"
          data={weeklyData}
          strokeColor="rgba(14, 165, 233, 1)"
          gradientFrom="rgba(14, 165, 233, 0.2)"
          gradientTo="rgba(14, 165, 233, 0)"
        />
        <AnalyticsChart
          title="Monthly Performance"
          data={monthlyData}
          strokeColor="rgba(168, 85, 247, 1)"
          gradientFrom="rgba(168, 85, 247, 0.2)"
          gradientTo="rgba(168, 85, 247, 0)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Recent Activity"
          className="col-span-1 md:col-span-2"
          delay={0}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Users size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">New user registration</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CreditCard size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">New subscription purchase</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <BarChart3 size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">Monthly report generated</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Quick Stats" delay={1}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Users</span>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUpRight size={14} />
                <span>+24%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Conversion</span>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUpRight size={14} />
                <span>+12%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Retention</span>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <ArrowUpRight size={14} />
                <span>+8%</span>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard;
