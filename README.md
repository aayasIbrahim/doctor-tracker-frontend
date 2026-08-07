# 🩺 Healthcare Doctor-Patient Management Dashboard (Frontend)

A modern, responsive, and type-safe Administrative Dashboard built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. It integrates seamlessly with the backend API to manage doctors, patient assignments, and analytical insights.

---

## 🚀 Live Demo & Repository

- **Live Application:** [https://doctor-tracker-app.vercel.app/](https://doctor-tracker-app.vercel.app/)
- **Backend Repository:** [Doctor Tracker Backend API](https://github.com/aayasIbrahim/docter-tracker-backend)

---

## ✨ Features

- 🔐 **Secure Authentication:** JWT-based login, role-based page protection, and persistent session management using NextAuth / Middleware.
- 👨‍⚕️ **Doctor Management UI:** Data-tables with server-side pagination, search, and filtering by specialization.
- 🏥 **Patient Tracking & Assignment:** Interactive Modals and Forms to assign patients directly to specific doctors (`/doctors/:id/patients`).
- 📊 **Analytics Dashboard:** Visual charts (Bar, Area, Pie) powered by **Recharts** displaying real-time patient metrics and trends.
- 🎨 **Shadcn UI & Reusable Components:** Reusable confirmation dialogs, custom data tables, dynamic form inputs, and toast notifications (Sonner).
- ⚡ **Optimized Proxy Architecture:** Custom `next.config.ts` rewrites / proxy configuration to bypass CORS issues during local and production execution.
- 📱 **Fully Responsive:** Mobile-friendly sidebar navigation and adaptive grid layouts.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Lucide React Icons
- **UI Components:** shadcn/ui (Radix UI primitives)
- **State & Data Fetching:** React Hook Form, Native Fetch
- **Data Visualization:** Recharts
- **Notifications:** Sonner

---

## 🔑 Demo Credentials

Test the administrative features using the pre-configured credentials:

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@gmail.com` | `12345` | Full Access (CRUD Operations & Analytics) |

---

## 📁 Project Architecture & Key Components

```text
├── src/
│   ├── app/
│   │   ├── (authGroup)/                  # Authentication Routes (Login, Register, etc.)
│   │   │   └── login/
│   │   │
│   │   ├── (dashboardGroup)/             # Protected Administrative Dashboard Routes
│   │   │   ├── _actions/            # Server Actions specific to Dashboard (Doctors, Patients, Stats)
│   │   │   ├── _components/         # Dashboard-specific UI (Charts, Modals, Forms)
│   │   │   ├── doctors/             # Doctor Management Pages & Nested Patient List
│   │   │   ├── patients/            # Patient Management Pages
│   │   │   ├── stats/               # Analytics & Report Pages
│   │   │   └── layout.tsx           # Dashboard Layout with Sidebar & Header Navigation
│   │   │
│   │   ├── (publicGroup)/                # Publicly Accessible Pages (Landing Page, About, Contact)
│   │   │   ├── _components/         # Public Page Layout Components (Navbar, Footer, Hero)
│   │   │   └── page.tsx             # Root Home / Landing Page
│   │   │
│   │   ├── api/                     # Route Handlers / Proxies (if applicable)
│   │   ├── layout.tsx               # Root Application Layout & Providers
│   │   └── globals.css              # Global Tailwind Styles
│   │
│   ├── components/
│   │   ├── ui/                      # Primary shadcn/ui primitives (Button, Dialog, Table, Input)
│   │   └── shared/                  # Reusable Global Components (DeleteButton, LoadingSpinner, DataTables)
│   │
│   ├── lib/                         # Axios/Fetch Instances, API Wrappers, and Utilities (`utils.ts`)
│   ├── types/                       # TypeScript Interfaces matching Backend Models & Action Results
│   └── proxy.ts                # Route Guarding & JWT Authentication Verification