import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CreditCard, Download, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Fees = () => {
  const navigate = useNavigate();

  const feeBreakdown = [
    { category: "Tuition Fee", amount: 50000, paid: 50000, status: "paid" },
    { category: "Hostel Fee", amount: 30000, paid: 15000, status: "partial" },
    { category: "Library Fee", amount: 5000, paid: 5000, status: "paid" },
    { category: "Lab Fee", amount: 10000, paid: 0, status: "pending" },
    { category: "Sports Fee", amount: 3000, paid: 3000, status: "paid" },
  ];

  const totalAmount = feeBreakdown.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = feeBreakdown.reduce((sum, fee) => sum + fee.paid, 0);
  const totalDue = totalAmount - totalPaid;

  const paymentHistory = [
    { id: 1, date: "2024-01-15", amount: 50000, type: "Tuition Fee", method: "UPI", receipt: "RCP001" },
    { id: 2, date: "2024-02-20", amount: 15000, type: "Hostel Fee", method: "Card", receipt: "RCP002" },
    { id: 3, date: "2024-03-10", amount: 5000, type: "Library Fee", method: "Wallet", receipt: "RCP003" },
  ];

  return (
    <div className="min-h-screen cosmic-bg">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/student")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-4xl font-bold gradient-text mb-8 animate-fade-in-up">Fee Management</h1>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card p-6 animate-fade-in-up">
            <p className="text-sm text-muted-foreground mb-2">Total Fee</p>
            <p className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</p>
          </Card>
          <Card className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-sm text-muted-foreground mb-2">Paid Amount</p>
            <p className="text-3xl font-bold text-success">₹{totalPaid.toLocaleString()}</p>
          </Card>
          <Card className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-muted-foreground mb-2">Due Amount</p>
            <p className="text-3xl font-bold text-destructive">₹{totalDue.toLocaleString()}</p>
            {totalDue > 0 && (
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Due by: March 31, 2024
              </p>
            )}
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Fee Breakdown */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Fee Breakdown</h2>
            <div className="space-y-4">
              {feeBreakdown.map((fee, index) => (
                <Card
                  key={fee.category}
                  className="glass-card p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-lg">{fee.category}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{fee.paid.toLocaleString()} / ₹{fee.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      fee.status === "paid" ? "bg-success/20 text-success" :
                      fee.status === "partial" ? "bg-warning/20 text-warning" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {fee.status === "paid" && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                    </div>
                  </div>
                  <Progress value={(fee.paid / fee.amount) * 100} className="mb-4" />
                  {fee.status !== "paid" && (
                    <Button className="w-full" size="sm">
                      Pay Now - ₹{(fee.amount - fee.paid).toLocaleString()}
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Payment History</h2>
            <Card className="glass-card p-6">
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <div
                    key={payment.id}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{payment.type}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                      <p className="font-bold text-success">₹{payment.amount.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{payment.method}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="glass-card p-6 mt-6">
              <h3 className="font-semibold mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Credit/Debit Card
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  UPI Payment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Wallet Balance (₹2,450)
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;
