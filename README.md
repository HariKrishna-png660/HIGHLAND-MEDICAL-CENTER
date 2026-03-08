# Highland Medical Center

Highland Medical Center is a healthcare management platform designed to streamline patient consultations and hospital operations. This full-stack application provides a seamless experience for patients to find doctors, book appointments, and manage their health journey, while offering a robust administrative dashboard for hospital management.

## Features

- **Patient Portal**:
  - Interactive doctor discovery by department and specialty.
  - Real-time appointment scheduling and management.
  - Secure patient authentication (via NextAuth.js).
  - Integrated payment gateway (PayPal) for consultation fees.
- **Admin Dashboard**:
  - Comprehensive management of doctors, patients, and appointments.
  - Real-time analytics and reporting via interactive charts.
  - Banner and department management for site customization.
  - Staff leave management and scheduling configuration.

##  Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [PostgreSQL (Neon)](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **Payments**: [PayPal SDK](https://developer.paypal.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **State/Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## Project Setup

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon recommended)
- PayPal Developer account (for sandbox testing)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd highlandhospital
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="your-postgresql-url"
   AUTH_SECRET="your-auth-secret"
   PAYPAL_CLIENT_ID="your-paypal-client-id"
   PAYPAL_SECRET="your-paypal-secret"
   PAYPAL_API_BASE_URL="https://api-m.sandbox.paypal.com"
   APP_TIMEZONE="Asia/Kolkata"
   NEXT_PUBLIC_APP_NAME="Highland Medical Center"
   ```

4. **Database Initialization**:
   ```bash
   npx prisma generate
   npx prisma db push
   # Optional: Seed the database
   npm run seed 
   ```

5. **Run Development Server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (Atoms, Molecules, Organisms).
- `db/`: Database schema and seeding logic.
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and shared logic.
- `prisma/`: Prisma schema and migrations.
- `public/`: Static assets and images.

---
