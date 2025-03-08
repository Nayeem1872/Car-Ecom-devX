import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon?: ReactNode;
  value?: string | number;
  className?: string;
  children?: ReactNode;
  delay?: number;
}

const DashboardCard = ({
  title,
  icon,
  value,
  className,
  children,
  delay = 0,
}: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: delay * 0.1,
      }}
    >
      <Card
        className={cn(
          "overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300",
          className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </CardHeader>
        <CardContent>
          {value ? <div className="text-2xl font-bold">{value}</div> : children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardCard;
