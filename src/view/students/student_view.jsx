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
  {
    name: "Neha Bansal",
    grade: "8",
    school: "Sarvodaya Vidyalaya - Lajpat Nagar",
    district: "South East Delhi",
    designation: "Cyber Discipline Coordinator",
    status: "Active",
    activities: 3,
    trainings: 1,
  },
  {
    name: "Ankit Verma",
    grade: "9",
    school: "Government Boys School - Karol Bagh",
    district: "Central Delhi",
    designation: "Cyber Awareness Leader",
    status: "Active",
    activities: 4,
    trainings: 2,
  },
  {
    name: "Simran Kaur",
    grade: "11",
    school: "Govt. Co-ed School - Punjabi Bagh",
    district: "West Delhi",
    designation: "Chief Cyber Security Dost",
    status: "Active",
    activities: 6,
    trainings: 3,
  },
  {
    name: "Farhan Ali",
    grade: "8",
    school: "Govt. School - Narela",
    district: "North West Delhi",
    designation: "Cyber Discipline Coordinator",
    status: "Inactive",
    activities: 1,
    trainings: 1,
  },
  {
    name: "Priya Sharma",
    grade: "9",
    school: "Govt. Girls School - Khanpur",
    district: "South Delhi",
    designation: "Cyber Awareness Leader",
    status: "Active",
    activities: 5,
    trainings: 2,
  },
  {
    name: "Rahul Mehta",
    grade: "11",
    school: "Govt. Boys School - Janakpuri",
    district: "West Delhi",
    designation: "Chief Cyber Security Dost",
    status: "Active",
    activities: 7,
    trainings: 3,
  },
  {
    name: "Vidhi Gupta",
    grade: "9",
    school: "Govt. School - Model Town",
    district: "North Delhi",
    designation: "Cyber Awareness Leader",
    status: "Active",
    activities: 4,
    trainings: 2,
  },
  {
    name: "Kunal Rao",
    grade: "8",
    school: "Govt. School - Dwarka",
    district: "South West Delhi",
    designation: "Cyber Discipline Coordinator",
    status: "Pending",
    activities: 2,
    trainings: 1,
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
  {
    concern: "Malicious app link shared",
    student: "Priya Sharma",
    date: "2026-01-06",
    escalatedTo: "Teacher",
    status: "In Progress",
  },
  {
    concern: "Anonymous bullying comments",
    student: "Simran Kaur",
    date: "2026-01-07",
    escalatedTo: "Authority",
    status: "Resolved",
  },
  {
    concern: "Phishing email to parents",
    student: "Rahul Mehta",
    date: "2026-01-05",
    escalatedTo: "Teacher",
    status: "Closed",
  },
  {
    concern: "Fake scholarship message",
    student: "Neha Bansal",
    date: "2025-12-30",
    escalatedTo: "Teacher",
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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M2 6.634a4.634 4.634 0 1 1 9.268 0a4.634 4.634 0 0 1-9.268 0m10.732 10.732a4.634 4.634 0 1 1 9.268 0a4.634 4.634 0 0 1-9.268 0"
            clipRule="evenodd"
          />
          <path
            fill="currentColor"
            d="M2 17.5c0-2.121 0-3.182.659-3.841S4.379 13 6.5 13s3.182 0 3.841.659S11 15.379 11 17.5s0 3.182-.659 3.841S8.621 22 6.5 22s-3.182 0-3.841-.659S2 19.621 2 17.5m11-11c0-2.121 0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11s-3.182 0-3.841-.659S13 8.621 13 6.5"
          />
        </svg>
      ),
    },
    {
      label: "Students",
      onClick: () => navigate("/students"),
      active: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 12 12"
        >
          <path
            fill="currentColor"
            d="M5.16 2.189a1.96 1.96 0 0 1 1.68 0l4.874 2.309a.5.5 0 0 1 .008.9l-4.85 2.406a1.96 1.96 0 0 1-1.744 0L1 5.756V8a.5.5 0 0 1-1 0V4.975a.5.5 0 0 1 .286-.477zM2 7.369V9a.5.5 0 0 0 .147.354l.002.003l.023.021l.06.056q.075.07.217.187c.187.153.457.355.794.558C3.913 10.58 4.877 11 6 11s2.088-.42 2.757-.821a6.7 6.7 0 0 0 1.012-.745l.06-.056l.016-.016l.006-.006l.001-.001l.002-.001A.5.5 0 0 0 10 9V7.368L7.316 8.7a2.96 2.96 0 0 1-2.632 0z"
          />
        </svg>
      ),
    },
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

  const renderBadge = (status) => {
    const colorMap = {
      Active:
        "bg-[var(--color-success-light)] text-[var(--color-success)] border border-[var(--color-success)]",
      Inactive:
        "bg-[var(--color-error-light)] text-[var(--color-error)] border border-[var(--color-error)]",
      Pending:
        "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
      "In Progress":
        "bg-[var(--color-warning-light)] text-[var(--color-warning)] border border-[var(--color-warning)]",
      Resolved:
        "bg-[var(--color-success-light)] text-[var(--color-success)] border border-[var(--color-success)]",
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

            <section className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm h-[450px] sm:h-[430px] flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div className="p-1 pl-6 mt-4 border-l-4 border-[var(--color-primary)]">
                  <h3 className="text-lg font-semibold">Student Directory</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 ml-4 mr-4">
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
              <div className="overflow-auto bg-[var(--color-surface-secondary)] rounded-b-2xl flex-1">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-[var(--color-text-secondary)]">
                    <tr>
                      <th className="py-2 pr-4 pl-10 h-12 min-w-[130px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        Student Name
                      </th>
                      <th className="py-2 pr-4 h-12 sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        Grade
                      </th>
                      <th className="py-2 pr-4 h-12 min-w-[130px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        School Name
                      </th>
                      <th className="py-2 pr-4 h-12 min-w-[130px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        District
                      </th>
                      <th className="py-2 pr-4 h-12 min-w-[130px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        Designation
                      </th>
                      <th className="py-2 pr-4 h-12 min-w-[100px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr
                        key={s.name}
                        className="border-t border-[var(--color-border)]"
                      >
                        <td className="py-3 pr-4 pl-10 font-semibold">
                          {s.name}
                        </td>
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
                  <div className="h-64 sm:h-72 w-full">
                    <StatesPieChart
                      stateBudgetData={designationPieData}
                      formatBudget={(v) => v}
                      innerRadius={0.1}
                      enableArcLabels={true}
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
                  <div className="h-64 sm:h-72 w-full">
                    <StatesPieChart
                      stateBudgetData={gradePieData}
                      formatBudget={(v) => v}
                      showArcLabels={true}
                      innerRadius={0.49}
                      padAngle={2}
                      cornerRadius={7}
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
                <div className="pt-5 bg-[var(--color-surface-secondary)] rounded-b-2xl flex-1 ">
                  <div className="h-64 sm:h-72">
                    <ParticipationChart data={students} />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm">
              <div className="p-1 pl-6 mt-4 mb-4 border-l-4 border-[var(--color-primary)] ">
                <h3 className="text-lg font-semibold">
                  Reporting & Escalation Log
                </h3>
              </div>
              <div className="overflow-auto bg-[var(--color-surface-secondary)] rounded-b-2xl">
                <table className="min-w-full text-sm">
                  <thead className="text-left text-[var(--color-text-secondary)]">
                    <tr>
                      <th className="py-2 pr-4 pl-10 h-12 min-w-[170px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        Cyber concerns reported by students
                      </th>
                      <th className="py-2 pr-4 h-12 min-w-[130px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        Date
                      </th>
                      <th className="py-2 pr-4 h-12 min-w-[130px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        Escalated to (Teacher / Authority)
                      </th>
                      <th className="py-2 pr-4 h-12 min-w-[130px] sticky top-0 z-10 bg-[var(--color-surface-hover)]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportingLog.map((log, idx) => (
                      <tr
                        key={`${log.concern}-${idx}`}
                        className="border-t border-[var(--color-border)]"
                      >
                        <td className="py-3 pr-4 pl-10">
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
