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
- **State & Data Fetching:** React Hook Form, Zod Validation, Axios / Native Fetch
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
│   ├── app/                  # Next.js App Router (Dashboard, Doctors, Patients, Stats)
│   ├── components/
│   │   ├── ui/               # Primary shadcn/ui components (Button, Dialog, Table, etc.)
│   │   ├── shared/           # Reusable UI (Sidebar, Header, DeleteButton, DataTable)
│   │   └── dashboard/        # Analytics & Chart components
│   ├── lib/                  # Axios instance, API helpers, utility functions
│   ├── types/                # TypeScript interfaces matching backend models
│   └── middleware.ts         # Authentication & Route Protection