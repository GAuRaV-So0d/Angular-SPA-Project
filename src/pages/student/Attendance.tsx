import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, Calendar as CalendarIcon, TrendingUp, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const attendanceData = {
    overall: 87,
    present: 78,
    absent: 8,
    late: 4,
    total: 90,
    subjects: [
      { name: "Data Structures", percentage: 92, present: 46, total: 50 },
      { name: "Database Management", percentage: 85, present: 42, total: 50 },
      { name: "Web Development", percentage: 88, present: 44, total: 50 },
      { name: "Operating Systems", percentage: 82, present: 41, total: 50 },
      { name: "Computer Networks", percentage: 90, present: 45, total: 50 },
    ]
  };

  const recentRecords = [
    { date: "2024-03-15", subject: "Data Structures", status: "present", time: "09:00 AM" },
    { date: "2024-03-15", subject: "Web Development", status: "present", time: "11:00 AM" },
    { date: "2024-03-14", subject: "Database Management", status: "late", time: "09:15 AM" },
    { date: "2024-03-14", subject: "Operating Systems", status: "present", time: "02:00 PM" },
    { date: "2024-03-13", subject: "Computer Networks", status: "absent", time: "-" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "text-success bg-success/20";
      case "absent": return "text-destructive bg-destructive/20";
      case "late": return "text-warning bg-warning/20";
      default: return "text-muted-foreground bg-muted/20";
    }
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

        <h1 className="text-4xl font-bold gradient-text mb-8 animate-fade-in-up">Attendance Tracking</h1>

        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card p-6 animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Overall</p>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <p className="text-4xl font-bold mb-2">{attendanceData.overall}%</p>
            <Progress value={attendanceData.overall} className="h-2" />
          </Card>
          <Card className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-sm text-muted-foreground mb-2">Present</p>
            <p className="text-4xl font-bold text-success">{attendanceData.present}</p>
            <p className="text-xs text-muted-foreground">out of {attendanceData.total} days</p>
          </Card>
          <Card className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="text-sm text-muted-foreground mb-2">Absent</p>
            <p className="text-4xl font-bold text-destructive">{attendanceData.absent}</p>
            <p className="text-xs text-muted-foreground">days missed</p>
          </Card>
          <Card className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-sm text-muted-foreground mb-2">Late</p>
            <p className="text-4xl font-bold text-warning">{attendanceData.late}</p>
            <p className="text-xs text-muted-foreground">times</p>
          </Card>
        </div>

        {attendanceData.overall < 75 && (
          <Card className="glass-card p-4 mb-8 border-destructive/50 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <div>
                <p className="font-semibold text-destructive">Low Attendance Warning</p>
                <p className="text-sm text-muted-foreground">
                  Your attendance is below 75%. You need to attend {Math.ceil((0.75 * attendanceData.total - attendanceData.present) / 0.25)} more classes to reach the minimum requirement.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Subject-wise Attendance */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Subject-wise Breakdown</h2>
            <div className="space-y-4">
              {attendanceData.subjects.map((subject, index) => (
                <Card
                  key={subject.name}
                  className="glass-card p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold text-lg">{subject.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {subject.present} / {subject.total} classes
                      </p>
                    </div>
                    <div className={`text-2xl font-bold ${
                      subject.percentage >= 90 ? "text-success" :
                      subject.percentage >= 75 ? "text-primary" :
                      "text-destructive"
                    }`}>
                      {subject.percentage}%
                    </div>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </Card>
              ))}
            </div>
          </div>

          {/* Calendar & Recent Records */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Attendance Calendar</h2>
            <Card className="glass-card p-6 mb-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </Card>

            <h2 className="text-2xl font-bold mb-6">Recent Records</h2>
            <Card className="glass-card p-6">
              <div className="space-y-3">
                {recentRecords.map((record, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{record.subject}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {record.date} at {record.time}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
