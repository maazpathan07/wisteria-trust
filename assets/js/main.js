/**
 * Wisteria Trust — Master Client-Side Engine
 * Sovereign Verification Lookup, Luxury Modals, Animated Counters & Toast Notifications
 */

// Luxury Navigation Scroll Effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar")
  if (!nav) return
  if (window.scrollY > 40) {
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
      }, 350)
    }
    if (window.lucide) window.lucide.createIcons()
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

const savedTheme = localStorage.getItem("wt_theme") || "light-theme"
body.className = savedTheme

if (themeToggle) {
  themeToggle.onclick = () => {
    if (body.classList.contains("light-theme")) {
      body.classList.replace("light-theme", "dark-theme")
      localStorage.setItem("wt_theme", "dark-theme")
    } else {
      body.classList.replace("dark-theme", "light-theme")
      localStorage.setItem("wt_theme", "light-theme")
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
   TOAST NOTIFICATION ENGINE
===================================================== */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer")
  if (!container) return

  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  
  const iconName = type === "success" ? "check-circle-2" : "alert-circle"
  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `
  container.appendChild(toast)
  if (window.lucide) window.lucide.createIcons()

  setTimeout(() => {
    toast.style.opacity = "0"
    toast.style.transform = "translateX(40px)"
    toast.style.transition = "all 0.3s ease"
    setTimeout(() => toast.remove(), 300)
  }, 3200)
}

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
    if (window.lucide) window.lucide.createIcons()
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
    btn.innerHTML = `<span>Transmitting to Protocol Council...</span> <i data-lucide="loader-2" class="animate-spin"></i>`
    if (window.lucide) window.lucide.createIcons()
  }

  setTimeout(() => {
    if (feedback) {
      feedback.style.display = "flex"
      if (window.lucide) window.lucide.createIcons()
    }
    if (btn) {
      btn.disabled = false
      btn.innerHTML = `<span>Submit Official Inquiry</span> <i data-lucide="send"></i>`
    }
    form.reset()
    showToast("Official inquiry submitted to the Sovereign Council", "success")

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
    title: "Privacy & Data Sovereignty Protocol",
    content: `
      <h4>1. Sovereignty of Identity Records</h4>
      <p>Wisteria Trust operates an independent accreditation repository. Personal, executive, and corporate identity records submitted during the due diligence lifecycle are encrypted under AES-256 standards and utilized solely to corroborate commercial legitimacy.</p>
      
      <h4>2. Zero Commercial Data Monetization</h4>
      <p>We maintain an absolute prohibition against monetizing, leasing, or transferring identity metadata to third-party ad exchanges or commercial brokers. Registry archives exist exclusively to provide public counterparty verification.</p>
      
      <h4>3. Cryptographic Storage & Role Separation</h4>
      <p>All sensitive authentication hashes and cryptographic verification tokens are preserved within compartmentalized, role-segregated infrastructure protected against unauthorized exfiltration.</p>
    `
  },
  terms: {
    title: "Terms of Verification Authority",
    content: `
      <h4>1. Scope of Accreditation Standing</h4>
      <p>A Wisteria Trust Verification ID (WTID) and dynamic vector badge confirm that an enterprise's legal incorporation, operational provenance, and counterparty standing have passed our independent forensic audit benchmarks.</p>
      
      <h4>2. Revocation & Compliance Mandate</h4>
      <p>Wisteria Trust retains the sovereign authority to revoke, suspend, or invalidate any accreditation status if an entity engages in fraudulent commerce, deceptive representation, or material breach of compliance covenants.</p>
      
      <h4>3. Authorized Badge Usage Protocol</h4>
      <p>The Wisteria Verified™ seal may strictly be embedded on digital web properties, digital storefronts, and domain names explicitly registered under the corresponding active WTID credential.</p>
    `
  },
  compliance: {
    title: "Global Compliance & KYC Framework",
    content: `
      <h4>1. Cross-Border Due Diligence Standards</h4>
      <p>Our verification methodology incorporates rigorous Know-Your-Customer (KYC), Anti-Money Laundering (AML), and Ultimate Beneficial Ownership (UBO) due diligence protocols aligned with sovereign corporate governance benchmarks.</p>
      
      <h4>2. Continuous Ledger Integrity Audits</h4>
      <p>Accredited commercial entities are subject to automated and periodic forensic audits to verify continuous operational legitimacy, domain validity, and jurisdictional compliance.</p>
    `
  },
  security: {
    title: "Security Protocols & Vulnerability Disclosure",
    content: `
      <h4>1. Defense-in-Depth Infrastructure</h4>
      <p>The Wisteria Trust registry gateway is safeguarded by rate-limiting middleware, CORS restriction policies, sequential ledger verification, and real-time distributed anomaly detection.</p>
      
      <h4>2. Responsible Disclosure Channel</h4>
      <p>Security researchers discovering potential vulnerabilities are encouraged to report findings directly to <code>wisteriatrust.verify@gmail.com</code> for priority forensic evaluation.</p>
    `
  },
  cookies: {
    title: "Cookie & Local State Governance",
    content: `
      <h4>1. Minimalist Functional Storage</h4>
      <p>Wisteria Trust utilizes local client storage strictly to persist user theme preferences (Light/Dark mode) and authenticated administrator session state.</p>
      
      <h4>2. Zero Invasive Behavioral Trackers</h4>
      <p>Our platform operates with absolute tracking neutrality, employing zero cross-site advertising pixels, third-party analytics trackers, or commercial fingerprinting scripts.</p>
    `
  }
}

function openPolicyModal(tab = "privacy") {
  const modal = document.getElementById("policyModal")
  if (!modal) return

  switchPolicyTab(tab)
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
  if (window.lucide) window.lucide.createIcons()
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
  if (window.lucide) window.lucide.createIcons()
}

/* =====================================================
   HELPER: SCROLL & CLIPBOARD
===================================================== */
function scrollToVerifyBox() {
  const box = document.getElementById("verify")
  if (box) {
    box.scrollIntoView({ behavior: "smooth", block: "center" })
  }
}

async function copyLookupLink(link) {
  try {
    await navigator.clipboard.writeText(link)
    showToast("Official Verification Link copied to clipboard", "success")
  } catch (err) {
    console.error("Clipboard copy error:", err)
    showToast("Failed to copy link", "error")
  }
}

/* =====================================================
   SOVEREIGN VERIFICATION SEARCH LOOKUP
===================================================== */
async function verifySeller() {
  const input = document.getElementById("vid")
  const out = document.getElementById("output")
  const btn = document.getElementById("searchBtn")

  if (!input || !out) return

  const v = input.value.trim().toUpperCase()

  if (!v) {
    out.innerHTML = `
      <div class="verification-report revoked" style="text-align:center;">
        <i data-lucide="alert-circle" style="color: #ef4444; width: 24px; height: 24px; margin: 0 auto 10px;"></i>
        <div style="font-weight: 700;">Identifier Required</div>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">Please enter a valid Wisteria Trust Identifier (e.g., <code>WT-2026-0001</code>).</div>
      </div>
    `
    if (window.lucide) window.lucide.createIcons()
    scrollToVerifyBox()
    return
  }

  // Loading State
  out.innerHTML = `
    <div class="verification-report" style="text-align:center;">
      <div class="status-badge" style="margin: 0 auto 16px; width: fit-content; background: var(--bg-elevated); padding: 8px 18px; border-radius: 9999px;">
        <i data-lucide="loader-2" class="animate-spin"></i> Initializing Forensic Scan...
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted);">Querying sovereign registry archives for record <strong>${v}</strong>...</p>
    </div>
  `
  if (window.lucide) window.lucide.createIcons()
  scrollToVerifyBox()

  if (btn) btn.disabled = true

  try {
    const apiUrl = window.WT_CONFIG && window.WT_CONFIG.getApiUrl
      ? window.WT_CONFIG.getApiUrl(window.WT_CONFIG.ENDPOINTS.VERIFY_PUBLIC(v))
      : `https://wisteria-backend.onrender.com/api/verify/${encodeURIComponent(v)}`
    
    const res = await fetch(apiUrl)
    const data = await res.json()

    if (btn) btn.disabled = false

    // ❌ NOT VERIFIED / REVOKED / EXPIRED / NOT FOUND
    if (!res.ok || data.verified === false || data.status === "NOT_FOUND" || data.success === false) {
      let icon = "shield-alert"
      let statusLabel = "Unregistered Record"
      let noticeMsg = "This entity identifier does not hold an active verification standing in the official Wisteria Trust Registry."

      if (data.status === "REVOKED") {
        statusLabel = "Accreditation Revoked"
        noticeMsg = "Warning: The verification accreditation for this entity has been officially revoked due to compliance breach."
      } else if (data.status === "EXPIRED") {
        statusLabel = "Accreditation Expired"
        noticeMsg = "The validity period for this verification record has expired and is pending re-audit renewal."
      }

      out.innerHTML = `
        <div class="verification-report revoked">
          <div class="report-header" style="border-bottom: none; margin-bottom: 0;">
            <div class="status-badge revoked">
              <i data-lucide="${icon}"></i> ${statusLabel}
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2px;">Queried WTID</div>
              <div style="font-size: 0.95rem; color: var(--text-main); font-weight: 700;">${v}</div>
            </div>
          </div>
          <div style="margin-top: 14px; font-size: 0.88rem; color: var(--text-muted); line-height: 1.6;">
            ${data.message || noticeMsg}
          </div>
        </div>
      `
      if (window.lucide) window.lucide.createIcons()
      scrollToVerifyBox()
      return
    }

    // ✅ VERIFIED RECORD
    const sellerProfileUrl = window.WT_CONFIG && window.WT_CONFIG.getSellerProfileLink
      ? window.WT_CONFIG.getSellerProfileLink(v)
      : `seller/?id=${encodeURIComponent(v)}`
    
    const verificationUrl = window.WT_CONFIG && window.WT_CONFIG.getVerificationLink
      ? window.WT_CONFIG.getVerificationLink(v)
      : `https://wisteriatrust.com/?id=${encodeURIComponent(v)}`

    const legalEntity = data.sellerName || (data.data && data.data.sellerName) || "—"
    const businessName = data.businessName || (data.data && data.data.businessName) || "Authorized Sovereign Principal"
    const jurisdiction = data.city || (data.data && data.data.city) || "Global Jurisdiction"
    const validUntilDate = data.validTill || (data.data && data.data.expiryDate)
    const formattedExpiry = validUntilDate
      ? new Date(validUntilDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      : "Active In Perpetuity"

    out.innerHTML = `
      <div class="verification-report">
        <div class="report-seal"><i data-lucide="shield-check"></i> SOVEREIGN ACCREDITED</div>
        
        <div class="report-header">
          <div class="status-badge verified">
            <i data-lucide="check-circle-2"></i> Institutional Legitimacy Verified
          </div>
          <div style="text-align: right;">
            <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2px;">Registry WTID</div>
            <div style="font-size: 1rem; color: var(--text-main); font-weight: 800; letter-spacing: 0.5px;">${v}</div>
          </div>
        </div>
        
        <div class="report-grid">
          <div class="report-item">
            <label>Legal Entity</label>
            <div class="value">${legalEntity}</div>
          </div>
          <div class="report-item">
            <label>Business Name</label>
            <div class="value">${businessName}</div>
          </div>
          <div class="report-item">
            <label>Jurisdiction / City</label>
            <div class="value">${jurisdiction}</div>
          </div>
          <div class="report-item">
            <label>Accreditation Validity</label>
            <div class="value" style="color: #10b981;">Valid Through ${formattedExpiry}</div>
          </div>
        </div>

        <div class="report-footer">
          <i data-lucide="award" style="width: 20px; height: 20px; color: var(--primary); flex-shrink: 0;"></i>
          <span>This record is an immutable confirmation of commercial due diligence within the Wisteria Trust global trust ledger.</span>
        </div>

        <div class="report-actions">
          <a href="${sellerProfileUrl}" class="btn-report-action btn-report-primary" target="_blank" rel="noopener noreferrer">
            <span>View Official Certificate & Badge Embed</span>
            <i data-lucide="external-link"></i>
          </a>
          <button type="button" class="btn-report-action btn-report-secondary" onclick="copyLookupLink('${verificationUrl}')">
            <span>Copy Verification URL</span>
            <i data-lucide="copy"></i>
          </button>
        </div>
      </div>
    `
    if (window.lucide) window.lucide.createIcons()
    scrollToVerifyBox()
  } catch (err) {
    console.error("Verification error:", err)
    if (btn) btn.disabled = false
    out.innerHTML = `
      <div class="verification-report revoked" style="text-align: center;">
        <i data-lucide="alert-triangle" style="margin-bottom: 10px; color: #ef4444; width: 26px; height: 26px;"></i>
        <div style="font-weight: 700;">Registry Connection Error</div>
        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">Unable to reach verification gateway. Please check connection and retry.</div>
      </div>
    `
    if (window.lucide) window.lucide.createIcons()
    scrollToVerifyBox()
  }
}

// Auto-Fill & Auto-Verify via URL query parameter
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
      duration: 900,
      once: true,
      offset: 80,
    })
  }

  if (window.lucide) {
    window.lucide.createIcons()
  }
})

// Keyboard shortcuts for closing modals
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeInquiryModal()
    closePolicyModal()
  }
})
