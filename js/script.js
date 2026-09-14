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


/* ---------------------------------------------------------
   6. BOOKING PAGE (booking.html)
   Reads the selected service from the URL (set by the
   Services or Service Details page), validates the booking
   form, keeps a live "Booking Summary" panel in sync as the
   user types, and - once the form is valid - saves the
   booking to sessionStorage and moves on to payment.html.

   sessionStorage is used here (instead of just redirecting
   with the data in the URL) so the upcoming Payment page can
   read the full booking details without a messy, very long
   URL. It is still 100% frontend-only: nothing is sent to a
   server, and the data disappears once the browser tab closes.
   --------------------------------------------------------- */
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

  // ----- Work out which service was selected -----
  const bookingParams = new URLSearchParams(window.location.search);
  const bookingServiceKey = bookingParams.get("service") || "electrician";
  const bookingService = serviceData[bookingServiceKey] || serviceData["electrician"];

  // Fill in the read-only "Selected Service" box at the top of the form
  document.getElementById("selectedServiceIcon").innerHTML = bookingService.icon;
  document.getElementById("selectedServiceName").textContent = bookingService.name;
  document.getElementById("selectedService").classList.add(bookingService.imageClass);

  // Show the service + price immediately in the summary panel too,
  // since those two values are already known before the user types anything
  document.getElementById("summaryService").textContent = bookingService.name;
  document.getElementById("summaryPrice").textContent = bookingService.price;

  // ----- Form fields -----
  const nameInput = document.getElementById("customerName");
  const phoneInput = document.getElementById("customerPhone");
  const addressInput = document.getElementById("customerAddress");
  const dateInput = document.getElementById("preferredDate");
  const timeInput = document.getElementById("preferredTime");
  const problemInput = document.getElementById("problemDescription");
  const notesInput = document.getElementById("additionalNotes");

  // Don't let the customer pick a date before today
  const todayString = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", todayString);

  // ----- Live summary updates -----
  // Each field updates its matching summary line as the user types,
  // so the summary panel always reflects the current form values.
  function syncSummary(inputEl, summaryId, emptyText) {
    inputEl.addEventListener("input", function () {
      const value = inputEl.value.trim();
      document.getElementById(summaryId).textContent = value === "" ? emptyText : value;
    });
  }

  syncSummary(nameInput, "summaryName", "-");
  syncSummary(phoneInput, "summaryPhone", "-");
  syncSummary(addressInput, "summaryAddress", "-");
  syncSummary(problemInput, "summaryProblem", "-");

  dateInput.addEventListener("input", function () {
    document.getElementById("summaryDate").textContent = dateInput.value === "" ? "-" : dateInput.value;
  });

  timeInput.addEventListener("input", function () {
    document.getElementById("summaryTime").textContent = timeInput.value === "" ? "-" : timeInput.value;
  });

  // ----- Validation + submit -----
  const phonePattern = /^[0-9]{10,15}$/;

  function showFieldError(inputEl, errorEl, message) {
    inputEl.classList.add("invalid");
    errorEl.textContent = message;
  }

  function clearFieldError(inputEl, errorEl) {
    inputEl.classList.remove("invalid");
    errorEl.textContent = "";
  }

  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    document.getElementById("bookingSuccess").textContent = "";

    const nameError = document.getElementById("customerNameError");
    const phoneError = document.getElementById("customerPhoneError");
    const addressError = document.getElementById("customerAddressError");
    const dateError = document.getElementById("preferredDateError");
    const timeError = document.getElementById("preferredTimeError");
    const problemError = document.getElementById("problemDescriptionError");

    // Clear previous errors
    [
      [nameInput, nameError], [phoneInput, phoneError], [addressInput, addressError],
      [dateInput, dateError], [timeInput, timeError], [problemInput, problemError]
    ].forEach(([inputEl, errorEl]) => clearFieldError(inputEl, errorEl));

    // Full Name
    if (nameInput.value.trim() === "") {
      showFieldError(nameInput, nameError, "Please enter your full name.");
      isValid = false;
    }

    // Phone Number
    if (phoneInput.value.trim() === "") {
      showFieldError(phoneInput, phoneError, "Please enter your phone number.");
      isValid = false;
    } else if (!phonePattern.test(phoneInput.value.trim())) {
      showFieldError(phoneInput, phoneError, "Enter a valid phone number (10-15 digits, numbers only).");
      isValid = false;
    }

    // Address
    if (addressInput.value.trim() === "") {
      showFieldError(addressInput, addressError, "Please enter your address.");
      isValid = false;
    }

    // Preferred Date (required + cannot be in the past)
    if (dateInput.value === "") {
      showFieldError(dateInput, dateError, "Please choose a preferred date.");
      isValid = false;
    } else if (dateInput.value < todayString) {
      showFieldError(dateInput, dateError, "Preferred date cannot be in the past.");
      isValid = false;
    }

    // Preferred Time
    if (timeInput.value === "") {
      showFieldError(timeInput, timeError, "Please choose a preferred time.");
      isValid = false;
    }

    // Problem Description
    if (problemInput.value.trim() === "") {
      showFieldError(problemInput, problemError, "Please describe the problem.");
      isValid = false;
    }

    if (!isValid) {
      return; // stop here - do not proceed to payment until all fields are valid
    }

    // ----- Save the booking (frontend-only) and move to Payment -----
    const bookingDetails = {
      service: bookingService.name,
      servicePrice: bookingService.price,
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      address: addressInput.value.trim(),
      date: dateInput.value,
      time: timeInput.value,
      problem: problemInput.value.trim(),
      notes: notesInput.value.trim()
    };

    // Save to sessionStorage so payment.html can read it back
    sessionStorage.setItem("homefixBooking", JSON.stringify(bookingDetails));

    document.getElementById("bookingSuccess").textContent = "Booking details saved! Redirecting to payment...";

    // Short delay so the success message is visible before navigating away
    setTimeout(function () {
      window.location.href = "payment.html";
    }, 800);
  });
}


/* ---------------------------------------------------------
   7. PAYMENT PAGE (payment.html)
   Reads the booking saved in sessionStorage by booking.html,
   displays it as a summary, calculates a total, and handles
   payment method selection + validation. This is a FRONTEND
   SIMULATION ONLY - no real payment gateway is contacted.
   --------------------------------------------------------- */
const paymentFormSection = document.getElementById("paymentFormSection");

if (paymentFormSection) {

  const noBookingState = document.getElementById("noBookingState");
  const paymentConfirmation = document.getElementById("paymentConfirmation");

  // ----- Load the booking saved by booking.html -----
  const savedBooking = sessionStorage.getItem("homefixBooking");

  if (!savedBooking) {
    // No booking was found in this browser session - guide the user back
    paymentFormSection.hidden = true;
    noBookingState.hidden = false;
  } else {

    const booking = JSON.parse(savedBooking);

    // ----- Fill in the booking summary + customer info -----
    document.getElementById("paySummaryService").textContent = booking.service;
    document.getElementById("paySummaryDate").textContent = booking.date;
    document.getElementById("paySummaryTime").textContent = booking.time;
    document.getElementById("paySummaryProblem").textContent = booking.problem;

    document.getElementById("paySummaryName").textContent = booking.name;
    document.getElementById("paySummaryPhone").textContent = booking.phone;
    document.getElementById("paySummaryAddress").textContent = booking.address;

    // ----- Work out the service charge and total -----
    // booking.servicePrice looks like "Starting at ৳500", so we pull out
    // just the number using a simple regular expression.
    const priceMatch = booking.servicePrice.match(/[0-9]+/);
    const serviceCharge = priceMatch ? parseInt(priceMatch[0], 10) : 0;
    const platformFee = 50; // flat demo platform fee
    const totalAmount = serviceCharge + platformFee;

    document.getElementById("payServiceCharge").textContent = "৳" + serviceCharge;
    document.getElementById("payPlatformFee").textContent = "৳" + platformFee;
    document.getElementById("payTotalAmount").textContent = "৳" + totalAmount;

    // ----- Payment method selection -----
    const methodCards = document.querySelectorAll(".method-card");
    const mobileFields = document.getElementById("mobileFields");
    const cardFields = document.getElementById("cardFields");
    const cashNote = document.getElementById("cashNote");

    function updateMethodView() {
      const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

      // Highlight the selected card
      methodCards.forEach(function (card) {
        card.classList.toggle("selected", card.dataset.method === selectedMethod);
      });

      // Show only the fields relevant to the selected method
      mobileFields.hidden = selectedMethod !== "mobile";
      cardFields.hidden = selectedMethod !== "card";
      cashNote.hidden = selectedMethod !== "cash";
    }

    methodCards.forEach(function (card) {
      card.querySelector('input[type="radio"]').addEventListener("change", updateMethodView);
    });

    updateMethodView(); // set the correct initial state (Cash is checked by default)

    // ----- Validation + Confirm Payment -----
    const paymentForm = document.getElementById("paymentForm");
    const phonePattern = /^[0-9]{10,15}$/;

    function showFieldError(inputEl, errorEl, message) {
      inputEl.classList.add("invalid");
      errorEl.textContent = message;
    }

    function clearFieldError(inputEl, errorEl) {
      inputEl.classList.remove("invalid");
      errorEl.textContent = "";
    }

    paymentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
      let isValid = true;

      document.getElementById("paymentPageError").textContent = "";

      if (selectedMethod === "mobile") {
        const mobileInput = document.getElementById("mobileNumber");
        const mobileError = document.getElementById("mobileNumberError");
        clearFieldError(mobileInput, mobileError);

        if (mobileInput.value.trim() === "") {
          showFieldError(mobileInput, mobileError, "Please enter your mobile banking number.");
          isValid = false;
        } else if (!phonePattern.test(mobileInput.value.trim())) {
          showFieldError(mobileInput, mobileError, "Enter a valid number (10-15 digits).");
          isValid = false;
        }
      }

      if (selectedMethod === "card") {
        const cardNumberInput = document.getElementById("cardNumber");
        const cardExpiryInput = document.getElementById("cardExpiry");
        const cardCvcInput = document.getElementById("cardCvc");

        const cardNumberError = document.getElementById("cardNumberError");
        const cardExpiryError = document.getElementById("cardExpiryError");
        const cardCvcError = document.getElementById("cardCvcError");

        clearFieldError(cardNumberInput, cardNumberError);
        clearFieldError(cardExpiryInput, cardExpiryError);
        clearFieldError(cardCvcInput, cardCvcError);

        // Basic checks only - this is a simulation, not a real payment form
        const digitsOnly = cardNumberInput.value.replace(/\s/g, "");
        if (digitsOnly === "") {
          showFieldError(cardNumberInput, cardNumberError, "Please enter your card number.");
          isValid = false;
        } else if (!/^[0-9]{13,16}$/.test(digitsOnly)) {
          showFieldError(cardNumberInput, cardNumberError, "Enter a valid 13-16 digit card number.");
          isValid = false;
        }

        if (cardExpiryInput.value.trim() === "") {
          showFieldError(cardExpiryInput, cardExpiryError, "Required.");
          isValid = false;
        } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(cardExpiryInput.value.trim())) {
          showFieldError(cardExpiryInput, cardExpiryError, "Use MM/YY format.");
          isValid = false;
        }

        if (cardCvcInput.value.trim() === "") {
          showFieldError(cardCvcInput, cardCvcError, "Required.");
          isValid = false;
        } else if (!/^[0-9]{3}$/.test(cardCvcInput.value.trim())) {
          showFieldError(cardCvcInput, cardCvcError, "Enter a 3-digit CVC.");
          isValid = false;
        }
      }

      // Cash on Service has no extra fields, so it is always valid at this point

      if (!isValid) {
        document.getElementById("paymentPageError").textContent = "Please fix the highlighted fields.";
        return;
      }

      // ----- "Process" the payment (simulation only) -----
      const methodLabels = {
        cash: "Cash on Service",
        mobile: "Mobile Banking",
        card: "Card"
      };

      const referenceNumber = "HMFX-" + Date.now().toString().slice(-6);

      // Save the payment result so a future Booking Status / Dashboard
      // page can read it back the same way this page read the booking.
      const paymentRecord = {
        reference: referenceNumber,
        service: booking.service,
        method: methodLabels[selectedMethod],
        amount: totalAmount,
        status: "Pending"
      };
      sessionStorage.setItem("homefixPayment", JSON.stringify(paymentRecord));

      // ----- Show the confirmation screen -----
      document.getElementById("confirmReference").textContent = referenceNumber;
      document.getElementById("confirmService").textContent = booking.service;
      document.getElementById("confirmMethod").textContent = methodLabels[selectedMethod];
      document.getElementById("confirmAmount").textContent = "৳" + totalAmount;

      paymentFormSection.hidden = true;
      paymentConfirmation.hidden = false;
      window.scrollTo(0, 0);
    });
  }
}


/* ---------------------------------------------------------
   8. CUSTOMER DASHBOARD (dashboard.html)
   Shows sample/demo booking + payment data using plain
   JavaScript objects and arrays (no backend, no database).

   If the visitor just went through booking.html and
   payment.html in this same browser session, their real
   demo booking (saved in sessionStorage) is shown as the
   "Current Booking" - otherwise a sample booking is used
   instead, so the dashboard never looks empty.
   --------------------------------------------------------- */
const welcomeHeading = document.getElementById("welcomeHeading");

if (welcomeHeading) {

  // ----- Demo customer profile -----
  const demoCustomer = {
    name: "Rafiul Karim",
    email: "rafiul.karim@example.com",
    phone: "01712345678"
  };

  // ----- Demo booking history (sample data) -----
  // Each booking has a unique id, service, date, and status.
  const demoBookingHistory = [
    { id: "HMFX-118420", service: "Home Cleaning", date: "2026-09-02", status: "Completed" },
    { id: "HMFX-118266", service: "Plumber", date: "2026-08-21", status: "Completed" },
    { id: "HMFX-117950", service: "Electrician", date: "2026-08-05", status: "Completed" }
  ];

  // ----- Demo payment records (sample data) -----
  const demoPayments = [
    { reference: "HMFX-118420", amount: 1050, method: "Mobile Banking", status: "Paid" },
    { reference: "HMFX-118266", amount: 500, method: "Cash on Service", status: "Paid" },
    { reference: "HMFX-117950", amount: 550, method: "Card", status: "Paid" }
  ];

  // ----- Check if a real booking/payment exists from this session -----
  const savedBooking = sessionStorage.getItem("homefixBooking");
  const savedPayment = sessionStorage.getItem("homefixPayment");

  let currentBooking;
  let customer = demoCustomer;

  if (savedBooking && savedPayment) {
    // A real demo booking was just made - use it as the current booking
    const booking = JSON.parse(savedBooking);
    const payment = JSON.parse(savedPayment);

    currentBooking = {
      id: payment.reference,
      service: booking.service,
      date: booking.date,
      status: payment.status, // "Pending" right after payment
      time: booking.time,
      address: booking.address,
      phone: booking.phone,
      problem: booking.problem
    };

    // Personalize the profile card with the real name/phone that was entered
    customer = {
      name: booking.name,
      email: demoCustomer.email, // email wasn't collected on the booking form
      phone: booking.phone
    };

    // Add this new booking + payment to the top of the demo lists,
    // so "Booking History" and "Payment Information" include it too
    demoBookingHistory.unshift(currentBooking);
    demoPayments.unshift({
      reference: payment.reference,
      amount: payment.amount,
      method: payment.method,
      status: "Paid"
    });

  } else {
    // No real booking yet this session - use the most recent demo booking instead
    currentBooking = {
      id: "HMFX-118420",
      service: "Home Cleaning",
      date: "2026-09-02",
      status: "Assigned",
      time: "10:00",
      address: "House 12, Road 4, Dhanmondi, Dhaka",
      phone: "01712345678",
      problem: "Full apartment deep cleaning before guests arrive."
    };
  }

  // ----- 1. Welcome section -----
  const firstName = customer.name.split(" ")[0];
  welcomeHeading.textContent = "Welcome back, " + firstName + "!";

  // ----- 2. Profile summary -----
  document.getElementById("profileName").textContent = customer.name;
  document.getElementById("profileEmail").textContent = customer.email;
  document.getElementById("profilePhone").textContent = customer.phone;

  // Build initials for the avatar circle (e.g. "Rafiul Karim" -> "RK")
  const initials = customer.name
    .split(" ")
    .map(function (part) { return part.charAt(0); })
    .join("")
    .slice(0, 2)
    .toUpperCase();
  document.getElementById("profileAvatar").textContent = initials;

  // ----- 3 & 4. Current booking + status tracker -----
  document.getElementById("currentBookingService").textContent = currentBooking.service;
  document.getElementById("currentBookingDate").textContent = currentBooking.date;
  document.getElementById("currentBookingRef").textContent = currentBooking.id;

  const badgeClassMap = {
    "Pending": "badge-pending",
    "Assigned": "badge-assigned",
    "Completed": "badge-completed"
  };

  const currentBookingBadge = document.getElementById("currentBookingBadge");
  currentBookingBadge.textContent = currentBooking.status;
  currentBookingBadge.classList.add(badgeClassMap[currentBooking.status]);

  // Highlight every step up to and including the current status
  const statusOrder = ["Pending", "Assigned", "Completed"];
  const currentStepIndex = statusOrder.indexOf(currentBooking.status);

  document.querySelectorAll("#statusTracker .status-step").forEach(function (stepEl) {
    const stepIndex = statusOrder.indexOf(stepEl.dataset.step);
    if (stepIndex <= currentStepIndex) {
      stepEl.classList.add("status-complete");
    }
  });

  // ----- 5. Booking history table -----
  const bookingHistoryBody = document.getElementById("bookingHistoryBody");

  demoBookingHistory.forEach(function (booking) {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + booking.service + "</td>" +
      "<td>" + booking.date + "</td>" +
      "<td><span class='badge " + badgeClassMap[booking.status] + "'>" + booking.status + "</span></td>" +
      "<td><a href='dashboard.html' class='link-muted'>View</a></td>";
    bookingHistoryBody.appendChild(row);
  });

  // ----- 6. Payment information table -----
  const paymentInfoBody = document.getElementById("paymentInfoBody");

  demoPayments.forEach(function (payment) {
    const row = document.createElement("tr");
    row.innerHTML =
      "<td>" + payment.reference + "</td>" +
      "<td>৳" + payment.amount + "</td>" +
      "<td>" + payment.method + "</td>" +
      "<td><span class='badge badge-completed'>" + payment.status + "</span></td>";
    paymentInfoBody.appendChild(row);
  });

  // ----- Log Out button -----
  // Clears this demo session's booking/payment data and returns to the homepage.
  document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("homefixBooking");
    sessionStorage.removeItem("homefixPayment");
    window.location.href = "index.html";
  });
}


/* ---------------------------------------------------------
   9. ADMIN PANEL (admin.html)
   This one block powers the entire single-page admin panel:
   sidebar section switching, the Dashboard overview, and all
   5 management sections (Customers, Providers, Categories,
   Bookings, Payments) with a shared popup for View/Edit/Assign.

   Everything is a plain JavaScript array - there is no backend
   or database, so add/edit/delete/assign actions only last
   until the page is refreshed. That is expected for a
   frontend-only demo.
   --------------------------------------------------------- */
const adminNav = document.getElementById("adminNav");

if (adminNav) {

  /* ============ DEMO DATA ============ */

  const categoriesData = [
    { id: 1, name: "Electrician", description: "Wiring, fixtures, and electrical repairs.", price: 500 },
    { id: 2, name: "Plumber", description: "Leak fixes, pipe installation, drainage.", price: 450 },
    { id: 3, name: "AC Repair", description: "Servicing, repair, and installation.", price: 800 },
    { id: 4, name: "Carpenter", description: "Furniture repair, fittings, woodwork.", price: 600 },
    { id: 5, name: "Home Cleaning", description: "Deep cleaning, move-in/move-out.", price: 1000 }
  ];

  const providersData = [
    { id: 1, name: "Kamal Hossain", category: "Electrician", phone: "01711111111", availability: "Available" },
    { id: 2, name: "Jashim Uddin", category: "Plumber", phone: "01733333333", availability: "Busy" },
    { id: 3, name: "Abdul Karim", category: "AC Repair", phone: "01744444444", availability: "Available" },
    { id: 4, name: "Mizanur Rahman", category: "Carpenter", phone: "01755555555", availability: "Available" },
    { id: 5, name: "Salma Begum", category: "Home Cleaning", phone: "01722222222", availability: "Available" },
    { id: 6, name: "Rina Akter", category: "Home Cleaning", phone: "01766666666", availability: "Busy" }
  ];

  const customersData = [
    { id: 1, name: "Rafiul Karim", phone: "01712345678", email: "rafiul@example.com", bookings: 4, joined: "2026-03-12" },
    { id: 2, name: "Nusrat Jahan", phone: "01798765432", email: "nusrat@example.com", bookings: 2, joined: "2026-04-02" },
    { id: 3, name: "Tanvir Ahmed", phone: "01711223344", email: "tanvir@example.com", bookings: 6, joined: "2026-02-18" },
    { id: 4, name: "Farhana Akter", phone: "01755667788", email: "farhana@example.com", bookings: 1, joined: "2026-06-25" },
    { id: 5, name: "Shakil Hossain", phone: "01799887766", email: "shakil@example.com", bookings: 3, joined: "2026-05-09" }
  ];

  const bookingsData = [
    { id: "HMFX-11842", customer: "Rafiul Karim", service: "AC Repair", date: "2026-09-08", status: "Pending", provider: null, address: "House 12, Road 4, Dhanmondi", problem: "AC not cooling properly." },
    { id: "HMFX-11841", customer: "Nusrat Jahan", service: "Plumber", date: "2026-09-07", status: "Assigned", provider: "Jashim Uddin", address: "Flat 3B, Green Road", problem: "Leaking kitchen pipe." },
    { id: "HMFX-11840", customer: "Tanvir Ahmed", service: "Home Cleaning", date: "2026-09-05", status: "Completed", provider: "Salma Begum", address: "House 7, Banani", problem: "Full apartment deep clean." },
    { id: "HMFX-11839", customer: "Farhana Akter", service: "Electrician", date: "2026-09-04", status: "Completed", provider: "Kamal Hossain", address: "House 21, Uttara", problem: "Switchboard sparking." },
    { id: "HMFX-11838", customer: "Shakil Hossain", service: "Carpenter", date: "2026-09-03", status: "Pending", provider: null, address: "House 9, Mirpur", problem: "Wardrobe door hinge broken." },
    { id: "HMFX-11837", customer: "Rafiul Karim", service: "AC Repair", date: "2026-09-02", status: "Assigned", provider: "Abdul Karim", address: "House 12, Road 4, Dhanmondi", problem: "Gas refill needed." },
    { id: "HMFX-11836", customer: "Nusrat Jahan", service: "Plumber", date: "2026-09-01", status: "Completed", provider: "Jashim Uddin", address: "Flat 3B, Green Road", problem: "Bathroom drain blocked." },
    { id: "HMFX-11835", customer: "Tanvir Ahmed", service: "Home Cleaning", date: "2026-08-30", status: "Completed", provider: "Rina Akter", address: "House 7, Banani", problem: "Move-out cleaning." }
  ];

  // One payment record per booking above, so the Payments ledger
  // always matches what's in Manage Bookings.
  const paymentMethods = ["Cash on Service", "Mobile Banking", "Card"];
  const categoryPriceMap = {};
  categoriesData.forEach(function (cat) { categoryPriceMap[cat.name] = cat.price; });

  const paymentsData = bookingsData.map(function (booking, index) {
    return {
      reference: booking.id,
      customer: booking.customer,
      amount: (categoryPriceMap[booking.service] || 500) + 50, // + flat platform fee
      method: paymentMethods[index % paymentMethods.length],
      status: booking.status === "Pending" ? "Pending" : "Paid"
    };
  });

  const badgeClassMap = { "Pending": "badge-pending", "Assigned": "badge-assigned", "Completed": "badge-completed" };
  const totalCustomers = 96;  // padded demo totals - larger than the sample rows above
  const totalProviders = 27;
  const totalPaymentsAmount = 142600;


  /* ============ SECTION SWITCHING (sidebar) ============ */
  const sections = document.querySelectorAll(".admin-section");

  function showSection(sectionName) {
    sections.forEach(function (sec) {
      sec.classList.toggle("active", sec.id === "section-" + sectionName);
    });
    document.querySelectorAll("[data-section]").forEach(function (link) {
      link.classList.toggle("active", link.dataset.section === sectionName);
    });
    window.scrollTo(0, 0);
  }

  // Both the sidebar links and the dashboard's "View all" shortcut use data-section
  document.querySelectorAll("[data-section]").forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      showSection(trigger.dataset.section);
    });
  });


  /* ============ SHARED MODAL (used by every View / Edit / Assign) ============ */
  const modal = document.getElementById("adminModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  function openModal(title, bodyHtml) {
    modalTitle.textContent = title;
    modalBody.innerHTML = bodyHtml;
    modal.hidden = false;
  }

  function closeModal() {
    modal.hidden = true;
  }

  document.getElementById("modalCloseBtn").addEventListener("click", closeModal);
  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal(); // clicking the dark backdrop closes it
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });


  /* ============ 1. DASHBOARD OVERVIEW ============ */
  function renderDashboard() {
    const pendingCount = bookingsData.filter(b => b.status === "Pending").length;
    const assignedCount = bookingsData.filter(b => b.status === "Assigned").length;
    const completedCount = bookingsData.filter(b => b.status === "Completed").length;
    const totalBookings = bookingsData.length;

    document.getElementById("statCustomers").textContent = totalCustomers;
    document.getElementById("statProviders").textContent = totalProviders;
    document.getElementById("statTotalBookings").textContent = totalBookings;
    document.getElementById("statPending").textContent = pendingCount;
    document.getElementById("statCompleted").textContent = completedCount;
    document.getElementById("statPayments").textContent = "৳" + totalPaymentsAmount.toLocaleString();

    const recentBody = document.getElementById("recentBookingsBody");
    recentBody.innerHTML = "";
    bookingsData.slice(0, 5).forEach(function (b) {
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + b.id + "</td><td>" + b.customer + "</td><td>" + b.service + "</td><td>" + b.date + "</td>" +
        "<td><span class='badge " + badgeClassMap[b.status] + "'>" + b.status + "</span></td>";
      recentBody.appendChild(row);
    });

    const statusOverview = document.getElementById("statusOverview");
    statusOverview.innerHTML = "";
    [
      { label: "Pending", count: pendingCount, color: "#945A16" },
      { label: "Assigned", count: assignedCount, color: "#107E71" },
      { label: "Completed", count: completedCount, color: "#227644" }
    ].forEach(function (status) {
      const percent = totalBookings === 0 ? 0 : Math.round((status.count / totalBookings) * 100);
      const row = document.createElement("div");
      row.className = "status-bar-row";
      row.innerHTML =
        "<div class='status-bar-label'><span>" + status.label + "</span><span>" + status.count + " (" + percent + "%)</span></div>" +
        "<div class='status-bar-track'><div class='status-bar-fill' style='width:" + percent + "%; background-color:" + status.color + ";'></div></div>";
      statusOverview.appendChild(row);
    });
  }


  /* ============ 2. MANAGE CUSTOMERS ============ */
  function renderCustomers() {
    const body = document.getElementById("customersBody");
    body.innerHTML = "";
    customersData.forEach(function (c) {
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + c.name + "</td><td>" + c.phone + "</td><td>" + c.email + "</td><td>" + c.bookings + "</td><td>" + c.joined + "</td>" +
        "<td class='table-actions'>" +
          "<button class='row-btn row-btn-view' data-action='view-customer' data-id='" + c.id + "'>View</button>" +
          "<button class='row-btn row-btn-delete' data-action='delete-customer' data-id='" + c.id + "'>Delete</button>" +
        "</td>";
      body.appendChild(row);
    });
  }

  document.getElementById("customersBody").addEventListener("click", function (event) {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const customer = customersData.find(function (c) { return c.id === id; });

    if (btn.dataset.action === "view-customer") {
      openModal("Customer Details",
        "<div class='summary-row'><span>Name</span><span>" + customer.name + "</span></div>" +
        "<div class='summary-row'><span>Phone</span><span>" + customer.phone + "</span></div>" +
        "<div class='summary-row'><span>Email</span><span>" + customer.email + "</span></div>" +
        "<div class='summary-row'><span>Total Bookings</span><span>" + customer.bookings + "</span></div>" +
        "<div class='summary-row'><span>Joined</span><span>" + customer.joined + "</span></div>"
      );
    }

    if (btn.dataset.action === "delete-customer") {
      if (confirm("Remove " + customer.name + " from HomeFix? This cannot be undone.")) {
        customersData.splice(customersData.findIndex(function (c) { return c.id === id; }), 1);
        renderCustomers();
      }
    }
  });


  /* ============ 3. MANAGE SERVICE PROVIDERS ============ */
  function renderProviders() {
    const body = document.getElementById("providersBody");
    body.innerHTML = "";
    providersData.forEach(function (p) {
      const availabilityClass = p.availability === "Available" ? "badge-completed" : "badge-pending";
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + p.name + "</td><td>" + p.category + "</td><td>" + p.phone + "</td>" +
        "<td><span class='badge " + availabilityClass + "'>" + p.availability + "</span></td>" +
        "<td class='table-actions'>" +
          "<button class='row-btn row-btn-view' data-action='view-provider' data-id='" + p.id + "'>View</button>" +
          "<button class='row-btn row-btn-edit' data-action='edit-provider' data-id='" + p.id + "'>Edit</button>" +
          "<button class='row-btn row-btn-delete' data-action='delete-provider' data-id='" + p.id + "'>Delete</button>" +
        "</td>";
      body.appendChild(row);
    });
  }

  function providerFormHtml(provider) {
    const categoryOptions = categoriesData.map(function (cat) {
      const selected = provider && provider.category === cat.name ? "selected" : "";
      return "<option value='" + cat.name + "' " + selected + ">" + cat.name + "</option>";
    }).join("");

    return "" +
      "<div class='form-field'><label>Name</label><input type='text' id='formProviderName' value='" + (provider ? provider.name : "") + "'></div>" +
      "<div class='form-field'><label>Category</label><select id='formProviderCategory'>" + categoryOptions + "</select></div>" +
      "<div class='form-field'><label>Phone</label><input type='text' id='formProviderPhone' value='" + (provider ? provider.phone : "") + "'></div>" +
      "<div class='form-field'><label>Availability</label>" +
        "<select id='formProviderAvailability'>" +
          "<option " + (provider && provider.availability === "Available" ? "selected" : "") + ">Available</option>" +
          "<option " + (provider && provider.availability === "Busy" ? "selected" : "") + ">Busy</option>" +
        "</select>" +
      "</div>" +
      "<button type='button' class='btn btn-primary btn-block' id='saveProviderBtn' data-id='" + (provider ? provider.id : "") + "'>Save Provider</button>";
  }

  document.getElementById("addProviderBtn").addEventListener("click", function () {
    openModal("Add Provider", providerFormHtml(null));
  });

  document.getElementById("providersBody").addEventListener("click", function (event) {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const provider = providersData.find(function (p) { return p.id === id; });

    if (btn.dataset.action === "view-provider") {
      openModal("Provider Details",
        "<div class='summary-row'><span>Name</span><span>" + provider.name + "</span></div>" +
        "<div class='summary-row'><span>Category</span><span>" + provider.category + "</span></div>" +
        "<div class='summary-row'><span>Phone</span><span>" + provider.phone + "</span></div>" +
        "<div class='summary-row'><span>Availability</span><span>" + provider.availability + "</span></div>"
      );
    }

    if (btn.dataset.action === "edit-provider") {
      openModal("Edit Provider", providerFormHtml(provider));
    }

    if (btn.dataset.action === "delete-provider") {
      if (confirm("Remove " + provider.name + " from your provider list?")) {
        providersData.splice(providersData.findIndex(function (p) { return p.id === id; }), 1);
        renderProviders();
      }
    }
  });


  /* ============ 4. MANAGE SERVICE CATEGORIES ============ */
  function renderCategories() {
    const body = document.getElementById("categoriesBody");
    body.innerHTML = "";
    categoriesData.forEach(function (cat) {
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + cat.name + "</td><td>" + cat.description + "</td><td>৳" + cat.price + "</td>" +
        "<td class='table-actions'>" +
          "<button class='row-btn row-btn-edit' data-action='edit-category' data-id='" + cat.id + "'>Edit</button>" +
          "<button class='row-btn row-btn-delete' data-action='delete-category' data-id='" + cat.id + "'>Delete</button>" +
        "</td>";
      body.appendChild(row);
    });
  }

  function categoryFormHtml(category) {
    return "" +
      "<div class='form-field'><label>Category Name</label><input type='text' id='formCategoryName' value='" + (category ? category.name : "") + "'></div>" +
      "<div class='form-field'><label>Description</label><textarea id='formCategoryDescription' rows='2'>" + (category ? category.description : "") + "</textarea></div>" +
      "<div class='form-field'><label>Base Price (৳)</label><input type='number' id='formCategoryPrice' value='" + (category ? category.price : "") + "'></div>" +
      "<button type='button' class='btn btn-primary btn-block' id='saveCategoryBtn' data-id='" + (category ? category.id : "") + "'>Save Category</button>";
  }

  document.getElementById("addCategoryBtn").addEventListener("click", function () {
    openModal("Add Category", categoryFormHtml(null));
  });

  document.getElementById("categoriesBody").addEventListener("click", function (event) {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const category = categoriesData.find(function (c) { return c.id === id; });

    if (btn.dataset.action === "edit-category") {
      openModal("Edit Category", categoryFormHtml(category));
    }

    if (btn.dataset.action === "delete-category") {
      if (confirm("Remove the " + category.name + " category? Customers won't be able to book it anymore.")) {
        categoriesData.splice(categoriesData.findIndex(function (c) { return c.id === id; }), 1);
        renderCategories();
      }
    }
  });


  /* ============ 5. MANAGE BOOKINGS ============ */
  function renderBookings() {
    const body = document.getElementById("bookingsBody");
    body.innerHTML = "";

    bookingsData.forEach(function (b) {
      let actionButtons = "<button class='row-btn row-btn-view' data-action='view-booking' data-id='" + b.id + "'>View</button>";

      if (b.status !== "Completed") {
        actionButtons += "<button class='row-btn row-btn-assign' data-action='assign-booking' data-id='" + b.id + "'>Assign</button>";
      }
      if (b.status === "Assigned") {
        actionButtons += "<button class='row-btn row-btn-status' data-action='complete-booking' data-id='" + b.id + "'>Mark Completed</button>";
      }

      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + b.id + "</td><td>" + b.customer + "</td><td>" + b.service + "</td><td>" + b.date + "</td>" +
        "<td>" + (b.provider || "Not assigned") + "</td>" +
        "<td><span class='badge " + badgeClassMap[b.status] + "'>" + b.status + "</span></td>" +
        "<td class='table-actions'>" + actionButtons + "</td>";
      body.appendChild(row);
    });
  }

  function assignFormHtml(booking) {
    // Prefer providers who match this booking's service category
    const matching = providersData.filter(function (p) { return p.category === booking.service; });
    const list = matching.length ? matching : providersData;

    const options = list.map(function (p) {
      const selected = p.name === booking.provider ? "selected" : "";
      return "<option value='" + p.name + "' " + selected + ">" + p.name + " (" + p.availability + ")</option>";
    }).join("");

    return "" +
      "<div class='summary-row'><span>Booking</span><span>" + booking.id + "</span></div>" +
      "<div class='summary-row'><span>Service</span><span>" + booking.service + "</span></div>" +
      "<div class='form-field' style='margin-top:16px;'><label>Choose a Provider</label><select id='formAssignProvider'>" + options + "</select></div>" +
      "<button type='button' class='btn btn-primary btn-block' id='confirmAssignBtn' data-id='" + booking.id + "'>Confirm Assignment</button>";
  }

  document.getElementById("bookingsBody").addEventListener("click", function (event) {
    const btn = event.target.closest("button[data-action]");
    if (!btn) return;
    const id = btn.dataset.id;
    const booking = bookingsData.find(function (b) { return b.id === id; });

    if (btn.dataset.action === "view-booking") {
      openModal("Booking Details",
        "<div class='summary-row'><span>Booking ID</span><span>" + booking.id + "</span></div>" +
        "<div class='summary-row'><span>Customer</span><span>" + booking.customer + "</span></div>" +
        "<div class='summary-row'><span>Service</span><span>" + booking.service + "</span></div>" +
        "<div class='summary-row'><span>Date</span><span>" + booking.date + "</span></div>" +
        "<div class='summary-row'><span>Address</span><span>" + booking.address + "</span></div>" +
        "<div class='summary-row'><span>Problem</span><span>" + booking.problem + "</span></div>" +
        "<div class='summary-row'><span>Provider</span><span>" + (booking.provider || "Not assigned") + "</span></div>" +
        "<div class='summary-row'><span>Status</span><span class='badge " + badgeClassMap[booking.status] + "'>" + booking.status + "</span></div>"
      );
    }

    if (btn.dataset.action === "assign-booking") {
      openModal("Assign Service Provider", assignFormHtml(booking));
    }

    if (btn.dataset.action === "complete-booking") {
      if (confirm("Mark booking " + booking.id + " as Completed?")) {
        booking.status = "Completed";
        // Keep the Payments ledger in sync: a completed job's payment is settled
        const payment = paymentsData.find(function (p) { return p.reference === booking.id; });
        if (payment) payment.status = "Paid";

        renderBookings();
        renderDashboard();
        renderPayments();
      }
    }
  });


  /* ============ 6. PAYMENT INFORMATION (read-only) ============ */
  function renderPayments() {
    const body = document.getElementById("paymentsBody");
    body.innerHTML = "";
    paymentsData.forEach(function (p) {
      const statusClass = p.status === "Paid" ? "badge-completed" : "badge-pending";
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + p.reference + "</td><td>" + p.customer + "</td><td>৳" + p.amount + "</td><td>" + p.method + "</td>" +
        "<td><span class='badge " + statusClass + "'>" + p.status + "</span></td>" +
        "<td><button class='row-btn row-btn-view' data-action='view-payment' data-id='" + p.reference + "'>View</button></td>";
      body.appendChild(row);
    });
  }

  document.getElementById("paymentsBody").addEventListener("click", function (event) {
    const btn = event.target.closest("button[data-action='view-payment']");
    if (!btn) return;
    const payment = paymentsData.find(function (p) { return p.reference === btn.dataset.id; });

    openModal("Payment Details",
      "<div class='summary-row'><span>Reference</span><span>" + payment.reference + "</span></div>" +
      "<div class='summary-row'><span>Customer</span><span>" + payment.customer + "</span></div>" +
      "<div class='summary-row'><span>Amount</span><span>৳" + payment.amount + "</span></div>" +
      "<div class='summary-row'><span>Method</span><span>" + payment.method + "</span></div>" +
      "<div class='summary-row'><span>Status</span><span class='badge " + (payment.status === "Paid" ? "badge-completed" : "badge-pending") + "'>" + payment.status + "</span></div>"
    );
  });


  /* ============ SAVE HANDLERS FOR MODAL FORMS ============
     One listener on the modal body covers every form's Save
     button, since the buttons are re-created each time the
     modal opens (a fresh listener each time would stack up). */
  modalBody.addEventListener("click", function (event) {

    // Save Provider (used by both Add and Edit)
    if (event.target.id === "saveProviderBtn") {
      const idValue = event.target.dataset.id;
      const name = document.getElementById("formProviderName").value.trim();
      const category = document.getElementById("formProviderCategory").value;
      const phone = document.getElementById("formProviderPhone").value.trim();
      const availability = document.getElementById("formProviderAvailability").value;

      if (name === "" || phone === "") {
        alert("Please fill in both name and phone.");
        return;
      }

      if (idValue === "") {
        const newId = providersData.length ? Math.max.apply(null, providersData.map(function (p) { return p.id; })) + 1 : 1;
        providersData.push({ id: newId, name: name, category: category, phone: phone, availability: availability });
      } else {
        const provider = providersData.find(function (p) { return p.id === Number(idValue); });
        provider.name = name;
        provider.category = category;
        provider.phone = phone;
        provider.availability = availability;
      }

      renderProviders();
      closeModal();
    }

    // Save Category (used by both Add and Edit)
    if (event.target.id === "saveCategoryBtn") {
      const idValue = event.target.dataset.id;
      const name = document.getElementById("formCategoryName").value.trim();
      const description = document.getElementById("formCategoryDescription").value.trim();
      const price = Number(document.getElementById("formCategoryPrice").value);

      if (name === "" || !price || price <= 0) {
        alert("Please enter a valid name and price.");
        return;
      }

      if (idValue === "") {
        const newId = categoriesData.length ? Math.max.apply(null, categoriesData.map(function (c) { return c.id; })) + 1 : 1;
        categoriesData.push({ id: newId, name: name, description: description, price: price });
      } else {
        const category = categoriesData.find(function (c) { return c.id === Number(idValue); });
        category.name = name;
        category.description = description;
        category.price = price;
      }

      renderCategories();
      closeModal();
    }

    // Confirm Assign Provider
    if (event.target.id === "confirmAssignBtn") {
      const bookingId = event.target.dataset.id;
      const booking = bookingsData.find(function (b) { return b.id === bookingId; });
      const chosenProvider = document.getElementById("formAssignProvider").value;

      booking.provider = chosenProvider;
      booking.status = "Assigned"; // assigning a provider moves the booking forward

      renderBookings();
      renderDashboard();
      closeModal();
    }
  });


  /* ============ LOG OUT ============ */
  document.getElementById("adminLogoutBtn").addEventListener("click", function () {
    window.location.href = "admin-login.html";
  });


  /* ============ INITIAL RENDER ============ */
  renderDashboard();
  renderCustomers();
  renderProviders();
  renderCategories();
  renderBookings();
  renderPayments();
}


/* ---------------------------------------------------------
   10. CUSTOMER PROFILE PAGE (profile.html)
   Reuses the same demo-customer / real-booking resolution
   pattern as the Dashboard (section 8) so the two pages show
   the same person consistently. "Save Changes" is a frontend
   demo only - there is no backend, so it just confirms the
   values on screen.
   --------------------------------------------------------- */
const profileForm = document.getElementById("profileForm");

if (profileForm) {

  const demoProfile = {
    name: "Rafiul Karim",
    email: "rafiul.karim@example.com",
    phone: "01712345678",
    address: "House 12, Road 4, Dhanmondi, Dhaka"
  };

  // If a real demo booking was made this session, show that person's
  // details instead (same resolution logic as the Dashboard page).
  const savedBooking = sessionStorage.getItem("homefixBooking");
  let profile = demoProfile;

  if (savedBooking) {
    const booking = JSON.parse(savedBooking);
    profile = {
      name: booking.name,
      email: demoProfile.email, // the booking form doesn't collect email
      phone: booking.phone,
      address: booking.address
    };
  }

  // Fill in the summary header
  document.getElementById("profileDisplayName").textContent = profile.name;
  document.getElementById("profileDisplayEmail").textContent = profile.email;

  const initials = profile.name.split(" ").map(function (part) {
    return part.charAt(0);
  }).join("").slice(0, 2).toUpperCase();
  document.getElementById("profileAvatar").textContent = initials;

  // Pre-fill the editable form fields
  document.getElementById("profileName").value = profile.name;
  document.getElementById("profileEmailInput").value = profile.email;
  document.getElementById("profilePhoneInput").value = profile.phone;
  document.getElementById("profileAddressInput").value = profile.address;

  // "Save Changes" - demo only, updates the on-screen summary so the
  // interaction feels real, without pretending to write to a real account.
  profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const updatedName = document.getElementById("profileName").value.trim();
    const updatedEmail = document.getElementById("profileEmailInput").value.trim();

    if (updatedName !== "") {
      document.getElementById("profileDisplayName").textContent = updatedName;
      const newInitials = updatedName.split(" ").map(function (part) {
        return part.charAt(0);
      }).join("").slice(0, 2).toUpperCase();
      document.getElementById("profileAvatar").textContent = newInitials;
    }
    if (updatedEmail !== "") {
      document.getElementById("profileDisplayEmail").textContent = updatedEmail;
    }

    document.getElementById("profileSaveMessage").textContent = "Profile updated (demo only - not saved to a real account).";
  });

  // Log Out - same behavior as the Dashboard's logout button
  document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("homefixBooking");
    sessionStorage.removeItem("homefixPayment");
    window.location.href = "index.html";
  });
}


/* ---------------------------------------------------------
   11. ADMIN LOGIN PAGE (admin-login.html)
   Same frontend-only validation pattern as the customer
   Login form (section 3) - no real authentication, no backend.
   On a valid-looking submission, it simply moves on to the
   admin panel.
   --------------------------------------------------------- */
const adminLoginForm = document.getElementById("adminLoginForm");

if (adminLoginForm) {

  const adminEmailInput = document.getElementById("adminEmail");
  const adminPasswordInput = document.getElementById("adminPassword");
  const adminEmailError = document.getElementById("adminEmailError");
  const adminPasswordError = document.getElementById("adminPasswordError");
  const adminSuccessMsg = document.getElementById("adminLoginSuccess");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    adminEmailInput.classList.remove("invalid");
    adminPasswordInput.classList.remove("invalid");
    adminEmailError.textContent = "";
    adminPasswordError.textContent = "";
    adminSuccessMsg.textContent = "";

    const emailValue = adminEmailInput.value.trim();
    const passwordValue = adminPasswordInput.value.trim();

    if (emailValue === "") {
      adminEmailError.textContent = "Please enter your admin email.";
      adminEmailInput.classList.add("invalid");
      isValid = false;
    } else if (emailValue.includes("@") && !emailPattern.test(emailValue)) {
      adminEmailError.textContent = "Please enter a valid email address.";
      adminEmailInput.classList.add("invalid");
      isValid = false;
    }

    if (passwordValue === "") {
      adminPasswordError.textContent = "Please enter your password.";
      adminPasswordInput.classList.add("invalid");
      isValid = false;
    } else if (passwordValue.length < 6) {
      adminPasswordError.textContent = "Password must be at least 6 characters.";
      adminPasswordInput.classList.add("invalid");
      isValid = false;
    }

    if (isValid) {
      adminSuccessMsg.textContent = "Signed in! Redirecting to the admin panel...";
      setTimeout(function () {
        window.location.href = "admin.html";
      }, 600);
    }
  });
}


/* ---------------------------------------------------------
   12. BOOKING STATUS PAGE (booking-status.html)
   Shows full detail for the customer's current booking. Uses
   the same sessionStorage / demo-fallback resolution pattern
   as the Dashboard (section 8), so it always shows the same
   booking the dashboard's "Current Booking" card shows.
   --------------------------------------------------------- */
const statusService = document.getElementById("statusService");

if (statusService) {

  const savedBookingForStatus = sessionStorage.getItem("homefixBooking");
  const savedPaymentForStatus = sessionStorage.getItem("homefixPayment");

  let statusBooking;

  if (savedBookingForStatus && savedPaymentForStatus) {
    // A real demo booking was made this session - show its real details
    const booking = JSON.parse(savedBookingForStatus);
    const payment = JSON.parse(savedPaymentForStatus);

    statusBooking = {
      id: payment.reference,
      service: booking.service,
      date: booking.date,
      time: booking.time,
      address: booking.address,
      phone: booking.phone,
      problem: booking.problem,
      status: payment.status
    };
  } else {
    // No real booking yet this session - show the same demo booking
    // used as the Dashboard's fallback "Current Booking"
    statusBooking = {
      id: "HMFX-118420",
      service: "Home Cleaning",
      date: "2026-09-02",
      time: "10:00",
      address: "House 12, Road 4, Dhanmondi, Dhaka",
      phone: "01712345678",
      problem: "Full apartment deep cleaning before guests arrive.",
      status: "Assigned"
    };
  }

  document.getElementById("statusService").textContent = statusBooking.service;
  document.getElementById("statusRef").textContent = statusBooking.id;
  document.getElementById("statusDate").textContent = statusBooking.date;
  document.getElementById("statusTime").textContent = statusBooking.time;
  document.getElementById("statusAddress").textContent = statusBooking.address;
  document.getElementById("statusPhone").textContent = statusBooking.phone;
  document.getElementById("statusProblem").textContent = statusBooking.problem;

  const badgeClassMapStatus = {
    "Pending": "badge-pending",
    "Assigned": "badge-assigned",
    "Completed": "badge-completed"
  };
  const statusBadgeEl = document.getElementById("statusBadge");
  statusBadgeEl.textContent = statusBooking.status;
  statusBadgeEl.classList.add(badgeClassMapStatus[statusBooking.status]);

  // Highlight every step up to and including the current status
  const statusOrderForStatus = ["Pending", "Assigned", "Completed"];
  const currentStepIndexForStatus = statusOrderForStatus.indexOf(statusBooking.status);

  document.querySelectorAll("#statusTracker .status-step").forEach(function (stepEl) {
    const stepIndex = statusOrderForStatus.indexOf(stepEl.dataset.step);
    if (stepIndex <= currentStepIndexForStatus) {
      stepEl.classList.add("status-complete");
    }
  });

  // Log Out - same behavior as the Dashboard's logout button
  document.getElementById("logoutBtn").addEventListener("click", function () {
    sessionStorage.removeItem("homefixBooking");
    sessionStorage.removeItem("homefixPayment");
    window.location.href = "index.html";
  });
}
