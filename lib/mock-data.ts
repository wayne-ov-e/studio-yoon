export type Role = "Admin" | "Staff";

export type Account = {
  id: string;
  name: string;
  role: Role;
  companyId: string;
  title: string;
  timezone: string;
};

export type Company = {
  id: string;
  name: string;
  timezone: string;
  industry: string;
  staffCount: number;
  openShifts: number;
  coverageScore: number;
};

export type Shift = {
  id: string;
  companyId: string;
  employeeName: string;
  employeeRole: string;
  date: string;
  start: string;
  end: string;
  timezone: string;
  status: "Checked in" | "Scheduled" | "Needs coverage" | "Completed";
};

export type PunchRecord = {
  id: string;
  accountId: string;
  companyId: string;
  shiftId: string;
  action: "Punch in" | "Punch out";
  utcTime: string;
  intendedTimezone: string;
};

export const timezoneOptions = [
  "America/Vancouver",
  "America/Toronto",
  "America/Chicago",
  "Europe/London",
  "Australia/Sydney",
];

export const companies: Company[] = [
  {
    id: "northstar",
    name: "Northstar Logistics",
    timezone: "America/Vancouver",
    industry: "Logistics",
    staffCount: 42,
    openShifts: 3,
    coverageScore: 94,
  },
  {
    id: "luma",
    name: "Luma Hospitality",
    timezone: "America/Toronto",
    industry: "Hospitality",
    staffCount: 67,
    openShifts: 1,
    coverageScore: 97,
  },
  {
    id: "oakwell",
    name: "Oakwell Clinics",
    timezone: "Australia/Sydney",
    industry: "Healthcare",
    staffCount: 31,
    openShifts: 2,
    coverageScore: 91,
  },
];

export const accounts: Account[] = [
  {
    id: "alicia",
    name: "Alicia Reyes",
    role: "Admin",
    companyId: "northstar",
    title: "Operations Director",
    timezone: "America/Vancouver",
  },
  {
    id: "imani",
    name: "Imani Scott",
    role: "Admin",
    companyId: "luma",
    title: "Regional Manager",
    timezone: "America/Toronto",
  },
  {
    id: "theo",
    name: "Theo Martin",
    role: "Staff",
    companyId: "northstar",
    title: "Dispatcher",
    timezone: "America/Vancouver",
  },
  {
    id: "priya",
    name: "Priya Nair",
    role: "Staff",
    companyId: "oakwell",
    title: "Reception",
    timezone: "Australia/Sydney",
  },
];

export const shifts: Shift[] = [
  {
    id: "s1",
    companyId: "northstar",
    employeeName: "Theo Martin",
    employeeRole: "Dispatcher",
    date: "2026-04-18",
    start: "08:00",
    end: "16:00",
    timezone: "America/Vancouver",
    status: "Checked in",
  },
  {
    id: "s2",
    companyId: "northstar",
    employeeName: "Maya Chen",
    employeeRole: "Dispatcher",
    date: "2026-04-18",
    start: "09:00",
    end: "17:00",
    timezone: "America/Vancouver",
    status: "Scheduled",
  },
  {
    id: "s3",
    companyId: "northstar",
    employeeName: "Noah Patel",
    employeeRole: "Driver Coordinator",
    date: "2026-04-19",
    start: "06:00",
    end: "14:00",
    timezone: "America/Vancouver",
    status: "Scheduled",
  },
  {
    id: "s4",
    companyId: "northstar",
    employeeName: "Emma Brooks",
    employeeRole: "Warehouse Lead",
    date: "2026-04-20",
    start: "12:00",
    end: "20:00",
    timezone: "America/Vancouver",
    status: "Needs coverage",
  },
  {
    id: "s5",
    companyId: "northstar",
    employeeName: "Theo Martin",
    employeeRole: "Dispatcher",
    date: "2026-04-21",
    start: "10:00",
    end: "18:00",
    timezone: "America/Vancouver",
    status: "Scheduled",
  },
  {
    id: "s6",
    companyId: "luma",
    employeeName: "Jordan Ellis",
    employeeRole: "Floor Lead",
    date: "2026-04-18",
    start: "14:00",
    end: "22:00",
    timezone: "America/Toronto",
    status: "Scheduled",
  },
  {
    id: "s7",
    companyId: "luma",
    employeeName: "Zoe Harper",
    employeeRole: "Host",
    date: "2026-04-19",
    start: "11:00",
    end: "19:00",
    timezone: "America/Toronto",
    status: "Scheduled",
  },
  {
    id: "s8",
    companyId: "luma",
    employeeName: "Imani Scott",
    employeeRole: "Manager",
    date: "2026-04-20",
    start: "09:00",
    end: "17:00",
    timezone: "America/Toronto",
    status: "Completed",
  },
  {
    id: "s9",
    companyId: "oakwell",
    employeeName: "Priya Nair",
    employeeRole: "Reception",
    date: "2026-04-18",
    start: "09:00",
    end: "17:00",
    timezone: "Australia/Sydney",
    status: "Needs coverage",
  },
  {
    id: "s10",
    companyId: "oakwell",
    employeeName: "Lucas Wong",
    employeeRole: "Nurse",
    date: "2026-04-19",
    start: "07:00",
    end: "15:00",
    timezone: "Australia/Sydney",
    status: "Scheduled",
  },
  {
    id: "s11",
    companyId: "oakwell",
    employeeName: "Sarah Kim",
    employeeRole: "Nurse",
    date: "2026-04-21",
    start: "13:00",
    end: "21:00",
    timezone: "Australia/Sydney",
    status: "Scheduled",
  },
];

export const punchRecords: PunchRecord[] = [
  {
    id: "p1",
    accountId: "theo",
    companyId: "northstar",
    shiftId: "s1",
    action: "Punch in",
    utcTime: "2026-04-18T15:00:00Z",
    intendedTimezone: "America/Vancouver",
  },
  {
    id: "p2",
    accountId: "imani",
    companyId: "luma",
    shiftId: "s8",
    action: "Punch out",
    utcTime: "2026-04-20T21:05:00Z",
    intendedTimezone: "America/Toronto",
  },
];

