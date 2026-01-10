import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar_components/Sidebar";
import ThemeToggle from "../../components/ui/ThemeToggle";
import UserProfile from "../../components/sidebar_components/UserProfile";
import SummaryCards from "../../components/dashboard_components/SummaryCards";
import {
  DashboardBackground1,
  DashboardBackground2,
} from "../../components/ui/background";
import StatesPieChart from "../../components/charts/states_piechart";
import ParticipationChart from "../../components/charts/participation_chart";

const students = [
  {
    name: "Aanya Kapoor",
    grade: "11",
    school: "Kendriya Vidyalaya - Chanakyapuri",
    district: "New Delhi",
    designation: "Chief Cyber Security Dost",
    status: "Active",
    activities: 6,
    trainings: 3,
  },
  {
    name: "Rudra Singh",
    grade: "9",
    school: "Government School - RK Puram",
    district: "South West Delhi",
    designation: "Cyber Awareness Leader",
    status: "Active",
    activities: 5,
    trainings: 2,
  },
  {
    name: "Ishita Roy",
    grade: "8",
    school: "Sarvodaya Vidyalaya - Shahdara",
    district: "Shahdara",
    designation: "Cyber Discipline Coordinator",
    status: "Inactive",
    activities: 2,
    trainings: 1,
  },
  {
    name: "Harshita Mehra",
    grade: "9",
    school: "Bal Bharati Public School",
    district: "East Delhi",
    designation: "Cyber Awareness Leader",
    status: "Active",
    activities: 4,
    trainings: 2,
  },
  {
    name: "Kabir Malhotra",
    grade: "11",
    school: "DAV School - Shalimar Bagh",
    district: "North Delhi",
    designation: "Chief Cyber Security Dost",
    status: "Active",
    activities: 5,
    trainings: 2,
  },
];

const reportingLog = [
  {
    concern: "Phishing link shared in class group",
    student: "Aanya Kapoor",
    date: "2026-01-04",
    escalatedTo: "Teacher",
    status: "Resolved",
  },
  {
    concern: "Cyberbullying on social media",
    student: "Rudra Singh",
    date: "2026-01-03",
    escalatedTo: "Authority",
    status: "In Progress",
  },
  {
    concern: "Suspicious UPI refund message",
    student: "Harshita Mehra",
    date: "2025-12-28",
    escalatedTo: "Teacher",
    status: "Closed",
  },
  {
    concern: "Fake profile using school name",
    student: "Kabir Malhotra",
    date: "2025-12-26",
    escalatedTo: "Authority",
    status: "Pending",
  },
];

const StudentView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    grade: "All",
    district: "All",
    designation: "All",
    status: "All",
  });
  const scrollRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) setScrolled(scrollRef.current.scrollTop > 10);
    };
    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const byGrade = filters.grade === "All" || s.grade === filters.grade;
      const byDistrict =
        filters.district === "All" || s.district === filters.district;
      const byDesignation =
        filters.designation === "All" || s.designation === filters.designation;
      const byStatus = filters.status === "All" || s.status === filters.status;
      return byGrade && byDistrict && byDesignation && byStatus;
    });
  }, [filters]);

  const designationOptions = [
    "Cyber Discipline Coordinator",
    "Chief Cyber Security Dost",
    "Cyber Awareness Leader",
  ];
  const districts = [...new Set(students.map((s) => s.district))];
  const grades = ["8", "9", "11"];

  const navLinks = [
    {
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
      active: false,
    },
    { label: "Students", onClick: () => navigate("/students"), active: true },
  ];

  const designationDistribution = useMemo(() => {
    return designationOptions.map((d) => ({
      label: d,
      count: students.filter((s) => s.designation === d).length,
    }));
  }, []);

  const gradeDistribution = useMemo(() => {
    return grades.map((g) => ({
      label: `Grade ${g}`,
      count: students.filter((s) => s.grade === g).length,
    }));
  }, []);

  const chartPalette = ["#FF8A65", "#4FC3F7", "#9575CD", "#81C784", "#FFD54F"];

  const designationPieData = useMemo(
    () =>
      designationDistribution.map((item, idx) => ({
        id: item.label,
        label: item.label,
        value: item.count,
        color: chartPalette[idx % chartPalette.length],
      })),
    [designationDistribution]
  );

  const gradePieData = useMemo(
    () =>
      gradeDistribution.map((item, idx) => ({
        id: item.label,
        label: item.label,
        value: item.count,
        color: chartPalette[(idx + 2) % chartPalette.length],
      })),
    [gradeDistribution]
  );

  const cards = [
    {
      title: "Total Students Selected",
      value: students.length.toString(),
      caption: "Grades 8 / 9 / 11",
    },
    {
      title: "Active Cyber Security DOSTs",
      value: students.filter((s) => s.status === "Active").length.toString(),
      caption: "Peer leadership active",
    },
    {
      title: "Reporting & Escalation Log",
      value: reportingLog.length.toString(),
      caption: "Student concerns tracked",
    },
  ];

  const renderBar = (label, count, max) => {
    const pct = max ? Math.round((count / max) * 100) : 0;
    return (
      <div key={label} className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span>{label}</span>
          <span className="text-[var(--color-text-secondary)]">{count}</span>
        </div>
        <div className="h-2 w-full bg-[var(--color-surface-hover)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)]"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  };

  const renderBadge = (status) => {
    const colorMap = {
      Active:
        "bg-[var(--color-success-light)] text-[var(--color-success)] border border-[var(--color-success)]/20",
      Inactive:
        "bg-[var(--color-error-light)] text-[var(--color-error)] border border-[var(--color-error)]/20",
      Pending:
        "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
      "In Progress":
        "bg-[var(--color-warning-light)] text-[var(--color-warning)] border border-[var(--color-warning)]/20",
      Resolved:
        "bg-[var(--color-success-light)] text-[var(--color-success)] border border-[var(--color-success)]/20",
      Closed:
        "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          colorMap[status] || ""
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      className="flex h-screen w-screen dark:bg-[var(--color-background)] bg-[var(--color-background)] 
      overflow-hidden transition-all duration-500 ease-in-out"
    >
      <DashboardBackground1 />
      <DashboardBackground2 />
      <Sidebar
        projects={[]}
        psu={[]}
        selectedpsuProject={null}
        onPsuProjectSelect={() => {}}
        selectedProject={null}
        onProjectSelect={() => {}}
        onReturnHome={() => navigate("/dashboard")}
        onLogout={() => {}}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setNavpsu={() => {}}
        isAdmin={false}
        isPsuUser={false}
        navLinks={navLinks}
      />

      <div
        ref={scrollRef}
        className="relative flex-1 overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out text-[var(--color-text)]"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "var(--color-surface-dark) transparent",
        }}
      >
        {/* Sticky Header */}
        <div
          className={`sticky top-0 z-20 py-4 px-4 flex justify-between transition-all duration-300 ${
            scrolled
              ? "bg-gray-300/40 dark:bg-gray-700/10 backdrop-blur-md drop-shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div
            className="flex bg-[var(--color-primary)] rounded-full w-10 h-10 
                items-center justify-center shadow-md cursor-pointer
                hover:shadow-lg transition-all"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{ aspectRatio: "1 / 1" }}
          >
            <div className="space-y-1">
              <div className="flex">
                <div
                  className="rounded-sm h-[2px] transition-[width] duration-300 ease-in-out"
                  style={{ width: isSidebarOpen ? "100%" : "0px" }}
                />
                <div className="bg-white rounded-sm w-3 h-[2px]" />
              </div>
              <div className="flex">
                <div
                  className="rounded-sm h-[2px] transition-[width] duration-300 ease-in-out"
                  style={{ width: isSidebarOpen ? "10%" : "0px" }}
                />
                <div className="bg-white rounded-sm w-7 h-[2px]" />
              </div>
              <div className="flex">
                <div
                  className="rounded-sm h-[2px] transition-[width] duration-300 ease-in-out"
                  style={{ width: isSidebarOpen ? "30%" : "0px" }}
                />
                <div className="bg-white rounded-sm w-5 h-[3px]" />
              </div>
            </div>
          </div>
          <div className="flex-1" />
          <ThemeToggle />
          <span className="pr-2" />
          <UserProfile
            isOpen={isSidebarOpen}
            isPsuUser={false}
            userPsu={null}
            userOrg={null}
          />
        </div>

        <div className="px-4 md:px-6 lg:px-8">
          <div>
            <h2 className="text-xl md:text-2xl font-outfit font-semibold text-[var(--color-text)]">
              Student Cyber Security Dost – Students
            </h2>
            <p className="font-redhat text-[var(--color-text-secondary)] mt-1 mb-1">
              Student directory, designation distribution, and reporting &
              escalation log.
            </p>
          </div>

          <div className="theme-transition space-y-6 mb-10">
            <SummaryCards cards={cards} />

            <section className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Student Directory</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Columns: Student Name · Grade (8 / 9 / 11) · School Name ·
                    District · Designation · Status
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filters.grade}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, grade: e.target.value }))
                    }
                    className="border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
                  >
                    <option value="All">Grade (All)</option>
                    {grades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filters.district}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, district: e.target.value }))
                    }
                    className="border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
                  >
                    <option value="All">District (All)</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filters.designation}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, designation: e.target.value }))
                    }
                    className="border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
                  >
                    <option value="All">Designation (All)</option>
                    {designationOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, status: e.target.value }))
                    }
                    className="border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
                  >
                    <option value="All">Status (All)</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-[var(--color-text-secondary)]">
                    <tr>
                      <th className="py-2 pr-4">Student Name</th>
                      <th className="py-2 pr-4">Grade</th>
                      <th className="py-2 pr-4">School Name</th>
                      <th className="py-2 pr-4">District</th>
                      <th className="py-2 pr-4">Designation</th>
                      <th className="py-2 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr
                        key={s.name}
                        className="border-t border-[var(--color-border)]"
                      >
                        <td className="py-3 pr-4 font-semibold">{s.name}</td>
                        <td className="py-3 pr-4">{s.grade}</td>
                        <td className="py-3 pr-4">{s.school}</td>
                        <td className="py-3 pr-4">{s.district}</td>
                        <td className="py-3 pr-4">{s.designation}</td>
                        <td className="py-3 pr-4">{renderBadge(s.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
              <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm flex flex-col">
                <div>
                  <div className="p-1 pl-6 mt-4 mb-4 border-l-4 border-[var(--color-primary)] ">
                    <h3 className="text-lg font-semibold">
                      Designation Distribution
                    </h3>
                  </div>
                </div>
                <div className="p-5 bg-[var(--color-surface-secondary)] rounded-b-2xl flex flex-1 ">
                  <div className="flex-1">
                    <StatesPieChart
                      stateBudgetData={designationPieData}
                      formatBudget={(v) => v}
                      showArcLabels
                      innerRadius={0.1}
                      padAngle={1.5}
                      cornerRadius={7}
                      activeOuterRadiusOffset={12}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm flex flex-col">
                <div>
                  <div className="p-1 pl-6 mt-4 mb-4 border-l-4 border-[var(--color-primary)] ">
                    <h3 className="text-lg font-semibold">
                      Grade Distribution
                    </h3>
                  </div>
                </div>
                <div className="p-5 bg-[var(--color-surface-secondary)] rounded-b-2xl flex flex-1 ">
                  <div className="flex-1">
                    <StatesPieChart
                      stateBudgetData={gradePieData}
                      formatBudget={(v) => v}
                      showArcLabels
                      innerRadius={0.49}
                      padAngle={1.5}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm flex flex-col">
                <div>
                  <div className="p-1 pl-6 mt-4 mb-4 border-l-4 border-[var(--color-primary)] ">
                    <h3 className="text-lg font-semibold">
                      Participation & Trainings
                    </h3>
                  </div>
                </div>
                <div className="p-5 bg-[var(--color-surface-secondary)] rounded-b-2xl flex-1 ">
                  <div className="h-72">
                    <ParticipationChart data={students} />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">
                Reporting & Escalation Log
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-[var(--color-text-secondary)]">
                    <tr>
                      <th className="py-2 pr-4">
                        Cyber concerns reported by students
                      </th>
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">
                        Escalated to (Teacher / Authority)
                      </th>
                      <th className="py-2 pr-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportingLog.map((log, idx) => (
                      <tr
                        key={`${log.concern}-${idx}`}
                        className="border-t border-[var(--color-border)]"
                      >
                        <td className="py-3 pr-4">
                          <span className="font-semibold">{log.concern}</span>
                          <span className="text-[var(--color-text-secondary)]">
                            {" "}
                            · {log.student}
                          </span>
                        </td>
                        <td className="py-3 pr-4">{log.date}</td>
                        <td className="py-3 pr-4">{log.escalatedTo}</td>
                        <td className="py-3 pr-4">{renderBadge(log.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
