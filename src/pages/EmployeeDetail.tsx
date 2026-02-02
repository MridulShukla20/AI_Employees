import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Shield, Clock, Plug, FileInput, Check, MessageSquare } from "lucide-react";
import { getEmployeeById, getRelatedEmployees } from "@/data/employees";
import { TeammateCard } from "@/components/marketplace/TeammateCard";
import { EmployeeSampleOutputs } from "@/components/marketplace/EmployeeSampleOutputs";

const EmployeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const employee = id ? getEmployeeById(id) : undefined;
  const relatedEmployees = id ? getRelatedEmployees(id) : [];

  if (!employee) {
    return <Navigate to="/marketplace" replace />;
  }

  const departmentBgClass = {
    sales: "bg-primary/5",
    marketing: "bg-blue-50 dark:bg-blue-950/20",
    recruitment: "bg-emerald-50 dark:bg-emerald-950/20",
  }[employee.department];

  return (
    <Layout>
      {/* Hero Section */}
      <section className={`py-16 relative overflow-hidden ${departmentBgClass}`}>
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/marketplace">AI Employees</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/marketplace?tab=${employee.department}`}>{employee.departmentLabel}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{employee.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Link 
            to="/marketplace" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Employees
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <Badge variant="secondary" className="mb-4">
              {employee.departmentLabel}
            </Badge>

            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{employee.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{employee.role}</p>
                <p className="text-lg mb-6">{employee.oneLiner}</p>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="shadow-elevated hover:shadow-glow transition-shadow">
                    Add {employee.name} to Workspace
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/pricing">See Pricing</Link>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center shadow-elevated">
                  <employee.icon className="w-12 h-12 text-primary-foreground" />
                </div>
                <Badge className="text-sm font-semibold">
                  {employee.stat}
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What They Do Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">What {employee.name} Does</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Works Autonomously
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {employee.autonomous.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5 text-primary" />
                    Requires Your Approval
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {employee.requiresApproval.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Getting Started</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileInput className="w-5 h-5 text-primary" />
                    What You'll Need
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{employee.inputs}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Plug className="w-5 h-5 text-primary" />
                    Integrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {employee.integrations.map((integration) => (
                      <Badge key={integration} variant="secondary" className="text-xs">
                        {integration}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="w-5 h-5 text-primary" />
                    Setup Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-primary">{employee.setupTime}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Outputs Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">See {employee.name}'s Work</h2>
            <p className="text-muted-foreground mb-8">Examples of what {employee.name} produces</p>
            
            <EmployeeSampleOutputs employee={employee} />
          </div>
        </div>
      </section>

      {/* Coaching Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">Coach {employee.name} Through Conversation</h2>
            <p className="text-muted-foreground mb-8">
              Guide {employee.name} in plain English. No configuration required.
            </p>
            
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {employee.coaching.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === "user" 
                            ? "bg-muted text-foreground rounded-bl-md" 
                            : "bg-primary/10 text-foreground rounded-br-md"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weekly Report Card Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">{employee.name}'s Weekly Report Card</h2>
            <p className="text-muted-foreground mb-8">You'll receive this every Monday.</p>
            
            <Card>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <employee.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Week of Jan 27 - Feb 2</p>
                  </div>
                  <Badge className="ml-auto">Sample</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {employee.reportMetrics.map((metric) => (
                    <div key={metric.label} className="text-center p-4 bg-muted/50 rounded-xl">
                      <p className="text-2xl font-bold text-primary">{metric.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <p className="text-4xl font-bold mb-6">$99<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-sm">1,000 credits included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-sm">Hard caps prevent overages</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-sm">Unlimited human seats—free</span>
                  </li>
                </ul>

                <Button size="lg" className="w-full mb-4 shadow-elevated hover:shadow-glow transition-shadow">
                  Add {employee.name} to Workspace
                </Button>
                
                <Link 
                  to="/pricing" 
                  className="text-sm text-primary hover:underline"
                >
                  See full pricing →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Employees Section */}
      {relatedEmployees.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Often Hired With {employee.name}</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {relatedEmployees.map((related) => (
                  <TeammateCard key={related.id} employee={related} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-24 gradient-primary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to hire {employee.name}?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Start with a free workspace. Add {employee.name} when you're ready.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
              >
                Create Free Workspace
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default EmployeeDetail;
