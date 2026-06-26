

# Project MicroMint

<p align="center">
  <img src="public/MicromintLogo.svg#gh-light-mode-only" alt="MicroMint Logo" width="250" />
  <img src="public/MicromintLogo_dark.svg#gh-dark-mode-only" alt="MicroMint Logo" width="250" />
</p>

[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://project-micromint.vercel.app)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=yellow)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

**A global micro-task economy platform connecting earners with businesses**

[Live Demo](https://project-micromint.vercel.app) · [Report Bug](https://github.com/programmerjewel/MicroMint-frontend/issues) · [Request Feature](https://github.com/programmerjewel/MicroMint-frontend/issues)

</div>

---

## 📖 About The Project

MicroMint is a revolutionary micro-task economy platform that creates a fair, transparent ecosystem where individuals can earn money by completing simple tasks, and businesses can scale their operations with a global on-demand workforce.

## 🌟 Why MicroMint?

MicroMint is more than a task marketplace—it demonstrates how a modern React application can combine authentication, role-based authorization, reusable components, responsive design, and a virtual coin economy into a seamless user experience.

Highlights include:

- Multi-role dashboard
- Firebase Authentication
- JWT-secured API communication
- Virtual coin economy
- Notification system
- Advanced task filtering
- Responsive UI
- Modern React architecture


# Screenshots


## Home Page

![Home](https://i.ibb.co.com/J9P3fgH/Home-Page-Darkmode.png)

---

## Worker Dashboard

![Worker](https://i.ibb.co.com/TMQyXGnz/Worker-Dashboard-Dark.png)

---

## Buyer Dashboard

![Buyer](https://i.ibb.co.com/MyBTd89q/Buyer-Dashboard-Dark.png)

---

## Admin Dashboard

![Admin](https://i.ibb.co.com/HfspcnMw/Admin-Dashboard-Dark.png)

---



## ✨ Key Features

### 🎯 For Workers
- **Instant Settlements** - Tokens hit your balance immediately upon approval
- **Flexible Work Pool** - Choose from hundreds of micro-tasks matching your skills
- **Escrow Protection** - Smart contracts secure your payouts for every honest completion

### 🏢 For Buyers
- **High-Fidelity Consensus** - Multi-worker checks filter out bad submissions automatically
- **Rapid Verification** - Programmatic validation reduces processing to seconds
- **Targeted Routing** - Filter operations by location, demographics, or task ratings

### 🛡️ Platform Features
- **Simple Coin System** - No hidden fees, complete transparency
- **Anti-Fraud Architecture** - Automated verification layers ensure data accuracy
- **Ultra-Low Fees** - Minimal transaction overhead across local channels

---


# 👥 User Roles & Ecosystem Workflow

MicroMint is built around a simple yet effective ecosystem where **Buyers**, **Workers**, and **Admins** collaborate to complete microtasks efficiently. Buyers create opportunities, Workers complete them to earn rewards, and Admins ensure the platform remains secure and trustworthy.

## 👷 Worker — Complete Tasks & Earn Coins

Workers are the heart of the platform. They browse available tasks, complete them according to the provided instructions, and submit proof for review.

### What Workers Can Do

- 🔍 Browse and search available tasks
- 📄 View detailed task requirements
- ✍️ Submit proof of completion (text, screenshots, or links)
- 📊 Track submission status in real time
- 🪙 Earn coins for approved submissions
- 💸 Request withdrawals once the minimum balance is reached
- 🔔 Receive notifications for approvals, rejections, and withdrawal updates

---

## 💼 Buyer — Create & Manage Tasks

Buyers use their coin balance to create microtasks for the community. They review submitted work and reward workers whose submissions meet the task requirements.

### What Buyers Can Do

- 💰 Purchase coins to fund task campaigns
- ➕ Create new tasks with custom rewards and worker limits
- 📝 Edit or remove existing tasks
- 👀 Review worker submissions
- ✅ Approve valid submissions and reward workers
- ❌ Reject incomplete or invalid submissions
- 📜 View payment history and monitor task progress

---

## 👑 Admin — Manage the Platform

Admins oversee the overall health of the platform by managing users, monitoring tasks, and maintaining a fair ecosystem.

### What Admins Can Do

- 👥 Manage users and update their roles
- 📋 Monitor and manage all platform tasks
- 🗑️ Remove inappropriate tasks or accounts
- 💵 Review and approve worker withdrawal requests
- 📊 Monitor platform activity and statistics
- 🛡️ Help maintain a secure and trustworthy marketplace

---

# 🔄 How the MicroMint Ecosystem Works

The workflow is designed to be simple, transparent, and fair for everyone involved.

```text
💰 Buyer Purchases Coins
            │
            ▼
📝 Buyer Creates a Task
            │
            ▼
👷 Workers Browse Available Tasks
            │
            ▼
✅ Worker Completes Task
            │
            ▼
📤 Worker Submits Proof
            │
            ▼
👀 Buyer Reviews Submission
      ┌───────────────┐
      │               │
      ▼               ▼
✅ Approved       ❌ Rejected
      │               │
      ▼               ▼
🪙 Coins Added    Worker Can Improve & Retry
      │
      ▼
💸 Worker Requests Withdrawal
      │
      ▼
👑 Admin Reviews Request
      │
      ▼
🏦 Withdrawal Approved
```

---
## 🪙 Coin Economy

MicroMint operates on a virtual coin-based economy that powers every transaction across the platform. Coins are used to create tasks, reward workers, and process withdrawals, ensuring a simple and transparent workflow for all users.

| Action | Coin Flow |
| :----- | :-------- |
| 💰 Buyer purchases coins | ➕ Coins are added to the buyer's wallet |
| 📝 Buyer creates a task | ➖ Coins are reserved for task rewards |
| ✅ Worker completes an approved task | ➕ Coins are credited to the worker's wallet |
| 💸 Worker submits a withdrawal request | ⏳ Withdrawal request is submitted for admin review |
| ✔️ Admin approves the withdrawal | ➖ Coins are deducted from the worker's wallet |

### 💡 Current Coin Conversion

The platform currently uses the following conversion rates:

- **10 Coins = $1 USD** *(Buyer coin purchase rate)*
- **20 Coins = $1 USD** *(Worker withdrawal rate)*

> **⚠️ Disclaimer:** The above conversion rates are the current values used within MicroMint and are **subject to change**. Future adjustments may be made based on market conditions, currency exchange rates, platform operating costs, payout commission policies, or other business considerations to ensure the long-term sustainability and fairness of the platform.

This virtual coin economy provides a transparent, scalable, and sustainable reward system that benefits Buyers, Workers, and the overall MicroMint ecosystem.

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2** - Modern UI library with latest features
- **Vite 7.2** - Lightning-fast build tool and dev server
- **React Router DOM 7** - Client-side routing

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - Accessible component primitives
- **React Icons** - Beautiful & consistent icons
- **GSAP** - Professional-grade animations
- **Lenis** - Smooth scrolling experience

### State & Data Management
- **TanStack React Query** - Powerful async state management
- **Axios** - HTTP client for API calls
- **React Hook Form** - Performant form handling

### Authentication & Backend
- **Firebase** - Authentication and backend services
- **JWT** - Secure token-based authentication

### Additional Libraries
- **Sonner** - Toast notifications
- **Embla Carousel** - Carousel component
- **Swiper** - Touch slider
- **React Fast Marquee** - Scrolling text/elements

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps

## 📁 Project Structure

```text
micromint-frontend/
├── public/                 # Static assets (SVGs, logos, illustrations)
├── src/
│   ├── assets/             # Project-specific images and global assets
│   ├── components/         # Reusable UI parts & feature components
│   │   ├── features/       # Role-specific dashboard layouts (Admin, Buyer, Worker)
│   │   ├── shared/         # Globally used UI elements (Modals, Dropdowns, Badges)
│   │   ├── ui/             # Atomic components (Shadcn/Tailwind primitives)
│   │   ├── login-form.jsx
│   │   └── signup-form.jsx
│   ├── context/            # React Context Providers (Auth, Theme)
│   ├── firebase/           # Firebase initialization configurations
│   ├── hooks/              # Custom React hooks (useAuth, useRole, useAxiosSecure, useCoin, etc.)
│   ├── layouts/            # Base route wrapper layouts (Main, Dashboard)
│   ├── lib/                # Standard utility bindings (Shadcn helpers)
│   ├── pages/              # Primary route views
│   │   ├── dashboard/      # Protected dashboards for Workers, Buyers, and Admins
│   │   └── public/         # Accessible general pages (Home, About, Legal, Auth views)
│   ├── routes/             # App routing rules, PrivateRoutes, and RoleGuards
│   ├── utils/              # Helper functions (Image uploading utilities)
│   ├── index.css           # Global Stylesheets (Tailwind directives)
│   └── main.jsx            # Application entry point
├── components.json         # Shadcn UI configuration file
├── eslint.config.js        # Linter rules
├── jsconfig.json           # Module path resolution paths
├── package.json            # Manifest file managing dependencies and scripts
├── vercel.json             # Vercel deployment instructions
└── vite.config.js          # Vite build engine configurations
```

⚙️ Local Development Installation
---------------------------------

Follow these steps to configure your local development environment:

**Clone the Repository**

```bash
git clone https://github.com/programmerjewel/micromint-frontend.git
cd micromint-frontend  
```

**Install Project Dependencies**

```bash 
npm install   
```

## 🔑 Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```bash
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket 
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id
VITE_API_URL=http://localhost:3000
VITE_IMGBB_API=your_imgbb_API
VITE_WITHDRAW_COIN_TO_DOLLAR_RATE=your_withdrawable_coin_to_dollar_rate
```

**Start the development server**

```bash
npm run dev
```


## 🌍 Public Pages

Accessible to all visitors without authentication.

| Page | Description |
|------|-------------|
| 🏠 Home | Landing page featuring hero banner, top workers, testimonials, and platform highlights |
| ℹ️ About | Overview of the MicroMint platform and its mission |
| 📞 Contact | Contact information and support page |
| 🔒 Privacy Policy | Privacy policy and data handling practices |
| 📜 Terms of Service | Platform terms and conditions |
| 👤 Profile | View and manage user profile |
| 🔑 Login | Authenticate using Email/Password or Google |
| 📝 Register | Create a new Worker or Buyer account |
| 🔄 Forgot Password | Request a password reset email |
| 🔐 Reset Password | Create a new password securely |
| ❌ Error Page | Custom error page for invalid routes |

---

## 👷 Worker Dashboard

Designed for users who complete microtasks and earn coins.

- 📊 Dashboard Overview
- 📋 Browse Available Tasks
- 📄 Task Details & Submission
- 📑 My Submissions
- 💰 Withdraw Earnings
- 👤 Profile Management

---

## 💼 Buyer Dashboard

Designed for users who create and manage microtasks.

- 📊 Dashboard Overview
- ➕ Add New Task
- 📂 Manage My Tasks
- 💳 Purchase Coins
- 📜 Payment History
- 👤 Profile Management

---

## 👑 Admin Dashboard

Provides administrative tools to manage the entire platform.

- 📊 Dashboard Overview
- 👥 Manage Users
- 📋 Manage Tasks
- 👤 Profile Management

---

# 🎯 Navigation Experience

MicroMint uses two primary layouts to deliver a clean and intuitive user experience.

### 🌐 Main Layout

The public-facing layout includes:

- Responsive Navigation Bar
- Public Pages
- Authentication Pages
- Footer
- Error Handling

### 📊 Dashboard Layout

The authenticated dashboard provides:

- Role-Based Sidebar Navigation
- User Profile & Coin Balance
- Notification Center
- Dashboard Content Area
- Responsive Dashboard Interface


---

# 🛣 Application Routing

MicroMint uses **React Router DOM v7** with a nested routing architecture. Public pages are rendered through the **Main Layout**, while authenticated users access a dedicated **Dashboard Layout** with role-based route protection.

---

## 🌍 Public Routes

Accessible without authentication.

| Route | Description |
|--------|-------------|
| `/` | Landing / Home Page |
| `/about` | About MicroMint |
| `/contact` | Contact Information |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/login` | User Login |
| `/register` | User Registration |
| `/forget-password` | Password Recovery |
| `/reset-password` | Reset Password |
| `/profile` | Public User Profile |

---

## 🔒 Protected Dashboard

All dashboard routes require authentication via **PrivateRoutes**.

```
/dashboard
```

If no child route is specified, users are automatically redirected to their role-specific dashboard using `DashboardIndexRedirect`.

---

## 👷 Worker Routes

Accessible only to users with the **Worker** role.

| Route | Description |
|--------|-------------|
| `/dashboard/worker-home` | Worker Dashboard |
| `/dashboard/task-list` | Browse Available Tasks |
| `/dashboard/tasks/:id` | Task Details & Submission |
| `/dashboard/my-submissions` | Submission History |
| `/dashboard/withdrawals` | Withdraw Earnings |
| `/dashboard/profile` | User Profile |

---

## 💼 Buyer Routes

Accessible only to users with the **Buyer** role.

| Route | Description |
|--------|-------------|
| `/dashboard/buyer-home` | Buyer Dashboard |
| `/dashboard/add-task` | Create a New Task |
| `/dashboard/tasks` | Manage Created Tasks |
| `/dashboard/purchase-coins` | Purchase Coins |
| `/dashboard/payments` | Payment History |
| `/dashboard/profile` | User Profile |

---

## 👑 Admin Routes

Accessible only to users with the **Admin** role.

| Route | Description |
|--------|-------------|
| `/dashboard/admin-home` | Admin Dashboard |
| `/dashboard/manage-users` | Manage Platform Users |
| `/dashboard/manage-tasks` | Manage All Tasks |
| `/dashboard/profile` | User Profile |

---

# 🔐 Route Protection

MicroMint implements a layered route protection strategy to ensure secure access control.

### 🛡 PrivateRoutes

All dashboard pages are protected using `PrivateRoutes`.

**Responsibilities:**

- Prevents unauthenticated access
- Verifies user authentication
- Redirects guests to the Login page

---

### 👤 RoleGuard

After authentication, `RoleGuard` authorizes access based on the user's role.

Supported roles:

- 👷 Worker
- 💼 Buyer
- 👑 Admin

Users attempting to access unauthorized pages are redirected appropriately, ensuring that each dashboard remains isolated to its intended user role.

---

# 📂 Routing Hierarchy

```text
/
├── Home
├── About
├── Contact
├── Privacy Policy
├── Terms of Service
├── Login
├── Register
├── Forget Password
├── Reset Password
├── Profile
│
└── Dashboard (Protected)
    │
    ├── Profile
    │
    ├── Worker
    │   ├── Home
    │   ├── Task List
    │   ├── Task Details
    │   ├── My Submissions
    │   └── Withdrawals
    │
    ├── Buyer
    │   ├── Home
    │   ├── Add Task
    │   ├── My Tasks
    │   ├── Purchase Coins
    │   └── Payment History
    │
    └── Admin
        ├── Home
        ├── Manage Users
        └── Manage Tasks
```

---

# ⚡ Routing Features

- ✅ Nested Routes using React Router DOM v7
- 🔒 Protected Dashboard Layout
- 👥 Role-Based Route Authorization
- 🔄 Automatic Dashboard Redirection
- 🧩 Shared Layouts for Public & Dashboard Pages
- 🚫 Custom Error Handling
- 🔑 Dynamic Route Parameters (`/dashboard/tasks/:id`)
- 📱 Clean and scalable routing architecture


# 🎯 State Management

MicroMint combines several modern state management techniques.

| Tool | Purpose |
|------|----------|
| Context API | Authentication & global user state |
| TanStack Query | Server state management |
| React State | Component-level state |
| React Hook Form | Form handling |
| Local Storage | Theme & preferences |

---

# 🌐 API Communication

The frontend communicates with the backend using Axios.

Two Axios instances are configured:

- **axios** – Public API requests
- **axiosSecure** – Protected API requests with automatic JWT handling

This separation simplifies API management and ensures secure communication.

---

# 🔄 Data Fetching

MicroMint uses **TanStack Query** for efficient server-state management.

Benefits include:

- Automatic caching
- Background refetching
- Loading states
- Error handling
- Request deduplication
- Optimistic UI updates
- Automatic retries

---

# 🖼 Image Upload

Images are uploaded using the ImgBB API.

Supported uploads:

- User profile picture
- Task thumbnail image

Uploaded image URLs are stored and displayed throughout the application.

---

# 📱 Responsive Design

The UI is optimized for multiple screen sizes.

| Device | Supported |
|---------|-----------|
| Mobile | ✅ |
| Tablet | ✅ |
| Laptop | ✅ |
| Desktop | ✅ |

---

# ✨ User Experience Features

- Animated Hero Section
- Interactive Dashboard
- Toast Notifications
- Confirmation Dialogs
- Skeleton loading on selected sections
- Pagination for all tasks page
- Search & Filtering on all tasks page
- Form Validation
- Protected Navigation
- Dynamic Role-Based Menus
- Floating Notification Panel
- Modern Cards & Tables



# 🤝 Contributing

Contributions, feature suggestions, and bug reports are always welcome!

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push to your branch.

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request.

---

# 🐛 Found a Bug?

If you encounter any issues or have suggestions for improvements, please feel free to open an issue in this repository.

---

# 📬 Contact

**Programmer Jewel**

💼 LinkedIn: https://linkedin.com/in/alaminjewel

📧 Email: jewelprograms@gmail.com

🐙 GitHub: https://github.com/programmerjewel

---

# ⭐ Support the Project

If you found this project helpful or inspiring, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates further development.

---


📝 License
----------

Distributed under the **ISC License**. See package.json for details.

---



<div align="center">

### 🌟 If you like this project, don't forget to leave a star!

Made with ❤️ by **Programmer Jewel**

© 2026 MicroMint. All Rights Reserved.

</div>