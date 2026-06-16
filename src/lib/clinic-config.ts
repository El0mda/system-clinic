import {
  LayoutDashboard, Users, Calendar, FileText, Briefcase,
  Package, UserCog, Settings, ClipboardList, type LucideIcon,
} from "lucide-react";
import {
  employees, patients, appointments, invoices, kpiCards, activities,
  beautyStaff, beautyClients, beautyAppointments, beautyInvoices, beautyKpiCards, beautyActivities,
  type Employee, type Patient, type Appointment, type Invoice, type KpiCard, type Activity,
} from "./dashboard-data";

/** Vocabulary that differs by business type (clinic vs. beauty center). */
export interface ClinicTerms {
  /** Singular noun for a customer record — "Patient" vs. "Client". */
  client: string;
  clientPlural: string;
  /** Person who delivers the service — "Doctor" vs. "Specialist". */
  provider: string;
}

/** Mock data set shown for a given business type. */
export interface ClinicData {
  staff: Employee[];
  clients: Patient[];
  appointments: Appointment[];
  invoices: Invoice[];
  kpiCards: KpiCard[];
  activities: Activity[];
}

/**
 * A single navigation module shown in the dashboard sidebar.
 * `labelKey` is resolved through the i18n provider; `fallback` is used
 * when no translation exists for the key.
 */
export interface NavModule {
  labelKey: string;
  fallback: string;
  href: string;
  icon: LucideIcon;
}

/**
 * The "shape" of the system for a given business type. This is what the user
 * picks at sign-up — choosing a type wires the dashboard to the right modules
 * and the service catalog to the right categories.
 */
export interface ClinicConfig {
  key: string;
  nameKey: string;
  nameFallback: string;
  /** Categories offered in the Service catalog for this business type. */
  serviceCategories: string[];
  defaultServiceCategory: string;
  /** Sidebar modules, in display order. */
  nav: NavModule[];
  /** Type-specific vocabulary (client vs. patient, specialist vs. doctor). */
  terms: ClinicTerms;
  /** Staff roles that can be booked to deliver an appointment. */
  providerRoles: string[];
  /** Mock data surfaced across the dashboard for this business type. */
  data: ClinicData;
}

const dashboardModule: NavModule = {
  labelKey: "nav.dashboard", fallback: "Dashboard", href: "/dashboard", icon: LayoutDashboard,
};
const appointmentsModule: NavModule = {
  labelKey: "nav.appointments", fallback: "Appointments", href: "/dashboard/appointments", icon: Calendar,
};
const servicesModule: NavModule = {
  labelKey: "nav.services", fallback: "Services", href: "/dashboard/services", icon: Briefcase,
};
const invoicesModule: NavModule = {
  labelKey: "nav.invoices", fallback: "Invoices", href: "/dashboard/invoices", icon: FileText,
};
const inventoryModule: NavModule = {
  labelKey: "nav.inventory", fallback: "Inventory", href: "/dashboard/inventory", icon: Package,
};
const settingsModule: NavModule = {
  labelKey: "nav.settings", fallback: "Settings", href: "/dashboard/settings", icon: Settings,
};

/** Default system shape for clinical business types (dental / physio / general). */
const defaultConfig: ClinicConfig = {
  key: "general",
  nameKey: "auth.clinicTypes.general",
  nameFallback: "Clinic",
  serviceCategories: ["Dental", "General", "Physiotherapy", "Beauty"],
  defaultServiceCategory: "General",
  nav: [
    dashboardModule,
    { labelKey: "nav.patients", fallback: "Patients", href: "/dashboard/patients", icon: Users },
    appointmentsModule,
    invoicesModule,
    servicesModule,
    inventoryModule,
    { labelKey: "nav.employees", fallback: "Employees", href: "/dashboard/employees", icon: UserCog },
    settingsModule,
  ],
  terms: { client: "Patient", clientPlural: "Patients", provider: "Doctor" },
  providerRoles: ["Doctor"],
  data: { staff: employees, clients: patients, appointments, invoices, kpiCards, activities },
};

/**
 * Beauty Center system shape. Reframes "patients" as "clients", surfaces
 * Treatment Plans (a beauty/aesthetic differentiator) and swaps the service
 * catalog over to beauty categories.
 */
const beautyConfig: ClinicConfig = {
  key: "beauty",
  nameKey: "auth.clinicTypes.beauty",
  nameFallback: "Beauty Center",
  serviceCategories: ["Hair", "Skin", "Nails", "Spa", "Massage", "Laser", "Makeup", "Body Treatments"],
  defaultServiceCategory: "Skin",
  nav: [
    dashboardModule,
    { labelKey: "nav.clients", fallback: "Clients", href: "/dashboard/patients", icon: Users },
    appointmentsModule,
    { labelKey: "nav.treatmentPlans", fallback: "Treatment Plans", href: "/dashboard/treatment-plans", icon: ClipboardList },
    servicesModule,
    invoicesModule,
    inventoryModule,
    { labelKey: "nav.staff", fallback: "Staff", href: "/dashboard/employees", icon: UserCog },
    settingsModule,
  ],
  terms: { client: "Client", clientPlural: "Clients", provider: "Specialist" },
  providerRoles: ["Stylist", "Esthetician", "Nail Technician", "Massage Therapist", "Laser Technician", "Makeup Artist"],
  data: {
    staff: beautyStaff,
    clients: beautyClients,
    appointments: beautyAppointments,
    invoices: beautyInvoices,
    kpiCards: beautyKpiCards,
    activities: beautyActivities,
  },
};

const configsByKey: Record<string, ClinicConfig> = {
  beauty: beautyConfig,
};

/**
 * Resolves the system configuration for a business type. Falls back to the
 * default clinical shape for unknown / clinical types. Case-insensitive so it
 * tolerates both "beauty" (sign-up) and "Beauty" (login) values.
 */
export function getClinicConfig(clinicType?: string | null): ClinicConfig {
  if (!clinicType) return defaultConfig;
  return configsByKey[clinicType.toLowerCase()] ?? defaultConfig;
}
