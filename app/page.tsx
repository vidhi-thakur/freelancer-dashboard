"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  FileText,
  FolderKanban,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import SidebarWrapper from "@/components/HOC/SidebarWrapper";

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Projects",
    value: "8",
    change: "+2",
    icon: FolderKanban,
    trend: "up",
  },
  {
    title: "Pending Invoices",
    value: "5",
    change: "-1",
    icon: FileText,
    trend: "down",
  },
  {
    title: "Total Clients",
    value: "24",
    change: "+3",
    icon: Users,
    trend: "up",
  },
];

const recentProjects = [
  {
    name: "E-commerce Website",
    client: "TechCorp Inc.",
    progress: 75,
    dueDate: "Dec 15",
    status: "In Progress",
  },
  {
    name: "Mobile App Design",
    client: "StartupXYZ",
    progress: 40,
    dueDate: "Dec 20",
    status: "In Progress",
  },
  {
    name: "Brand Identity",
    client: "Creative Agency",
    progress: 90,
    dueDate: "Dec 10",
    status: "Review",
  },
];

const topClients = [
  { name: "TechCorp Inc.", revenue: "$4,200", projects: 3 },
  { name: "StartupXYZ", revenue: "$3,800", projects: 2 },
  { name: "Creative Agency", revenue: "$2,100", projects: 1 },
  { name: "Digital Solutions", revenue: "$1,900", projects: 2 },
];

export default function Dashboard() {
  return (
    <SidebarWrapper>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Dashboard Overview</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back! Here's what's happening with your business.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {stat.change} from last month
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Projects
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProjects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.client}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            project.status === "Review"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {project.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Due {project.dueDate}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Clients */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Top Clients
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topClients.map((client, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {client.projects} active projects
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{client.revenue}</p>
                      <p className="text-xs text-muted-foreground">
                        Total revenue
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="h-20 flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  Create Invoice
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                >
                  <FolderKanban className="h-6 w-6" />
                  New Project
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                >
                  <Users className="h-6 w-6" />
                  Add Client
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-transparent"
                >
                  <Clock className="h-6 w-6" />
                  Time Tracker
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarWrapper>
  );
}
