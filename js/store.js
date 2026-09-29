/* =========================================================
   HOMEFIX FRONTEND DEMO STORE
   ---------------------------------------------------------
   This file is a small browser-side data layer for the
   frontend-only academic demo. It replaces the backend/DB
   that was originally planned.

   Data is stored in localStorage so the Customer side and
   Admin Panel can share the same demo data.
   ========================================================= */
(function () {
  "use strict";

  const KEY = "homefixStoreV2";

  const seed = {
    customers: [
      { id: 1, name: "Rafiul Karim", email: "rafiul@example.com", phone: "01712345678", address: "House 12, Road 4, Dhanmondi, Dhaka", joined: "2026-03-12", status: "Active" },
      { id: 2, name: "Nusrat Jahan", email: "nusrat@example.com", phone: "01798765432", address: "Flat 3B, Green Road, Dhaka", joined: "2026-04-02", status: "Active" },
      { id: 3, name: "Tanvir Ahmed", email: "tanvir@example.com", phone: "01711223344", address: "House 7, Banani, Dhaka", joined: "2026-02-18", status: "Active" },
      { id: 4, name: "Farhana Akter", email: "farhana@example.com", phone: "01755667788", address: "House 21, Uttara, Dhaka", joined: "2026-06-25", status: "Active" }
    ],
    services: [
      { id: 1, name: "Electrician", description: "Wiring, fixtures, and electrical repairs.", price: 500, status: "Active" },
      { id: 2, name: "Plumber", description: "Leak fixes, pipe installation, and drainage.", price: 450, status: "Active" },
      { id: 3, name: "AC Repair", description: "Servicing, repair, and installation.", price: 800, status: "Active" },
      { id: 4, name: "Carpenter", description: "Furniture repair, fittings, and woodwork.", price: 600, status: "Active" },
      { id: 5, name: "Home Cleaning", description: "Deep cleaning and move-in/move-out cleaning.", price: 1000, status: "Active" }
    ],
    providers: [
      { id: 1, name: "Kamal Hossain", email: "kamal@homefix.demo", phone: "01711111111", specialization: "Electrician", availability: "Available", status: "Active" },
      { id: 2, name: "Jashim Uddin", email: "jashim@homefix.demo", phone: "01733333333", specialization: "Plumber", availability: "Busy", status: "Active" },
      { id: 3, name: "Abdul Karim", email: "abdul@homefix.demo", phone: "01744444444", specialization: "AC Repair", availability: "Available", status: "Active" },
      { id: 4, name: "Mizanur Rahman", email: "mizan@homefix.demo", phone: "01755555555", specialization: "Carpenter", availability: "Available", status: "Active" },
      { id: 5, name: "Salma Begum", email: "salma@homefix.demo", phone: "01722222222", specialization: "Home Cleaning", availability: "Available", status: "Active" },
      { id: 6, name: "Rina Akter", email: "rina@homefix.demo", phone: "01766666666", specialization: "Home Cleaning", availability: "Busy", status: "Active" }
    ],
    bookings: [
      { id: "HMFX-11842", customerId: 1, customer: "Rafiul Karim", email: "rafiul@example.com", phone: "01712345678", serviceId: 3, service: "AC Repair", date: "2026-09-08", time: "10:00", status: "PENDING", providerId: null, provider: null, address: "House 12, Road 4, Dhanmondi, Dhaka", problem: "AC not cooling properly.", notes: "", quotation: null, adminNote: "", createdAt: "2026-09-08" },
      { id: "HMFX-11841", customerId: 2, customer: "Nusrat Jahan", email: "nusrat@example.com", phone: "01798765432", serviceId: 2, service: "Plumber", date: "2026-09-07", time: "14:00", status: "SCHEDULED", providerId: 2, provider: "Jashim Uddin", address: "Flat 3B, Green Road, Dhaka", problem: "Leaking kitchen pipe.", notes: "", quotation: 500, adminNote: "Standard pipe repair quotation.", createdAt: "2026-09-07" },
      { id: "HMFX-11840", customerId: 3, customer: "Tanvir Ahmed", email: "tanvir@example.com", phone: "01711223344", serviceId: 5, service: "Home Cleaning", date: "2026-09-05", time: "09:00", status: "COMPLETED", providerId: 5, provider: "Salma Begum", address: "House 7, Banani, Dhaka", problem: "Full apartment deep clean.", notes: "", quotation: 1050, adminNote: "", createdAt: "2026-09-05" },
      { id: "HMFX-11839", customerId: 4, customer: "Farhana Akter", email: "farhana@example.com", phone: "01755667788", serviceId: 1, service: "Electrician", date: "2026-09-04", time: "11:00", status: "IN_PROGRESS", providerId: 1, provider: "Kamal Hossain", address: "House 21, Uttara, Dhaka", problem: "Switchboard sparking.", notes: "", quotation: 650, adminNote: "", createdAt: "2026-09-04" }
    ],
    payments: [
      { id: "PAY-11840", bookingId: "HMFX-11840", customer: "Tanvir Ahmed", amount: 1050, method: "Mobile Banking", transactionId: "TXN-847201", status: "PAID", date: "2026-09-05" },
      { id: "PAY-11839", bookingId: "HMFX-11839", customer: "Farhana Akter", amount: 650, method: "Card", transactionId: "TXN-847155", status: "PAID", date: "2026-09-04" },
      { id: "PAY-11841", bookingId: "HMFX-11841", customer: "Nusrat Jahan", amount: 500, method: "Cash on Service", transactionId: "CASH-11841", status: "PENDING", date: "2026-09-07" }
    ],
    notifications: [
      { id: 1, type: "booking", title: "New booking received", message: "A new AC Repair request is waiting for review.", bookingId: "HMFX-11842", read: false, date: "2026-09-08" },
      { id: 2, type: "payment", title: "Payment recorded", message: "Payment received for HMFX-11840.", bookingId: "HMFX-11840", read: true, date: "2026-09-05" }
    ]
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  const LISTS = ["customers", "services", "providers", "bookings", "payments", "notifications"];

  // Parse + repair stored data so a missing/partial/corrupt list can never crash a page.
  function load() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(KEY)); } catch (error) { data = null; }
    if (!data || typeof data !== "object") {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return clone(seed);
    }
    let repaired = false;
    LISTS.forEach(function (name) {
      if (!Array.isArray(data[name])) { data[name] = clone(seed[name]); repaired = true; }
    });
    if (repaired) localStorage.setItem(KEY, JSON.stringify(data));
    return data;
  }

  function save(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("homefix:store-updated"));
    return data;
  }

  function nextNumericId(items) {
    return items.length ? Math.max.apply(null, items.map(item => Number(item.id) || 0)) + 1 : 1;
  }

  function uniqueBookingId(data) {
    let id, n = Date.now();
    do { id = "HMFX-" + String(n++).slice(-6); } while (data.bookings.some(function (b) { return b.id === id; }));
    return id;
  }

  function createBooking(details) {
    const data = load();
    const service = data.services.find(s => s.name === details.service) || data.services[0];
    let customer = data.customers.find(c => c.email.toLowerCase() === String(details.email).toLowerCase());

    if (!customer) {
      customer = {
        id: nextNumericId(data.customers),
        name: details.name,
        email: details.email,
        phone: details.phone,
        address: details.address,
        joined: new Date().toISOString().slice(0, 10),
        status: "Active"
      };
      data.customers.push(customer);
    } else {
      customer.name = details.name || customer.name;
      customer.phone = details.phone || customer.phone;
      customer.address = details.address || customer.address;
    }

    const booking = {
      id: uniqueBookingId(data),
      customerId: customer.id,
      customer: details.name,
      email: details.email,
      phone: details.phone,
      serviceId: service.id,
      service: service.name,
      date: details.date,
      time: details.time,
      status: "PENDING",
      providerId: null,
      provider: null,
      address: details.address,
      problem: details.problem || "",
      notes: details.notes || "",
      quotation: null,
      adminNote: "",
      createdAt: new Date().toISOString().slice(0, 10)
    };

    data.bookings.unshift(booking);
    data.notifications.unshift({
      id: Date.now(),
      type: "booking",
      title: "New booking received",
      message: details.name + " requested " + service.name + ".",
      bookingId: booking.id,
      read: false,
      date: booking.createdAt
    });

    save(data);
    return booking;
  }

  function getBooking(id) {
    return load().bookings.find(b => b.id === id) || null;
  }

  function updateBooking(id, patch) {
    const data = load();
    const booking = data.bookings.find(b => b.id === id);
    if (!booking) return null;
    Object.assign(booking, patch);
    save(data);
    return booking;
  }

  function quoteBooking(id, amount, adminNote) {
    const booking = getBooking(id);
    if (!booking) return null;
    const updated = updateBooking(id, {
      quotation: Number(amount),
      adminNote: adminNote || "",
      status: "QUOTED"
    });
    const data = load();
    data.notifications.unshift({
      id: Date.now(),
      type: "quote",
      title: "Quotation ready",
      message: "Your quotation for " + updated.service + " is ৳" + updated.quotation + ".",
      bookingId: updated.id,
      read: false,
      date: new Date().toISOString().slice(0, 10)
    });
    save(data);
    return updated;
  }

  function acceptQuote(id) {
    return updateBooking(id, { status: "ACCEPTED" });
  }

  function rejectBooking(id, note) {
    return updateBooking(id, { status: "REJECTED", adminNote: note || "" });
  }

  function recordPayment(id, method) {
    const data = load();
    const booking = data.bookings.find(b => b.id === id);
    if (!booking) return null;

    const amount = Number(booking.quotation || 0);
    const payment = {
      id: "PAY-" + String(Date.now()).slice(-6),
      bookingId: booking.id,
      customer: booking.customer,
      amount: amount,
      method: method,
      transactionId: method === "Cash on Service" ? "CASH-" + booking.id.replace("HMFX-", "") : "TXN-" + String(Date.now()).slice(-6),
      status: method === "Cash on Service" ? "PENDING" : "PAID",
      date: new Date().toISOString().slice(0, 10)
    };

    const existingIndex = data.payments.findIndex(p => p.bookingId === id);
    if (existingIndex >= 0) data.payments[existingIndex] = payment;
    else data.payments.unshift(payment);

    booking.status = "PAID";
    data.notifications.unshift({
      id: Date.now(),
      type: "payment",
      title: "Payment submitted",
      message: "Payment for " + booking.id + " was recorded.",
      bookingId: booking.id,
      read: false,
      date: payment.date
    });

    save(data);
    return payment;
  }

  function assignProvider(id, providerId) {
    const data = load();
    const booking = data.bookings.find(b => b.id === id);
    const provider = data.providers.find(p => Number(p.id) === Number(providerId));
    if (!booking || !provider) return null;

    booking.providerId = provider.id;
    booking.provider = provider.name;
    booking.status = "SCHEDULED";
    provider.availability = "Busy";

    data.notifications.unshift({
      id: Date.now(),
      type: "assignment",
      title: "Provider assigned",
      message: provider.name + " was assigned to " + booking.id + ".",
      bookingId: booking.id,
      read: false,
      date: new Date().toISOString().slice(0, 10)
    });

    save(data);
    return booking;
  }

  function setStatus(id, status) {
    const allowed = ["PENDING", "QUOTED", "ACCEPTED", "PAID", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "REJECTED"];
    if (allowed.indexOf(status) === -1) return null;
    const booking = updateBooking(id, { status: status });
    if (booking && status === "COMPLETED") {
      const data = load();
      const provider = data.providers.find(p => Number(p.id) === Number(booking.providerId));
      if (provider) provider.availability = "Available";
      data.notifications.unshift({
        id: Date.now(),
        type: "completed",
        title: "Booking completed",
        message: booking.id + " has been marked as completed.",
        bookingId: booking.id,
        read: false,
        date: new Date().toISOString().slice(0, 10)
      });
      save(data);
    }
    return booking;
  }

  function addProvider(provider) {
    const data = load();
    provider.id = nextNumericId(data.providers);
    provider.status = provider.status || "Active";
    data.providers.push(provider);
    save(data);
    return provider;
  }

  function updateProvider(id, patch) {
    const data = load();
    const provider = data.providers.find(p => Number(p.id) === Number(id));
    if (!provider) return null;
    Object.assign(provider, patch);
    save(data);
    return provider;
  }

  function deleteProvider(id) {
    const data = load();
    data.providers = data.providers.filter(p => Number(p.id) !== Number(id));
    save(data);
  }

  function addService(service) {
    const data = load();
    service.id = nextNumericId(data.services);
    service.status = service.status || "Active";
    data.services.push(service);
    save(data);
    return service;
  }

  function updateService(id, patch) {
    const data = load();
    const service = data.services.find(s => Number(s.id) === Number(id));
    if (!service) return null;
    Object.assign(service, patch);
    save(data);
    return service;
  }

  function deleteService(id) {
    const data = load();
    data.services = data.services.filter(s => Number(s.id) !== Number(id));
    save(data);
  }

  function reset() {
    localStorage.setItem(KEY, JSON.stringify(seed));
    localStorage.removeItem("homefixCurrentUser");
    localStorage.removeItem("homefixAdminLoggedIn");
    window.dispatchEvent(new CustomEvent("homefix:store-updated"));
  }

  window.HomeFixStore = {
    KEY,
    seed: clone(seed),
    load,
    save,
    reset,
    createBooking,
    getBooking,
    updateBooking,
    quoteBooking,
    acceptQuote,
    rejectBooking,
    recordPayment,
    assignProvider,
    setStatus,
    addProvider,
    updateProvider,
    deleteProvider,
    addService,
    updateService,
    deleteService
  };

  // "homefix:store-updated" only fires in the tab that saved. Forward changes made in
  // OTHER tabs (e.g. admin panel -> customer tracker) so every open page re-renders live.
  window.addEventListener("storage", function (event) {
    if (event.key === KEY || event.key === null) {
      window.dispatchEvent(new CustomEvent("homefix:store-updated"));
    }
  });

  load();
})();