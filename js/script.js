/* =========================================================
   HOMEFIX - MAIN JAVASCRIPT FILE
   This file currently handles small, page-wide behaviors:
   1. Mobile navigation menu toggle
   2. Automatically updating the footer year
   3. Login form validation (login.html only)

   Every block below checks that its elements exist before
   running, so this one shared file is safe to load on every
   page without causing errors on pages that don't have
   that particular element.
   ========================================================= */


/* ---------------------------------------------------------
   1. MOBILE NAVIGATION TOGGLE
   Clicking the hamburger button shows/hides the nav links
   on small screens by adding/removing the "open" class.
   --------------------------------------------------------- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}


/* ---------------------------------------------------------
   2. AUTO-UPDATE FOOTER YEAR
   Keeps the copyright year correct without manual edits.
   --------------------------------------------------------- */
const currentYearSpan = document.getElementById("currentYear");

if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}


/* ---------------------------------------------------------
   3. LOGIN FORM VALIDATION (login.html)
   This is FRONTEND-ONLY validation - it does not check
   real credentials against any database. It simply checks
   that the fields were filled in correctly, then shows a
   demo "success" message.
   --------------------------------------------------------- */
const loginForm = document.getElementById("loginForm");

if (loginForm) {

  const emailInput = document.getElementById("loginEmail");
  const passwordInput = document.getElementById("loginPassword");
  const emailError = document.getElementById("loginEmailError");
  const passwordError = document.getElementById("loginPasswordError");
  const successMessage = document.getElementById("loginSuccess");

  // A simple pattern good enough for frontend-only email checks
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  loginForm.addEventListener("submit", function (event) {
    // Stop the page from reloading, since there is no backend to submit to
    event.preventDefault();

    let isValid = true;

    // Reset previous error states before re-checking
    emailInput.classList.remove("invalid");
    passwordInput.classList.remove("invalid");
    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    // Check email/username field
    if (emailValue === "") {
      emailError.textContent = "Please enter your email or username.";
      emailInput.classList.add("invalid");
      isValid = false;
    } else if (emailValue.includes("@") && !emailPattern.test(emailValue)) {
      // Only enforce the email format if it looks like they were typing an email
      emailError.textContent = "Please enter a valid email address.";
      emailInput.classList.add("invalid");
      isValid = false;
    }

    // Check password field
    if (passwordValue === "") {
      passwordError.textContent = "Please enter your password.";
      passwordInput.classList.add("invalid");
      isValid = false;
    } else if (passwordValue.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      passwordInput.classList.add("invalid");
      isValid = false;
    }

    // If everything looks valid, show a demo success message.
    // (No real authentication happens here - there is no backend.)
    if (isValid) {
      successMessage.textContent = "Login successful! (Demo only - no backend connected yet)";
    }
  });
}


/* ---------------------------------------------------------
   4. REGISTRATION FORM VALIDATION (register.html)
   This is FRONTEND-ONLY validation - it does not create a
   real account or save anything to a database. It simply
   checks that every field is filled in correctly, then
   shows a demo "success" message.
   --------------------------------------------------------- */
const registerForm = document.getElementById("registerForm");

if (registerForm) {

  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("regEmail");
  const phoneInput = document.getElementById("phoneNumber");
  const addressInput = document.getElementById("address");
  const passwordInput = document.getElementById("regPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("regEmailError");
  const phoneError = document.getElementById("phoneNumberError");
  const addressError = document.getElementById("addressError");
  const passwordError = document.getElementById("regPasswordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  const successMessage = document.getElementById("registerSuccess");

  // A simple pattern good enough for frontend-only email checks
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Accepts digits only, 10 to 15 characters long (covers most phone formats)
  const phonePattern = /^[0-9]{10,15}$/;

  // Small helper so we don't repeat the same 3 lines for every field
  function showError(inputEl, errorEl, message) {
    inputEl.classList.add("invalid");
    errorEl.textContent = message;
  }

  function clearError(inputEl, errorEl) {
    inputEl.classList.remove("invalid");
    errorEl.textContent = "";
  }

  registerForm.addEventListener("submit", function (event) {
    // Stop the page from reloading, since there is no backend to submit to
    event.preventDefault();

    let isValid = true;
    successMessage.textContent = "";

    // Clear all previous errors before re-checking
    clearError(fullNameInput, fullNameError);
    clearError(emailInput, emailError);
    clearError(phoneInput, phoneError);
    clearError(addressInput, addressError);
    clearError(passwordInput, passwordError);
    clearError(confirmPasswordInput, confirmPasswordError);

    const fullNameValue = fullNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const phoneValue = phoneInput.value.trim();
    const addressValue = addressInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    // Full Name: required
    if (fullNameValue === "") {
      showError(fullNameInput, fullNameError, "Please enter your full name.");
      isValid = false;
    }

    // Email: required + valid format
    if (emailValue === "") {
      showError(emailInput, emailError, "Please enter your email address.");
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      showError(emailInput, emailError, "Please enter a valid email address.");
      isValid = false;
    }

    // Phone Number: required + basic digit/length check
    if (phoneValue === "") {
      showError(phoneInput, phoneError, "Please enter your phone number.");
      isValid = false;
    } else if (!phonePattern.test(phoneValue)) {
      showError(phoneInput, phoneError, "Enter a valid phone number (10-15 digits, numbers only).");
      isValid = false;
    }

    // Address: required
    if (addressValue === "") {
      showError(addressInput, addressError, "Please enter your address.");
      isValid = false;
    }

    // Password: required + minimum length
    if (passwordValue === "") {
      showError(passwordInput, passwordError, "Please enter a password.");
      isValid = false;
    } else if (passwordValue.length < 6) {
      showError(passwordInput, passwordError, "Password must be at least 6 characters.");
      isValid = false;
    }

    // Confirm Password: required + must match password
    if (confirmPasswordValue === "") {
      showError(confirmPasswordInput, confirmPasswordError, "Please confirm your password.");
      isValid = false;
    } else if (confirmPasswordValue !== passwordValue) {
      showError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.");
      isValid = false;
    }

    // If everything looks valid, show a demo success message.
    // (No real account is created here - there is no backend.)
    if (isValid) {
      successMessage.textContent = "Registration successful! (Demo only - no backend connected yet)";
      registerForm.reset();
    }
  });
}


/* ---------------------------------------------------------
   5. SERVICE DETAILS PAGE (service-details.html)
   This page is shared by all 5 services. Instead of making
   5 separate HTML files, we store each service's information
   in one place (the object below) and use JavaScript to read
   the "?service=" part of the URL to decide which one to show.
   --------------------------------------------------------- */

// All service data lives here. To add a new service later,
// just add a new entry to this object - no HTML changes needed.
const serviceData = {
  "electrician": {
    name: "Electrician",
    icon: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M13 2L5 14h5l-1 8 9-12h-5l1-8z"/></svg>',
    imageClass: "service-img-electrician",
    tagline: "Safe, reliable electrical repairs for your home.",
    description: "Our licensed electricians handle everything from small " +
      "fixture repairs to full wiring checks, so you can trust your home's " +
      "electrical system is safe and working properly.",
    includes: [
      "Inspection of the reported issue",
      "Wiring and switchboard repairs",
      "Light and fan fixture installation",
      "Basic safety check of the circuit"
    ],
    price: "Starting at ৳500",
    duration: "45 - 90 minutes",
    notes: "Final price may vary depending on the complexity of the issue " +
      "and any replacement parts required. Our provider will confirm the " +
      "exact cost before starting work."
  },

  "plumber": {
    name: "Plumber",
    icon: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 2C12 2 5 11 5 15.5a7 7 0 0 0 14 0C19 11 12 2 12 2z"/></svg>',
    imageClass: "service-img-plumber",
    tagline: "Leak fixes, pipe work, and drainage solutions.",
    description: "From a dripping tap to a blocked drain, our plumbers " +
      "diagnose and fix common household plumbing issues quickly and cleanly.",
    includes: [
      "Leak detection and repair",
      "Pipe and faucet installation",
      "Drain unclogging",
      "Basic bathroom and kitchen plumbing fixes"
    ],
    price: "Starting at ৳450",
    duration: "30 - 75 minutes",
    notes: "Major pipe replacements or renovation work may require a " +
      "follow-up visit and a separate cost estimate."
  },

  "ac-repair": {
    name: "AC Repair",
    icon: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="100%" height="100%"><line x1="12" y1="3" x2="12" y2="21"/><line x1="4.9" y1="7" x2="19.1" y2="17"/><line x1="19.1" y1="7" x2="4.9" y2="17"/></svg>',
    imageClass: "service-img-ac",
    tagline: "Servicing and repair for all major AC brands.",
    description: "Keep your air conditioner running efficiently with our " +
      "servicing and repair support, covering routine maintenance to fixing " +
      "cooling issues.",
    includes: [
      "AC performance check",
      "Gas level inspection",
      "Filter and coil cleaning",
      "Minor part repair"
    ],
    price: "Starting at ৳800",
    duration: "60 - 120 minutes",
    notes: "Gas refilling or major part replacement is quoted separately " +
      "after inspection."
  },

  "carpenter": {
    name: "Carpenter",
    icon: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><g transform="rotate(-40 12 12)"><rect x="2" y="2" width="17" height="6" rx="1.5"/><rect x="4" y="8" width="4.5" height="14" rx="1.5"/></g></svg>',
    imageClass: "service-img-carpenter",
    tagline: "Furniture repair, fittings, and custom woodwork.",
    description: "Our carpenters handle furniture repairs, door and window " +
      "fittings, and small custom woodwork jobs around your home.",
    includes: [
      "Furniture repair and assembly",
      "Door and window fittings",
      "Shelf and cabinet installation",
      "General woodwork touch-ups"
    ],
    price: "Starting at ৳600",
    duration: "45 - 100 minutes",
    notes: "Custom furniture or large woodwork projects may need an " +
      "on-site visit before a final price is confirmed."
  },

  "home-cleaning": {
    name: "Home Cleaning",
    icon: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>',
    imageClass: "service-img-cleaning",
    tagline: "Deep cleaning for every room in your home.",
    description: "A thorough cleaning service covering all major areas of " +
      "your home, ideal for regular upkeep or move-in/move-out cleaning.",
    includes: [
      "Dusting and surface cleaning",
      "Floor mopping and vacuuming",
      "Kitchen and bathroom deep clean",
      "Window sill and fixture wipe-down"
    ],
    price: "Starting at ৳1000",
    duration: "90 - 180 minutes",
    notes: "Price may increase for larger homes or heavily soiled areas. " +
      "Our provider will confirm the scope before starting."
  }
};

// This block only runs on service-details.html, since that is the
// only page with an element whose id is "serviceName" AND a page
// that expects the query string below.
const serviceNameEl = document.getElementById("serviceName");
const serviceDetailsPage = document.querySelector(".details-page");

if (serviceNameEl && serviceDetailsPage) {

  // Read the "service" value from the URL, e.g. service-details.html?service=plumber
  const urlParams = new URLSearchParams(window.location.search);
  const requestedService = urlParams.get("service");

  // If the requested service exists in our data, use it.
  // Otherwise, fall back to "electrician" so the page never shows blank.
  const selected = serviceData[requestedService] || serviceData["electrician"];

  // Fill in the simple text fields
  document.getElementById("serviceName").textContent = selected.name;
  document.getElementById("serviceTagline").textContent = selected.tagline;
  document.getElementById("serviceIcon").innerHTML = selected.icon;
  document.getElementById("serviceDescription").textContent = selected.description;
  document.getElementById("servicePrice").textContent = selected.price;
  document.getElementById("serviceDuration").textContent = selected.duration;
  document.getElementById("serviceNotes").textContent = selected.notes;

  // Set the correct background color panel behind the icon
  document.getElementById("serviceImage").classList.add(selected.imageClass);

  // Build the "What's Included" list from the includes array
  const includesList = document.getElementById("serviceIncludes");
  selected.includes.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    includesList.appendChild(listItem);
  });

  // Update the page title so the browser tab matches the service
  document.title = selected.name + " - HomeFix";

  // Make sure "Book Now" carries the same service through to the booking form
  const bookNowBtn = document.getElementById("bookNowBtn");
  bookNowBtn.href = "booking.html?service=" + (requestedService || "electrician");
}



/* =========================================================
   HOMEFIX FRONTEND-ONLY DEMO WORKFLOW
   ---------------------------------------------------------
   The backend was intentionally removed for the academic
   frontend demo. Customer/Admin data is shared through
   HomeFixStore (localStorage).
   ========================================================= */

function hfEsc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function hfCurrentBooking() {
  const data = window.HomeFixStore.load();
  const email = localStorage.getItem("homefixCurrentUser");
  if (email) {
    return data.bookings.find(b => b.email === email) || data.bookings[0] || null;
  }
  return data.bookings[0] || null;
}

/* ---------------- BOOKING PAGE ---------------- */
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("service") || "electrician";
  const bookingService = serviceData[key] || serviceData.electrician;

  document.getElementById("selectedServiceIcon").innerHTML = bookingService.icon;
  document.getElementById("selectedServiceName").textContent = bookingService.name;
  document.getElementById("selectedService").classList.add(bookingService.imageClass);
  document.getElementById("summaryService").textContent = bookingService.name;
  document.getElementById("summaryPrice").textContent = bookingService.price;

  const dateInput = document.getElementById("preferredDate");
  dateInput.min = new Date().toISOString().split("T")[0];

  const fields = {
    customerName: "summaryName",
    customerEmail: "summaryEmail",
    customerPhone: "summaryPhone",
    customerAddress: "summaryAddress",
    problemDescription: "summaryProblem",
    preferredDate: "summaryDate",
    preferredTime: "summaryTime"
  };

  Object.keys(fields).forEach(function (fieldId) {
    const input = document.getElementById(fieldId);
    const output = document.getElementById(fields[fieldId]);
    if (!input || !output) return;
    input.addEventListener("input", function () {
      output.textContent = input.value.trim() || "-";
    });
  });

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const date = document.getElementById("preferredDate").value;
    const time = document.getElementById("preferredTime").value;
    const problem = document.getElementById("problemDescription").value.trim();
    const notes = document.getElementById("additionalNotes").value.trim();

    if (!name || !email || !phone || !address || !date || !time || !problem) {
      document.getElementById("bookingSuccess").textContent = "Please complete all required fields.";
      return;
    }

    localStorage.setItem("homefixCurrentUser", email);
    const booking = HomeFixStore.createBooking({
      name, email, phone, address, date, time, problem, notes,
      service: bookingService.name
    });

    sessionStorage.setItem("homefixBooking", JSON.stringify(booking));
    document.getElementById("bookingSuccess").textContent =
      "Booking request submitted! Your request is now Pending.";

    setTimeout(function () {
      window.location.href = "booking-status.html";
    }, 700);
  });
}

/* ---------------- PAYMENT PAGE ---------------- */
const paymentFormSection = document.getElementById("paymentFormSection");
if (paymentFormSection) {
  const booking = hfCurrentBooking();
  const noBookingState = document.getElementById("noBookingState");
  const confirmation = document.getElementById("paymentConfirmation");

  if (!booking || !booking.quotation || !["ACCEPTED", "PAID"].includes(booking.status)) {
    paymentFormSection.hidden = true;
    noBookingState.hidden = false;
    if (noBookingState) {
      const p = noBookingState.querySelector("p");
      if (p) p.textContent = booking && booking.status === "QUOTED"
        ? "Please accept the quotation from your dashboard before making payment."
        : "No payable quotation is available yet. Please wait for the Admin quotation.";
    }
  } else if (booking.status === "PAID") {
    paymentFormSection.hidden = true;
    confirmation.hidden = false;
    document.getElementById("confirmReference").textContent =
      (window.HomeFixStore.load().payments.find(p => p.bookingId === booking.id) || {}).transactionId || booking.id;
    document.getElementById("confirmService").textContent = booking.service;
    document.getElementById("confirmMethod").textContent =
      (window.HomeFixStore.load().payments.find(p => p.bookingId === booking.id) || {}).method || "Paid";
    document.getElementById("confirmAmount").textContent = "৳" + Number(booking.quotation).toLocaleString();
  } else {
    document.getElementById("paySummaryService").textContent = booking.service;
    document.getElementById("paySummaryDate").textContent = booking.date;
    document.getElementById("paySummaryTime").textContent = booking.time;
    document.getElementById("paySummaryProblem").textContent = booking.problem;
    document.getElementById("paySummaryName").textContent = booking.customer;
    document.getElementById("paySummaryPhone").textContent = booking.phone;
    document.getElementById("paySummaryAddress").textContent = booking.address;

    document.getElementById("payServiceCharge").textContent = "৳" + Number(booking.quotation).toLocaleString();
    document.getElementById("payPlatformFee").textContent = "৳0";
    document.getElementById("payTotalAmount").textContent = "৳" + Number(booking.quotation).toLocaleString();

    const methodCards = document.querySelectorAll(".method-card");
    const mobileFields = document.getElementById("mobileFields");
    const cardFields = document.getElementById("cardFields");
    const cashNote = document.getElementById("cashNote");

    function updatePaymentView() {
      const selected = document.querySelector('input[name="paymentMethod"]:checked');
      if (!selected) return;
      const method = selected.value;
      methodCards.forEach(card => card.classList.toggle("selected", card.dataset.method === method));
      mobileFields.hidden = method !== "mobile";
      cardFields.hidden = method !== "card";
      cashNote.hidden = method !== "cash";
    }

    methodCards.forEach(card => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.addEventListener("change", updatePaymentView);
    });
    updatePaymentView();

    paymentFormSection.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
      const selected = document.querySelector('input[name="paymentMethod"]:checked');
      if (!selected) return;

      const labels = { cash: "Cash on Service", mobile: "Mobile Banking", card: "Card" };
      const payment = HomeFixStore.recordPayment(booking.id, labels[selected.value]);

      sessionStorage.setItem("homefixPayment", JSON.stringify(payment));
      document.getElementById("confirmReference").textContent = payment.transactionId;
      document.getElementById("confirmService").textContent = booking.service;
      document.getElementById("confirmMethod").textContent = payment.method;
      document.getElementById("confirmAmount").textContent = "৳" + Number(payment.amount).toLocaleString();

      paymentFormSection.hidden = true;
      confirmation.hidden = false;
    });
  }
}

/* ---------------- CUSTOMER DASHBOARD ---------------- */
const welcomeHeading = document.getElementById("welcomeHeading");
if (welcomeHeading) {
  function renderCustomerDashboard() {
    const data = HomeFixStore.load();
    const email = localStorage.getItem("homefixCurrentUser");
    const customer = data.customers.find(c => c.email === email) || data.customers[0];
    const bookings = data.bookings.filter(b => !email || b.email === email);
    const booking = bookings[0] || data.bookings[0];

    welcomeHeading.textContent = "Welcome back, " + customer.name.split(" ")[0] + "!";
    document.getElementById("profileName").textContent = customer.name;
    document.getElementById("profileEmail").textContent = customer.email;
    document.getElementById("profilePhone").textContent = customer.phone;

    if (booking) {
      document.getElementById("currentBookingService").textContent = booking.service;
      document.getElementById("currentBookingDate").textContent = booking.date + " • " + booking.time;
      document.getElementById("currentBookingRef").textContent = booking.id;

      const badge = document.getElementById("currentBookingBadge");
      badge.textContent = booking.status;
      badge.className = "badge " + ({
        PENDING: "badge-pending", QUOTED: "badge-quoted", ACCEPTED: "badge-accepted",
        PAID: "badge-paid", SCHEDULED: "badge-assigned", IN_PROGRESS: "badge-progress",
        COMPLETED: "badge-completed", REJECTED: "badge-rejected"
      }[booking.status] || "badge-pending");

      const tracker = document.getElementById("statusTracker");
      if (tracker) {
        const order = ["PENDING", "QUOTED", "ACCEPTED", "PAID", "SCHEDULED", "IN_PROGRESS", "COMPLETED"];
        tracker.innerHTML = order.map((status, index) =>
          '<div class="status-step" data-step="' + status + '"><span class="status-dot"></span><span class="status-label">' +
          status.replace("_", " ") + '</span></div>' +
          (index < order.length - 1 ? '<div class="status-line"></div>' : '')
        ).join("");
        const currentIndex = order.indexOf(booking.status);
        tracker.querySelectorAll(".status-step").forEach(step => {
          if (order.indexOf(step.dataset.step) <= currentIndex) step.classList.add("status-complete");
        });
      }

      let actionBox = document.getElementById("customerBookingActions");
      if (!actionBox) {
        actionBox = document.createElement("div");
        actionBox.id = "customerBookingActions";
        actionBox.className = "customer-action-box";
        const card = document.querySelector(".current-booking");
        if (card) card.appendChild(actionBox);
      }

      if (booking.status === "QUOTED") {
        actionBox.innerHTML =
          '<div class="quote-highlight"><div><span class="eyebrow">Quotation Received</span><strong>৳' +
          Number(booking.quotation).toLocaleString() + '</strong></div><p>' +
          hfEsc(booking.adminNote || "HomeFix has reviewed your request and prepared a quotation.") +
          '</p></div>' +
          '<div class="action-row"><button class="btn btn-primary btn-sm" id="acceptQuoteBtn">Accept & Pay</button>' +
          '<button class="btn btn-outline btn-sm" id="rejectQuoteBtn">Reject Quote</button></div>';
        document.getElementById("acceptQuoteBtn").onclick = function () {
          HomeFixStore.acceptQuote(booking.id);
          window.location.href = "payment.html";
        };
        document.getElementById("rejectQuoteBtn").onclick = function () {
          HomeFixStore.rejectBooking(booking.id, "Customer rejected the quotation.");
          renderCustomerDashboard();
        };
      } else if (booking.status === "ACCEPTED") {
        actionBox.innerHTML = '<div class="quote-highlight"><strong>Quotation accepted.</strong><p>Continue to payment to confirm the service.</p></div><a class="btn btn-primary btn-sm" href="payment.html">Continue to Payment</a>';
      } else {
        actionBox.innerHTML = booking.status === "REJECTED"
          ? '<div class="quote-highlight quote-danger"><strong>Booking closed</strong><p>This booking was rejected or the quotation was declined.</p></div>'
          : '<p class="muted-note">Your booking is currently <strong>' + booking.status.replace("_", " ") + '</strong>.</p>';
      }
    }

    const historyBody = document.getElementById("bookingHistoryBody");
    if (historyBody) {
      historyBody.innerHTML = bookings.map(b =>
        '<tr><td>' + hfEsc(b.service) + '</td><td>' + hfEsc(b.date) + '</td><td><span class="badge ' +
        ({
          PENDING: "badge-pending", QUOTED: "badge-quoted", ACCEPTED: "badge-accepted", PAID: "badge-paid",
          SCHEDULED: "badge-assigned", IN_PROGRESS: "badge-progress", COMPLETED: "badge-completed", REJECTED: "badge-rejected"
        }[b.status] || "badge-pending") + '">' + b.status.replace("_", " ") + '</span></td>' +
        '<td><a class="row-btn row-btn-view" href="booking-status.html">View</a></td></tr>'
      ).join("");
    }
  }

  renderCustomerDashboard();
  window.addEventListener("homefix:store-updated", renderCustomerDashboard);
}

/* ---------------- BOOKING STATUS PAGE ---------------- */
const statusService = document.getElementById("statusService");
if (statusService) {
  function renderBookingStatus() {
    const booking = hfCurrentBooking();
    if (!booking) return;

    document.getElementById("statusService").textContent = booking.service;
    document.getElementById("statusRef").textContent = booking.id;
    document.getElementById("statusDate").textContent = booking.date;
    document.getElementById("statusTime").textContent = booking.time;
    document.getElementById("statusAddress").textContent = booking.address;
    document.getElementById("statusPhone").textContent = booking.phone;
    document.getElementById("statusProblem").textContent = booking.problem;

    const badge = document.getElementById("statusBadge");
    badge.textContent = booking.status;
    badge.className = "badge " + ({
      PENDING: "badge-pending", QUOTED: "badge-quoted", ACCEPTED: "badge-accepted",
      PAID: "badge-paid", SCHEDULED: "badge-assigned", IN_PROGRESS: "badge-progress",
      COMPLETED: "badge-completed", REJECTED: "badge-rejected"
    }[booking.status] || "badge-pending");

    const tracker = document.getElementById("statusTracker");
    const order = ["PENDING", "QUOTED", "ACCEPTED", "PAID", "SCHEDULED", "IN_PROGRESS", "COMPLETED"];
    tracker.innerHTML = order.map((status, index) =>
      '<div class="status-step" data-step="' + status + '"><span class="status-dot"></span><span class="status-label">' +
      status.replace("_", " ") + '</span></div>' +
      (index < order.length - 1 ? '<div class="status-line"></div>' : '')
    ).join("");
    const currentIndex = order.indexOf(booking.status);
    tracker.querySelectorAll(".status-step").forEach(step => {
      if (order.indexOf(step.dataset.step) <= currentIndex) step.classList.add("status-complete");
    });
  }

  renderBookingStatus();
  window.addEventListener("homefix:store-updated", renderBookingStatus);

  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("homefixCurrentUser");
    sessionStorage.removeItem("homefixBooking");
    sessionStorage.removeItem("homefixPayment");
    window.location.href = "index.html";
  });
}

/* ---------------- PROFILE PAGE ---------------- */
const profileForm = document.getElementById("profileForm");
if (profileForm) {
  (function fillProfile() {
    const email = localStorage.getItem("homefixCurrentUser");
    const data = HomeFixStore.load();
    const customer = data.customers.find(c => c.email === email) || data.customers[0];
    if (customer) {
      const nameEl = document.getElementById("profileName");
      const emailEl = document.getElementById("profileEmailInput");
      const phoneEl = document.getElementById("profilePhoneInput");
      const addressEl = document.getElementById("profileAddressInput");
      if (nameEl) nameEl.value = customer.name;
      if (emailEl) emailEl.value = customer.email;
      if (phoneEl) phoneEl.value = customer.phone;
      if (addressEl) addressEl.value = customer.address || "";
      const displayName = document.getElementById("profileDisplayName");
      const displayEmail = document.getElementById("profileDisplayEmail");
      if (displayName) displayName.textContent = customer.name;
      if (displayEmail) displayEmail.textContent = customer.email;
    }
  })();

  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = localStorage.getItem("homefixCurrentUser");
    const data = HomeFixStore.load();
    const customer = data.customers.find(c => c.email === email);
    if (!customer) {
      alert("Demo profile is not connected to a registered customer yet.");
      return;
    }
    customer.name = document.getElementById("profileName").value.trim() || customer.name;
    customer.phone = document.getElementById("profilePhoneInput").value.trim() || customer.phone;
    customer.address = document.getElementById("profileAddressInput").value.trim() || customer.address;
    HomeFixStore.save(data);
    alert("Profile updated successfully.");
  });
}

/* ---------------- REGISTER / LOGIN BRIDGE ---------------- */
const hfRegisterFormBridge = document.getElementById("registerForm");
if (hfRegisterFormBridge) {
  hfRegisterFormBridge.addEventListener("submit", function () {
    setTimeout(function () {
      const name = document.getElementById("fullName").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const phone = document.getElementById("phoneNumber").value.trim();
      const address = document.getElementById("address").value.trim();
      if (!name || !email || !phone) return;
      const data = HomeFixStore.load();
      let customer = data.customers.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (!customer) {
        customer = { id: Date.now(), name, email, phone, address, joined: new Date().toISOString().slice(0,10), status: "Active" };
        data.customers.push(customer);
      } else {
        Object.assign(customer, { name, phone, address });
      }
      HomeFixStore.save(data);
      localStorage.setItem("homefixCurrentUser", email);
    }, 0);
  });
}

const hfLoginFormBridge = document.getElementById("loginForm");
if (hfLoginFormBridge) {
  hfLoginFormBridge.addEventListener("submit", function () {
    setTimeout(function () {
      const email = document.getElementById("loginEmail").value.trim();
      if (email) localStorage.setItem("homefixCurrentUser", email);
    }, 0);
  });
}

/* ---------------- ADMIN LOGIN BRIDGE ---------------- */
const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", function () {
    setTimeout(function () {
      const email = document.getElementById("adminEmail").value.trim();
      const password = document.getElementById("adminPassword").value.trim();
      if (email && password.length >= 6) localStorage.setItem("homefixAdminLoggedIn", "true");
    }, 0);
  });
}
