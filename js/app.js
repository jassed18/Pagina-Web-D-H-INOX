/**
 * D&H INOX SAS - Pure Vanilla JavaScript Engine
 * Compatible con cualquier navegador moderno sin requerir compilación Node.js
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Filtrado de Categorías del Catálogo
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'todos' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 2. Acordeón de Especificaciones Técnicas
  // ==========================================
  const specsToggles = document.querySelectorAll('.specs-toggle');

  specsToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isOpen = content.classList.contains('open');

      if (isOpen) {
        content.classList.remove('open');
        toggle.querySelector('.toggle-icon').textContent = '▼';
      } else {
        content.classList.add('open');
        toggle.querySelector('.toggle-icon').textContent = '▲';
      }
    });
  });

  // ==========================================
  // 3. Botones "Cotizar Este Equipo"
  // ==========================================
  const quoteButtons = document.querySelectorAll('.btn-quote-trigger');
  const productSelect = document.getElementById('productInterest');

  quoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productName = btn.getAttribute('data-product');
      if (productSelect && productName) {
        productSelect.value = productName;
      }
    });
  });

  // ==========================================
  // 4. Simulador de Panel HMI & Marmita Inteligente
  // ==========================================
  const RECIPES = [
    { name: 'Arequipe / Dulce de Leche', temp: 98, speed: 75, timeSec: 120 },
    { name: 'Salsa Boloñesa', temp: 85, speed: 40, timeSec: 90 },
    { name: 'Mermelada de Fresa', temp: 92, speed: 60, timeSec: 60 },
    { name: 'Chocolate Industrial', temp: 55, speed: 50, timeSec: 150 },
    { name: 'Crema Pastelera', temp: 78, speed: 45, timeSec: 80 }
  ];

  let simState = 'stopped'; // 'running', 'paused', 'stopped'
  let isEstop = false;
  let targetTemp = 85;
  let currentTemp = 24.5;
  let mixerSpeed = 50;
  let mixerDir = 1; // 1 = FWR, -1 = REV
  let timeLeft = 90;
  let waterLevel = 25;
  let isWaterFilling = false;
  let tiltAngle = 0;
  let tiltInterval = null;

  // DOM Elements
  const statusPill = document.getElementById('sim-status-pill');
  const tempCurrentEl = document.getElementById('sim-temp-current');
  const tempTargetEl = document.getElementById('sim-temp-target');
  const timeEl = document.getElementById('sim-time');
  const speedDisplay = document.getElementById('sim-speed-val');
  const speedSlider = document.getElementById('sim-speed-slider');
  const recipeSelect = document.getElementById('sim-recipe-select');
  const btnStart = document.getElementById('btn-sim-start');
  const btnStop = document.getElementById('btn-sim-stop');
  const btnEstop = document.getElementById('btn-sim-estop');
  const btnDir = document.getElementById('btn-sim-dir');
  const btnWater = document.getElementById('btn-sim-water');
  const kettleStage = document.getElementById('kettle-stage');
  const mixerBlades = document.getElementById('mixer-blades');
  const waterBar = document.getElementById('kettle-water-fill');
  const heatIndicator = document.getElementById('kettle-heat-glow');

  // Handle Recipe Selection
  if (recipeSelect) {
    recipeSelect.addEventListener('change', () => {
      const idx = parseInt(recipeSelect.value, 10);
      const recipe = RECIPES[idx];
      if (recipe) {
        targetTemp = recipe.temp;
        mixerSpeed = recipe.speed;
        timeLeft = recipe.timeSec;

        if (tempTargetEl) tempTargetEl.textContent = targetTemp + '°C';
        if (speedSlider) speedSlider.value = mixerSpeed;
        if (speedDisplay) speedDisplay.textContent = mixerSpeed + '%';
        if (timeEl) timeEl.textContent = formatTime(timeLeft);
      }
    });
  }

  // Handle Speed Slider
  if (speedSlider) {
    speedSlider.addEventListener('input', () => {
      mixerSpeed = parseInt(speedSlider.value, 10);
      if (speedDisplay) speedDisplay.textContent = mixerSpeed + '%';
    });
  }

  // Handle Mixer Direction
  if (btnDir) {
    btnDir.addEventListener('click', () => {
      mixerDir = mixerDir === 1 ? -1 : 1;
      btnDir.textContent = mixerDir === 1 ? 'GIRO: DIRECTO (FWR)' : 'GIRO: REVERSO (REV)';
    });
  }

  // Handle Water Fill Toggle
  if (btnWater) {
    btnWater.addEventListener('click', () => {
      isWaterFilling = !isWaterFilling;
      btnWater.textContent = isWaterFilling ? '💧 LLENANDO AGUA (ON)' : '💧 LLENADO AGUA (OFF)';
      btnWater.style.background = isWaterFilling ? '#0284c7' : '#1e293b';
    });
  }

  // Handle Start / Pause
  if (btnStart) {
    btnStart.addEventListener('click', () => {
      if (isEstop) {
        alert('ADVERTENCIA: Paro de Emergencia E-STOP activado. Desactívelo para continuar.');
        return;
      }
      simState = 'running';
      updateStatusUI();
    });
  }

  // Handle Stop
  if (btnStop) {
    btnStop.addEventListener('click', () => {
      simState = 'stopped';
      updateStatusUI();
    });
  }

  // Handle Emergency E-Stop
  if (btnEstop) {
    btnEstop.addEventListener('click', () => {
      isEstop = !isEstop;
      if (isEstop) {
        simState = 'stopped';
        isWaterFilling = false;
        btnEstop.textContent = '⚠️ E-STOP ACTIVADO (PULSAR PARA REARMAR)';
        btnEstop.style.background = '#b91c1c';
      } else {
        btnEstop.textContent = 'PARO DE EMERGENCIA (E-STOP)';
        btnEstop.style.background = '#7f1d1d';
      }
      updateStatusUI();
    });
  }

  // Tilt controls (Volteo motorizado)
  const btnTiltDown = document.getElementById('btn-tilt-down');
  const btnTiltUp = document.getElementById('btn-tilt-up');

  if (btnTiltDown) {
    btnTiltDown.addEventListener('mousedown', () => startTilt(1));
    btnTiltDown.addEventListener('mouseup', stopTilt);
    btnTiltDown.addEventListener('mouseleave', stopTilt);
    btnTiltDown.addEventListener('touchstart', (e) => { e.preventDefault(); startTilt(1); });
    btnTiltDown.addEventListener('touchend', stopTilt);
  }

  if (btnTiltUp) {
    btnTiltUp.addEventListener('mousedown', () => startTilt(-1));
    btnTiltUp.addEventListener('mouseup', stopTilt);
    btnTiltUp.addEventListener('mouseleave', stopTilt);
    btnTiltUp.addEventListener('touchstart', (e) => { e.preventDefault(); startTilt(-1); });
    btnTiltUp.addEventListener('touchend', stopTilt);
  }

  function startTilt(direction) {
    stopTilt();
    tiltInterval = setInterval(() => {
      if (direction === 1 && tiltAngle < 45) {
        tiltAngle += 1.5;
      } else if (direction === -1 && tiltAngle > 0) {
        tiltAngle -= 1.5;
      }
      applyTilt();
    }, 50);
  }

  function stopTilt() {
    if (tiltInterval) {
      clearInterval(tiltInterval);
      tiltInterval = null;
    }
  }

  function applyTilt() {
    if (kettleStage) {
      kettleStage.style.transform = `rotate(${tiltAngle}deg)`;
    }
  }

  // Physics & Animation Loop
  let rotationAngle = 0;
  setInterval(() => {
    // 1. Agitator blades rotation
    if (simState === 'running' && !isEstop) {
      const step = (mixerSpeed / 10) * mixerDir;
      rotationAngle = (rotationAngle + step) % 360;
      if (mixerBlades) {
        mixerBlades.style.transform = `rotate(${rotationAngle}deg)`;
      }
    }

    // 2. Thermodynamics
    if (simState === 'running' && !isEstop) {
      if (currentTemp < targetTemp) {
        currentTemp = Math.min(targetTemp, currentTemp + 0.5);
      } else {
        currentTemp = targetTemp + (Math.sin(Date.now() / 800) * 0.2);
      }

      if (heatIndicator) heatIndicator.style.opacity = '1';

      if (timeLeft > 0) {
        timeLeft--;
        if (timeEl) timeEl.textContent = formatTime(timeLeft);
      } else {
        simState = 'stopped';
        updateStatusUI();
        alert('¡Ciclo de cocción completado con éxito!');
      }
    } else {
      if (currentTemp > 24.5) {
        currentTemp = Math.max(24.5, currentTemp - 0.2);
      }
      if (heatIndicator) heatIndicator.style.opacity = '0';
    }

    if (tempCurrentEl) {
      tempCurrentEl.textContent = currentTemp.toFixed(1) + '°C';
    }

    // 3. Water Filling
    if (isWaterFilling && waterLevel < 95) {
      waterLevel += 1;
      if (waterBar) waterBar.style.height = waterLevel + '%';
    }

  }, 200);

  function updateStatusUI() {
    if (!statusPill) return;
    if (isEstop) {
      statusPill.className = 'hmi-status-pill pill-stopped';
      statusPill.textContent = 'E-STOP / ALARMA';
    } else if (simState === 'running') {
      statusPill.className = 'hmi-status-pill pill-running';
      statusPill.textContent = 'EN OPERACIÓN';
    } else {
      statusPill.className = 'hmi-status-pill pill-stopped';
      statusPill.textContent = 'DETENIDO';
    }
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  // ==========================================
  // 5. Video Demo Interactivo
  // ==========================================
  const btnPlayVideo = document.getElementById('btn-play-video');
  const videoScreen = document.getElementById('video-screen');

  if (btnPlayVideo && videoScreen) {
    btnPlayVideo.addEventListener('click', () => {
      videoScreen.innerHTML = `
        <div style="text-align: center; padding: 1.5rem;">
          <div style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #ef4444; margin-right: 8px; animation: pulse 1s infinite;"></div>
          <span style="font-family: var(--font-mono); font-weight: 700; color: #f87171; font-size: 0.85rem;">REPRODUCIENDO SIMULACIÓN EN VIVO...</span>
          <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.5rem;">Marmita Industrial DYH con Volteo Motorizado y Camisa de Glicerina.</p>
          <button id="btn-pause-video" style="margin-top: 1rem; padding: 0.4rem 1rem; background: #334155; color: #fff; border: none; border-radius: 6px; font-family: var(--font-mono); font-size: 0.75rem; cursor: pointer;">Pausar</button>
        </div>
      `;

      document.getElementById('btn-pause-video').addEventListener('click', () => {
        location.reload();
      });
    });
  }

  // ==========================================
  // 6. Enviar Formulario Vía AJAX a enviar.php
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnSubmit = contactForm.querySelector('button[type="submit"]');
      const originalText = btnSubmit.textContent;
      btnSubmit.textContent = 'ENVIANDO...';
      btnSubmit.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('enviar.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        formFeedback.style.display = 'block';
        if (result.success) {
          formFeedback.className = 'form-feedback feedback-success';
          formFeedback.textContent = result.message;
          contactForm.reset();
        } else {
          formFeedback.className = 'form-feedback feedback-error';
          formFeedback.textContent = result.message || 'Ocurrió un error al enviar el mensaje.';
        }
      } catch (err) {
        formFeedback.style.display = 'block';
        formFeedback.className = 'form-feedback feedback-error';
        formFeedback.textContent = 'Hubo un problema de conexión con el servidor. También puede contactarnos directamente por WhatsApp.';
      } finally {
        btnSubmit.textContent = originalText;
        btnSubmit.disabled = false;
      }
    });
  }

});
