# Dialoga

Dialoga is a responsive web application for managing customer conversations, inventory, and company administration. It is designed to work smoothly on both desktop and mobile, closely matching the provided Figma layouts.

## Live Demo

- Vercel: https://dialoga-xi.vercel.app/login

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (with a few `.jsx` components)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## Prerequisites

To run this project locally, you will need:

- **A computer with**:
  - Windows, macOS, or Linux
  - A modern web browser (Chrome, Edge, Firefox, or Safari)

- **Visual Studio Code (VS Code)**  
  This is the recommended editor to open and run the project.

  **How to install VS Code:**
  1. Go to: https://code.visualstudio.com
  2. Download the installer for your operating system.
  3. Run the installer and follow the steps (you can keep the default options).

- **Node.js (version 18 or higher)**  
  Node.js is required to run the development server and install dependencies.

  **How to install Node.js:**
  1. Go to the official website: https://nodejs.org
  2. Download the **LTS** version for your operating system.
  3. Run the installer and follow the steps (you can keep the default options).
  4. After installation, open a terminal / command prompt and run:
     ```bash
     node -v
     ```
     You should see a version number like `v18.x.x` or higher.

- **A package manager** (one of the following):
  - **npm** – comes automatically with Node.js (recommended)
  - **Yarn** – optional, install with:
    ```bash
    npm install -g yarn
    ```
  - **pnpm** – optional, install with:
    ```bash
    npm install -g pnpm
    ```

- **Git (to download the source code)**  
  If you don’t already have Git installed:

  1. Go to: https://git-scm.com/downloads  
  2. Download the installer for your operating system.  
  3. Run the installer and keep the default options.  
  4. To verify, open a terminal / command prompt and run:
     ```bash
     git --version
     ```

No external database or backend service is required. All data is stored in the browser using `localStorage`.

---

## Getting Started (Run Locally)

Follow these steps to run the app on your machine:

1. **Clone the repository (once)**

   In any terminal (Command Prompt / PowerShell / macOS Terminal), run:

   ```bash
   git clone https://github.com/Zaina-Zia/Dialoga.git
   cd dialoga
   ```

2. **Open the project in VS Code**

   - Open **Visual Studio Code**.
   - Click **File → Open Folder…**.
   - Select the `dialoga` folder you just cloned.

3. **Open the integrated terminal in VS Code**

   - In VS Code, go to **View → Terminal** (or press **Ctrl + `**).
   - Make sure the terminal path is inside the `dialoga` folder. If not, run:
     ```bash
     cd dialoga
     ```

4. **Install dependencies**

   Using **npm** (recommended):

   ```bash
   npm install
   ```

   Or, if you prefer:

   ```bash
   # yarn
   yarn install

   # pnpm
   pnpm install
   ```

5. **Start the development server**

   In the VS Code terminal, run:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open the application in your browser**

   Once the server is running, open:

   - http://localhost:3000

   The app will start on the login page.

---

## Test Accounts & Access

The app uses a simple, demo-style authentication system with two main roles.

### Super Admin

- **Email:** `superadmin@example.com`  / `admin@example.com` 
- **Password:** Any **non-empty** string (e.g. `123456`)

**What this user sees:**

- Super admin panel and management screens
- Access separated from regular company user features

### Company User

- **Email:** `company@example.com`  
  (or any email address other than `superadmin@example.com`)
- **Password:** Any **non-empty** string

**What this user sees:**

- Main dashboard
- Chat / Messages
- Inventory
- Customer categories (old/closed customers in closed)
- Profile & payments



---

## Main Features (Overview)

- **Responsive Dashboard**
  - Mobile-first design
  - Optimized for 390px width on mobile and up to 1512px on desktop

- **Chat / Messages**
  - Chat-like interface with message bubbles
  - Messages stored locally in the browser

- **Inventory Management**
  - Create, edit, and delete products
  - Support for up to 3 images per product
  - Data persisted via `localStorage`

- **Customer Categories**
  - Categories such as: Interesado, Visitas a la tienda, Envío, Solo Pide Info, No Interesado, Closed
  - Accordion-style layout for viewing category details
  - Separate “Old/Closed Customers” view

- **Profile & Payments**
  - Update basic profile information
  - Manage payment methods (add / edit / delete)

- **Admin Panel**
  - Manage companies (create, edit, delete, toggle status)
  - Manage messaging and AI provider configurations (mock data)

---

## Technical Notes

- **Data Storage:**  
  - All data (chat, inventory, customers, companies, providers, etc.) is stored in **`localStorage` only**.  
  - There is **no external database or backend API**; all behavior is simulated on the client side.

- **Routing:**  
  - Built with **Next.js App Router** under `src/app`.
  - Separate groups for authentication and dashboard routes.

- **Styling & Layout:**  
  - Tailwind CSS 4 for layout and spacing.
  - Layouts closely follow the provided Figma designs for both desktop and mobile.

---
