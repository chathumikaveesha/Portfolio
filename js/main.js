/**
 * Portfolio Data and Interactive Script
 */

// Project Case Studies Dataset (Strictly aligned with Chathumi Kaveesha's CV)
const projectData = {
  "bio-pohora": {
    badge: "HCI Project • 2026",
    title: "BIO Pohora – Agricultural Fertilizer Subsidy Platform",
    tagline: "Mobile solution designed to improve transparency and efficiency in fertilizer subsidy distribution through digital tokens, QR verification, notifications, and allocation tracking.",
    client: "Human-Computer Interaction (HCI) Academic Project",
    role: "UX/UI Designer & HCI Contributor",
    timeline: "2026",
    problem: "Farmers and administrators required a transparent, efficient mechanism for fertilizer subsidy distribution without manual paper delays or allocation discrepancies.",
    solution: "Worked on user-centered workflows including biometric login, land registration, offline-capable interactions, and clear access to entitlement information with QR verification and digital tokens.",
    stats: [
      { value: "QR & Biometric", label: "Verification Workflows" },
      { value: "Offline-Capable", label: "Field Accessibility" }
    ],
    tech: ["Human-computer interaction", "Mobile UX", "User-centered design", "Biometric login", "QR verification", "Offline interactions"]
  },
  "recruitment-platform": {
    badge: "Full-Stack & AI • 2026",
    title: "Recruitment Platform – AI-Powered Hiring and Interview Management",
    tagline: "Full-stack recruitment platform for a multinational HR consulting company, with role-based access for candidates, recruiters, and administrators.",
    client: "Multinational HR Consulting Company (Five-Member Team)",
    role: "UX/UI Designer & Full-Stack Contributor",
    timeline: "2026",
    problem: "Managing recruitment workflows across candidate applications, scheduling, and screening lacked automated scoring and centralized role-based controls.",
    solution: "Contributed to a five-member team building a full-stack recruitment platform. Worked on job posting and application tracking, AI-based candidate scoring and ranking, interview scheduling with automated email notifications, and an administrator settings interface.",
    stats: [
      { value: "3 User Roles", label: "Candidates, Recruiters, Admins" },
      { value: "AI Scoring", label: "Candidate Ranking & Email Alerts" }
    ],
    tech: ["C# 12", "ASP.NET Core 8 Web API", "Entity Framework Core", "Microsoft SQL Server", "HTML5", "CSS3", "JavaScript (ES6)", "OpenRouter/OpenAI", "SendGrid", "Git", "GitHub"]
  },
  "restaurant-os": {
    badge: "Full-Stack Enterprise • 2026",
    title: "Restaurant Management System – Inventory, Orders and Analytics Platform",
    tagline: "Full-stack restaurant management system with a React frontend and Spring Boot REST API, covering inventory, orders, suppliers, and role-based dashboards.",
    client: "Full-Stack Enterprise Project",
    role: "Frontend Designer & Full-Stack Contributor",
    timeline: "2026",
    problem: "Coordinating restaurant operations across inventory, suppliers, and multiple staff tiers required a synchronized, secure platform.",
    solution: "Contributed to a full-stack restaurant management system with role-based dashboards for administrators, managers, cashiers, and chefs. Worked on JWT authentication with role-based access, low-stock alerts, order-status workflows, analytics dashboards, and user management.",
    stats: [
      { value: "4 Dashboards", label: "Admins, Managers, Cashiers, Chefs" },
      { value: "REST API", label: "JWT Auth & Low-Stock Alerts" }
    ],
    tech: ["React", "Vite", "React Router", "Axios", "Java 17", "Spring Boot", "Spring Data JPA", "Spring Security", "JWT", "MySQL", "H2", "Maven", "Docker", "Git", "GitHub"]
  },
  "agro-vision": {
    badge: "Cross-Platform Mobile App • Ongoing",
    title: "AgroVision – Cross-Platform Mobile Application",
    tagline: "Developing a cross-platform application using Flutter and Dart, targeting Android, iOS, web, Windows, and macOS.",
    client: "Ongoing Engineering Project",
    role: "Mobile App Designer & Developer",
    timeline: "Ongoing",
    problem: "Agricultural operators needed a cross-platform application capable of functioning seamlessly across diverse client platforms.",
    solution: "Developing a cross-platform application using Flutter and Dart, targeting Android, iOS, web, Windows, and macOS. Managing source code with Git and GitHub while building the application incrementally.",
    stats: [
      { value: "5 Targets", label: "Android, iOS, Web, Windows, macOS" },
      { value: "Flutter & Dart", label: "Ongoing Development" }
    ],
    tech: ["Flutter", "Dart", "Git", "GitHub"]
  }
};

// Initialize DOM Listeners
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initScrollReveal();
  initModal();
  initCvDownload();
  initMultiSpeedParallax();
});

// Sticky Navbar Scroll State
function initNavbar() {
  const navbar = document.querySelector(".site-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Scroll Reveal with IntersectionObserver
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-item");
  
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

// Case Study Modal Management
function initModal() {
  const backdrop = document.getElementById("projectModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const projectRows = document.querySelectorAll(".project-row[data-project]");

  // Open modal
  projectRows.forEach(row => {
    row.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = row.getAttribute("data-project");
      openProjectDetails(projectId);
    });
  });

  // Close handlers
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal();
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      closeModal();
    }
  });

  function openProjectDetails(id) {
    const data = projectData[id];
    if (!data) return;

    document.getElementById("modalBadge").textContent = data.badge;
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalTagline").textContent = data.tagline;
    document.getElementById("modalClient").textContent = data.client;
    document.getElementById("modalRole").textContent = data.role;
    document.getElementById("modalTimeline").textContent = data.timeline;
    document.getElementById("modalProblem").textContent = data.problem;
    document.getElementById("modalSolution").textContent = data.solution;

    // Render Stats
    const statsContainer = document.getElementById("modalStats");
    statsContainer.innerHTML = data.stats.map(s => `
      <div class="stat-box">
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join("");

    // Render Tech Tags
    const techContainer = document.getElementById("modalTech");
    techContainer.innerHTML = data.tech.map(t => `<span class="meta-pill">${t}</span>`).join("");

    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Direct Background CV Downloader (Downloads the exact ATS CV without page redirection)
function initCvDownload() {
  const localCvUrl = "assets/Chathumi_Kaveesha_UX_UI_ATS_CV.pdf";
  const filename = "Chathumi_Kaveesha_UX_UI_ATS_CV.pdf";

  const triggerButtons = [
    document.getElementById("downloadCvBtn"),
    document.getElementById("navDownloadCvBtn")
  ].filter(Boolean);

  triggerButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Visual feedback on button
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="dot" style="display:inline-block;width:6px;height:6px;background:var(--accent-lime);border-radius:50%;margin-right:6px;animation:pulse-dot 1s infinite;"></span> Downloading...`;
      btn.style.pointerEvents = "none";

      // Trigger instant background download using HTML5 download attribute
      const link = document.createElement("a");
      link.href = localCvUrl;
      link.setAttribute("download", filename);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = "auto";
      }, 1000);
    });
  });
}

// Multi-Speed Parallax Engine
function initMultiSpeedParallax() {
  const parallaxItems = document.querySelectorAll("[data-scroll-speed]");
  if (!parallaxItems.length) return;

  // Check if reduced motion is requested
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    parallaxItems.forEach(el => {
      const speed = parseFloat(el.getAttribute("data-scroll-speed")) || 0;
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      
      // Calculate offset distance relative to viewport center
      const distance = elementCenter - viewportCenter;
      const translateY = -(distance * speed);

      // Apply GPU-accelerated translate3d while preserving any initial CSS transforms
      el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
      el.style.willChange = "transform";
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // Initial calculation
  window.requestAnimationFrame(updateParallax);
}
