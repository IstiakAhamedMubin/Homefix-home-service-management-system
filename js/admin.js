/* ---------------------------------------------------------
   9. ADMIN PANEL (admin.html)
   Frontend-only Admin Panel. The existing HomeFix theme and
   demo data model are preserved, while the panel adds a clearer
   operations workflow, requests/quotes, notifications and reports.
   --------------------------------------------------------- */
const adminNav = document.getElementById("adminNav");

// Standalone Admin Panel script. Customer pages continue using js/script.js.

if (adminNav) {
  const categoriesData = [
    { id: 1, name: "Electrician", description: "Wiring, fixtures, and electrical repairs.", price: 500, status: "Active" },
    { id: 2, name: "Plumber", description: "Leak fixes, pipe installation, drainage.", price: 450, status: "Active" },
    { id: 3, name: "AC Repair", description: "Servicing, repair, and installation.", price: 800, status: "Active" },
    { id: 4, name: "Carpenter", description: "Furniture repair, fittings, woodwork.", price: 600, status: "Active" },
    { id: 5, name: "Home Cleaning", description: "Deep cleaning, move-in/move-out.", price: 1000, status: "Active" }
  ];

  const providersData = [
    { id: 1, name: "Kamal Hossain", category: "Electrician", phone: "01711111111", email: "kamal@homefix.example", availability: "Available" },
    { id: 2, name: "Jashim Uddin", category: "Plumber", phone: "01733333333", email: "jashim@homefix.example", availability: "Busy" },
    { id: 3, name: "Abdul Karim", category: "AC Repair", phone: "01744444444", email: "abdul@homefix.example", availability: "Available" },
    { id: 4, name: "Mizanur Rahman", category: "Carpenter", phone: "01755555555", email: "mizan@homefix.example", availability: "Available" },
    { id: 5, name: "Salma Begum", category: "Home Cleaning", phone: "01722222222", email: "salma@homefix.example", availability: "Available" },
    { id: 6, name: "Rina Akter", category: "Home Cleaning", phone: "01766666666", email: "rina@homefix.example", availability: "Busy" }
  ];

  const customersData = [
    { id: 1, name: "Rafiul Karim", phone: "01712345678", email: "rafiul@example.com", bookings: 4, joined: "2026-03-12" },
    { id: 2, name: "Nusrat Jahan", phone: "01798765432", email: "nusrat@example.com", bookings: 2, joined: "2026-04-02" },
    { id: 3, name: "Tanvir Ahmed", phone: "01711223344", email: "tanvir@example.com", bookings: 6, joined: "2026-02-18" },
    { id: 4, name: "Farhana Akter", phone: "01755667788", email: "farhana@example.com", bookings: 1, joined: "2026-06-25" },
    { id: 5, name: "Shakil Hossain", phone: "01799887766", email: "shakil@example.com", bookings: 3, joined: "2026-05-09" }
  ];

  const bookingsData = [
    { id: "HMFX-11842", customer: "Rafiul Karim", service: "AC Repair", date: "2026-09-08", status: "Pending", provider: null, address: "House 12, Road 4, Dhanmondi", problem: "AC not cooling properly.", amount: 850 },
    { id: "HMFX-11841", customer: "Nusrat Jahan", service: "Plumber", date: "2026-09-07", status: "Assigned", provider: "Jashim Uddin", address: "Flat 3B, Green Road", problem: "Leaking kitchen pipe.", amount: 500 },
    { id: "HMFX-11840", customer: "Tanvir Ahmed", service: "Home Cleaning", date: "2026-09-05", status: "Completed", provider: "Salma Begum", address: "House 7, Banani", problem: "Full apartment deep clean.", amount: 1050 },
    { id: "HMFX-11839", customer: "Farhana Akter", service: "Electrician", date: "2026-09-04", status: "Completed", provider: "Kamal Hossain", address: "House 21, Uttara", problem: "Switchboard sparking.", amount: 550 },
    { id: "HMFX-11838", customer: "Shakil Hossain", service: "Carpenter", date: "2026-09-03", status: "Pending", provider: null, address: "House 9, Mirpur", problem: "Wardrobe door hinge broken.", amount: 650 },
    { id: "HMFX-11837", customer: "Rafiul Karim", service: "AC Repair", date: "2026-09-02", status: "Assigned", provider: "Abdul Karim", address: "House 12, Road 4, Dhanmondi", problem: "Gas refill needed.", amount: 850 },
    { id: "HMFX-11836", customer: "Nusrat Jahan", service: "Plumber", date: "2026-09-01", status: "Completed", provider: "Jashim Uddin", address: "Flat 3B, Green Road", problem: "Bathroom drain blocked.", amount: 500 },
    { id: "HMFX-11835", customer: "Tanvir Ahmed", service: "Home Cleaning", date: "2026-08-30", status: "Completed", provider: "Rina Akter", address: "House 7, Banani", problem: "Move-out cleaning.", amount: 1050 }
  ];

  const paymentsData = bookingsData.map(function (b, index) {
    const methods = ["Cash on Service", "Mobile Banking", "Card"];
    return { reference: b.id, customer: b.customer, amount: b.amount, method: methods[index % methods.length], status: b.status === "Pending" ? "Pending" : "Paid" };
  });

  const notificationsData = [
    { id: 1, type: "booking", title: "New booking request", message: "Rafiul Karim requested AC Repair.", time: "8 min ago", unread: true },
    { id: 2, type: "payment", title: "Payment received", message: "Payment recorded for HMFX-11841.", time: "32 min ago", unread: true },
    { id: 3, type: "provider", title: "Provider availability changed", message: "Jashim Uddin is currently busy.", time: "1 hr ago", unread: true },
    { id: 4, type: "booking", title: "Booking completed", message: "HMFX-11840 was marked completed.", time: "Yesterday", unread: false }
  ];

  const totalCustomers = 96;
  const totalProviders = 27;
  const badgeClassMap = { Pending: "badge-pending", Assigned: "badge-assigned", Completed: "badge-completed", Quoted: "badge-quoted", Rejected: "badge-rejected" };
  const sectionTitles = { dashboard: "Dashboard", requests: "Booking Requests", bookings: "All Bookings", customers: "Customers", providers: "Service Providers", categories: "Services & Categories", payments: "Payments", notifications: "Notifications", reports: "Reports", settings: "Settings" };

  const sections = document.querySelectorAll(".admin-section");
  function showSection(name) {
    sections.forEach(function (sec) { sec.classList.toggle("active", sec.id === "section-" + name); });
    document.querySelectorAll("[data-section]").forEach(function (link) { link.classList.toggle("active", link.dataset.section === name); });
    const title = document.getElementById("adminPageTitle");
    if (title) title.textContent = sectionTitles[name] || "Dashboard";
    window.location.hash = name;
    window.scrollTo(0, 0);
  }
  document.querySelectorAll("[data-section]").forEach(function (trigger) {
    trigger.addEventListener("click", function (event) { event.preventDefault(); showSection(trigger.dataset.section); });
  });
  const initial = window.location.hash.replace("#", "");
  if (sectionTitles[initial]) showSection(initial);

  const mobileMenu = document.getElementById("adminMobileMenu");
  if (mobileMenu) mobileMenu.addEventListener("click", function () { document.querySelector(".admin-sidebar").classList.toggle("admin-sidebar-open"); });

  const modal = document.getElementById("adminModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  function openModal(title, html) { modalTitle.textContent = title; modalBody.innerHTML = html; modal.hidden = false; }
  function closeModal() { modal.hidden = true; }
  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  function statusBadge(status) { return "<span class='badge " + (badgeClassMap[status] || "badge-pending") + "'>" + status + "</span>"; }
  function escapeHtml(value) { return String(value == null ? "" : value).replace(/[&<>\"']/g, function (c) { return ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]); }); }
  function money(n) { return "৳" + Number(n || 0).toLocaleString(); }

  function renderDashboard() {
    const pending = bookingsData.filter(b => b.status === "Pending").length;
    const assigned = bookingsData.filter(b => b.status === "Assigned").length;
    const completed = bookingsData.filter(b => b.status === "Completed").length;
    document.getElementById("statCustomers").textContent = totalCustomers;
    document.getElementById("statProviders").textContent = totalProviders;
    document.getElementById("statTotalBookings").textContent = bookingsData.length;
    document.getElementById("statPending").textContent = pending;
    document.getElementById("statCompleted").textContent = completed;
    document.getElementById("statPayments").textContent = money(paymentsData.filter(p => p.status === "Paid").reduce((s,p) => s + p.amount, 0));
    document.getElementById("requestNavCount").textContent = pending;
    const unread = notificationsData.filter(n => n.unread).length;
    document.getElementById("notificationNavCount").textContent = unread;
    document.getElementById("topNotificationDot").style.display = unread ? "block" : "none";

    const recent = document.getElementById("recentBookingsBody");
    recent.innerHTML = bookingsData.slice(0,5).map(b => `<tr><td><strong>${escapeHtml(b.id)}</strong></td><td>${escapeHtml(b.customer)}</td><td>${escapeHtml(b.service)}</td><td>${escapeHtml(b.date)}</td><td>${statusBadge(b.status)}</td></tr>`).join("");

    const statuses = ["Pending", "Quoted", "Assigned", "Completed", "Rejected"];
    document.getElementById("statusOverview").innerHTML = statuses.map(function(status) {
      const count = bookingsData.filter(b => b.status === status).length;
      const percent = bookingsData.length ? Math.round(count / bookingsData.length * 100) : 0;
      return `<div class='admin-status-row'><div><span>${status}</span><strong>${count}</strong></div><div class='admin-progress'><i style='width:${percent}%'></i></div></div>`;
    }).join("");

    const alerts = bookingsData.filter(b => b.status === "Pending").slice(0,3);
    document.getElementById("dashboardAlerts").innerHTML = alerts.length ? alerts.map(b => `<button class='admin-alert-item' data-action='open-request' data-id='${b.id}'><span class='admin-alert-dot'></span><span><strong>${escapeHtml(b.id)} needs review</strong><small>${escapeHtml(b.customer)} · ${escapeHtml(b.service)}</small></span><b>→</b></button>`).join("") : `<div class='admin-empty'>No bookings need review.</div>`;
  }

  function renderRequests() {
    const search = (document.getElementById("requestSearch")?.value || "").toLowerCase();
    const filter = document.getElementById("requestFilter")?.value || "all";
    const rows = bookingsData.filter(b => (filter === "all" || b.status === filter) && `${b.id} ${b.customer} ${b.service}`.toLowerCase().includes(search));
    document.getElementById("requestCountLabel").textContent = bookingsData.filter(b => b.status === "Pending").length + " pending";
    document.getElementById("requestsBody").innerHTML = rows.map(b => `<tr><td><strong>${escapeHtml(b.id)}</strong></td><td>${escapeHtml(b.customer)}</td><td>${escapeHtml(b.service)}</td><td>${escapeHtml(b.date)}</td><td>${b.amount ? money(b.amount) : "—"}</td><td>${statusBadge(b.status)}</td><td class='table-actions'><button class='row-btn row-btn-view' data-action='view-booking' data-id='${b.id}'>View</button>${b.status === "Pending" ? `<button class='row-btn row-btn-assign' data-action='quote-booking' data-id='${b.id}'>Quote</button><button class='row-btn row-btn-delete' data-action='reject-booking' data-id='${b.id}'>Reject</button>` : ""}</td></tr>`).join("") || `<tr><td colspan='7'><div class='admin-empty'>No matching booking requests.</div></td></tr>`;
  }

  function renderBookings() {
    const search = (document.getElementById("bookingSearch")?.value || "").toLowerCase();
    const filter = document.getElementById("bookingFilter")?.value || "all";
    const rows = bookingsData.filter(b => (filter === "all" || b.status === filter) && `${b.id} ${b.customer} ${b.service} ${b.provider || ""}`.toLowerCase().includes(search));
    document.getElementById("bookingsBody").innerHTML = rows.map(b => {
      let actions = `<button class='row-btn row-btn-view' data-action='view-booking' data-id='${b.id}'>View</button>`;
      if (b.status === "Pending") actions += `<button class='row-btn row-btn-assign' data-action='quote-booking' data-id='${b.id}'>Quote</button>`;
      if (b.status === "Quoted") actions += `<button class='row-btn row-btn-assign' data-action='assign-booking' data-id='${b.id}'>Assign</button>`;
      if (b.status === "Assigned") actions += `<button class='row-btn row-btn-status' data-action='complete-booking' data-id='${b.id}'>Complete</button>`;
      return `<tr><td><strong>${escapeHtml(b.id)}</strong></td><td>${escapeHtml(b.customer)}</td><td>${escapeHtml(b.service)}</td><td>${escapeHtml(b.date)}</td><td>${escapeHtml(b.provider || "Not assigned")}</td><td>${money(b.amount)}</td><td>${statusBadge(b.status)}</td><td class='table-actions'>${actions}</td></tr>`;
    }).join("") || `<tr><td colspan='8'><div class='admin-empty'>No bookings found.</div></td></tr>`;
  }

  function renderCustomers() {
    const search = (document.getElementById("customerSearch")?.value || "").toLowerCase();
    const rows = customersData.filter(c => `${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(search));
    document.getElementById("customersBody").innerHTML = rows.map(c => `<tr><td><strong>${escapeHtml(c.name)}</strong></td><td>${escapeHtml(c.phone)}</td><td>${escapeHtml(c.email)}</td><td>${c.bookings}</td><td>${c.joined}</td><td class='table-actions'><button class='row-btn row-btn-view' data-action='view-customer' data-id='${c.id}'>View</button><button class='row-btn row-btn-delete' data-action='delete-customer' data-id='${c.id}'>Delete</button></td></tr>`).join("") || `<tr><td colspan='6'><div class='admin-empty'>No customers found.</div></td></tr>`;
  }

  function renderProviders() {
    const available = providersData.filter(p => p.availability === "Available").length;
    document.getElementById("availableProviderCount").textContent = available;
    document.getElementById("busyProviderCount").textContent = providersData.length - available;
    document.getElementById("totalProviderCount").textContent = providersData.length;
    document.getElementById("providersBody").innerHTML = providersData.map(p => `<tr><td><div class='admin-person-cell'><div class='admin-table-avatar'>${escapeHtml(p.name.charAt(0))}</div><span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.email)}</small></span></div></td><td>${escapeHtml(p.category)}</td><td>${escapeHtml(p.phone)}</td><td><span class='badge ${p.availability === "Available" ? "badge-completed" : "badge-pending"}'>${p.availability}</span></td><td class='table-actions'><button class='row-btn row-btn-view' data-action='view-provider' data-id='${p.id}'>View</button><button class='row-btn row-btn-edit' data-action='edit-provider' data-id='${p.id}'>Edit</button><button class='row-btn row-btn-delete' data-action='delete-provider' data-id='${p.id}'>Delete</button></td></tr>`).join("");
  }

  function renderCategories() {
    document.getElementById("serviceCards").innerHTML = categoriesData.map(c => `<article class='admin-service-card'><div class='admin-service-card-top'><span class='admin-service-symbol'>${c.name === "Electrician" ? "⚡" : c.name === "Plumber" ? "⌁" : c.name === "AC Repair" ? "❄" : c.name === "Carpenter" ? "⌂" : "✦"}</span><span class='badge ${c.status === "Active" ? "badge-completed" : "badge-pending"}'>${c.status}</span></div><h3>${escapeHtml(c.name)}</h3><p>${escapeHtml(c.description)}</p><strong>From ${money(c.price)}</strong></article>`).join("");
    document.getElementById("categoriesBody").innerHTML = categoriesData.map(c => `<tr><td><strong>${escapeHtml(c.name)}</strong></td><td>${escapeHtml(c.description)}</td><td>${money(c.price)}</td><td><span class='badge ${c.status === "Active" ? "badge-completed" : "badge-pending"}'>${c.status}</span></td><td class='table-actions'><button class='row-btn row-btn-edit' data-action='edit-category' data-id='${c.id}'>Edit</button><button class='row-btn row-btn-delete' data-action='delete-category' data-id='${c.id}'>Delete</button></td></tr>`).join("");
  }

  function renderPayments() {
    const search = (document.getElementById("paymentSearch")?.value || "").toLowerCase();
    const filter = document.getElementById("paymentFilter")?.value || "all";
    const rows = paymentsData.filter(p => (filter === "all" || p.status === filter) && `${p.reference} ${p.customer}`.toLowerCase().includes(search));
    const paid = paymentsData.filter(p => p.status === "Paid").reduce((s,p) => s+p.amount, 0);
    const pending = paymentsData.filter(p => p.status === "Pending").reduce((s,p) => s+p.amount, 0);
    document.getElementById("paymentCountStat").textContent = paymentsData.length;
    document.getElementById("paidAmountStat").textContent = money(paid);
    document.getElementById("pendingAmountStat").textContent = money(pending);
    document.getElementById("paymentsBody").innerHTML = rows.map(p => `<tr><td><strong>${escapeHtml(p.reference)}</strong></td><td>${escapeHtml(p.customer)}</td><td>${money(p.amount)}</td><td>${escapeHtml(p.method)}</td><td>${statusBadge(p.status === "Paid" ? "Completed" : "Pending")}</td><td><button class='row-btn row-btn-view' data-action='view-payment' data-id='${p.reference}'>View</button></td></tr>`).join("") || `<tr><td colspan='6'><div class='admin-empty'>No payment records found.</div></td></tr>`;
  }

  function renderNotifications() {
    const unread = notificationsData.filter(n => n.unread).length;
    document.getElementById("notificationsList").innerHTML = notificationsData.map(n => `<button class='admin-notification-item ${n.unread ? "unread" : ""}' data-action='read-notification' data-id='${n.id}'><span class='admin-notification-icon'>${n.type === "payment" ? "৳" : n.type === "provider" ? "⚒" : "▤"}</span><span><strong>${escapeHtml(n.title)}</strong><small>${escapeHtml(n.message)}</small><em>${escapeHtml(n.time)}</em></span>${n.unread ? "<i></i>" : ""}</button>`).join("");
    document.getElementById("notificationNavCount").textContent = unread;
    document.getElementById("topNotificationDot").style.display = unread ? "block" : "none";
  }

  function renderReports() {
    const statuses = ["Pending", "Quoted", "Assigned", "Completed", "Rejected"];
    const colors = { Pending: "warning", Quoted: "quoted", Assigned: "assigned", Completed: "success", Rejected: "danger" };
    document.getElementById("reportStatusBars").innerHTML = statuses.map(s => { const n=bookingsData.filter(b=>b.status===s).length; const pct=bookingsData.length?Math.round(n/bookingsData.length*100):0; return `<div class='admin-report-row'><div><span>${s}</span><strong>${n}</strong></div><div class='admin-progress ${colors[s]}'><i style='width:${pct}%'></i></div></div>`; }).join("");
    document.getElementById("reportServiceBars").innerHTML = categoriesData.map(c => { const n=bookingsData.filter(b=>b.service===c.name).length; const pct=bookingsData.length?Math.round(n/bookingsData.length*100):0; return `<div class='admin-report-row'><div><span>${c.name}</span><strong>${n}</strong></div><div class='admin-progress'><i style='width:${pct}%'></i></div></div>`; }).join("");
    const completed = bookingsData.filter(b=>b.status==='Completed').length;
    const paid = paymentsData.filter(p=>p.status==='Paid').reduce((s,p)=>s+p.amount,0);
    document.getElementById("reportSummary").innerHTML = `<div><span>Total bookings</span><strong>${bookingsData.length}</strong></div><div><span>Completion rate</span><strong>${bookingsData.length?Math.round(completed/bookingsData.length*100):0}%</strong></div><div><span>Paid revenue</span><strong>${money(paid)}</strong></div><div><span>Active services</span><strong>${categoriesData.filter(c=>c.status==='Active').length}</strong></div>`;
  }

  function bookingDetails(b) {
    return `<div class='admin-detail-status'>${statusBadge(b.status)}<strong>${escapeHtml(b.id)}</strong></div><div class='admin-detail-grid'><div><span>Customer</span><strong>${escapeHtml(b.customer)}</strong></div><div><span>Service</span><strong>${escapeHtml(b.service)}</strong></div><div><span>Preferred Date</span><strong>${escapeHtml(b.date)}</strong></div><div><span>Provider</span><strong>${escapeHtml(b.provider || "Not assigned")}</strong></div><div class='wide'><span>Address</span><strong>${escapeHtml(b.address)}</strong></div><div class='wide'><span>Problem Description</span><strong>${escapeHtml(b.problem)}</strong></div><div><span>Estimated Amount</span><strong>${money(b.amount)}</strong></div></div><div class='admin-modal-actions'>${b.status==='Pending'?`<button class='btn btn-primary btn-block' data-modal-action='quote' data-id='${b.id}'>Set Quotation</button>`:""}${b.status==='Quoted'?`<button class='btn btn-primary btn-block' data-modal-action='assign' data-id='${b.id}'>Assign Provider</button>`:""}${b.status==='Assigned'?`<button class='btn btn-primary btn-block' data-modal-action='complete' data-id='${b.id}'>Mark Completed</button>`:""}</div>`;
  }

  function quoteForm(b) { return `<div class='admin-quote-intro'><span>${escapeHtml(b.id)}</span><strong>${escapeHtml(b.service)}</strong><small>${escapeHtml(b.customer)}</small></div><div class='form-field'><label>Service Charge (৳)</label><input type='number' id='quoteAmount' value='${b.amount}' min='1'></div><div class='form-field'><label>Additional Charge (৳)</label><input type='number' id='quoteAdditional' value='0' min='0'></div><div class='form-field'><label>Admin Note</label><textarea id='quoteNote' rows='3' placeholder='Optional note for the customer'></textarea></div><button class='btn btn-primary btn-block' id='saveQuoteBtn' data-id='${b.id}'>Send Quotation</button>`; }
  function assignForm(b) { const matching=providersData.filter(p=>p.category===b.service && p.availability==='Available'); const list=matching.length?matching:providersData.filter(p=>p.availability==='Available'); const opts=list.map(p=>`<option value='${escapeHtml(p.name)}'>${escapeHtml(p.name)} — ${escapeHtml(p.category)}</option>`).join(""); return `<div class='admin-quote-intro'><span>${escapeHtml(b.id)}</span><strong>Assign service provider</strong><small>${escapeHtml(b.service)} · ${escapeHtml(b.customer)}</small></div><div class='form-field'><label>Available Provider</label><select id='formAssignProvider'>${opts || "<option>No available providers</option>"}</select></div><button class='btn btn-primary btn-block' id='confirmAssignBtn' data-id='${b.id}' ${opts?'':'disabled'}>Confirm Assignment</button>`; }
  function providerForm(p) { const opts=categoriesData.map(c=>`<option value='${escapeHtml(c.name)}' ${p&&p.category===c.name?'selected':''}>${escapeHtml(c.name)}</option>`).join(""); return `<div class='form-field'><label>Name</label><input id='formProviderName' value='${p?escapeHtml(p.name):''}'></div><div class='form-field'><label>Specialization</label><select id='formProviderCategory'>${opts}</select></div><div class='form-field'><label>Phone</label><input id='formProviderPhone' value='${p?escapeHtml(p.phone):''}'></div><div class='form-field'><label>Email</label><input id='formProviderEmail' value='${p?escapeHtml(p.email):''}'></div><div class='form-field'><label>Availability</label><select id='formProviderAvailability'><option ${p&&p.availability==='Available'?'selected':''}>Available</option><option ${p&&p.availability==='Busy'?'selected':''}>Busy</option></select></div><button class='btn btn-primary btn-block' id='saveProviderBtn' data-id='${p?p.id:''}'>Save Provider</button>`; }
  function categoryForm(c) { return `<div class='form-field'><label>Service Name</label><input id='formCategoryName' value='${c?escapeHtml(c.name):''}'></div><div class='form-field'><label>Description</label><textarea id='formCategoryDescription' rows='3'>${c?escapeHtml(c.description):''}</textarea></div><div class='form-field'><label>Base Price (৳)</label><input type='number' id='formCategoryPrice' value='${c?c.price:''}' min='1'></div><button class='btn btn-primary btn-block' id='saveCategoryBtn' data-id='${c?c.id:''}'>Save Service</button>`; }

  function handleBookingAction(action, id) {
    const b=bookingsData.find(x=>x.id===id); if(!b) return;
    if(action==='view-booking') openModal('Booking Details', bookingDetails(b));
    if(action==='quote-booking') openModal('Send Quotation', quoteForm(b));
    if(action==='assign-booking') openModal('Assign Provider', assignForm(b));
    if(action==='reject-booking') { if(confirm('Reject booking '+id+'?')) { b.status='Rejected'; renderAll(); } }
    if(action==='complete-booking') { if(confirm('Mark '+id+' as Completed?')) { b.status='Completed'; const p=paymentsData.find(x=>x.reference===id); if(p) p.status='Paid'; renderAll(); } }
  }

  document.body.addEventListener('click', function(e) {
    const actionBtn=e.target.closest('[data-action]');
    if(actionBtn && actionBtn.dataset.action) {
      const action=actionBtn.dataset.action, id=actionBtn.dataset.id;
      if(['view-booking','quote-booking','assign-booking','reject-booking','complete-booking'].includes(action)) { handleBookingAction(action,id); return; }
      if(action==='view-customer'){const c=customersData.find(x=>x.id===Number(id)); if(c) openModal('Customer Details', `<div class='admin-detail-grid'><div><span>Name</span><strong>${escapeHtml(c.name)}</strong></div><div><span>Phone</span><strong>${escapeHtml(c.phone)}</strong></div><div class='wide'><span>Email</span><strong>${escapeHtml(c.email)}</strong></div><div><span>Bookings</span><strong>${c.bookings}</strong></div><div><span>Joined</span><strong>${c.joined}</strong></div></div>`);}
      if(action==='delete-customer'){const i=customersData.findIndex(x=>x.id===Number(id)); if(i>=0 && confirm('Remove this customer from the demo list?')){customersData.splice(i,1);renderCustomers();}}
      if(action==='view-provider'){const p=providersData.find(x=>x.id===Number(id)); if(p) openModal('Provider Details', `<div class='admin-detail-grid'><div><span>Name</span><strong>${escapeHtml(p.name)}</strong></div><div><span>Specialization</span><strong>${escapeHtml(p.category)}</strong></div><div><span>Phone</span><strong>${escapeHtml(p.phone)}</strong></div><div><span>Availability</span><strong>${escapeHtml(p.availability)}</strong></div><div class='wide'><span>Email</span><strong>${escapeHtml(p.email)}</strong></div></div>`);}
      if(action==='edit-provider'){const p=providersData.find(x=>x.id===Number(id)); if(p) openModal('Edit Provider',providerForm(p));}
      if(action==='delete-provider'){const i=providersData.findIndex(x=>x.id===Number(id)); if(i>=0&&confirm('Remove this provider?')){providersData.splice(i,1);renderProviders();renderDashboard();}}
      if(action==='edit-category'){const c=categoriesData.find(x=>x.id===Number(id)); if(c) openModal('Edit Service',categoryForm(c));}
      if(action==='delete-category'){const i=categoriesData.findIndex(x=>x.id===Number(id)); if(i>=0&&confirm('Remove this service from the catalog?')){categoriesData.splice(i,1);renderCategories();}}
      if(action==='view-payment'){const p=paymentsData.find(x=>x.reference===id);if(p)openModal('Payment Details',`<div class='admin-detail-grid'><div><span>Reference</span><strong>${escapeHtml(p.reference)}</strong></div><div><span>Customer</span><strong>${escapeHtml(p.customer)}</strong></div><div><span>Amount</span><strong>${money(p.amount)}</strong></div><div><span>Method</span><strong>${escapeHtml(p.method)}</strong></div><div><span>Status</span><strong>${escapeHtml(p.status)}</strong></div></div>`);}
      if(action==='open-request'){handleBookingAction('view-booking',id);}
      if(action==='read-notification'){const n=notificationsData.find(x=>x.id===Number(id));if(n){n.unread=false;renderNotifications();renderDashboard();}}
    }
    const modalAction=e.target.closest('[data-modal-action]');
    if(modalAction){const b=bookingsData.find(x=>x.id===modalAction.dataset.id);if(!b)return;if(modalAction.dataset.modalAction==='quote')openModal('Send Quotation',quoteForm(b));if(modalAction.dataset.modalAction==='assign')openModal('Assign Provider',assignForm(b));if(modalAction.dataset.modalAction==='complete'){b.status='Completed';renderAll();closeModal();}}
  });

  document.getElementById('addProviderBtn').addEventListener('click',()=>openModal('Add Provider',providerForm(null)));
  document.getElementById('addCategoryBtn').addEventListener('click',()=>openModal('Add Service',categoryForm(null)));

  modalBody.addEventListener('click',function(e){
    if(e.target.id==='saveQuoteBtn'){const b=bookingsData.find(x=>x.id===e.target.dataset.id);const base=Number(document.getElementById('quoteAmount').value);const extra=Number(document.getElementById('quoteAdditional').value)||0;if(!b||!base||base<1){alert('Please enter a valid quotation amount.');return;}b.amount=base+extra;b.quoteNote=document.getElementById('quoteNote').value.trim();b.status='Quoted';notificationsData.unshift({id:Date.now(),type:'booking',title:'Quotation prepared',message:'Quotation prepared for '+b.id+'.',time:'Just now',unread:true});renderAll();closeModal();}
    if(e.target.id==='confirmAssignBtn'){const b=bookingsData.find(x=>x.id===e.target.dataset.id);const p=providersData.find(x=>x.name===document.getElementById('formAssignProvider').value);if(b&&p){b.provider=p.name;b.status='Assigned';p.availability='Busy';notificationsData.unshift({id:Date.now(),type:'provider',title:'Provider assigned',message:p.name+' assigned to '+b.id+'.',time:'Just now',unread:true});renderAll();closeModal();}}
    if(e.target.id==='saveProviderBtn'){const id=e.target.dataset.id;const name=document.getElementById('formProviderName').value.trim();const category=document.getElementById('formProviderCategory').value;const phone=document.getElementById('formProviderPhone').value.trim();const email=document.getElementById('formProviderEmail').value.trim();const availability=document.getElementById('formProviderAvailability').value;if(!name||!phone){alert('Please fill in name and phone.');return;}if(id){const p=providersData.find(x=>x.id===Number(id));Object.assign(p,{name,category,phone,email,availability});}else{providersData.push({id:providersData.length?Math.max(...providersData.map(x=>x.id))+1:1,name,category,phone,email,availability});}renderAll();closeModal();}
    if(e.target.id==='saveCategoryBtn'){const id=e.target.dataset.id;const name=document.getElementById('formCategoryName').value.trim();const description=document.getElementById('formCategoryDescription').value.trim();const price=Number(document.getElementById('formCategoryPrice').value);if(!name||!price||price<1){alert('Please enter a valid service name and price.');return;}if(id){const c=categoriesData.find(x=>x.id===Number(id));Object.assign(c,{name,description,price});}else{categoriesData.push({id:categoriesData.length?Math.max(...categoriesData.map(x=>x.id))+1:1,name,description,price,status:'Active'});}renderAll();closeModal();}
  });

  document.getElementById('markAllNotifications').addEventListener('click',function(){notificationsData.forEach(n=>n.unread=false);renderNotifications();renderDashboard();});
  ['requestSearch','requestFilter'].forEach(id=>document.getElementById(id).addEventListener('input',renderRequests));
  ['bookingSearch','bookingFilter'].forEach(id=>document.getElementById(id).addEventListener('input',renderBookings));
  document.getElementById('customerSearch').addEventListener('input',renderCustomers);
  ['paymentSearch','paymentFilter'].forEach(id=>document.getElementById(id).addEventListener('input',renderPayments));
  document.getElementById('compactTablesToggle').addEventListener('change',e=>document.body.classList.toggle('admin-compact',e.target.checked));
  document.getElementById('adminNotificationsToggle').addEventListener('change',e=>document.body.classList.toggle('admin-notifications-off',!e.target.checked));
  document.getElementById('adminLogoutBtn').addEventListener('click',()=>window.location.href='admin-login.html');

  function renderAll(){renderDashboard();renderRequests();renderBookings();renderCustomers();renderProviders();renderCategories();renderPayments();renderNotifications();renderReports();}
  renderAll();
}

