import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Globe2,
  ShieldCheck,
  TimerReset,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Multi-company isolation",
    description:
      "Separate companies, profiles, and staff directories with tenant-safe access boundaries.",
    icon: Building2,
  },
  {
    title: "Admin and staff roles",
    description:
      "Admins manage schedules, users, and punch records while staff focus on their own shifts.",
    icon: ShieldCheck,
  },
  {
    title: "Timezone-aware punches",
    description:
      "Track UTC behind the scenes while letting people clock in for the operating timezone that matters.",
    icon: Globe2,
  },
];

const statCards = [
  { label: "Companies onboarded", value: "18", hint: "Across retail, clinics, and field teams" },
  { label: "Punches processed today", value: "1,294", hint: "Stored safely in UTC" },
  { label: "Open staffing gaps", value: "12", hint: "Flagged before the next shift window" },
];

const companySnapshots = [
  { name: "Northstar Logistics", tz: "America/Vancouver", staff: 42, open: 3 },
  { name: "Luma Hospitality", tz: "America/Toronto", staff: 67, open: 1 },
  { name: "Oakwell Clinics", tz: "Australia/Sydney", staff: 31, open: 2 },
];

export function AppShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.92),_transparent_34%),linear-gradient(135deg,_#f7f3e8_0%,_#dce8e3_45%,_#c8d9ea_100%)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <header className="flex flex-col gap-6 rounded-[32px] border border-white/60 bg-white/50 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--foreground)] text-[var(--background)]">
              <Clock3 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                Shift Orbit
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">Company shift management system</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline">Built with shadcn/ui</Badge>
            <Button variant="secondary" asChild>
              <Link href="/dashboard">Open demo workspace</Link>
            </Button>
          </div>
        </header>

        <main className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <Badge>Operations made calm</Badge>
            <div className="max-w-2xl space-y-5">
              <h2 className="text-5xl font-semibold tracking-[-0.04em] text-balance sm:text-6xl">
                A scheduling hub for teams spread across companies and time zones.
              </h2>
              <p className="max-w-xl text-base leading-7 text-[var(--muted-foreground)] sm:text-lg">
                This first build gives you a polished launch point for multi-tenant scheduling,
                role-based access, and timezone-aware punch tracking without starting from raw UI.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Explore dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Request company invite
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {statCards.map((stat) => (
                <Card key={stat.label} className="bg-white/70">
                  <CardHeader className="pb-3">
                    <CardDescription>{stat.label}</CardDescription>
                    <CardTitle className="text-4xl">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-[var(--muted-foreground)]">{stat.hint}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <Card className="overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.68))]">
              <CardHeader className="border-b border-black/5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardDescription>Live concept</CardDescription>
                    <CardTitle>What the product is organized around</CardTitle>
                  </div>
                  <Badge variant="muted">MVP</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="rounded-[24px] border border-black/8 bg-white/70 p-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1 rounded-2xl bg-[var(--accent)] p-3 text-[var(--accent-foreground)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm leading-6 text-[var(--muted-foreground)]">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>
        </main>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardDescription>Tenant snapshots</CardDescription>
              <CardTitle>Companies stay separate but operators stay fast</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {companySnapshots.map((company) => (
                <div
                  key={company.name}
                  className="rounded-[24px] border border-black/8 bg-white/75 p-4"
                >
                  <h3 className="font-semibold">{company.name}</h3>
                  <p className="mt-1 text-sm text-[var(--muted-foreground)]">{company.tz}</p>
                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span>{company.staff} staff</span>
                    <span className="rounded-full bg-[var(--muted)] px-3 py-1">
                      {company.open} open shifts
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-[var(--foreground)] text-[var(--background)]">
            <CardHeader>
              <CardDescription className="text-white/70">Build direction</CardDescription>
              <CardTitle className="text-white">Next slices to implement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-white/80">
              <p className="flex items-center gap-3">
                <Users2 className="h-4 w-4" />
                Company-scoped authentication and invitations
              </p>
              <p className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4" />
                Shift calendar with assignment workflows
              </p>
              <p className="flex items-center gap-3">
                <TimerReset className="h-4 w-4" />
                Punch in and punch out actions with audit logs
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

