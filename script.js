// ========================================
// API PLAYGROUND - STUDENT PRACTICE
// ========================================

// STEP 1: Choose Your API
// Browse free APIs at: https://github.com/public-apis/public-apis
// Examples:
//   - Cat Facts: https://catfact.ninja/fact
//   - Dog Images: https://dog.ceo/api/breeds/image/random
//   - Advice Slip: https://api.adviceslip.com/advice
//   - Bored API: https://www.boredapi.com/api/activity

// STEP 2: Test Your API
// Open your chosen API URL in your browser to see the JSON response
// Make sure it works before continuing!

// STEP 3: Paste your API URL here
const API_URL = "https://randomfox.ca/floof/";

const output = document.getElementById("output");
const button = document.getElementById("fetch-btn");

function ensureSwarmLayer() {
  let layer = document.getElementById("fox-swarm-layer");

  if (!layer) {
    layer = document.createElement("div");
    layer.id = "fox-swarm-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);
  }

  return layer;
}

function buildFoxCard(imageUrl) {
  output.innerHTML = `
        <div class="fox-card fox-card--enter">
            <div class="fox-card__glow"></div>
            <img src="${imageUrl}" alt="Random fox" class="fox-image fox-image--hero">
            <p class="fox-card__caption">A fresh fox has entered the chat.</p>
        </div>
    `;
}

function launchFoxSwarm(imageUrl) {
  const layer = ensureSwarmLayer();
  layer.replaceChildren();

  const foxCount = 9;

  for (let index = 0; index < foxCount; index += 1) {
    const fox = document.createElement("div");
    fox.className = "swarm-fox";

    const size = 42 + Math.random() * 52;
    const duration = 3600 + Math.random() * 2200;
    const delay = Math.random() * 450;
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 80 + Math.random() * 140;
    const midX = Math.random() * window.innerWidth;
    const midY = Math.random() * Math.max(window.innerHeight * 0.5, 180);
    const endX = Math.random() * window.innerWidth;
    const endY = -180 - Math.random() * 180;
    const spin = (Math.random() > 0.5 ? 1 : -1) * (200 + Math.random() * 520);
    const tilt = (Math.random() * 30 - 15).toFixed(2);

    fox.style.left = `${startX}px`;
    fox.style.top = `${startY}px`;
    fox.style.width = `${size}px`;
    fox.style.height = `${size}px`;
    fox.style.setProperty("--fox-delay", `${delay}ms`);
    fox.style.setProperty("--fox-duration", `${duration}ms`);

    fox.innerHTML = `
            <span class="swarm-fox__halo"></span>
            <img src="${imageUrl}" alt="" class="swarm-fox__image">
            <span class="swarm-fox__sparkle">${index % 2 === 0 ? "✨" : "💫"}</span>
        `;

    const animation = fox.animate(
      [
        {
          transform: `translate(0, 0) rotate(${tilt}deg) scale(0.3)`,
          filter: "drop-shadow(0 0 0 rgba(255,255,255,0))",
          opacity: 0,
        },
        {
          transform: `translate(${midX - startX}px, ${midY - startY}px) rotate(${tilt + spin / 2}deg) scale(1.12)`,
          filter: "drop-shadow(0 10px 18px rgba(255, 210, 120, 0.35))",
          opacity: 1,
          offset: 0.45,
        },
        {
          transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${tilt + spin}deg) scale(0.58)`,
          filter: "drop-shadow(0 0 0 rgba(255,255,255,0))",
          opacity: 0,
        },
      ],
      {
        duration,
        delay,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      },
    );

    animation.addEventListener("finish", () => fox.remove());
    layer.appendChild(fox);
  }
}

function renderFox(imageUrl) {
  buildFoxCard(imageUrl);
  launchFoxSwarm(imageUrl);
}

function fetchFox() {
  if (button) {
    button.disabled = true;
    button.textContent = "Summoning foxes...";
  }

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      renderFox(data.image);
    })
    .catch(() => {
      output.innerHTML =
        '<p class="fox-card__caption">The foxes got distracted. Try again.</p>';
    })
    .finally(() => {
      if (button) {
        button.disabled = false;
        button.textContent = "Get New Data";
      }
    });
}

fetchFox();

button.addEventListener("click", fetchFox);
