import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Search, Filter, Calendar, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const issuedBooks = [
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      issueDate: "2024-02-15",
      dueDate: "2024-03-15",
      status: "active",
      fine: 0
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      isbn: "978-0132350884",
      issueDate: "2024-02-20",
      dueDate: "2024-03-20",
      status: "active",
      fine: 0
    },
    {
      id: 3,
      title: "Database System Concepts",
      author: "Abraham Silberschatz",
      isbn: "978-0073523323",
      issueDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "overdue",
      fine: 150
    }
  ];

  const availableBooks = [
    {
      id: 4,
      title: "Design Patterns",
      author: "Erich Gamma",
      isbn: "978-0201633610",
      price: 850,
      available: 5,
      category: "Software Engineering"
    },
    {
      id: 5,
      title: "Operating System Concepts",
      author: "Abraham Silberschatz",
      isbn: "978-1118063330",
      price: 920,
      available: 3,
      category: "Operating Systems"
    },
    {
      id: 6,
      title: "Computer Networks",
      author: "Andrew S. Tanenbaum",
      isbn: "978-0132126953",
      price: 780,
      available: 8,
      category: "Networking"
    },
    {
      id: 7,
      title: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell",
      isbn: "978-0136042594",
      price: 1100,
      available: 2,
      category: "AI & ML"
    }
  ];

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

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

        <h1 className="text-4xl font-bold gradient-text mb-8 animate-fade-in-up">Library Management</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card p-6 animate-fade-in-up">
            <p className="text-sm text-muted-foreground mb-2">Books Issued</p>
            <p className="text-3xl font-bold">{issuedBooks.length}</p>
          </Card>
          <Card className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-sm text-muted-foreground mb-2">Total Fine</p>
            <p className="text-3xl font-bold text-destructive">
              ₹{issuedBooks.reduce((sum, book) => sum + book.fine, 0)}
            </p>
          </Card>
          <Card className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-muted-foreground mb-2">Available Books</p>
            <p className="text-3xl font-bold text-success">{availableBooks.length}</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Issued Books */}
          <div>
            <h2 className="text-2xl font-bold mb-6">My Books</h2>
            <div className="space-y-4">
              {issuedBooks.map((book, index) => (
                <Card
                  key={book.id}
                  className={`glass-card p-6 animate-fade-in-up ${
                    book.status === "overdue" ? "border-destructive/50" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                        </div>
                        <Badge variant={book.status === "overdue" ? "destructive" : "secondary"}>
                          {book.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                        <div>
                          <p className="text-muted-foreground">Issue Date</p>
                          <p className="font-medium">{book.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Due Date</p>
                          <p className={`font-medium ${isOverdue(book.dueDate) ? 'text-destructive' : ''}`}>
                            {book.dueDate}
                          </p>
                        </div>
                      </div>
                      {book.fine > 0 && (
                        <div className="mt-4 p-3 bg-destructive/10 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-destructive" />
                            <span className="text-sm font-medium text-destructive">Fine: ₹{book.fine}</span>
                          </div>
                          <Button size="sm" variant="destructive">
                            Pay Fine
                          </Button>
                        </div>
                      )}
                      {book.status === "active" && (
                        <Button className="w-full mt-4" variant="outline" size="sm">
                          Renew Book
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Books */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Browse Books</h2>
            </div>

            {/* Search */}
            <div className="flex gap-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, author, ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {availableBooks.map((book, index) => (
                <Card
                  key={book.id}
                  className="glass-card p-6 animate-fade-in-up hover:scale-[1.02] transition-transform"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-20 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{book.title}</h3>
                          <p className="text-sm text-muted-foreground">{book.author}</p>
                          <Badge variant="outline" className="mt-2">
                            {book.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Price: ₹{book.price}</p>
                          <p className="text-sm text-success">Available: {book.available} copies</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Buy
                          </Button>
                          <Button size="sm">
                            Issue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
