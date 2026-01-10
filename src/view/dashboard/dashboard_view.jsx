import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar_components/Sidebar";
import SummaryCards from "../../components/dashboard_components/SummaryCards";
import ThemeToggle from "../../components/ui/ThemeToggle";
import UserProfile from "../../components/sidebar_components/UserProfile";
import {
  DashboardBackground1,
  DashboardBackground2,
} from "../../components/ui/background";
import StatesPieChart from "../../components/charts/states_piechart";
import OutcomesRadialChart from "../../components/charts/outcomes_radial_chart";

// Sample data (Delhi Police – Student Cyber Security Dost)
const districtData = [
  {
    name: "New Delhi",
    schools: 18,
    students: 420,
    activities: 52,
    status: "Active",
  },
  {
    name: "South West Delhi",
    schools: 15,
    students: 360,
    activities: 41,
    status: "Active",
  },
  {
    name: "East Delhi",
    schools: 12,
    students: 280,
    activities: 33,
    status: "Partial",
  },
  {
    name: "North Delhi",
    schools: 10,
    students: 220,
    activities: 21,
    status: "Partial",
  },
  {
    name: "Shahdara",
    schools: 8,
    students: 180,
    activities: 12,
    status: "Pending",
  },
];

const activities = [
  { type: "Cyber safety workshops", count: 14 },
  { type: "Cyber awareness rallies", count: 10 },
  { type: "Poster & slogan competitions", count: 8 },
  { type: "Online safety pledge drives", count: 11 },
];

const curriculum = [
  { name: "Digital Citizenship & Ethics", completion: 76 },
  { name: "Cyber Threat Awareness", completion: 71 },
  { name: "Cyber Hygiene", completion: 69 },
  { name: "Cyber Laws & Reporting", completion: 58 },
  { name: "Leadership & Outreach", completion: 63 },
];

const outcomesSnapshot = {
  awarenessCoverage: 72,
  leadershipDevelopment: 64,
  cyberHygieneAdoption: 68,
  reportingReadiness: 59,
};

const DashboardView = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [districtFilter, setDistrictFilter] = useState("All Districts");
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

  const filteredDistricts = useMemo(() => {
    if (districtFilter === "All Districts") return districtData;
    return districtData.filter((d) => d.name === districtFilter);
  }, [districtFilter]);

  const totals = useMemo(() => {
    const totalDistricts = districtData.length;
    const totalSchools = districtData.reduce((s, d) => s + d.schools, 0);
    const totalStudents = districtData.reduce((s, d) => s + d.students, 0);
    const totalActivities = districtData.reduce((s, d) => s + d.activities, 0);
    const totalWorkshops =
      activities.find((a) => a.type === "Cyber safety workshops")?.count || 0;
    return {
      totalDistricts,
      totalSchools,
      totalStudents,
      totalActivities,
      totalWorkshops,
    };
  }, []);

  const cards = [
    {
      title: "Total Districts Covered (out of 15)",
      value: `${totals.totalDistricts} / 15`,
      caption: "District-wise monitoring",
      progress: Math.round((totals.totalDistricts / 15) * 100),
    },
    {
      title: "Total Schools Enrolled",
      value: totals.totalSchools.toLocaleString(),
      caption: "School-wise implementation",
    },
    {
      title: "Total Students Selected",
      value: totals.totalStudents.toLocaleString(),
      caption: "Student-level traceability (8 / 9 / 11)",
    },
    {
      title: "Total Cyber Security DOSTs Active",
      value: Math.round(totals.totalStudents * 0.35).toString(),
      caption: "Peer leadership active",
    },
    {
      title: "Total Activities Conducted",
      value: totals.totalActivities.toString(),
      caption: "Programme execution",
    },
    {
      title: "Total Awareness Sessions Completed",
      value: totals.totalWorkshops.toString(),
      caption: "Cyber safety workshops",
    },
  ];

  const navLinks = [
    { label: "Dashboard", onClick: () => navigate("/dashboard"), active: true },
    { label: "Students", onClick: () => navigate("/students"), active: false },
  ];

  const renderBadge = (status) => {
    const colorMap = {
      Active:
        "bg-[var(--color-success-light)] text-[var(--color-success)] border border-[var(--color-success)]/20",
      Partial:
        "bg-[var(--color-warning-light)] text-[var(--color-warning)] border border-[var(--color-warning)]/20",
      Pending:
        "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[status]}`}
      >
        {status}
      </span>
    );
  };

  const renderBarRow = (label, value, max = 100) => {
    const pct = Math.min(100, Math.round((value / max) * 100));
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between text-sm">
          <span>{label}</span>
          <span className="text-[var(--color-text-secondary)]">{value}</span>
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
            className="flex bg-[var(--color-primary)] rounded-full w-10 h-10 items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all"
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
              Student Cyber Security Dost – Dashboard
            </h2>
            <p className="font-redhat text-[var(--color-text-secondary)] mt-1 mb-1">
              Centralized digital dashboard for governance, oversight, and
              programme status.
            </p>
          </div>

          <div className="theme-transition space-y-6 mb-10">
            <SummaryCards cards={cards} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <section className="xl:col-span-2 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      District-wise Overview
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      District Name · Number of Schools · Number of Students ·
                      Number of Activities conducted · Status
                    </p>
                  </div>
                  <select
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm bg-[var(--color-surface)] text-[var(--color-text)]"
                  >
                    <option>All Districts</option>
                    {districtData.map((d) => (
                      <option key={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="text-left text-[var(--color-text-secondary)]">
                      <tr>
                        <th className="py-2 pr-4">District Name</th>
                        <th className="py-2 pr-4">Number of Schools</th>
                        <th className="py-2 pr-4">Number of Students</th>
                        <th className="py-2 pr-4">
                          Number of Activities conducted
                        </th>
                        <th className="py-2 pr-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDistricts.map((district) => (
                        <tr
                          key={district.name}
                          className="border-t border-[var(--color-border)]"
                        >
                          <td className="py-3 pr-4 font-semibold">
                            {district.name}
                          </td>
                          <td className="py-3 pr-4">{district.schools}</td>
                          <td className="py-3 pr-4">{district.students}</td>
                          <td className="py-3 pr-4">{district.activities}</td>
                          <td className="py-3 pr-4">
                            {renderBadge(district.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm">
                <div>
                  <div className="p-1 pl-6 mt-4 mb-4 border-l-4 border-[var(--color-primary)] ">
                    <h3 className="text-lg font-semibold">
                      Key Activities Tracking
                    </h3>
                  </div>
                </div>
                <div className="p-5 bg-[var(--color-surface-secondary)] rounded-b-2xl">
                  <div className="h-72 mb-4 max-w-xl mx-auto">
                    <StatesPieChart
                      showArcLabels
                      stateBudgetData={activities.map((a) => ({
                        label: a.type,
                        value: a.count,
                        id: a.type,
                      }))}
                      formatBudget={(val) => val.toString()}
                    />
                  </div>
                </div>
              </section>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
                <h3 className="text-lg font-semibold mb-3">
                  Curriculum & Module Progress
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {curriculum.map((m) => (
                    <div
                      key={m.name}
                      className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-hover)]"
                    >
                      <p className="text-sm font-semibold">{m.name}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        Average completion across districts
                      </p>
                      <div className="mt-3 h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-primary)]"
                          style={{ width: `${m.completion}%` }}
                        />
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                        {m.completion}% completion
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-sm flex flex-col">
                <div>
                  <div className="p-1 pl-6 mt-4 mb-4 border-l-4 border-[var(--color-primary)] ">
                    <h3 className="text-lg font-semibold">
                      Outcomes & Impact Snapshot
                    </h3>
                  </div>
                </div>
                <div className="p-5 bg-[var(--color-surface-secondary)] rounded-b-2xl flex-1">
                  <div className="h-80 max-w-xl mx-auto">
                    <OutcomesRadialChart
                      data={[
                        {
                          metric: "Awareness",
                          value: outcomesSnapshot.awarenessCoverage,
                        },
                        {
                          metric: "Leadership",
                          value: outcomesSnapshot.leadershipDevelopment,
                        },
                        {
                          metric: "Cyber Hygiene",
                          value: outcomesSnapshot.cyberHygieneAdoption,
                        },
                        {
                          metric: "Reporting",
                          value: outcomesSnapshot.reportingReadiness,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
