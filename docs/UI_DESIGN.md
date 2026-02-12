# UI/UX Design - IMS

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;  /* Main brand color */
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-500: #6b7280;
--gray-700: #374151;
--gray-900: #111827;

/* Semantic Colors */
--success: #10b981;  /* Green for stock in, success states */
--warning: #f59e0b;  /* Orange for low stock alerts */
--error: #ef4444;    /* Red for stock out, errors */
--info: #3b82f6;     /* Blue for informational messages */
```

### Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'Fira Code', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing

```css
/* Spacing Scale (Tailwind-based) */
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-12: 3rem;    /* 48px */
```

### Border Radius

```css
--radius-sm: 0.25rem;  /* 4px */
--radius-md: 0.5rem;   /* 8px */
--radius-lg: 0.75rem;  /* 12px */
--radius-full: 9999px; /* Fully rounded */
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1280px;
```

---

## 🗺️ Site Map

```
/
├── /login
├── /register (Admin only)
│
└── /dashboard (Protected)
    ├── /dashboard (Home)
    │
    ├── /products
    │   ├── /products (List)
    │   ├── /products/new (Admin)
    │   └── /products/:id (Detail)
    │
    ├── /inventory
    │   ├── /inventory/stock-in
    │   ├── /inventory/stock-out
    │   └── /inventory/history
    │
    ├── /reports (Manager+)
    │   ├── /reports/revenue
    │   ├── /reports/inventory
    │   └── /reports/export
    │
    ├── /users (Admin)
    │   ├── /users (List)
    │   └── /users/:id (Detail)
    │
    ├── /scan (All)
    │
    └── /settings (All)
```

---

## 🖼️ Page Layouts

### 1. Login Page

```
┌─────────────────────────────────────────┐
│                                         │
│              [LOGO]                     │
│                                         │
│      Inventory Management System        │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │  Email                          │  │
│   │  [____________________]         │  │
│   │                                 │  │
│   │  Password                       │  │
│   │  [____________________]         │  │
│   │                                 │  │
│   │  [ ] Remember me                │  │
│   │                                 │  │
│   │  [      Login Button      ]     │  │
│   │                                 │  │
│   └─────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**
- Logo/Branding
- Email input (with validation)
- Password input (with show/hide toggle)
- Remember me checkbox
- Login button (with loading state)
- Error message display

---

### 2. Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ [☰] IMS Logo    [🔍 Search]         [🔔] [👤] Admin ▼  │
├─────────────────────────────────────────────────────────┤
│         │                                               │
│ [📊]    │  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│Dashboard│  │  1,000   │ │ $125,000 │ │    15    │     │
│         │  │ Products │ │  Value   │ │ Low Stock│     │
│ [📦]    │  └──────────┘ └──────────┘ └──────────┘     │
│Products │                                               │
│         │  Revenue Chart (Last 30 Days)                │
│ [📥]    │  ┌─────────────────────────────────────┐    │
│Inventory│  │                                     │    │
│         │  │  [Line Chart]                       │    │
│ [📊]    │  │                                     │    │
│Reports  │  └─────────────────────────────────────┘    │
│         │                                               │
│ [👥]    │  Stock Distribution        Recent Activity   │
│Users    │  ┌──────────┐             ┌──────────────┐  │
│         │  │          │             │ Stock In...  │  │
│ [📱]    │  │[Pie Chart│             │ Stock Out... │  │
│Scan     │  │          │             │ Created...   │  │
│         │  └──────────┘             └──────────────┘  │
└─────────┴───────────────────────────────────────────────┘
```

**Components:**
- **Header:**
  - Hamburger menu (mobile)
  - Logo
  - Global search
  - Notifications bell
  - User dropdown

- **Sidebar:**
  - Navigation menu (role-based)
  - Icons + labels
  - Active state highlighting

- **Main Content:**
  - Summary cards (KPIs)
  - Charts (Revenue, Stock Distribution)
  - Recent activity feed
  - Quick actions

---

### 3. Products List Page

```
┌─────────────────────────────────────────────────────────┐
│ Products                              [+ Add Product]    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ [🔍 Search by name or SKU...]  [Filter ▼] [Export ▼]   │
│                                                          │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Image │ Name      │ SKU    │ Category │ Stock │ $  │ │
│ ├────────────────────────────────────────────────────┤ │
│ │ [IMG] │ Laptop... │ ELEC-1 │ Electro. │  50   │1299│ │
│ │ [IMG] │ T-Shirt.. │ CLO-1  │ Clothing │ 100   │ 19 │ │
│ │ [IMG] │ Coffee... │ FOOD-1 │ Food     │   8 ⚠│ 24 │ │
│ │ [IMG] │ Chair...  │ FURN-1 │ Furniture│  30   │149 │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ Showing 1-20 of 1,000    [< Previous] [1][2][3] [Next >]│
└─────────────────────────────────────────────────────────┘
```

**Components:**
- Page header with title
- Add Product button (Admin only)
- Search bar (debounced)
- Filter dropdown (Category, Status)
- Export dropdown (CSV, Excel)
- Data table with:
  - Product image thumbnail
  - Name, SKU, Category
  - Stock level with status badge
  - Price
  - Actions menu (Edit, Delete, View)
- Pagination controls

**Status Badges:**
- 🟢 In Stock (stock > reorderLevel)
- 🟡 Low Stock (stock ≤ reorderLevel)
- 🔴 Out of Stock (stock = 0)

---

### 4. Product Detail Page

```
┌─────────────────────────────────────────────────────────┐
│ ← Back to Products                    [Edit] [Delete]   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ┌──────────┐  Laptop Dell XPS 13                       │
│ │          │  SKU: ELEC-001                             │
│ │  [IMG]   │  Category: Electronics                     │
│ │          │  Price: $1,299.99                          │
│ └──────────┘  Stock: 50 pcs 🟢 In Stock                │
│               Reorder Level: 10                          │
│                                                          │
│ Description:                                             │
│ High-performance laptop with Intel i7...                │
│                                                          │
│ ┌──────────────┐  ┌──────────────┐                     │
│ │   QR Code    │  │   Barcode    │                     │
│ │  [QR Image]  │  │ [Barcode Img]│                     │
│ │ [Download]   │  │   [Print]    │                     │
│ └──────────────┘  └──────────────┘                     │
│                                                          │
│ Stock History (Last 30 Days)                            │
│ ┌──────────────────────────────────────────────────┐   │
│ │ [Line Chart showing stock changes over time]     │   │
│ └──────────────────────────────────────────────────┘   │
│                                                          │
│ Recent Transactions                                      │
│ ┌──────────────────────────────────────────────────┐   │
│ │ 2026-02-12 │ Stock In  │ +50 │ Staff User        │   │
│ │ 2026-02-10 │ Stock Out │  -5 │ Staff User        │   │
│ └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Components:**
- Back navigation
- Action buttons (Edit, Delete)
- Product image (large)
- Product details (Name, SKU, Category, Price, Stock)
- Status badge
- Description
- QR Code with download button
- Barcode with print button
- Stock history chart
- Recent transactions table

---

### 5. Stock In/Out Form

```
┌─────────────────────────────────────────────────────────┐
│ Stock In                                                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Product *                                                │
│ [🔍 Search product by name or SKU...        ▼]         │
│                                                          │
│ Current Stock: 50 pcs                                   │
│                                                          │
│ Quantity *                                               │
│ [________________]                                       │
│                                                          │
│ Unit Price (Optional)                                    │
│ [________________]                                       │
│                                                          │
│ Supplier (Optional)                                      │
│ [________________]                                       │
│                                                          │
│ Notes (Optional)                                         │
│ [________________________________]                       │
│ [________________________________]                       │
│                                                          │
│ New Stock: 50 + [quantity] = [total]                    │
│                                                          │
│ [Cancel]                      [Submit Stock In]          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Components:**
- Form title
- Product searchable dropdown (with autocomplete)
- Current stock display
- Quantity input (number, min: 1)
- Unit Price input (optional, decimal)
- Supplier input (optional, text)
- Notes textarea (optional)
- Stock calculation preview
- Cancel and Submit buttons
- Validation messages
- Success/Error toast notifications

---

### 6. Dashboard (Manager View)

```
┌─────────────────────────────────────────────────────────┐
│ Dashboard                                                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │  1,000   │ │ $125,000 │ │    15    │ │    25    │   │
│ │ Products │ │  Value   │ │ Low Stock│ │  Today   │   │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                          │
│ Revenue Trend (Last 30 Days)        [Day|Week|Month]    │
│ ┌──────────────────────────────────────────────────┐   │
│ │                                                  │   │
│ │  [Line Chart: Revenue over time]                │   │
│ │                                                  │   │
│ └──────────────────────────────────────────────────┘   │
│                                                          │
│ ┌─────────────────────┐  ┌──────────────────────────┐  │
│ │ Stock Distribution  │  │ Top 5 Products           │  │
│ │                     │  │ 1. Laptop Dell - $65k    │  │
│ │   [Pie Chart]       │  │ 2. T-Shirt - $2k         │  │
│ │                     │  │ 3. Coffee - $5k          │  │
│ │                     │  │ 4. Chair - $4.5k         │  │
│ └─────────────────────┘  │ 5. Notebook - $1.2k      │  │
│                          └──────────────────────────┘  │
│                                                          │
│ Low Stock Alerts                    [View All]           │
│ ┌──────────────────────────────────────────────────┐   │
│ │ ⚠ Coffee Beans 1kg - Only 8 left (Reorder: 50)  │   │
│ │ ⚠ T-Shirt Red M - Only 5 left (Reorder: 20)     │   │
│ └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Components:**
- Summary cards with icons
- Revenue chart with time range selector
- Pie chart for stock distribution
- Top products list
- Low stock alerts widget
- Export dashboard button

---

### 7. QR Scanner Page (Mobile)

```
┌─────────────────────────────────────────┐
│ ← Scan Product QR Code                  │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐│
│ │                                     ││
│ │                                     ││
│ │         [Camera View]               ││
│ │                                     ││
│ │         ┌─────────┐                 ││
│ │         │         │                 ││
│ │         │  [QR]   │                 ││
│ │         │         │                 ││
│ │         └─────────┘                 ││
│ │                                     ││
│ │   Point camera at QR code           ││
│ │                                     ││
│ └─────────────────────────────────────┘│
│                                         │
│ Can't scan? [Enter SKU manually]       │
│                                         │
│ [Toggle Flash] [Switch Camera]         │
│                                         │
└─────────────────────────────────────────┘
```

**Components:**
- Camera view (full screen)
- QR code detection overlay
- Instructions text
- Manual SKU input fallback
- Flash toggle button
- Camera switch button (front/back)
- Success animation on scan
- Redirect to product detail

---

### 8. Reports Page

```
┌─────────────────────────────────────────────────────────┐
│ Reports                                                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Report Type                                              │
│ [Revenue Report          ▼]                             │
│                                                          │
│ Date Range                                               │
│ From: [2026-02-01]  To: [2026-02-12]  [Last 30 Days ▼] │
│                                                          │
│ [Generate Report]                                        │
│                                                          │
│ ─────────────────────────────────────────────────────   │
│                                                          │
│ Revenue Report (2026-02-01 to 2026-02-12)               │
│                                                          │
│ Summary                                                  │
│ • Total Revenue: $50,000.00                             │
│ • Total Transactions: 250                                │
│ • Average Order Value: $200.00                          │
│                                                          │
│ Revenue Trend                                            │
│ ┌──────────────────────────────────────────────────┐   │
│ │ [Line Chart]                                     │   │
│ └──────────────────────────────────────────────────┘   │
│                                                          │
│ Top Products                                             │
│ ┌──────────────────────────────────────────────────┐   │
│ │ 1. Laptop Dell XPS 13 - $64,999.50 (50 sold)    │   │
│ │ 2. T-Shirt Blue M - $1,999.00 (100 sold)        │   │
│ └──────────────────────────────────────────────────┘   │
│                                                          │
│ [Export PDF] [Export Excel]                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Components:**
- Report type dropdown
- Date range picker with presets
- Generate button
- Report preview
- Charts and tables
- Export buttons (PDF, Excel)

---

## 🎭 Component Library (Shadcn/ui)

### Core Components

#### 1. Button
```tsx
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

#### 2. Input
```tsx
<Input type="text" placeholder="Enter name..." />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" min={0} placeholder="Quantity" />
<Input error="This field is required" />
```

#### 3. Select
```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="electronics">Electronics</SelectItem>
    <SelectItem value="clothing">Clothing</SelectItem>
  </SelectContent>
</Select>
```

#### 4. Table
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>SKU</TableHead>
      <TableHead>Stock</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Laptop</TableCell>
      <TableCell>ELEC-001</TableCell>
      <TableCell>50</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### 5. Dialog
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Delete Product</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### 6. Badge
```tsx
<Badge variant="default">In Stock</Badge>
<Badge variant="warning">Low Stock</Badge>
<Badge variant="destructive">Out of Stock</Badge>
<Badge variant="secondary">Draft</Badge>
```

#### 7. Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Total Products</CardTitle>
    <CardDescription>Active inventory items</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-4xl font-bold">1,000</p>
  </CardContent>
</Card>
```

#### 8. Toast
```tsx
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

toast({
  title: "Success",
  description: "Product created successfully",
  variant: "success",
});

toast({
  title: "Error",
  description: "Failed to create product",
  variant: "destructive",
});
```

---

## 📊 Charts (Recharts)

### 1. Line Chart (Revenue)
```tsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={revenueData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
  </LineChart>
</ResponsiveContainer>
```

### 2. Pie Chart (Stock Distribution)
```tsx
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={stockData}
      dataKey="value"
      nameKey="category"
      cx="50%"
      cy="50%"
      outerRadius={80}
      fill="#3b82f6"
      label
    />
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
```

### 3. Bar Chart (Top Products)
```tsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={topProducts}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="revenue" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
```

---

## 🎯 User Flows

### Flow 1: Stock In Process
```
1. User clicks "Stock In" in sidebar
2. System shows Stock In form
3. User searches and selects product
4. System displays current stock
5. User enters quantity and optional details
6. System shows stock calculation preview
7. User clicks "Submit"
8. System validates input
9. System creates transaction
10. System updates product stock
11. System shows success message
12. User can add another or view product
```

### Flow 2: Low Stock Alert
```
1. System checks stock levels (on transaction)
2. If stock ≤ reorderLevel:
   a. System creates alert
   b. System updates notification count
3. User sees notification bell with count
4. User clicks notification bell
5. System shows dropdown with alerts
6. User clicks an alert
7. System navigates to product detail
8. User can take action (reorder, edit threshold)
```

### Flow 3: Generate Report
```
1. User navigates to Reports page
2. User selects report type
3. User selects date range
4. User clicks "Generate Report"
5. System fetches data
6. System shows loading state
7. System renders report with charts
8. User reviews report
9. User clicks "Export PDF"
10. System generates PDF
11. System downloads file
```

---

## 🔍 Search & Filter Patterns

### Global Search (Header)
- Debounced input (300ms)
- Search across: Products, SKUs, Categories
- Show results dropdown with:
  - Product image
  - Name + SKU
  - Category
  - Stock status
- Click result → Navigate to detail
- Show "No results" state
- Show loading state

### Product List Filters
- **Search:** By name or SKU
- **Category:** Dropdown multi-select
- **Status:** In Stock | Low Stock | Out of Stock
- **Sort:** Name | Price | Stock (Asc/Desc)
- **Clear Filters:** Button to reset

---

## 📱 Mobile Responsiveness

### Mobile Menu
```
┌─────────────────────┐
│ [☰]  IMS   [🔔] [👤]│
├─────────────────────┤
│                     │
│ [Sidebar Drawer]    │
│ • Dashboard         │
│ • Products          │
│ • Inventory         │
│ • Scan              │
│ • Reports           │
│                     │
└─────────────────────┘
```

### Mobile Table (Cards)
```
┌─────────────────────┐
│ ┌─────────────────┐ │
│ │ [IMG] Laptop... │ │
│ │ SKU: ELEC-001   │ │
│ │ Stock: 50 🟢    │ │
│ │ Price: $1,299   │ │
│ │ [View] [Edit]   │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ [IMG] T-Shirt.. │ │
│ │ ...             │ │
│ └─────────────────┘ │
└─────────────────────┘
```

---

## ♿ Accessibility

### WCAG 2.1 Level AA Compliance

1. **Color Contrast:**
   - Text: 4.5:1 minimum
   - Large text: 3:1 minimum
   - Interactive elements: 3:1 minimum

2. **Keyboard Navigation:**
   - All interactive elements focusable
   - Visible focus indicators
   - Logical tab order
   - Skip to main content link

3. **Screen Readers:**
   - Semantic HTML
   - ARIA labels where needed
   - Alt text for images
   - Form labels

4. **Forms:**
   - Clear labels
   - Error messages
   - Required field indicators
   - Validation feedback

---

## 🎨 Animation & Transitions

```css
/* Smooth transitions */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Page transitions */
.page-enter {
  opacity: 0;
  transform: translateY(10px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease-out;
}

/* Loading states */
.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 🎓 Best Practices

1. **Consistent Spacing:** Use spacing scale
2. **Clear Hierarchy:** Use typography scale
3. **Feedback:** Show loading, success, error states
4. **Validation:** Real-time form validation
5. **Empty States:** Show helpful messages
6. **Error Handling:** Clear, actionable errors
7. **Loading States:** Skeleton screens, spinners
8. **Confirmation:** Dialogs for destructive actions
9. **Responsive:** Mobile-first approach
10. **Accessible:** WCAG 2.1 AA compliance

---

## 🔗 Design Resources

- [Shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Lucide Icons](https://lucide.dev)
- [Figma Design System](https://www.figma.com)
