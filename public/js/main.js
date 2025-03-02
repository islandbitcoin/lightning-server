// Company data
const companyData = {
  florida: {
    name: "Island Bitcoin LLC",
    location: "Florida, USA",
    description:
      "Specializing in innovative Bitcoin software development, our Florida-based team creates cutting-edge solutions that empower individuals and businesses in the Bitcoin ecosystem.",
    link: "companies.html#florida",
  },
  "el-salvador": {
    name: "Island Bitcoin S.A de C.V.",
    location: "El Salvador",
    description: "Our El Salvador operation provides comprehensive Bitcoin services in the world's first country to adopt Bitcoin as legal tender.",
    link: "companies.html#el-salvador",
  },
  jamaica: {
    name: "Island Bitcoin Jamaica Limited",
    location: "Kingston, Jamaica",
    description: "Focused on retail solutions and Bitcoin rewards programs, our Jamaican company is driving adoption throughout the Caribbean.",
    link: "companies.html#jamaica",
  },
  delaware: {
    name: "Taddesse, Inc.",
    location: "Delaware, USA",
    description: "Our parent investment company oversees strategic direction and capital allocation across the Island Bitcoin ecosystem.",
    link: "companies.html#delaware",
  },
  foundation: {
    name: "Island Bitcoin Foundation",
    location: "Kingston, Jamaica",
    description: "Our non-profit arm focuses on Bitcoin education, community initiatives, and fostering financial literacy in underserved communities.",
    link: "companies.html#foundation",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  // Trigger the entrance animation for hero content
  document.querySelector(".hero-content").classList.add("animate-in");

  // Create background particles
  createParticles();

  // Set up company icons
  setupCompanyIcons();

  // Set up marker click handlers
  setupMarkers();

  // Set up island interaction
  setupIslandInteraction();

  console.log("Island Bitcoin site loaded successfully!");
});

function setupCompanyIcons() {
  // Replace placeholder images with appropriate Font Awesome icons
  document.getElementById("florida-icon").outerHTML = '<i class="fas fa-sun fa-lg" style="color: white;"></i>';
  document.getElementById("el-salvador-icon").outerHTML = '<i class="fab fa-bitcoin fa-lg" style="color: white;"></i>';
  document.getElementById("jamaica-icon").outerHTML = '<i class="fas fa-umbrella-beach fa-lg" style="color: white;"></i>';
  document.getElementById("delaware-icon").outerHTML = '<i class="fas fa-building fa-lg" style="color: white;"></i>';
  document.getElementById("foundation-icon").outerHTML = '<i class="fas fa-graduation-cap fa-lg" style="color: white;"></i>';
}

// Example: create large "shiny" orange/black circles
function createParticles() {
  const container = document.getElementById("particles");
  const particleCount = 9; // Adjust as needed

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Large random size: 300px to 600px
    const size = Math.random() * 1800 + 1800;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position in %
    const posX = Math.random() * -200;
    const posY = Math.random() * -200;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;

    // A multi-stop radial gradient going from bright orange in the center,
    // transitioning to black, and fading to transparent.
    particle.style.background = `
    radial-gradient(
      circle,
      rgba(153, 102, 204, 0.9) 20%,
      rgba(255,255,255, 0.6) 60%,
      rgba(255,255,255, 0) 90%
    )
  `;

    // A strong orange glow to reinforce the shiny effect
    particle.style.boxShadow = "0 0 80px rgba(255,165,0, 0.1)";

    // Append to container
    container.appendChild(particle);

    // Optional: animate the particle’s motion
    animateParticle(particle);
  }
}

function animateParticle(particle) {
  const startX = parseFloat(particle.style.left);
  const startY = parseFloat(particle.style.top);

  // Bigger movement for more chaotic effect
  const moveX = (Math.random() - 0.5) * 50;
  const moveY = (Math.random() - 0.5) * 50;

  // Shorter duration for quicker movement
  const duration = Math.random() * 4000 + 2000;
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      // Use a sine curve so it zips back and forth
      const x = startX + moveX * Math.sin(progress * Math.PI * 2);
      const y = startY + moveY * Math.sin(progress * Math.PI * 2);

      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;

      requestAnimationFrame(animate);
    } else {
      // Once finished, restart the animation for continuous movement
      animateParticle(particle);
    }
  }

  requestAnimationFrame(animate);
}

function setupMarkers() {
  const markers = document.querySelectorAll(".map-marker");
  const popup = document.getElementById("company-popup");
  const popupTitle = document.getElementById("popup-title");
  const popupDescription = document.getElementById("popup-description");
  const popupLink = document.getElementById("popup-link");
  const closePopup = document.getElementById("close-popup");

  markers.forEach((marker) => {
    marker.addEventListener("click", function (event) {
      event.stopPropagation();
      const id = this.id.replace("-marker", "");
      const company = companyData[id];

      if (company) {
        popupTitle.textContent = company.name;
        popupDescription.textContent = company.description;
        popupLink.href = company.link;

        const rect = this.getBoundingClientRect();
        const mapContainer = document.querySelector(".map-container");
        const mapRect = mapContainer.getBoundingClientRect();

        let left = rect.left - mapRect.left + 30;
        let top = rect.top - mapRect.top;

        if (left + 320 > mapRect.width) {
          left = rect.left - mapRect.left - 330;
        }

        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;

        popup.classList.add("visible");
      }
    });
  });

  closePopup.addEventListener("click", function () {
    popup.classList.remove("visible");
  });

  document.addEventListener("click", function (event) {
    if (!popup.contains(event.target) && !event.target.classList.contains("map-marker")) {
      popup.classList.remove("visible");
    }
  });
}

function setupIslandInteraction() {
  const parallaxContainer = document.getElementById("parallax-container");

  parallaxContainer.addEventListener("mousemove", function (e) {
    const rect = parallaxContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Calculate tilt angles. Adjust multipliers for more or less sensitivity.
    const rotateX = (-deltaY / rect.height) * 30; // Tilt up/down (in degrees)
    const rotateY = (deltaX / rect.width) * 30; // Tilt left/right (in degrees)
    const rotateZ = (deltaX / rect.width) * 10; // Optional subtle rotation around Z axis

    parallaxContainer.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
        scale(0.9)
      `;
  });

  parallaxContainer.addEventListener("mouseleave", function () {
    // Reset transform when mouse leaves the island image
    parallaxContainer.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.9)";
  });
}
