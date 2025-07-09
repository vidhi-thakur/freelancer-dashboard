"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Calendar, User, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SidebarWrapper from "@/components/HOC/SidebarWrapper";

const projects = [
  {
    id: 1,
    name: "E-commerce Website",
    client: "TechCorp Inc.",
    progress: 75,
    dueDate: "2024-12-15",
    status: "In Progress",
    tasks: [
      { id: 1, title: "Design homepage", completed: true },
      { id: 2, title: "Implement shopping cart", completed: true },
      { id: 3, title: "Payment integration", completed: false },
      { id: 4, title: "Testing and deployment", completed: false },
    ],
  },
  {
    id: 2,
    name: "Mobile App Design",
    client: "StartupXYZ",
    progress: 40,
    dueDate: "2024-12-20",
    status: "In Progress",
    tasks: [
      { id: 5, title: "User research", completed: true },
      { id: 6, title: "Wireframes", completed: true },
      { id: 7, title: "UI design", completed: false },
      { id: 8, title: "Prototype", completed: false },
    ],
  },
  {
    id: 3,
    name: "Brand Identity",
    client: "Creative Agency",
    progress: 90,
    dueDate: "2024-12-10",
    status: "Review",
    tasks: [
      { id: 9, title: "Logo design", completed: true },
      { id: 10, title: "Brand guidelines", completed: true },
      { id: 11, title: "Business cards", completed: true },
      { id: 12, title: "Final review", completed: false },
    ],
  },
];

const clients = [
  "TechCorp Inc.",
  "StartupXYZ",
  "Creative Agency",
  "Digital Solutions",
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    client: "",
    description: "",
    dueDate: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-yellow-100 text-yellow-800";
      case "On Hold":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleTask = (projectId: number, taskId: number) => {
    // Here you would update the task status
    console.log(`Toggle task ${taskId} in project ${projectId}`);
  };

  const handleCreateProject = () => {
    console.log("Creating project:", newProject);
    setIsCreateDialogOpen(false);
    setNewProject({ name: "", client: "", description: "", dueDate: "" });
  };

  return (
    <SidebarWrapper>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Project Tracker</h1>
              <p className="text-sm text-muted-foreground">
                Manage your projects and tasks
              </p>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter project name"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client">Client</Label>
                    <Select
                      value={newProject.client}
                      onValueChange={(value) =>
                        setNewProject({ ...newProject, client: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client} value={client}>
                            {client}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Project description..."
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newProject.dueDate}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          dueDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateProject}>Create Project</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {project.client}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Project</DropdownMenuItem>
                        <DropdownMenuItem>Add Task</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {project.dueDate}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Tasks</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {project.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={task.completed}
                            onCheckedChange={() =>
                              toggleTask(project.id, task.id)
                            }
                          />
                          <label
                            htmlFor={`task-${task.id}`}
                            className={`text-sm flex-1 ${
                              task.completed
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {task.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarWrapper>
  );
}
