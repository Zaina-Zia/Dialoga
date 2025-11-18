# Image to SVG Conversion Reference

This document lists all image file references in the codebase that need to be converted to SVG.

## 📋 Summary
- **Total image references:** 48
- **Unique image files:** 12

---

## 🖼️ Image Files to Convert

### 1. `/images/logo.jpg` (Main Logo - Mobile)
Used in: Login, Verify Email, Forgot Password

### 2. `/images/Logo_bg_removed.png` (Logo - Desktop Headers)
Used in: Headers, Reset Password, Forgot Password Desktop

### 3. `/images/DesktopLogo.png` (Large Desktop Logo)
Used in: Login Desktop (left side)

### 4. `/images/Dashboard_Home/accountCircle.png` (User Avatar)
Used in: Chat, Admin Panel, Dashboard Messages

### 5. `/images/Dashboard_Home/mensajes.png` (Messages Icon)
Used in: Dashboard Tasks

### 6. `/images/Dashboard_Home/envio.png` (Shipping Icon)
Used in: Dashboard Tasks, Customer Categories

### 7. `/images/Dashboard_Home/visitas.png` (Store Visits Icon)
Used in: Dashboard Tasks, Customer Categories

### 8. `/images/Dashboard_Home/CustomerCategories/interesado.png` (Interested Icon)
Used in: Dashboard, Customer Categories

### 9. `/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png` (Info Only Icon)
Used in: Dashboard, Customer Categories

### 10. `/images/Dashboard_Home/CustomerCategories/noIntersado.png` (Not Interested Icon)
Used in: Dashboard, Customer Categories

### 11. `/images/Dashboard_Home/CustomerCategories/closed.png` (Closed Icon)
Used in: Dashboard, Customer Categories

---

## 📝 Detailed File-by-File Reference

### **src/app/(auth)/login/page.tsx**

**Line 66:** Mobile Logo
```tsx
<img src="/images/logo.jpg" alt="Dialoga" width={214} height={56} className="w-[214px] h-[56px] object-contain" />
```

**Line 106:** Desktop Large Logo
```tsx
<img src="/images/DesktopLogo.png" alt="Dialoga" width={451} height={451} className="max-w-[90%] max-h-[90%] object-contain" />
```

**Line 116:** Desktop Form Logo
```tsx
<img src="/images/logo.jpg" alt="Dialoga" width={214} height={57} className="w-[214px] h-[57px] object-contain" />
```

---

### **src/app/(auth)/verify-email/page.tsx**

**Line 43:** Mobile Logo
```tsx
src="/images/logo.jpg"
```

**Line 97:** Desktop Header Logo
```tsx
src="/images/Logo_bg_removed.png"
```

**Line 115:** Desktop Form Logo
```tsx
src="/images/logo.jpg"
```

---

### **src/app/(auth)/forgot-password/page.tsx**

**Line 49:** Mobile Logo
```tsx
<img src="/images/logo.jpg" alt="Dialoga" width={214} height={56} className="w-[214px] h-[56px] object-contain" />
```

**Line 79:** Desktop Header Logo
```tsx
<img src="/images/Logo_bg_removed.png" alt="Dialoga" width={232} height={65} className="w-[232px] h-[65px] object-contain" />
```

**Line 93:** Desktop Form Logo
```tsx
<img src="/images/logo.jpg" alt="Dialoga" width={214} height={57} className="w-[214px] h-[57px] object-contain" />
```

---

### **src/app/(auth)/reset-password/page.tsx**

**Line 59:** Mobile Logo
```tsx
<img src="/images/Logo_bg_removed.png" alt="Dialoga" width={214} height={56} className="w-[214px] h-[56px] object-contain" />
```

**Line 108:** Desktop Header Logo
```tsx
<img src="/images/Logo_bg_removed.png" alt="Dialoga" width={232} height={65} className="w-[232px] h-[65px] object-contain" />
```

**Line 122:** Desktop Form Logo
```tsx
<img src="/images/Logo_bg_removed.png" alt="Dialoga" width={214} height={57} className="w-[214px] h-[57px] object-contain" />
```

---

### **src/components/dashboard/DashboardHeader.tsx**

**Line 44:** Mobile Header Logo
```tsx
src="/images/Logo_bg_removed.png"
```

---

### **src/components/dashboard/DesktopHeader.tsx**

**Line 38:** Desktop Header Logo
```tsx
src="/images/Logo_bg_removed.png"
```

---

### **src/app/dashboard/page.tsx**

**Line 23:** Messages Task Icon
```tsx
iconSrc: "/images/Dashboard_Home/mensajes.png"
```

**Line 24:** Shipping Task Icon
```tsx
iconSrc: "/images/Dashboard_Home/envio.png"
```

**Line 25:** Store Visits Task Icon
```tsx
iconSrc: "/images/Dashboard_Home/visitas.png"
```

**Line 30:** Interested Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/CustomerCategories/interesado.png"
```

**Line 31:** Store Visits Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/visitas.png"
```

**Line 32:** Shipping Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/envio.png"
```

**Line 34:** Info Only Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png"
```

**Line 35:** Not Interested Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/CustomerCategories/noIntersado.png"
```

**Line 36:** Closed Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/CustomerCategories/closed.png"
```

---

### **src/app/dashboard/DashboardDesktop.tsx**

**Line 12:** Messages Task Icon
```tsx
iconSrc: "/images/Dashboard_Home/mensajes.png"
```

**Line 20:** Shipping Task Icon
```tsx
iconSrc: "/images/Dashboard_Home/envio.png"
```

**Line 28:** Store Visits Task Icon
```tsx
iconSrc: "/images/Dashboard_Home/visitas.png"
```

**Line 36:** Interested Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/CustomerCategories/interesado.png"
```

**Line 37:** Store Visits Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/visitas.png"
```

**Line 38:** Shipping Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/envio.png"
```

**Line 39:** Info Only Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png"
```

**Line 40:** Not Interested Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/CustomerCategories/noIntersado.png"
```

**Line 41:** Closed Category Icon
```tsx
iconSrc: "/images/Dashboard_Home/CustomerCategories/closed.png"
```

**Line 111:** User Avatar
```tsx
<img src="/images/Dashboard_Home/accountCircle.png" alt="avatar" className="h-[29px] w-[29px] object-contain" />
```

---

### **src/components/dashboard/CustomerCategories.tsx**

**Line 81:** Interested Category Icon
```tsx
imageSrc: '/images/Dashboard_Home/CustomerCategories/interesado.png'
```

**Line 88:** Shipping Category Icon
```tsx
imageSrc: '/images/Dashboard_Home/envio.png'
```

**Line 95:** Store Visits Category Icon
```tsx
imageSrc: '/images/Dashboard_Home/visitas.png'
```

**Line 102:** Info Only Category Icon
```tsx
imageSrc: '/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png'
```

**Line 109:** Not Interested Category Icon
```tsx
imageSrc: '/images/Dashboard_Home/CustomerCategories/noIntersado.png'
```

**Line 116:** Closed Category Icon
```tsx
imageSrc: '/images/Dashboard_Home/CustomerCategories/closed.png'
```

---

### **src/components/dashboard/MessageItem.tsx**

**Line 10:** Default Avatar (in function parameter)
```tsx
avatarSrc = "/images/Dashboard_Home/accountCircle.png"
```

---

### **src/app/(dashboard)/chat/page.jsx**

**Line 223:** User Avatar
```tsx
src="/images/Dashboard_Home/accountCircle.png"
```

---

### **src/components/admin/AdminPanelDialoga.tsx**

**Line 62:** User Avatar
```tsx
<img src="/images/Dashboard_Home/accountCircle.png" alt="avatar" className="w-[29px] h-[29px] object-contain" />
```

---

### **src/app/(dashboard)/old-closed-customers/page.jsx**

**Line 30:** Interested Category Icon
```tsx
imageSrc: "/images/Dashboard_Home/CustomerCategories/interesado.png"
```

**Line 31:** Shipping Category Icon
```tsx
imageSrc: "/images/Dashboard_Home/envio.png"
```

**Line 32:** Store Visits Category Icon
```tsx
imageSrc: "/images/Dashboard_Home/visitas.png"
```

**Line 33:** Info Only Category Icon
```tsx
imageSrc: "/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png"
```

**Line 34:** Not Interested Category Icon
```tsx
imageSrc: "/images/Dashboard_Home/CustomerCategories/noIntersado.png"
```

**Line 35:** Closed Category Icon
```tsx
imageSrc: "/images/Dashboard_Home/CustomerCategories/closed.png"
```

---

## 🔄 Conversion Instructions

1. Replace all `.jpg` and `.png` extensions with `.svg` in the paths above
2. Update the `src` attributes to point to the new SVG files
3. You may want to remove `width` and `height` attributes for SVGs (or keep them for sizing)
4. Consider using `className` for responsive sizing instead of fixed dimensions

---

## ✅ Quick Find & Replace Guide

### Replace these patterns:

1. **Logo files:**
   - `/images/logo.jpg` → `/images/logo.svg`
   - `/images/Logo_bg_removed.png` → `/images/Logo_bg_removed.svg`
   - `/images/DesktopLogo.png` → `/images/DesktopLogo.svg`

2. **Dashboard icons:**
   - `/images/Dashboard_Home/mensajes.png` → `/images/Dashboard_Home/mensajes.svg`
   - `/images/Dashboard_Home/envio.png` → `/images/Dashboard_Home/envio.svg`
   - `/images/Dashboard_Home/visitas.png` → `/images/Dashboard_Home/visitas.svg`
   - `/images/Dashboard_Home/accountCircle.png` → `/images/Dashboard_Home/accountCircle.svg`

3. **Category icons:**
   - `/images/Dashboard_Home/CustomerCategories/interesado.png` → `/images/Dashboard_Home/CustomerCategories/interesado.svg`
   - `/images/Dashboard_Home/CustomerCategories/soloPriceinfo.png` → `/images/Dashboard_Home/CustomerCategories/soloPriceinfo.svg`
   - `/images/Dashboard_Home/CustomerCategories/noIntersado.png` → `/images/Dashboard_Home/CustomerCategories/noIntersado.svg`
   - `/images/Dashboard_Home/CustomerCategories/closed.png` → `/images/Dashboard_Home/CustomerCategories/closed.svg`

---

**Note:** After conversion, test all pages to ensure SVGs render correctly and maintain proper sizing.

