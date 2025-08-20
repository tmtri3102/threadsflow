(function () {
  const followingURL = "https://threads.com/following";

  // Redirect logic
  function handleRedirect() {
    const path = location.pathname;
    if (
      location.hostname.includes("threads.com") &&
      (path === "/" || path === "" || path === "/for_you")
    ) {
      console.log("🔄 Redirecting to Following feed...");
      location.replace(followingURL);
    }
  }

  // Hide top navigation bar
  function hideTopNav() {
    const navContainer = document
      .querySelector(
        'a[aria-label="For you"], a[aria-label="Following"], a[aria-label="Dành cho bạn"], a[aria-label="Đang theo dõi"]'
      )
      ?.closest("div.x6s0dn4")?.parentElement;

    if (navContainer && navContainer.style.display !== "none") {
      navContainer.style.display = "none";
      console.log("✅ Top navigation bar hidden");
    }
  }

  // Observe DOM changes for UI re-renders
  const observer = new MutationObserver(() => {
    hideTopNav();
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Watch for URL changes (SPA-safe)
  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      console.log("🔍 URL changed:", lastUrl);
      handleRedirect();
      hideTopNav();
    }
  }, 400); // 400ms is fast enough without being heavy

  // Initial run
  handleRedirect();
  hideTopNav();
})();
