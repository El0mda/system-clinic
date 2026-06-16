export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  age: number;
  lastVisit: string;
  status: "Active" | "Inactive" | "New";
  avatar: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  duration: number;
  status: "Confirmed" | "In Progress" | "Completed" | "Cancelled" | "Pending";
}

export interface Invoice {
  id: string;
  number: string;
  patientName: string;
  patientAvatar: string;
  amount: number;
  paid: number;
  due: number;
  date: string;
  status: "Paid" | "Partially Paid" | "Overdue" | "Pending" | "Cancelled";
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  active: boolean;
  clinicType: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  unit: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialty: string;
  status: "Active" | "On Leave" | "Inactive";
  avatar: string;
}

export interface KpiCard {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  trend: "up" | "down";
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

export interface RevenueEntry {
  month: string;
  revenue: number;
  expenses: number;
}

export interface AppointmentSlot {
  time: string;
  available: boolean;
  patient?: string;
  service?: string;
}

export const kpiCards: KpiCard[] = [
  { label: "Total Patients", value: "2,847", change: 12.5, changeLabel: "vs last month", icon: "Users", trend: "up" },
  { label: "Appointments", value: "156", change: 8.3, changeLabel: "vs last month", icon: "Calendar", trend: "up" },
  { label: "Revenue", value: "$48,250", change: 23.1, changeLabel: "vs last month", icon: "DollarSign", trend: "up" },
  { label: "Active Staff", value: "42", change: 2.1, changeLabel: "vs last month", icon: "UsersRound", trend: "up" },
];

export const patients: Patient[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+1 (555) 123-4567", gender: "Female", age: 32, lastVisit: "2026-06-12", status: "Active", avatar: "SJ" },
  { id: "2", name: "Michael Chen", email: "m.chen@email.com", phone: "+1 (555) 234-5678", gender: "Male", age: 45, lastVisit: "2026-06-10", status: "Active", avatar: "MC" },
  { id: "3", name: "Emily Rodriguez", email: "emily.r@email.com", phone: "+1 (555) 345-6789", gender: "Female", age: 28, lastVisit: "2026-06-08", status: "New", avatar: "ER" },
  { id: "4", name: "David Kim", email: "d.kim@email.com", phone: "+1 (555) 456-7890", gender: "Male", age: 51, lastVisit: "2026-06-05", status: "Active", avatar: "DK" },
  { id: "5", name: "Lisa Thompson", email: "lisa.t@email.com", phone: "+1 (555) 567-8901", gender: "Female", age: 39, lastVisit: "2026-06-01", status: "Inactive", avatar: "LT" },
  { id: "6", name: "James Wilson", email: "j.wilson@email.com", phone: "+1 (555) 678-9012", gender: "Male", age: 27, lastVisit: "2026-05-28", status: "Active", avatar: "JW" },
  { id: "7", name: "Amanda Patel", email: "a.patel@email.com", phone: "+1 (555) 789-0123", gender: "Female", age: 34, lastVisit: "2026-05-25", status: "New", avatar: "AP" },
  { id: "8", name: "Robert Martinez", email: "r.martinez@email.com", phone: "+1 (555) 890-1234", gender: "Male", age: 58, lastVisit: "2026-05-20", status: "Active", avatar: "RM" },
];

export const appointments: Appointment[] = [
  { id: "1", patientName: "Sarah Johnson", patientAvatar: "SJ", service: "Dental Cleaning", doctor: "Dr. Williams", date: "2026-06-15", time: "09:00", duration: 30, status: "Confirmed" },
  { id: "2", patientName: "Michael Chen", patientAvatar: "MC", service: "Root Canal", doctor: "Dr. Patel", date: "2026-06-15", time: "10:30", duration: 60, status: "In Progress" },
  { id: "3", patientName: "Emily Rodriguez", patientAvatar: "ER", service: "Consultation", doctor: "Dr. Williams", date: "2026-06-15", time: "11:45", duration: 30, status: "Confirmed" },
  { id: "4", patientName: "David Kim", patientAvatar: "DK", service: "Physiotherapy", doctor: "Dr. Garcia", date: "2026-06-15", time: "14:00", duration: 45, status: "Completed" },
  { id: "5", patientName: "Lisa Thompson", patientAvatar: "LT", service: "Facial Treatment", doctor: "Dr. Chen", date: "2026-06-16", time: "09:30", duration: 45, status: "Confirmed" },
  { id: "6", patientName: "James Wilson", patientAvatar: "JW", service: "General Checkup", doctor: "Dr. Williams", date: "2026-06-16", time: "11:00", duration: 30, status: "Pending" },
  { id: "7", patientName: "Amanda Patel", patientAvatar: "AP", service: "Teeth Whitening", doctor: "Dr. Patel", date: "2026-06-16", time: "15:30", duration: 60, status: "Confirmed" },
  { id: "8", patientName: "Robert Martinez", patientAvatar: "RM", service: "Massage Therapy", doctor: "Dr. Garcia", date: "2026-06-17", time: "10:00", duration: 60, status: "Completed" },
];

export const invoices: Invoice[] = [
  { id: "1", number: "INV-2026-001", patientName: "Sarah Johnson", patientAvatar: "SJ", amount: 250, paid: 250, due: 0, date: "2026-06-12", status: "Paid" },
  { id: "2", number: "INV-2026-002", patientName: "Michael Chen", patientAvatar: "MC", amount: 1200, paid: 600, due: 600, date: "2026-06-10", status: "Partially Paid" },
  { id: "3", number: "INV-2026-003", patientName: "Emily Rodriguez", patientAvatar: "ER", amount: 180, paid: 0, due: 180, date: "2026-06-08", status: "Pending" },
  { id: "4", number: "INV-2026-004", patientName: "David Kim", patientAvatar: "DK", amount: 450, paid: 450, due: 0, date: "2026-06-05", status: "Paid" },
  { id: "5", number: "INV-2026-005", patientName: "Lisa Thompson", patientAvatar: "LT", amount: 890, paid: 0, due: 890, date: "2026-06-01", status: "Overdue" },
  { id: "6", number: "INV-2026-006", patientName: "James Wilson", patientAvatar: "JW", amount: 320, paid: 320, due: 0, date: "2026-05-28", status: "Paid" },
  { id: "7", number: "INV-2026-007", patientName: "Amanda Patel", patientAvatar: "AP", amount: 750, paid: 400, due: 350, date: "2026-05-25", status: "Partially Paid" },
  { id: "8", number: "INV-2026-008", patientName: "Robert Martinez", patientAvatar: "RM", amount: 200, paid: 200, due: 0, date: "2026-05-20", status: "Paid" },
];

export const services: Service[] = [
  { id: "1", name: "Dental Cleaning", category: "Dental", price: 150, duration: 30, active: true, clinicType: "Dental" },
  { id: "2", name: "Root Canal", category: "Dental", price: 800, duration: 60, active: true, clinicType: "Dental" },
  { id: "3", name: "Teeth Whitening", category: "Dental", price: 500, duration: 45, active: true, clinicType: "Dental" },
  { id: "4", name: "General Checkup", category: "General", price: 120, duration: 30, active: true, clinicType: "General" },
  { id: "5", name: "Physiotherapy Session", category: "Physiotherapy", price: 200, duration: 45, active: true, clinicType: "Physiotherapy" },
  { id: "6", name: "Facial Treatment", category: "Beauty", price: 180, duration: 45, active: true, clinicType: "Beauty" },
  { id: "7", name: "Massage Therapy", category: "Physiotherapy", price: 250, duration: 60, active: true, clinicType: "Physiotherapy" },
  { id: "8", name: "Skin Consultation", category: "Beauty", price: 100, duration: 30, active: true, clinicType: "Beauty" },
  // Beauty Center catalog (shown when the business type is Beauty)
  { id: "b1", name: "Haircut & Styling", category: "Hair", price: 60, duration: 45, active: true, clinicType: "Beauty" },
  { id: "b2", name: "Hair Coloring", category: "Hair", price: 140, duration: 90, active: true, clinicType: "Beauty" },
  { id: "b3", name: "Deep Cleansing Facial", category: "Skin", price: 120, duration: 60, active: true, clinicType: "Beauty" },
  { id: "b4", name: "Skin Analysis", category: "Skin", price: 80, duration: 30, active: true, clinicType: "Beauty" },
  { id: "b5", name: "Manicure & Pedicure", category: "Nails", price: 55, duration: 60, active: true, clinicType: "Beauty" },
  { id: "b6", name: "Gel Nail Extensions", category: "Nails", price: 75, duration: 75, active: true, clinicType: "Beauty" },
  { id: "b7", name: "Spa Day Package", category: "Spa", price: 220, duration: 120, active: true, clinicType: "Beauty" },
  { id: "b8", name: "Relaxation Massage", category: "Massage", price: 110, duration: 60, active: true, clinicType: "Beauty" },
  { id: "b9", name: "Laser Hair Removal", category: "Laser", price: 180, duration: 45, active: true, clinicType: "Beauty" },
  { id: "b10", name: "Bridal Makeup", category: "Makeup", price: 250, duration: 90, active: true, clinicType: "Beauty" },
  { id: "b11", name: "Body Wrap Treatment", category: "Body Treatments", price: 160, duration: 75, active: true, clinicType: "Beauty" },
];

export const products: Product[] = [
  { id: "1", name: "Dental Filling Material", category: "Dental Supplies", sku: "DEN-001", price: 45, cost: 22, stock: 120, minStock: 20, unit: "Box" },
  { id: "2", name: "Surgical Gloves", category: "General Supplies", sku: "GEN-001", price: 15, cost: 8, stock: 500, minStock: 100, unit: "Box" },
  { id: "3", name: "Face Masks", category: "General Supplies", sku: "GEN-002", price: 12, cost: 6, stock: 800, minStock: 200, unit: "Box" },
  { id: "4", name: "Massage Oil", category: "Therapy", sku: "THR-001", price: 28, cost: 12, stock: 45, minStock: 10, unit: "Bottle" },
  { id: "5", name: "Anesthesia", category: "Medical", sku: "MED-001", price: 85, cost: 40, stock: 30, minStock: 15, unit: "Vial" },
  { id: "6", name: "Bandages", category: "General Supplies", sku: "GEN-003", price: 8, cost: 3, stock: 350, minStock: 50, unit: "Pack" },
];

export const employees: Employee[] = [
  { id: "1", name: "Dr. Sarah Williams", email: "s.williams@clinic.com", phone: "+1 (555) 111-2222", role: "Doctor", specialty: "Dentistry", status: "Active", avatar: "SW" },
  { id: "2", name: "Dr. Raj Patel", email: "r.patel@clinic.com", phone: "+1 (555) 222-3333", role: "Doctor", specialty: "Orthodontics", status: "Active", avatar: "RP" },
  { id: "3", name: "Dr. Maria Garcia", email: "m.garcia@clinic.com", phone: "+1 (555) 333-4444", role: "Doctor", specialty: "Physiotherapy", status: "Active", avatar: "MG" },
  { id: "4", name: "Dr. Lisa Chen", email: "l.chen@clinic.com", phone: "+1 (555) 444-5555", role: "Doctor", specialty: "Dermatology", status: "Active", avatar: "LC" },
  { id: "5", name: "Nurse Emily Brown", email: "e.brown@clinic.com", phone: "+1 (555) 555-6666", role: "Nurse", specialty: "General", status: "Active", avatar: "EB" },
  { id: "6", name: "Jessica Martinez", email: "j.martinez@clinic.com", phone: "+1 (555) 666-7777", role: "Receptionist", specialty: "Front Desk", status: "Active", avatar: "JM" },
  { id: "7", name: "David Wilson", email: "d.wilson@clinic.com", phone: "+1 (555) 777-8888", role: "Technician", specialty: "Lab", status: "On Leave", avatar: "DW" },
  { id: "8", name: "Anna Kowalski", email: "a.kowalski@clinic.com", phone: "+1 (555) 888-9999", role: "Admin", specialty: "Management", status: "Active", avatar: "AK" },
];

export const activities: Activity[] = [
  { id: "1", user: "Sarah Johnson", action: "checked in for", target: "Dental Cleaning", time: "5 min ago", avatar: "SJ" },
  { id: "2", user: "Dr. Patel", action: "completed", target: "Root Canal treatment", time: "15 min ago", avatar: "RP" },
  { id: "3", user: "Emily Rodriguez", action: "booked", target: "Consultation", time: "30 min ago", avatar: "ER" },
  { id: "4", user: "Lisa Thompson", action: "paid invoice", target: "INV-2026-005", time: "1 hour ago", avatar: "LT" },
  { id: "5", user: "Dr. Garcia", action: "updated treatment plan for", target: "David Kim", time: "2 hours ago", avatar: "MG" },
  { id: "6", user: "Jessica Martinez", action: "registered new patient", target: "Amanda Patel", time: "3 hours ago", avatar: "JM" },
];

export const revenueData: RevenueEntry[] = [
  { month: "Jan", revenue: 32000, expenses: 18000 },
  { month: "Feb", revenue: 35000, expenses: 19000 },
  { month: "Mar", revenue: 38000, expenses: 21000 },
  { month: "Apr", revenue: 42000, expenses: 22000 },
  { month: "May", revenue: 45000, expenses: 23000 },
  { month: "Jun", revenue: 48250, expenses: 24500 },
];

/* -------------------------------------------------------------------------- */
/* Beauty Center data set                                                     */
/* A beauty center staffs stylists, estheticians and therapists — not doctors */
/* — and serves "clients", not "patients". These data sets are surfaced when  */
/* the business type chosen at sign-up is "Beauty Center".                    */
/* -------------------------------------------------------------------------- */

export const beautyStaff: Employee[] = [
  { id: "bs1", name: "Nadia Karim", email: "nadia@beauty.com", phone: "+1 (555) 201-3001", role: "Stylist", specialty: "Hair Styling", status: "Active", avatar: "NK" },
  { id: "bs2", name: "Yara Saleh", email: "yara@beauty.com", phone: "+1 (555) 201-3002", role: "Esthetician", specialty: "Skin Care", status: "Active", avatar: "YS" },
  { id: "bs3", name: "Hana Mansour", email: "hana@beauty.com", phone: "+1 (555) 201-3003", role: "Nail Technician", specialty: "Nail Art", status: "Active", avatar: "HM" },
  { id: "bs4", name: "Omar Fadel", email: "omar@beauty.com", phone: "+1 (555) 201-3004", role: "Massage Therapist", specialty: "Body Massage", status: "Active", avatar: "OF" },
  { id: "bs5", name: "Reem Adib", email: "reem@beauty.com", phone: "+1 (555) 201-3005", role: "Laser Technician", specialty: "Laser Treatments", status: "Active", avatar: "RA" },
  { id: "bs6", name: "Farida Nabil", email: "farida@beauty.com", phone: "+1 (555) 201-3006", role: "Makeup Artist", specialty: "Bridal Makeup", status: "On Leave", avatar: "FN" },
  { id: "bs7", name: "Lina Habib", email: "lina@beauty.com", phone: "+1 (555) 201-3007", role: "Receptionist", specialty: "Front Desk", status: "Active", avatar: "LH" },
  { id: "bs8", name: "Tariq Aziz", email: "tariq@beauty.com", phone: "+1 (555) 201-3008", role: "Manager", specialty: "Management", status: "Active", avatar: "TA" },
];

export const beautyClients: Patient[] = [
  { id: "1", name: "Layla Hassan", email: "layla.h@email.com", phone: "+1 (555) 401-1001", gender: "Female", age: 29, lastVisit: "2026-06-12", status: "Active", avatar: "LH" },
  { id: "2", name: "Mona Adel", email: "mona.a@email.com", phone: "+1 (555) 401-1002", gender: "Female", age: 35, lastVisit: "2026-06-11", status: "Active", avatar: "MA" },
  { id: "3", name: "Sara Khaled", email: "sara.k@email.com", phone: "+1 (555) 401-1003", gender: "Female", age: 31, lastVisit: "2026-06-09", status: "New", avatar: "SK" },
  { id: "4", name: "Nour Ibrahim", email: "nour.i@email.com", phone: "+1 (555) 401-1004", gender: "Female", age: 27, lastVisit: "2026-06-07", status: "Active", avatar: "NI" },
  { id: "5", name: "Dina Tarek", email: "dina.t@email.com", phone: "+1 (555) 401-1005", gender: "Female", age: 42, lastVisit: "2026-05-30", status: "Inactive", avatar: "DT" },
  { id: "6", name: "Huda Samir", email: "huda.s@email.com", phone: "+1 (555) 401-1006", gender: "Female", age: 38, lastVisit: "2026-06-06", status: "Active", avatar: "HS" },
  { id: "7", name: "Karim Wael", email: "karim.w@email.com", phone: "+1 (555) 401-1007", gender: "Male", age: 33, lastVisit: "2026-06-04", status: "New", avatar: "KW" },
  { id: "8", name: "Salma Riad", email: "salma.r@email.com", phone: "+1 (555) 401-1008", gender: "Female", age: 24, lastVisit: "2026-06-02", status: "Active", avatar: "SR" },
];

export const beautyAppointments: Appointment[] = [
  { id: "1", patientName: "Layla Hassan", patientAvatar: "LH", service: "Deep Cleansing Facial", doctor: "Yara Saleh", date: "2026-06-15", time: "09:00", duration: 60, status: "Confirmed" },
  { id: "2", patientName: "Mona Adel", patientAvatar: "MA", service: "Laser Hair Removal", doctor: "Reem Adib", date: "2026-06-15", time: "10:30", duration: 45, status: "In Progress" },
  { id: "3", patientName: "Sara Khaled", patientAvatar: "SK", service: "Bridal Makeup", doctor: "Farida Nabil", date: "2026-06-15", time: "11:45", duration: 90, status: "Confirmed" },
  { id: "4", patientName: "Nour Ibrahim", patientAvatar: "NI", service: "Relaxation Massage", doctor: "Omar Fadel", date: "2026-06-15", time: "14:00", duration: 60, status: "Completed" },
  { id: "5", patientName: "Dina Tarek", patientAvatar: "DT", service: "Hair Coloring", doctor: "Nadia Karim", date: "2026-06-16", time: "09:30", duration: 90, status: "Confirmed" },
  { id: "6", patientName: "Huda Samir", patientAvatar: "HS", service: "Manicure & Pedicure", doctor: "Hana Mansour", date: "2026-06-16", time: "11:00", duration: 60, status: "Pending" },
  { id: "7", patientName: "Salma Riad", patientAvatar: "SR", service: "Haircut & Styling", doctor: "Nadia Karim", date: "2026-06-16", time: "15:30", duration: 45, status: "Confirmed" },
  { id: "8", patientName: "Karim Wael", patientAvatar: "KW", service: "Body Wrap Treatment", doctor: "Omar Fadel", date: "2026-06-17", time: "10:00", duration: 75, status: "Completed" },
];

export const beautyInvoices: Invoice[] = [
  { id: "1", number: "INV-2026-101", patientName: "Layla Hassan", patientAvatar: "LH", amount: 120, paid: 120, due: 0, date: "2026-06-12", status: "Paid" },
  { id: "2", number: "INV-2026-102", patientName: "Mona Adel", patientAvatar: "MA", amount: 540, paid: 270, due: 270, date: "2026-06-11", status: "Partially Paid" },
  { id: "3", number: "INV-2026-103", patientName: "Sara Khaled", patientAvatar: "SK", amount: 250, paid: 0, due: 250, date: "2026-06-09", status: "Pending" },
  { id: "4", number: "INV-2026-104", patientName: "Nour Ibrahim", patientAvatar: "NI", amount: 110, paid: 110, due: 0, date: "2026-06-07", status: "Paid" },
  { id: "5", number: "INV-2026-105", patientName: "Dina Tarek", patientAvatar: "DT", amount: 280, paid: 0, due: 280, date: "2026-05-30", status: "Overdue" },
  { id: "6", number: "INV-2026-106", patientName: "Huda Samir", patientAvatar: "HS", amount: 130, paid: 130, due: 0, date: "2026-06-06", status: "Paid" },
  { id: "7", number: "INV-2026-107", patientName: "Salma Riad", patientAvatar: "SR", amount: 60, paid: 60, due: 0, date: "2026-06-02", status: "Paid" },
  { id: "8", number: "INV-2026-108", patientName: "Karim Wael", patientAvatar: "KW", amount: 160, paid: 80, due: 80, date: "2026-06-04", status: "Partially Paid" },
];

export const beautyKpiCards: KpiCard[] = [
  { label: "Total Clients", value: "1,284", change: 9.4, changeLabel: "vs last month", icon: "Users", trend: "up" },
  { label: "Appointments", value: "132", change: 6.7, changeLabel: "vs last month", icon: "Calendar", trend: "up" },
  { label: "Revenue", value: "$36,900", change: 18.2, changeLabel: "vs last month", icon: "DollarSign", trend: "up" },
  { label: "Active Staff", value: "18", change: 1.5, changeLabel: "vs last month", icon: "UsersRound", trend: "up" },
];

export const beautyActivities: Activity[] = [
  { id: "1", user: "Layla Hassan", action: "checked in for", target: "Deep Cleansing Facial", time: "5 min ago", avatar: "LH" },
  { id: "2", user: "Farida Nabil", action: "completed", target: "Bridal Makeup", time: "15 min ago", avatar: "FN" },
  { id: "3", user: "Nour Ibrahim", action: "booked", target: "Relaxation Massage", time: "30 min ago", avatar: "NI" },
  { id: "4", user: "Dina Tarek", action: "paid invoice", target: "INV-2026-105", time: "1 hour ago", avatar: "DT" },
  { id: "5", user: "Reem Adib", action: "updated treatment plan for", target: "Mona Adel", time: "2 hours ago", avatar: "RA" },
  { id: "6", user: "Lina Habib", action: "registered new client", target: "Salma Riad", time: "3 hours ago", avatar: "LH" },
];
