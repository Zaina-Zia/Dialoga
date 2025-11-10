# Dialoga 

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** TypeScript (with some `.jsx` files)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **Icons:** Lucide React
- **State Management:** Zustand (installed, available for future use)
- **Build Tool:** Next.js Turbopack

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

## Live Preview Link
vercel : https://dialoga-xi.vercel.app/login

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dialoga
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication & User Roles

### Admin Access

**To access the Admin Panel:**
- **Email:** `admin@example.com`
- **Password:** Any non-empty password

When you log in with `admin@example.com`, you'll be redirected to the Admin Panel Dashboard (`/admin-panel-page`) instead of the regular dashboard.

### Regular Users

Any other email address will grant access to the standard Company User Dashboard (`/dashboard`).

### Authentication Pages

- **Login** (`/login`) - Email/password authentication
- **Register** (`/register`) - User registration form
- **Forgot Password** (`/forgot-password`) - Password recovery
- **Reset Password** (`/reset-password`) - Set new password
- **Verify Email** (`/verify-email`) - OTP verification (6-digit code)

## 🗺️ Navigation Guide

### Main Dashboard Routes

#### Regular User Dashboard (`/dashboard`)
- **Your Tasks Section:**
  - **Mensajes** → `/chat` - View and manage conversations
  - **Envío** → `/inventory` - Manage product inventory
  - **Visitas a la tienda** → `/customer-categories` - View customer categories

- **Mensajes Section** → `/chat` - Quick access to chat page

- **Customer Categories Section** → `/customer-categories` - View all customer categories

- **Inventory Link** → `/inventory` - Product management

- **Profile Link** → `/profile` - User profile and payment methods

#### Admin Panel Dashboard (`/admin-panel-page`)
Accessible only when logged in as `admin@example.com`

- **Your Tasks Section:**
  - **Mensajes** → `/chat` - View conversations
  - **Envío** → `/inventory` - Manage inventory
  - **Visitas a la tienda** → `/customer-categories` - Customer categories

- **Mensajes Section** → `/chat` - Chat interface

- **Customer Categories Section** → `/customer-categories` - Customer management

- **Super-Admin Panel** → `/admin-panel-dialoga` - Full admin controls

### Feature Pages

#### Chat (`/chat`)
- Real-time chat interface with message bubbles
- Typing indicators
- Message history with timestamps
- Image/media sending support
- Search functionality
- Mobile and desktop responsive layouts

#### Inventory (`/inventory`)
- Product list view (grid layout)
- **Create Product** (`/inventory/create`) - Add new products
- **Edit Product** (`/inventory/[id]/edit`) - Modify existing products
- Image upload (max 3 images per product)
- Image reordering
- Product details: Name, Description, Price, Images, Category

#### Profile (`/profile`)
- **Profile Information:**
  - Edit user name, email, phone
  - Save profile changes

- **Payment Methods:**
  - View saved payment methods
  - Add new payment method
  - Edit existing payment method
  - Delete payment method
  - Card details: Number, Expiry, CVV, Name, Billing Address

#### Customer Categories (`/customer-categories`)
- View all customer categories
- Category cards with icons
- Accordion view for category details
- Categories: Interesado, Visitas a la tienda, Envío, Solo Pide Info, No Interesado, Closed

#### Old/Closed Customers (`/old-closed-customers`)
- View closed customer records
- Historical customer data

### Admin Panel Routes

#### Super-Admin Panel (`/admin-panel-dialoga`)
Accessible from Admin Panel Dashboard

- **Companies Management:**
  - View all companies
  - Create new company
  - Edit existing company
  - Delete company
  - Toggle company status (Active/Paused)
  - Company fields: Name, User Email, Phone, API Token, Status

- **Messaging Providers** (`/admin-panel-dialoga/messaging-providers`)
  - Configure messaging service providers
  - Add/Edit/Delete providers
  - Provider fields: Name, API Key, Endpoint URL, Status

- **AI Providers** (`/admin-panel-dialoga/ai-providers`)
  - Configure AI service providers
  - Add/Edit/Delete providers
  - Provider fields: Name, API Key, Endpoint URL, Status

## ✨ Key Features

### ✅ Implemented Features

1. **Authentication System**
   - Login, Register, Forgot/Reset Password
   - Email verification with OTP
   - Role-based routing (Admin vs. Regular User)

2. **Dashboard**
   - Mobile-first responsive design
   - Task statistics cards
   - Quick access to key features
   - Notification and logout overlays

3. **Chat Interface**
   - Message bubbles with animations
   - Typing indicators
   - Message history persistence (localStorage)
   - Simulated real-time messaging
   - Image/media attachment support
   - Search functionality

4. **Inventory Management**
   - Full CRUD operations (Create, Read, Update, Delete)
   - Product list with grid view
   - Image upload (max 3 per product)
   - Image reordering
   - Form validation
   - Loading states

5. **Profile & Payments**
   - Profile information editing
   - Payment method management
   - Add/Edit/Delete payment methods
   - Form validation
   - Success toast notifications

6. **Customer Categories**
   - Category visualization
   - Accordion view
   - Category filtering

7. **Admin Panel**
   - Company management (CRUD)
   - Status toggling (Active/Paused)
   - Messaging Providers configuration
   - AI Providers configuration
   - Admin-only access control

8. **Animations**
   - Framer Motion integration
   - Button press feedback
   - Overlay transitions (fade/slide)
   - Message bubble animations
   - Staggered list animations
   - Toast notifications

9. **Responsive Design**
   - Mobile-first approach
   - Breakpoint: `lg` (1024px)
   - Mobile artboard: 390px width
   - Desktop max-width: 1512px

10. **Data Persistence**
    - localStorage for client-side data
    - Chat messages
    - Products/Inventory
    - Payment methods
    - User profile
    - Admin companies
    - Provider configurations

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify-email/
│   ├── (dashboard)/         # Protected dashboard routes
│   │   ├── chat/
│   │   ├── inventory/
│   │   │   ├── create/
│   │   │   └── [id]/edit/
│   │   ├── profile/
│   │   ├── customer-categories/
│   │   ├── admin-panel-page/
│   │   └── admin-panel-dialoga/
│   │       ├── messaging-providers/
│   │       └── ai-providers/
│   ├── dashboard/            # Main dashboard
│   └── page.tsx              # Root redirect to /login
├── components/
│   ├── admin/                # Admin panel components
│   ├── auth/                 # Authentication components
│   ├── chat/                 # Chat UI components
│   ├── dashboard/            # Dashboard components
│   ├── inventory/            # Inventory components
│   ├── payments/             # Payment components
│   ├── notifications/        # Notification overlay
│   ├── overlays/             # Modal overlays
│   └── ui/                   # Reusable UI components
├── mocks/                    # JSON fixture files
│   ├── companies.json
│   ├── products.json
│   ├── conversations.json
│   └── users.json
└── constants/                # Constants and mock data
```


## 📝 Notes

- **Data Persistence:** All data is stored in `localStorage` (client-side only). No backend API is currently integrated.
- **Simulated Backend:** Form submissions use `setTimeout` to simulate API delays and show loading states.
- **TypeScript:** Most files use TypeScript, but some components still use `.jsx` for compatibility.
- **Responsive Design:** The application is designed mobile-first with a breakpoint at 1024px (`lg`).

## 🔧 Development

### Adding New Features

1. Create components in `src/components/[feature-name]/`
2. Add routes in `src/app/(dashboard)/[feature-name]/`
3. Use `localStorage` for data persistence (client-side)
4. Add animations with Framer Motion
5. Follow the existing responsive design patterns

### Code Style

- Use TypeScript where possible
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Implement mobile-first responsive design
- Add loading states for async operations
- Use toast notifications for user feedback


