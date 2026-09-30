document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search)
  const id = params.get("id")

  const vid = document.getElementById("vid")
  const sellerName = document.getElementById("sellerName")
  const businessName = document.getElementById("businessName")
  const statusEl = document.getElementById("status")
  const validTill = document.getElementById("validTill")
  const cityEl = document.getElementById("city")
  const issuedDateEl = document.getElementById("issuedDate")
  const websiteValueEl = document.getElementById("websiteValue")
  const statusNoticeEl = document.getElementById("statusNotice")
  const liveSvgBadgeImg = document.getElementById("liveSvgBadgeImg")

  const verifyLinkEl = document.getElementById("verifyLink")
  const embedCodeEl = document.getElementById("embedCode")

  const copyLinkBtn = document.getElementById("copyLink")
  const copyCodeBtn = document.getElementById("copyCode")

  if (!id) {
    if (verifyLinkEl) verifyLinkEl.textContent = "Error: Invalid Verification Protocol"
    if (statusEl) {
      statusEl.textContent = "ID Required"
      statusEl.className = "value status-revoked"
    }
    if (businessName) businessName.textContent = "Unspecified Registry Record"
    return
  }

  // ✅ Resolve dynamic verification link
  const verificationLink =
    window.WT_CONFIG && window.WT_CONFIG.getVerificationLink
      ? window.WT_CONFIG.getVerificationLink(id)
      : `https://wisteriatrust.com/?id=${encodeURIComponent(id)}`
  
  if (verifyLinkEl) verifyLinkEl.textContent = verificationLink

  // ✅ Resolve live dynamic SVG badge URL
  const badgeSvgUrl =
    window.WT_CONFIG && window.WT_CONFIG.getBadgeEmbedUrl
      ? window.WT_CONFIG.getBadgeEmbedUrl(id)
      : `https://wisteria-backend.onrender.com/api/badge/${encodeURIComponent(id)}.svg`

  if (liveSvgBadgeImg) {
    liveSvgBadgeImg.src = badgeSvgUrl
  }

  const badgeHtml = `<a href="${verificationLink}" target="_blank" rel="noopener noreferrer">
  <img src="${badgeSvgUrl}" 
       alt="Verified by Wisteria Trust" 
       width="260">
</a>`
  
  if (embedCodeEl) embedCodeEl.textContent = badgeHtml

  // Clipboard functionality
  const copyToClipboard = async (text, btn) => {
    try {
      await navigator.clipboard.writeText(text)
      const span = btn.querySelector("span")
      const originalText = span ? span.textContent : "Copy"
      if (span) span.textContent = "Copied to Clipboard"

      setTimeout(() => {
        if (span) span.textContent = originalText
      }, 1800)
    } catch (err) {
      console.error("Copy failed:", err)
    }
  }

  if (copyLinkBtn) copyLinkBtn.onclick = () => copyToClipboard(verificationLink, copyLinkBtn)
  if (copyCodeBtn) copyCodeBtn.onclick = () => copyToClipboard(badgeHtml, copyCodeBtn)

  // Fetch Seller Data from backend
  const apiUrl =
    window.WT_CONFIG && window.WT_CONFIG.getApiUrl
      ? window.WT_CONFIG.getApiUrl(window.WT_CONFIG.ENDPOINTS.VERIFY_PUBLIC(id))
      : `https://wisteria-backend.onrender.com/api/verify/${encodeURIComponent(id)}`

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      // ❌ Not Found in registry
      if (data.status === "NOT_FOUND" || (data.success === false && !data.sellerName)) {
        if (vid) vid.textContent = `Verification ID: ${id}`
        if (businessName) businessName.textContent = "Record Not Found"
        if (sellerName) sellerName.textContent = "Unregistered"
        if (statusEl) {
          statusEl.textContent = "UNVERIFIED"
          statusEl.className = "value status-revoked"
        }
        if (statusNoticeEl) {
          statusNoticeEl.className = "status-alert-banner alert-revoked"
          statusNoticeEl.style.display = "flex"
          statusNoticeEl.innerHTML = `<span>⚠️</span> <span><strong>UNVERIFIED RECORD:</strong> Verification ID <code>${id}</code> does not exist in the official Wisteria Trust Registry.</span>`
        }
        return
      }

      // Extract properties
      const sName = data.sellerName || (data.data && data.data.sellerName) || "—"
      const bName = data.businessName || (data.data && data.data.businessName) || "Authorized Sovereign Entity"
      const cityVal = data.city || (data.data && data.data.city) || "Global Jurisdiction"
      const websiteVal = data.website || (data.data && data.data.website) || ""
      const expiry = data.validTill || (data.data && data.data.expiryDate)
      const issuedAt = data.issuedAt || (data.data && data.data.createdAt)
      const currentStatus = data.status || (data.data && data.data.status) || (data.verified ? "ACTIVE" : "UNVERIFIED")

      if (vid) vid.textContent = `Verification ID: ${id}`
      if (sellerName) sellerName.textContent = sName
      if (businessName) businessName.textContent = bName
      if (cityEl) cityEl.textContent = cityVal

      if (websiteValueEl) {
        if (websiteVal) {
          const formattedUrl = websiteVal.startsWith("http") ? websiteVal : `https://${websiteVal}`
          websiteValueEl.innerHTML = `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer" class="website-link">${websiteVal} ↗</a>`
        } else {
          websiteValueEl.textContent = "Registry Verified File"
        }
      }

      if (issuedDateEl) {
        if (issuedAt) {
          issuedDateEl.textContent = new Date(issuedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        } else {
          issuedDateEl.textContent = "Official Protocol"
        }
      }

      if (validTill && expiry) {
        validTill.textContent = new Date(expiry).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }

      // Status styling
      if (statusEl) {
        statusEl.textContent = currentStatus
        statusEl.className = `value status-${currentStatus.toLowerCase()}`
      }

      // Warning Notice Banners for Revoked / Expired
      if (statusNoticeEl) {
        if (currentStatus === "REVOKED") {
          statusNoticeEl.className = "status-alert-banner alert-revoked"
          statusNoticeEl.style.display = "flex"
          statusNoticeEl.innerHTML = `<span>⚠️</span> <span><strong>NOTICE OF REVOCATION:</strong> This entity's verification standing has been revoked by Wisteria Trust. Integrity guarantees are no longer in effect.</span>`
        } else if (currentStatus === "EXPIRED") {
          const expFormatted = expiry ? new Date(expiry).toLocaleDateString() : "the scheduled date"
          statusNoticeEl.className = "status-alert-banner alert-expired"
          statusNoticeEl.style.display = "flex"
          statusNoticeEl.innerHTML = `<span>⏳</span> <span><strong>EXPIRED STANDING:</strong> This verification expired on ${expFormatted}. Standing is currently inactive pending renewal.</span>`
        } else {
          statusNoticeEl.style.display = "none"
        }
      }

      if (window.lucide) {
        window.lucide.createIcons()
      }
    })
    .catch((err) => {
      console.error("Seller profile fetch error:", err)
      if (statusEl) {
        statusEl.textContent = "Offline"
        statusEl.className = "value status-expired"
      }
    })
})
