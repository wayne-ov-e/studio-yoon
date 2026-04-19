"use client";

import { useState } from "react";
import {
  Building2,
  CalendarDays,
  Clock4,
  ClockArrowUp,
  FileBarChart2,
  Globe2,
  Shield,
  Users,
} from "lucide-react";

import { accounts, companies, punchRecords, shifts, timezoneOptions } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function statusVariant(status: string): "default" | "muted" | "outline" {
  if (status === "Checked in") return "default";
  if (status === "Needs coverage") return "outline";
  return "muted";
}

function formatMonthLabel(day: Date) {
  return day.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatDayLabel(date: string) {
  const day = new Date(`${date}T00:00:00`);
  return day.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function buildWeekDates(anchor: string) {
  const start = new Date(`${anchor}T00:00:00`);
  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

function buildMonthGrid(anchor: string) {
  const base = new Date(`${anchor}T00:00:00`);
  const first = new Date(base.getFullYear(), base.getMonth(), 1);
  const startOffset = (first.getDay() + 6) % 7;
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startOffset);
  return Array.from({ length: 35 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}

export function DashboardPage() {
  const [activeAccountId, setActiveAccountId] = useState(accounts[0].id);
  const activeAccount = accounts.find((account) => account.id === activeAccountId) ?? accounts[0];
  const adminView = activeAccount.role === "Admin";
  const [activeCompanyId, setActiveCompanyId] = useState(activeAccount.companyId);
  const activeCompany =
    companies.find((company) => company.id === activeCompanyId) ??
    companies.find((company) => company.id === activeAccount.companyId) ??
    companies[0];
  const [intendedTimezone, setIntendedTimezone] = useState(activeAccount.timezone);
  const [punchState, setPunchState] = useState<"in" | "out">("in");

  const filteredShifts = shifts.filter((shift) => shift.companyId === activeCompany.id);
  const companyAccounts = accounts.filter((account) => account.companyId === activeCompany.id);
  const accountShifts = filteredShifts.filter((shift) => shift.employeeName === activeAccount.name);
  const weekDates = buildWeekDates("2026-04-18");
  const monthGrid = buildMonthGrid("2026-04-18");
  const coverageRate = `${activeCompany.coverageScore}%`;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4efe4_0%,#ebf4f0_45%,#dce8ef_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[290px_1fr]">
          <aside className="rounded-[32px] border border-white/60 bg-[rgba(255,255,255,0.62)] p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.55)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[var(--foreground)] p-3 text-[var(--background)]">
                <Clock4 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
                  Shift Orbit
                </p>
                <h1 className="text-lg font-semibold">Mock workspace</h1>
              </div>
            </div>

            <div className="mt-8 space-y-4 rounded-[28px] bg-[var(--foreground)] p-5 text-[var(--background)]">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">Mock account</p>
                <h2 className="mt-2 text-xl font-semibold">{activeAccount.name}</h2>
                <p className="mt-1 text-sm text-white/75">{activeAccount.title}</p>
              </div>
              <Select
                value={activeAccountId}
                onValueChange={(value) => {
                  const nextAccount = accounts.find((account) => account.id === value);
                  if (!nextAccount) return;
                  setActiveAccountId(value);
                  setActiveCompanyId(nextAccount.companyId);
                  setIntendedTimezone(nextAccount.timezone);
                  setPunchState("in");
                }}
              >
                <SelectTrigger className="border-white/10 bg-white/10 text-white">
                  <SelectValue placeholder="Switch account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} · {account.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2">
                <Badge variant={adminView ? "default" : "outline"}>{activeAccount.role}</Badge>
                <Badge variant="muted">{activeAccount.timezone}</Badge>
              </div>
            </div>

            <nav className="mt-8 space-y-2 text-sm">
              {[
                "Overview",
                "Calendar",
                "Companies",
                "People",
                "Punches",
                "Reports",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl px-4 py-3 text-[var(--muted-foreground)] transition hover:bg-white/70 hover:text-[var(--foreground)]"
                >
                  {item}
                </div>
              ))}
            </nav>

            <div className="mt-8 rounded-[28px] border border-black/8 bg-white/75 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                Timezone rule
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">
                Punches store UTC time plus the intended operating timezone so remote staff and
                owners can log work correctly for the target company.
              </p>
            </div>
          </aside>

          <main className="space-y-6">
            <section className="rounded-[32px] border border-white/60 bg-[rgba(255,255,255,0.64)] p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.55)] backdrop-blur-xl">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                <div className="space-y-3">
                  <Badge>{adminView ? "Admin workspace" : "Staff workspace"}</Badge>
                  <div>
                    <h2 className="text-4xl font-semibold tracking-[-0.04em]">
                      Full mock function set with live calendar views
                    </h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted-foreground)]">
                      Explore account switching, company-scoped scheduling, timezone-aware punching,
                      staff visibility, and reporting from a single mock environment.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select value={activeCompanyId} onValueChange={setActiveCompanyId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={intendedTimezone} onValueChange={setIntendedTimezone}>
                    <SelectTrigger>
                      <SelectValue placeholder="Intended timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezoneOptions.map((timezone) => (
                        <SelectItem key={timezone} value={timezone}>
                          {timezone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Company staff",
                  value: String(activeCompany.staffCount),
                  detail: `${activeCompany.industry} workforce`,
                  icon: Users,
                },
                {
                  label: "Open shifts",
                  value: String(activeCompany.openShifts),
                  detail: "Needs coverage or approval",
                  icon: CalendarDays,
                },
                {
                  label: "Coverage score",
                  value: coverageRate,
                  detail: "Weekly fill rate",
                  icon: Shield,
                },
                {
                  label: "Tracked timezone",
                  value: intendedTimezone.split("/")[1] ?? intendedTimezone,
                  detail: "Punch intent target",
                  icon: Globe2,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.label} className="bg-white/74">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardDescription>{item.label}</CardDescription>
                        <div className="rounded-2xl bg-[var(--accent)] p-3 text-[var(--accent-foreground)]">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                      <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.detail}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </section>

            <Tabs defaultValue="calendar">
              <TabsList className="flex w-full flex-wrap justify-start gap-2 rounded-[26px] bg-white/75 p-2">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="companies">Companies</TabsTrigger>
                <TabsTrigger value="people">People</TabsTrigger>
                <TabsTrigger value="punches">Punches</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="calendar">
                <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
                  <Card className="bg-white/74">
                    <CardHeader>
                      <CardDescription>Weekly planner</CardDescription>
                      <CardTitle>
                        {activeCompany.name} schedule for {formatMonthLabel(weekDates[0])}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 lg:grid-cols-7">
                        {weekDates.map((day) => {
                          const iso = day.toISOString().slice(0, 10);
                          const dayShifts = filteredShifts.filter((shift) => shift.date === iso);
                          return (
                            <div
                              key={iso}
                              className="rounded-[24px] border border-black/8 bg-white/85 p-3"
                            >
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                                {day.toLocaleDateString("en-US", { weekday: "short" })}
                              </p>
                              <p className="mt-1 text-lg font-semibold">{day.getDate()}</p>
                              <div className="mt-4 space-y-2">
                                {dayShifts.length > 0 ? (
                                  dayShifts.map((shift) => (
                                    <div
                                      key={shift.id}
                                      className="rounded-2xl bg-[var(--muted)] px-3 py-2"
                                    >
                                      <p className="text-sm font-medium">{shift.employeeName}</p>
                                      <p className="text-xs text-[var(--muted-foreground)]">
                                        {shift.start} - {shift.end}
                                      </p>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-xs text-[var(--muted-foreground)]">
                                    No shifts
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/74">
                    <CardHeader>
                      <CardDescription>Shift queue</CardDescription>
                      <CardTitle>Actionable items this week</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {filteredShifts.slice(0, 5).map((shift) => (
                        <div
                          key={shift.id}
                          className="rounded-[24px] border border-black/8 bg-white/80 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold">{shift.employeeName}</p>
                              <p className="text-sm text-[var(--muted-foreground)]">
                                {shift.employeeRole} · {formatDayLabel(shift.date)}
                              </p>
                            </div>
                            <Badge variant={statusVariant(shift.status)}>{shift.status}</Badge>
                          </div>
                          <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                            {shift.start} - {shift.end} · {shift.timezone}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-4 bg-white/74">
                  <CardHeader>
                    <CardDescription>Month view</CardDescription>
                    <CardTitle>Coverage density across the month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-3 text-center text-xs uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day}>{day}</div>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-7 gap-3">
                      {monthGrid.map((day) => {
                        const iso = day.toISOString().slice(0, 10);
                        const dayShifts = filteredShifts.filter((shift) => shift.date === iso);
                        const inMonth = day.getMonth() === 3;
                        return (
                          <div
                            key={iso}
                            className="min-h-28 rounded-[22px] border border-black/8 bg-white/80 p-3 text-left"
                          >
                            <p
                              className={`text-sm font-medium ${
                                inMonth ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                              }`}
                            >
                              {day.getDate()}
                            </p>
                            <div className="mt-2 space-y-2">
                              {dayShifts.slice(0, 2).map((shift) => (
                                <div
                                  key={shift.id}
                                  className="rounded-xl bg-[var(--accent)] px-2 py-1 text-xs text-[var(--accent-foreground)]"
                                >
                                  {shift.employeeName.split(" ")[0]} · {shift.start}
                                </div>
                              ))}
                              {dayShifts.length > 2 ? (
                                <p className="text-xs text-[var(--muted-foreground)]">
                                  +{dayShifts.length - 2} more
                                </p>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="companies">
                <div className="grid gap-4 lg:grid-cols-3">
                  {companies.map((company) => (
                    <Card key={company.id} className="bg-white/74">
                      <CardHeader>
                        <div className="flex items-center justify-between gap-3">
                          <div className="rounded-2xl bg-[var(--muted)] p-3">
                            <Building2 className="h-4 w-4" />
                          </div>
                          <Badge variant={company.id === activeCompany.id ? "default" : "muted"}>
                            {company.id === activeCompany.id ? "Active" : company.industry}
                          </Badge>
                        </div>
                        <CardTitle>{company.name}</CardTitle>
                        <CardDescription>{company.timezone}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {company.staffCount} staff · {company.openShifts} open shifts · {company.coverageScore}% coverage
                        </p>
                        <Button
                          variant={company.id === activeCompany.id ? "secondary" : "outline"}
                          className="w-full"
                          onClick={() => setActiveCompanyId(company.id)}
                        >
                          View company workspace
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="people">
                <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
                  <Card className="bg-white/74">
                    <CardHeader>
                      <CardDescription>Accounts and permissions</CardDescription>
                      <CardTitle>Role-aware company membership</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {companyAccounts.map((account) => (
                        <div
                          key={account.id}
                          className="rounded-[24px] border border-black/8 bg-white/80 p-4"
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <p className="font-semibold">{account.name}</p>
                              <p className="text-sm text-[var(--muted-foreground)]">{account.title}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant={account.role === "Admin" ? "default" : "outline"}>
                                {account.role}
                              </Badge>
                              <Badge variant="muted">{account.timezone}</Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-white/74">
                    <CardHeader>
                      <CardDescription>{adminView ? "Admin permissions" : "Staff permissions"}</CardDescription>
                      <CardTitle>{adminView ? "Full access controls" : "Self-service controls"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm leading-6 text-[var(--muted-foreground)]">
                      {adminView ? (
                        <>
                          <p>Admins can manage company profiles, invite staff, adjust punches, and assign shifts.</p>
                          <p>Company isolation is maintained by scoping every workflow to the active tenant.</p>
                          <p>Timezone defaults can be set at the company level while allowing per-punch intent overrides.</p>
                        </>
                      ) : (
                        <>
                          <p>Staff can see only their own shifts, punch history, and current timezone intent.</p>
                          <p>Clock actions stay tied to the company selected for the shift rather than the viewer’s local zone.</p>
                          <p>Requests for coverage and visibility into upcoming shifts remain available without admin tools.</p>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="punches">
                <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                  <Card className="bg-white/74">
                    <CardHeader>
                      <CardDescription>Live punch center</CardDescription>
                      <CardTitle>
                        {adminView ? "Preview a staff punch workflow" : "Your next punch action"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-[24px] border border-black/8 bg-white/80 p-4">
                        <p className="text-sm font-semibold">Intended timezone</p>
                        <p className="mt-2 text-sm text-[var(--muted-foreground)]">{intendedTimezone}</p>
                      </div>
                      <div className="rounded-[24px] border border-black/8 bg-white/80 p-4">
                        <p className="text-sm font-semibold">Current company</p>
                        <p className="mt-2 text-sm text-[var(--muted-foreground)]">{activeCompany.name}</p>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => setPunchState((current) => (current === "in" ? "out" : "in"))}
                      >
                        {punchState === "in" ? "Punch in now" : "Punch out now"}
                      </Button>
                      <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                        This mock control toggles between punch-in and punch-out states while keeping
                        the selected intended timezone attached to the action.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/74">
                    <CardHeader>
                      <CardDescription>Recent punch log</CardDescription>
                      <CardTitle>UTC storage with intended timezone context</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[...punchRecords]
                        .filter((record) => record.companyId === activeCompany.id)
                        .concat(
                          accountShifts.slice(0, 1).map((shift) => ({
                            id: `preview-${shift.id}`,
                            accountId: activeAccount.id,
                            companyId: activeCompany.id,
                            shiftId: shift.id,
                            action: punchState === "in" ? "Punch in" : "Punch out",
                            utcTime: "2026-04-18T16:15:00Z",
                            intendedTimezone,
                          }))
                        )
                        .map((record) => (
                          <div
                            key={record.id}
                            className="rounded-[24px] border border-black/8 bg-white/80 p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="font-semibold">{record.action}</p>
                                <p className="text-sm text-[var(--muted-foreground)]">{record.utcTime}</p>
                              </div>
                              <Badge variant="muted">{record.intendedTimezone}</Badge>
                            </div>
                          </div>
                        ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reports">
                <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                  <Card className="bg-white/74">
                    <CardHeader>
                      <CardDescription>Operational report</CardDescription>
                      <CardTitle>Snapshot for the active company</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { icon: FileBarChart2, label: "Coverage rate", value: coverageRate },
                        { icon: ClockArrowUp, label: "Overtime alerts", value: "2" },
                        { icon: Users, label: "Staff on schedule", value: String(companyAccounts.length) },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={item.label}
                            className="flex items-center justify-between rounded-[22px] border border-black/8 bg-white/80 p-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="rounded-2xl bg-[var(--accent)] p-3 text-[var(--accent-foreground)]">
                                <Icon className="h-4 w-4" />
                              </div>
                              <p className="font-medium">{item.label}</p>
                            </div>
                            <p className="text-lg font-semibold">{item.value}</p>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <Card className="bg-white/74">
                    <CardHeader>
                      <CardDescription>Upcoming assignments</CardDescription>
                      <CardTitle>{adminView ? "Admin review list" : "Your upcoming shifts"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {(adminView ? filteredShifts : accountShifts).slice(0, 6).map((shift) => (
                        <div
                          key={shift.id}
                          className="rounded-[24px] border border-black/8 bg-white/80 p-4"
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <p className="font-semibold">{shift.employeeName}</p>
                              <p className="text-sm text-[var(--muted-foreground)]">
                                {formatDayLabel(shift.date)} · {shift.start} - {shift.end}
                              </p>
                            </div>
                            <Badge variant={statusVariant(shift.status)}>{shift.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
