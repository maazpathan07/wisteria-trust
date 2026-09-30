// Luxury Navigation Scroll Effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    nav.classList.add("scrolled")
  } else {
    nav.classList.remove("scrolled")
  }
})

// Mobile Menu Toggle
const menuBtn = document.getElementById("menuBtn")
const mobileMenu = document.getElementById("mobileMenu")

if (menuBtn && mobileMenu) {
  const toggleMenu = () => {
    menuBtn.classList.toggle("menu-open")
    mobileMenu.classList.toggle("active")
    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden"
      mobileMenu.style.display = "flex"
    } else {
      document.body.style.overflow = "auto"
      setTimeout(() => {
        if (!mobileMenu.classList.contains("active")) {
          mobileMenu.style.display = "none"
        }
      }, 400)
    }
  }

  menuBtn.addEventListener("click", toggleMenu)

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      menuBtn.classList.remove("menu-open")
      document.body.style.overflow = "auto"
    })
  })
}

// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const body = document.body

const savedTheme = localStorage.getItem("theme") || "light-theme"
body.className = savedTheme

if (themeToggle) {
  themeToggle.onclick = () => {
    if (body.classList.contains("light-theme")) {
      body.classList.replace("light-theme", "dark-theme")
      localStorage.setItem("theme", "dark-theme")
    } else {
      body.classList.replace("dark-theme", "light-theme")
      localStorage.setItem("theme", "light-theme")
    }
  }
}

// Smooth Internal Navigation
document.querySelectorAll(".contact-trigger").forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault()
    openInquiryModal()
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      mobileMenu.classList.remove("active")
      if (menuBtn) menuBtn.classList.remove("menu-open")
      document.body.style.overflow = "auto"
    }
  })
})

/* =====================================================
   DYNAMIC HERO CERTIFICATE COUNTER ANIMATION
===================================================== */
function animateCertCounter() {
  const counter = document.getElementById("certCounter")
  if (!counter) return

  let start = 1250
  const end = 1480
  const duration = 1200
  const stepTime = Math.max(10, Math.floor(duration / (end - start)))

  const timer = setInterval(() => {
    start += 6
    if (start >= end) {
      counter.textContent = `${end.toLocaleString()}+`
      clearInterval(timer)
    } else {
      counter.textContent = `${start.toLocaleString()}+`
    }
  }, stepTime)
}

/* =====================================================
   DIRECT INQUIRY MODAL LOGIC
===================================================== */
function openInquiryModal() {
  const modal = document.getElementById("inquiryModal")
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function closeInquiryModal() {
  const modal = document.getElementById("inquiryModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

function handleInquirySubmit(e) {
  e.preventDefault()
  const form = document.getElementById("inquiryForm")
  const feedback = document.getElementById("inquiryFeedback")
  const btn = form.querySelector("button[type='submit']")

  if (btn) {
    btn.disabled = true
    btn.textContent = "Transmitting to Protocol Council..."
  }

  setTimeout(() => {
    if (feedback) feedback.style.display = "block"
    if (btn) {
      btn.disabled = false
      btn.textContent = "Submit Official Inquiry"
    }
    form.reset()

    setTimeout(() => {
      closeInquiryModal()
      if (feedback) feedback.style.display = "none"
    }, 2800)
  }, 1000)
}

/* =====================================================
   INSTITUTIONAL LEGAL & POLICY MODAL LOGIC
===================================================== */
const POLICIES = {
  privacy: {
    title: "Privacy & Data Protection Protocol",
    content: `
      <h4>1. Sovereignty of Identity Data</h4>
      <p>Wisteria Trust operates an independent verification registry. Personal and corporate data collected during the verification lifecycle is encrypted and strictly used to validate authentic commerce presence.</p>
      <h4>2. Zero Commercial Data Brokering</h4>
      <p>We do not monetize, sell, or license seller identity metadata to third-party ad networks or brokers. Identity records are maintained solely for public registry authenticity.</p>
      <h4>3. Cryptographic Storage Standards</h4>
      <p>All sensitive credentials and institutional hashes are stored using enterprise-grade cryptographic standards with strict role-based access control.</p>
    `
  },
  terms: {
    title: "Terms of Verification Authority",
    content: `
      <h4>1. Scope of Accreditation</h4>
      <p>A Wisteria Trust Verification ID (WTID) confirms that an entity's legal identity, jurisdiction standing, and verified presence have met our independent audit benchmarks.</p>
      <h4>2. Revocation Mandate</h4>
      <p>Wisteria Trust reserves the absolute right to revoke, suspend, or invalidate any verification status if an entity engages in fraudulent commercial practices or violates compliance covenants.</p>
      <h4>3. Permitted Badge Usage</h4>
      <p>The Wisteria Verified Trust Seal may only be embedded on domains registered and verified under the corresponding WTID.</p>
    `
  },
  compliance: {
    title: "Global Compliance & KYC Framework",
    content: `
      <h4>1. Cross-Border Due Diligence</h4>
      <p>Our verification protocols align with international Know-Your-Customer (KYC) and Anti-Money Laundering (AML) due diligence standards for commercial merchants.</p>
      <h4>2. Periodic Forensic Audits</h4>
      <p>Verified entities are subjected to periodic registry evaluations to ensure sustained operational legitimacy and adherence to sovereign commerce standards.</p>
    `
  },
  security: {
    title: "Security Disclosure & Vulnerability Protocol",
    content: `
      <h4>1. Registry Integrity Protection</h4>
      <p>All verification records are protected by rate-limited gateways, CORS restriction policies, and tamper-evident sequential ledger IDs.</p>
      <h4>2. Responsible Disclosure</h4>
      <p>Security researchers discovering potential vulnerabilities are encouraged to report findings directly to <code>wisteriatrust.verify@gmail.com</code> for priority review.</p>
    `
  },
  cookies: {
    title: "Cookie & Local Storage Policy",
    content: `
      <h4>1. Minimalist Client Storage</h4>
      <p>Wisteria Trust utilizes minimal local storage exclusively for persisting user UI preferences (Light/Dark mode) and authenticated session state.</p>
      <h4>2. Zero Invasive Trackers</h4>
      <p>Our infrastructure does not employ invasive third-party cross-site tracking cookies.</p>
    `
  }
}

function openPolicyModal(tab = "privacy") {
  const modal = document.getElementById("policyModal")
  if (!modal) return

  switchPolicyTab(tab)
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closePolicyModal() {
  const modal = document.getElementById("policyModal")
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
  }
}

function switchPolicyTab(tabKey) {
  const policy = POLICIES[tabKey] || POLICIES.privacy
  const titleEl = document.getElementById("policyTitle")
  const contentEl = document.getElementById("policyContent")

  if (titleEl) titleEl.textContent = policy.title
  if (contentEl) contentEl.innerHTML = policy.content

  document.querySelectorAll(".wt-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tabKey)
  })
}

/* =====================================================
   HELPER: SCROLL TO VERIFY BOX
===================================================== */
function scrollToVerifyBox() {
  const box = document.getElementById("verify")
  if (box) {
    box.scrollIntoView({ behavior: "smooth" })
  }
}

function copyLookupLink(link) {
  navigator.clipboard.writeText(link)
  alert("Verification Link copied to clipboard!")
}

/* =====================================================
   REAL VERIFICATION CHECK
===================================================== */
async function verifySeller() {
  const input = document.getElementById("vid")
  const out = document.getElementById("output")

  if (!input || !out) return

  const v = input.value.trim().toUpperCase()

  if (!v) {
    out.innerHTML = "<div class='verification-report revoked' style='text-align:center;'>Please enter a valid Wisteria Trust ID (e.g. WT-2025-001).</div>"
    scrollToVerifyBox()
    return
  }

  out.innerHTML = `
    <div class="verification-report" style="text-align:center;">
      <div class="status-badge" style="margin: 0 auto 20px; width: fit-content; background: var(--bg-elevated);">
        <i data-lucide="loader-2" class="animate-spin"></i> Initializing Security Scan...
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted);">Retrieving official records from sovereign registry...</p>
    </div>
  `
  if (window.lucide) window.lucide.createIcons()
  scrollToVerifyBox()

  try {
    const apiUrl = window.WT_CONFIG && window.WT_CONFIG.getApiUrl
      ? window.WT_CONFIG.getApiUrl(window.WT_CONFIG.ENDPOINTS.VERIFY_PUBLIC(v))
      : `https://wisteria-backend.onrender.com/api/verify/${encodeURIComponent(v)}`
    
    const res = await fetch(apiUrl)
    const data = await res.json()

    // ❌ NOT VERIFIED / REVOKED / EXPIRED
    if (!res.ok || data.verified === false || data.status === "NOT_FOUND") {
      let icon = "shield-alert"
      let msg = "Not Verified"

      if (data.status === "REVOKED") msg = "Revoked"
      if (data.status === "EXPIRED") msg = "Expired"
      if (data.status === "NOT_FOUND") msg = "Unregistered Record"

      out.innerHTML = `
        <div class="verification-report revoked">
          <div class="report-header" style="border-bottom: none; margin-bottom: 0;">
            <div class="status-badge revoked">
              <i data-lucide="${icon}"></i> ${msg}
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">Record Ref</div>
              <div style="font-size: 0.9rem; color: var(--text-main); font-weight: 700;">${v}</div>
            </div>
          </div>
          <div style="margin-top: 16px; font-size: 0.85rem; color: var(--text-muted);">
            ${data.message || "This entity does not hold an active verified standing with Wisteria Trust."}
          </div>
        </div>
      `
      if (window.lucide) window.lucide.createIcons()
      scrollToVerifyBox()
      return
    }

    // ✅ VERIFIED - Professional Luxury Certificate
    const sellerProfileUrl = window.WT_CONFIG && window.WT_CONFIG.getSellerProfileLink
      ? window.WT_CONFIG.getSellerProfileLink(v)
      : `seller/?id=${encodeURIComponent(v)}`
    
    const verificationUrl = window.WT_CONFIG && window.WT_CONFIG.getVerificationLink
      ? window.WT_CONFIG.getVerificationLink(v)
      : `https://wisteriatrust.com/?id=${encodeURIComponent(v)}`

    out.innerHTML = `
      <div class="verification-report">
        <div class="report-seal">CERTIFIED</div>
        <div class="report-header">
          <div class="status-badge verified">
            <i data-lucide="shield-check"></i> Institutional Integrity Verified
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">Registry ID</div>
            <div style="font-size: 0.95rem; color: var(--text-main); font-weight: 700;">${v}</div>
          </div>
        </div>
        
        <div class="report-grid">
          <div class="report-item">
            <label>Legal Entity</label>
            <div class="value">${data.sellerName || "—"}</div>
          </div>
          <div class="report-item">
            <label>Protocol Status</label>
            <div class="value" style="color: #059669; display: flex; align-items: center; gap: 8px;">
              <span style="width: 8px; height: 8px; background: #059669; border-radius: 50%;"></span>
              Active
            </div>
          </div>
          <div class="report-item">
            <label>Business Entity</label>
            <div class="value">${data.businessName || "Wisteria Principal"}</div>
          </div>
          <div class="report-item">
            <label>Jurisdiction</label>
            <div class="value">${data.city || "Global Verified"}</div>
          </div>
          <div class="report-item">
            <label>Validity Period</label>
            <div class="value">Valid Until ${new Date(data.validTill).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</div>
          </div>
        </div>

        <div class="report-footer">
          <i data-lucide="award" style="width: 20px; height: 20px; color: var(--primary); flex-shrink: 0;"></i>
          <span>This document serves as an official confirmation of institutional legitimacy within the Wisteria Trust sovereign registry.</span>
        </div>

        <div class="report-actions">
          <a href="${sellerProfileUrl}" class="btn-report-action btn-report-primary" target="_blank">
            <span>View Official Certificate</span>
            <i data-lucide="external-link"></i>
          </a>
          <button type="button" class="btn-report-action btn-report-secondary" onclick="copyLookupLink('${verificationUrl}')">
            <span>Copy Link</span>
            <i data-lucide="copy"></i>
          </button>
        </div>
      </div>
    `
    if (window.lucide) window.lucide.createIcons()
    scrollToVerifyBox()
  } catch (err) {
    console.error("Verification error:", err)
    out.innerHTML = `
      <div class="verification-report revoked" style="text-align: center;">
        <i data-lucide="alert-triangle" style="margin-bottom: 12px; color: #dc2626;"></i>
        <div style="font-weight: 600;">Registry Connection Error</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Please check your connection or verify that backend services are active.</div>
      </div>
    `
    if (window.lucide) window.lucide.createIcons()
    scrollToVerifyBox()
  }
}

// Auto-Fill & Auto-Verify (LINK)
document.addEventListener("DOMContentLoaded", () => {
  animateCertCounter()

  const params = new URLSearchParams(window.location.search)
  const id = params.get("id")

  if (id) {
    const input = document.getElementById("vid")
    if (input) {
      input.value = id.trim().toUpperCase()
      verifySeller()
    }
  }

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    })
  }

  if (window.lucide) {
    window.lucide.createIcons()
  }
})

// Keyboard shortcuts for modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeInquiryModal()
    closePolicyModal()
  }
})
