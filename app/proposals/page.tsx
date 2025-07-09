"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Wand2,
  FileText,
  Download,
  Send,
  Eye,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import SidebarWrapper from "@/components/HOC/SidebarWrapper";

const proposals = [
  {
    id: 1,
    title: "E-commerce Website Development",
    client: "TechCorp Inc.",
    status: "Sent",
    amount: "$15,000",
    date: "2024-12-01",
    description: "Complete e-commerce solution with payment integration",
  },
  {
    id: 2,
    title: "Mobile App Design",
    client: "StartupXYZ",
    status: "Draft",
    amount: "$8,500",
    date: "2024-12-05",
    description: "iOS and Android app design with user experience focus",
  },
  {
    id: 3,
    title: "Brand Identity Package",
    client: "Creative Agency",
    status: "Accepted",
    amount: "$5,200",
    date: "2024-11-28",
    description: "Complete brand identity including logo and guidelines",
  },
];

const clients = [
  "TechCorp Inc.",
  "StartupXYZ",
  "Creative Agency",
  "Digital Solutions",
];

const projectTypes = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Brand Identity",
  "Digital Marketing",
  "Consulting",
];

export default function ProposalsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: "",
    client: "",
    projectType: "",
    budget: "",
    timeline: "",
    requirements: "",
    generatedContent: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Sent":
        return "bg-blue-100 text-blue-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const generateProposal = async () => {
    if (!newProposal.title || !newProposal.client || !newProposal.projectType) {
      return;
    }

    setIsGenerating(true);
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate a professional project proposal for:
        
Project: ${newProposal.title}
Client: ${newProposal.client}
Project Type: ${newProposal.projectType}
Budget: ${newProposal.budget}
Timeline: ${newProposal.timeline}
Requirements: ${newProposal.requirements}

Please create a comprehensive proposal that includes:
1. Executive Summary
2. Project Overview
3. Scope of Work
4. Timeline and Milestones
5. Investment and Payment Terms
6. Why Choose Us section

Make it professional, persuasive, and tailored to the client's needs.`,
      });

      setNewProposal({ ...newProposal, generatedContent: text });
    } catch (error) {
      console.error("Error generating proposal:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCreateProposal = () => {
    console.log("Creating proposal:", newProposal);
    setIsCreateDialogOpen(false);
    setNewProposal({
      title: "",
      client: "",
      projectType: "",
      budget: "",
      timeline: "",
      requirements: "",
      generatedContent: "",
    });
  };

  return (
    <SidebarWrapper>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">AI Proposal Generator</h1>
              <p className="text-sm text-muted-foreground">
                Create winning proposals with AI assistance
              </p>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Proposal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Generate AI Proposal</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        placeholder="E-commerce Website Development"
                        value={newProposal.title}
                        onChange={(e) =>
                          setNewProposal({
                            ...newProposal,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="client">Client</Label>
                      <Select
                        value={newProposal.client}
                        onValueChange={(value) =>
                          setNewProposal({ ...newProposal, client: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
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
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select
                        value={newProposal.projectType}
                        onValueChange={(value) =>
                          setNewProposal({ ...newProposal, projectType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Input
                        id="budget"
                        placeholder="$5,000 - $10,000"
                        value={newProposal.budget}
                        onChange={(e) =>
                          setNewProposal({
                            ...newProposal,
                            budget: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Input
                        id="timeline"
                        placeholder="4-6 weeks"
                        value={newProposal.timeline}
                        onChange={(e) =>
                          setNewProposal({
                            ...newProposal,
                            timeline: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="requirements">Project Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Describe the project requirements, goals, and any specific features needed..."
                      value={newProposal.requirements}
                      onChange={(e) =>
                        setNewProposal({
                          ...newProposal,
                          requirements: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button
                      onClick={generateProposal}
                      disabled={isGenerating}
                      className="w-full max-w-sm"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Proposal with AI
                        </>
                      )}
                    </Button>
                  </div>

                  {newProposal.generatedContent && (
                    <div className="grid gap-2">
                      <Label htmlFor="generatedContent">
                        Generated Proposal
                      </Label>
                      <Textarea
                        id="generatedContent"
                        value={newProposal.generatedContent}
                        onChange={(e) =>
                          setNewProposal({
                            ...newProposal,
                            generatedContent: e.target.value,
                          })
                        }
                        rows={15}
                        className="font-mono text-sm"
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateProposal}
                    disabled={!newProposal.generatedContent}
                  >
                    Save Proposal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-6">
          {/* Proposals Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {proposal.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {proposal.client}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Send className="h-4 w-4 mr-2" />
                          Send to Client
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(proposal.status)}>
                      {proposal.status}
                    </Badge>
                    <span className="font-semibold text-lg">
                      {proposal.amount}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {proposal.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Created: {proposal.date}</span>
                    <FileText className="h-4 w-4" />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </Button>
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
