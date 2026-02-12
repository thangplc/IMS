# User Stories - IMS

## 📖 Format

```
As a [role],
I want to [action],
So that [benefit].
```

---

## 🔐 Authentication & Authorization

### US-001: User Login
**Role:** All Users  
**Priority:** High  
**Story Points:** 3

**Story:**
```
As a user,
I want to login with my email and password,
So that I can access the system securely.
```

**Acceptance Criteria:**
- Given I am on the login page
- When I enter valid email and password
- Then I should be redirected to the dashboard
- And I should see my name in the header

**Test Cases:**
- ✅ Login with valid credentials → Success
- ✅ Login with invalid email → Error: "Invalid credentials"
- ✅ Login with wrong password → Error: "Invalid credentials"
- ✅ Login with empty fields → Error: "Email and password required"

---

### US-002: User Logout
**Role:** All Users  
**Priority:** High  
**Story Points:** 1

**Story:**
```
As a logged-in user,
I want to logout from the system,
So that my account remains secure when I leave.
```

**Acceptance Criteria:**
- Given I am logged in
- When I click the logout button
- Then I should be redirected to the login page
- And my session token should be cleared

---

### US-003: View My Profile
**Role:** All Users  
**Priority:** Medium  
**Story Points:** 2

**Story:**
```
As a user,
I want to view my profile information,
So that I can verify my account details.
```

**Acceptance Criteria:**
- Given I am logged in
- When I click on my profile
- Then I should see: name, email, role, joined date
- And I should see option to change password

---

## 👨‍💼 Admin Stories

### US-004: Create New Product
**Role:** Admin  
**Priority:** High  
**Story Points:** 5

**Story:**
```
As an admin,
I want to create a new product in the system,
So that staff can track its inventory.
```

**Acceptance Criteria:**
- Given I am logged in as Admin
- When I fill the product form with valid data
- Then the product should be created
- And a QR code should be auto-generated
- And I should see success message

**Test Cases:**
- ✅ Create with all required fields → Success
- ✅ Create with duplicate SKU → Error
- ✅ Create with negative price → Error
- ✅ Create with empty name → Error

---

### US-005: Edit Product Information
**Role:** Admin  
**Priority:** High  
**Story Points:** 3

**Story:**
```
As an admin,
I want to edit product information,
So that I can keep product data up-to-date.
```

**Acceptance Criteria:**
- Given I am viewing a product
- When I click "Edit" and update fields
- Then the product should be updated
- And I should see the updated information
- And updatedAt timestamp should change

---

### US-006: Delete Product
**Role:** Admin  
**Priority:** Medium  
**Story Points:** 2

**Story:**
```
As an admin,
I want to delete a product from the system,
So that I can remove discontinued items.
```

**Acceptance Criteria:**
- Given I am viewing a product with 0 stock
- When I click "Delete" and confirm
- Then the product should be soft-deleted
- And it should not appear in the product list

**Edge Cases:**
- ❌ Cannot delete if stock > 0
- ❌ Cannot delete if has recent transactions

---

### US-007: Manage Users
**Role:** Admin  
**Priority:** High  
**Story Points:** 5

**Story:**
```
As an admin,
I want to create and manage user accounts,
So that I can control who has access to the system.
```

**Acceptance Criteria:**
- Given I am on the Users page
- When I create a new user with role
- Then the user should receive login credentials
- And the user should have correct permissions

**Sub-tasks:**
- Create user
- Edit user role
- Deactivate user
- View user activity log

---

### US-008: Assign User Roles
**Role:** Admin  
**Priority:** High  
**Story Points:** 3

**Story:**
```
As an admin,
I want to assign roles to users,
So that they have appropriate access levels.
```

**Acceptance Criteria:**
- Given I am editing a user
- When I change their role from Staff to Manager
- Then their permissions should update immediately
- And they should see new menu items on next login

---

### US-009: Import Products from CSV
**Role:** Admin  
**Priority:** Medium  
**Story Points:** 8

**Story:**
```
As an admin,
I want to import multiple products from a CSV file,
So that I can quickly add inventory without manual entry.
```

**Acceptance Criteria:**
- Given I have a valid CSV file
- When I upload it
- Then I should see a preview of products to import
- And I should see validation errors if any
- And I can choose to skip errors or cancel

**CSV Format:**
```csv
name,sku,category,price,stock,unit,reorder_level
Product A,SKU001,Electronics,99.99,100,pcs,20
```

---

## 👔 Manager Stories

### US-010: View Dashboard
**Role:** Manager  
**Priority:** High  
**Story Points:** 8

**Story:**
```
As a manager,
I want to view a dashboard with key metrics and charts,
So that I can monitor business performance at a glance.
```

**Acceptance Criteria:**
- Given I am logged in as Manager
- When I navigate to dashboard
- Then I should see:
  - Total products count
  - Total stock value
  - Low stock alerts count
  - Revenue chart (last 30 days)
  - Stock distribution pie chart
  - Recent transactions list

**Performance:**
- Dashboard should load in < 3 seconds

---

### US-011: View Revenue Report
**Role:** Manager  
**Priority:** High  
**Story Points:** 5

**Story:**
```
As a manager,
I want to view revenue reports by date range,
So that I can analyze sales trends.
```

**Acceptance Criteria:**
- Given I am on the Reports page
- When I select date range and click "Generate"
- Then I should see:
  - Total revenue
  - Revenue by day/week/month
  - Top selling products
  - Revenue by category
  - Line chart showing trends

---

### US-012: Export Report to PDF
**Role:** Manager  
**Priority:** Medium  
**Story Points:** 5

**Story:**
```
As a manager,
I want to export reports as PDF,
So that I can share them with stakeholders.
```

**Acceptance Criteria:**
- Given I am viewing a report
- When I click "Export PDF"
- Then a PDF file should download
- And it should include:
  - Company header
  - Report title and date range
  - All charts as images
  - Data tables
  - Page numbers

---

### US-013: View Inventory Report
**Role:** Manager  
**Priority:** High  
**Story Points:** 3

**Story:**
```
As a manager,
I want to view current inventory levels,
So that I can make purchasing decisions.
```

**Acceptance Criteria:**
- Given I am on Inventory Report
- Then I should see all products with:
  - Current stock
  - Stock value
  - Last transaction date
  - Status (In Stock/Low/Out)
- And I can filter by category
- And I can export to Excel

---

### US-014: Identify Low Stock Items
**Role:** Manager  
**Priority:** High  
**Story Points:** 3

**Story:**
```
As a manager,
I want to see which products are running low,
So that I can reorder before stockouts.
```

**Acceptance Criteria:**
- Given I am on the dashboard
- When I view the "Low Stock Alerts" widget
- Then I should see products where stock ≤ reorder level
- And I can click to view product details
- And I can mark as "Ordered" to dismiss alert

---

### US-015: Export Products to Excel
**Role:** Manager  
**Priority:** Medium  
**Story Points:** 3

**Story:**
```
As a manager,
I want to export product list to Excel,
So that I can analyze data offline.
```

**Acceptance Criteria:**
- Given I am on Products page
- When I click "Export to Excel"
- Then an Excel file should download
- And it should include all product fields
- And filename should be `products_YYYYMMDD.xlsx`

---

## 👷 Staff Stories

### US-016: View Product List
**Role:** Staff  
**Priority:** High  
**Story Points:** 3

**Story:**
```
As a staff member,
I want to view the list of all products,
So that I can check availability.
```

**Acceptance Criteria:**
- Given I am logged in as Staff
- When I navigate to Products page
- Then I should see all products with:
  - Name, SKU, Category
  - Current stock
  - Price
  - Status badge
- And I can search by name/SKU
- And I can filter by category

---

### US-017: Search Products
**Role:** Staff  
**Priority:** High  
**Story Points:** 2

**Story:**
```
As a staff member,
I want to search for products by name or SKU,
So that I can quickly find what I need.
```

**Acceptance Criteria:**
- Given I am on Products page
- When I type in the search box
- Then results should update in real-time (debounced)
- And matching text should be highlighted

---

### US-018: Record Stock In
**Role:** Staff  
**Priority:** High  
**Story Points:** 5

**Story:**
```
As a staff member,
I want to record when products are received,
So that inventory levels stay accurate.
```

**Acceptance Criteria:**
- Given I am on Stock In page
- When I select product and enter quantity
- Then the product stock should increase
- And a transaction record should be created
- And I should see success message

**Form Fields:**
- Product (searchable dropdown)
- Quantity
- Unit Price (optional)
- Supplier (optional)
- Notes (optional)

---

### US-019: Record Stock Out
**Role:** Staff  
**Priority:** High  
**Story Points:** 5

**Story:**
```
As a staff member,
I want to record when products are sold or removed,
So that inventory levels stay accurate.
```

**Acceptance Criteria:**
- Given I am on Stock Out page
- When I select product and enter quantity
- Then the product stock should decrease
- And I should see warning if stock goes below reorder level
- And a transaction record should be created

**Validations:**
- ❌ Cannot stock out more than current stock
- ⚠️ Warning if resulting stock < reorder level

---

### US-020: View My Transaction History
**Role:** Staff  
**Priority:** Medium  
**Story Points:** 3

**Story:**
```
As a staff member,
I want to view my own transaction history,
So that I can verify my work.
```

**Acceptance Criteria:**
- Given I am on Transactions page
- Then I should see only transactions I created
- And I can filter by date range
- And I can filter by type (Stock In/Out)
- And I can see transaction details

---

### US-021: Scan QR Code
**Role:** Staff  
**Priority:** Medium  
**Story Points:** 8

**Story:**
```
As a staff member,
I want to scan a product's QR code with my phone,
So that I can quickly view its details.
```

**Acceptance Criteria:**
- Given I am on the Scan page
- When I allow camera access
- And I point camera at QR code
- Then the product detail page should open
- And I should hear a beep sound

**Fallback:**
- If camera not available, show "Enter SKU manually" input

---

### US-022: View Product Details
**Role:** Staff  
**Priority:** Medium  
**Story Points:** 3

**Story:**
```
As a staff member,
I want to view detailed information about a product,
So that I can answer customer questions.
```

**Acceptance Criteria:**
- Given I click on a product
- Then I should see:
  - All product information
  - Current stock level
  - QR code image
  - Barcode image
  - Recent transactions (last 10)
  - Stock history chart

---

### US-023: Download QR Code
**Role:** Staff  
**Priority:** Low  
**Story Points:** 2

**Story:**
```
As a staff member,
I want to download a product's QR code,
So that I can print labels.
```

**Acceptance Criteria:**
- Given I am viewing product details
- When I click "Download QR Code"
- Then a PNG image should download
- And filename should be `qr_SKU001.png`

---

## 🔔 Notification Stories

### US-024: Receive Low Stock Alert
**Role:** All Users  
**Priority:** Medium  
**Story Points:** 3

**Story:**
```
As a user,
I want to receive alerts when products are low in stock,
So that I can take action before stockouts.
```

**Acceptance Criteria:**
- Given a product's stock ≤ reorder level
- When I log in or navigate to dashboard
- Then I should see a notification badge
- And clicking it shows list of low stock products

---

### US-025: View Notifications
**Role:** All Users  
**Priority:** Low  
**Story Points:** 2

**Story:**
```
As a user,
I want to view all my notifications,
So that I don't miss important updates.
```

**Acceptance Criteria:**
- Given I have unread notifications
- When I click the notification bell
- Then I should see a dropdown with:
  - Notification message
  - Timestamp
  - Mark as read option

---

## 📊 Analytics Stories

### US-026: View Stock Trends
**Role:** Manager  
**Priority:** Medium  
**Story Points:** 5

**Story:**
```
As a manager,
I want to view stock level trends over time,
So that I can predict future inventory needs.
```

**Acceptance Criteria:**
- Given I am viewing a product
- Then I should see a line chart showing:
  - Stock levels over last 30/60/90 days
  - Stock in/out events marked
  - Reorder level threshold line

---

### US-027: View Top Selling Products
**Role:** Manager  
**Priority:** Medium  
**Story Points:** 3

**Story:**
```
As a manager,
I want to see which products sell the most,
So that I can optimize inventory.
```

**Acceptance Criteria:**
- Given I am on Dashboard
- Then I should see "Top 10 Products" widget
- Showing: product name, total sold, revenue
- Sorted by quantity sold (descending)

---

## 🎨 UI/UX Stories

### US-028: Responsive Mobile View
**Role:** All Users  
**Priority:** High  
**Story Points:** 8

**Story:**
```
As a mobile user,
I want the app to work well on my phone,
So that I can use it anywhere.
```

**Acceptance Criteria:**
- Given I access the app on mobile
- Then all pages should be responsive
- And buttons should be touch-friendly (min 44px)
- And forms should be easy to fill
- And charts should be readable

---

### US-029: Dark Mode (Future)
**Role:** All Users  
**Priority:** Low  
**Story Points:** 5

**Story:**
```
As a user,
I want to switch to dark mode,
So that I can reduce eye strain.
```

**Status:** ❌ Out of scope for v1.0

---

## 🔒 Security Stories

### US-030: Session Timeout
**Role:** All Users  
**Priority:** Medium  
**Story Points:** 2

**Story:**
```
As a user,
I want my session to expire after 7 days,
So that my account stays secure.
```

**Acceptance Criteria:**
- Given I logged in 7 days ago
- When I try to access a protected page
- Then I should be redirected to login
- And I should see message: "Session expired"

---

### US-031: Password Validation
**Role:** Admin (creating users)  
**Priority:** High  
**Story Points:** 2

**Story:**
```
As an admin creating a user,
I want the system to enforce strong passwords,
So that accounts are secure.
```

**Password Rules:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

---

## 📈 Story Point Summary

| Priority | Total Stories | Total Points |
|----------|---------------|--------------|
| High | 15 | 61 |
| Medium | 13 | 48 |
| Low | 3 | 9 |
| **Total** | **31** | **118** |

---

## 🎯 Sprint Planning Suggestion

### Sprint 1 (2 weeks): Foundation
- US-001: User Login (3)
- US-002: User Logout (1)
- US-004: Create Product (5)
- US-005: Edit Product (3)
- US-016: View Product List (3)
- US-007: Manage Users (5)
- **Total: 20 points**

### Sprint 2 (2 weeks): Inventory
- US-018: Record Stock In (5)
- US-019: Record Stock Out (5)
- US-020: View Transaction History (3)
- US-024: Low Stock Alert (3)
- US-006: Delete Product (2)
- **Total: 18 points**

### Sprint 3 (2 weeks): Analytics
- US-010: View Dashboard (8)
- US-011: Revenue Report (5)
- US-013: Inventory Report (3)
- US-027: Top Selling Products (3)
- **Total: 19 points**

### Sprint 4 (2 weeks): Advanced Features
- US-009: Import CSV (8)
- US-012: Export PDF (5)
- US-015: Export Excel (3)
- US-021: Scan QR Code (8)
- **Total: 24 points**

### Sprint 5 (1 week): Polish
- US-028: Responsive Mobile (8)
- US-023: Download QR Code (2)
- US-003: View Profile (2)
- Bug fixes & testing
- **Total: 12 points**

---

## 📝 Notes

- Story points based on Fibonacci scale (1, 2, 3, 5, 8, 13)
- Velocity assumption: ~20 points per 2-week sprint
- Total estimated time: ~10 weeks (5 sprints)
- Adjust based on actual velocity after Sprint 1
