import React, { useEffect, useRef } from 'react';

interface ClickableTarget {
  rect: DOMRect;
  element: HTMLElement;
}

export const TeslaGridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const lastActiveTargetRef = useRef<ClickableTarget | null>(null);
  const rippleRef = useRef({ x: 0, y: 0, radius: 0, active: false, maxRadius: 180, velocity: 4 });
  const frameIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position globally
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      if (mouseRef.current.x === -1000) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scrolling-aware Global Thinkers and Indian Mystics
    interface HistoricalFigure {
      name: string;
      quote: string;
      origin: string;
      type: 'lotus' | 'spiral' | 'tetrahedron' | 'star';
      x: number; // horizontal viewport percentage (0.1 to 0.9)
      y: number; // page height scroll percentage (0.02 to 0.98)
    }

    const figures: HistoricalFigure[] = [
      // 1. HERO SECTION HEIGHT (0.02 to 0.15) - ANCIENT AND FIRST REVEALS
      { name: "Zoroaster", quote: "Doing good to others is not a duty. It is a joy.", origin: "PERSIA, -1000", type: 'tetrahedron', x: 0.35, y: 0.02 },
      { name: "Leonardo da Vinci", quote: "Simplicity is the ultimate sophistication.", origin: "ITALY, 1452", type: 'spiral', x: 0.15, y: 0.04 },
      { name: "Swami Vivekananda", quote: "Arise, awake, and stop not till the goal is reached.", origin: "INDIA, 1863", type: 'lotus', x: 0.85, y: 0.05 },
      { name: "Yajnavalkya", quote: "The Self, indeed, is the light of man.", origin: "INDIA, -800", type: 'lotus', x: 0.50, y: 0.07 },
      { name: "Plato", quote: "Wise men speak because they have something to say.", origin: "GREECE, -427", type: 'tetrahedron', x: 0.70, y: 0.09 },
      { name: "Thales of Miletus", quote: "The most difficult thing in life is to know yourself.", origin: "GREECE, -624", type: 'spiral', x: 0.20, y: 0.11 },
      { name: "Socrates", quote: "An unexamined life is not worth living.", origin: "GREECE, -469", type: 'tetrahedron', x: 0.10, y: 0.12 },
      { name: "Mirabai", quote: "My Lord, you have made me your own.", origin: "INDIA, 1498", type: 'lotus', x: 0.90, y: 0.13 },
      { name: "Mahavira", quote: "All breathing, existing, living, sentient creatures should not be slain.", origin: "INDIA, -599", type: 'lotus', x: 0.60, y: 0.14 },
      { name: "Gautama Buddha", quote: "The mind is everything. What you think you become.", origin: "INDIA, -563", type: 'lotus', x: 0.30, y: 0.15 },

      // 2. VENTURES SECTION HEIGHT (0.16 to 0.35)
      { name: "Srinivasa Ramanujan", quote: "An equation has no meaning unless it expresses a thought of God.", origin: "INDIA, 1887", type: 'spiral', x: 0.20, y: 0.17 },
      { name: "Sushruta", quote: "A physician must have both knowledge and practical skill.", origin: "INDIA, -800", type: 'lotus', x: 0.50, y: 0.19 },
      { name: "Nikola Tesla", quote: "If you want to find the secrets of the universe, think of energy.", origin: "CROATIA, 1856", type: 'spiral', x: 0.80, y: 0.21 },
      { name: "Pythagoras", quote: "There is geometry in the humming of the strings.", origin: "GREECE, -570", type: 'spiral', x: 0.15, y: 0.23 },
      { name: "Steve Jobs", quote: "Stay hungry, stay foolish.", origin: "USA, 1955", type: 'star', x: 0.70, y: 0.25 },
      { name: "Lao Tzu", quote: "The journey of a thousand miles begins with a single step.", origin: "CHINA, -601", type: 'tetrahedron', x: 0.12, y: 0.27 },
      { name: "Sage Kanada", quote: "Every object of creation is made of atoms which associate.", origin: "INDIA, -600", type: 'spiral', x: 0.85, y: 0.29 },
      { name: "Aryabhata", quote: "Earth is a sphere and rotates on its own axis.", origin: "INDIA, 476", type: 'lotus', x: 0.55, y: 0.31 },
      { name: "Ibn Sina", quote: "The world is divided into those with wit, and those with religion.", origin: "PERSIA, 980", type: 'tetrahedron', x: 0.30, y: 0.33 },
      { name: "Ada Lovelace", quote: "The Analytical Engine weaves algebraic patterns.", origin: "ENGLAND, 1815", type: 'spiral', x: 0.70, y: 0.35 },

      // 3. TIMELINE SECTION HEIGHT (0.36 to 0.55)
      { name: "Alan Turing", quote: "We can only see a short distance ahead...", origin: "ENGLAND, 1912", type: 'spiral', x: 0.15, y: 0.37 },
      { name: "Albert Einstein", quote: "Imagination is more important than knowledge.", origin: "GERMANY, 1879", type: 'spiral', x: 0.85, y: 0.39 },
      { name: "Heraclitus", quote: "There is nothing permanent except change.", origin: "GREECE, -535", type: 'tetrahedron', x: 0.60, y: 0.41 },
      { name: "Tukaram", quote: "Words are the only jewels I possess.", origin: "INDIA, 1608", type: 'lotus', x: 0.30, y: 0.43 },
      { name: "Kabir", quote: "The clay says to the potter, 'Why do you tread on me?'", origin: "INDIA, 1398", type: 'lotus', x: 0.10, y: 0.45 },
      { name: "Rumi", quote: "Let yourself be silently drawn by the strange pull of what you love.", origin: "PERSIA, 1207", type: 'tetrahedron', x: 0.75, y: 0.47 },
      { name: "Hypatia", quote: "Reserve your right to think, for even to think wrongly is better.", origin: "EGYPT, 360", type: 'tetrahedron', x: 0.25, y: 0.49 },
      { name: "Rabindranath Tagore", quote: "You can't cross the sea merely by standing and staring.", origin: "INDIA, 1861", type: 'lotus', x: 0.40, y: 0.51 },
      { name: "Tansen", quote: "Music is the sound of the soul.", origin: "INDIA, 1506", type: 'lotus', x: 0.60, y: 0.53 },

      // 4. TECH STACK SECTION HEIGHT (0.56 to 0.75)
      { name: "Marie Curie", quote: "Nothing in life is to be feared, it is only to be understood.", origin: "POLAND, 1867", type: 'spiral', x: 0.12, y: 0.56 },
      { name: "Confucius", quote: "Our greatest glory is in rising every time we fall.", origin: "CHINA, -551", type: 'tetrahedron', x: 0.88, y: 0.58 },
      { name: "Democritus", quote: "Nothing exists except atoms and empty space.", origin: "GREECE, -460", type: 'spiral', x: 0.50, y: 0.60 },
      { name: "Isaac Newton", quote: "If I have seen further, it is by standing on the shoulders of giants.", origin: "ENGLAND, 1643", type: 'spiral', x: 0.30, y: 0.62 },
      { name: "Paramahansa Yogananda", quote: "Live quietly in the moment and see the beauty of all before you.", origin: "INDIA, 1893", type: 'lotus', x: 0.70, y: 0.64 },
      { name: "Ramakrishna Paramahamsa", quote: "To know God is the unique goal of human life.", origin: "INDIA, 1836", type: 'lotus', x: 0.20, y: 0.66 },
      { name: "Sage Patanjali", quote: "Yoga is the cessation of the fluctuations of the mind.", origin: "INDIA, -400", type: 'lotus', x: 0.50, y: 0.68 },
      { name: "Marcus Aurelius", quote: "You have power over your mind - not outside events.", origin: "ROME, 121", type: 'tetrahedron', x: 0.15, y: 0.70 },
      { name: "Savitribai Phule", quote: "Education is the great weapon to fight social evils.", origin: "INDIA, 1831", type: 'star', x: 0.60, y: 0.72 },
      { name: "Sri Aurobindo", quote: "True knowledge is not attained by thinking. It is what you are.", origin: "INDIA, 1872", type: 'lotus', x: 0.82, y: 0.74 },

      // 5. SANDBOX & CONTACT HEIGHT (0.76 to 0.98)
      { name: "Ramana Maharshi", quote: "Your own self-realization is the greatest service.", origin: "INDIA, 1879", type: 'lotus', x: 0.15, y: 0.76 },
      { name: "Jiddu Krishnamurti", quote: "Observation without evaluation is the highest intelligence.", origin: "INDIA, 1895", type: 'lotus', x: 0.85, y: 0.78 },
      { name: "Stephen Hawking", quote: "However difficult life may seem, there is always something you can do.", origin: "ENGLAND, 1942", type: 'spiral', x: 0.40, y: 0.80 },
      { name: "Galileo Galilei", quote: "All truths are easy to understand once discovered.", origin: "ITALY, 1564", type: 'spiral', x: 0.28, y: 0.82 },
      { name: "Chanakya", quote: "Education is the best friend. An educated person is respected.", origin: "INDIA, -371", type: 'lotus', x: 0.72, y: 0.84 },
      { name: "Kahlil Gibran", quote: "Say not, 'I have found the truth,' but rather, 'a truth.'", origin: "LEBANON, 1883", type: 'tetrahedron', x: 0.20, y: 0.87 },
      { name: "Al-Khwarizmi", quote: "Algebra is the mathematical system of balance.", origin: "UZBEKISTAN, 780", type: 'spiral', x: 0.80, y: 0.90 },
      { name: "Sardar Patel", quote: "By common endeavor we can raise the country to a new greatness.", origin: "INDIA, 1875", type: 'star', x: 0.60, y: 0.92 },
      { name: "Mahatma Gandhi", quote: "Be the change that you wish to see in the world.", origin: "INDIA, 1869", type: 'star', x: 0.38, y: 0.95 },
      { name: "Nelson Mandela", quote: "It always seems impossible until it is done.", origin: "SOUTH AFRICA, 1918", type: 'star', x: 0.62, y: 0.98 }
    ];

    // Variables for the loop
    let time = 0;
    const gridSpacing = 48;

    const renderLoop = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      // Spring smoothing for mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Always-visible glowing neon aura around mouse cursor
      ctx.save();
      const aura = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
      aura.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
      aura.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
      aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Handle ripple physics
      const ripple = rippleRef.current;
      if (ripple.active) {
        ripple.radius += ripple.velocity;
        if (ripple.radius > ripple.maxRadius) {
          ripple.active = false;
          ripple.radius = 0;
        }
      }

      // Query clickable elements dynamically
      const clickables = Array.from(
        document.querySelectorAll('a, button, .clickable, [role="button"]')
      ) as HTMLElement[];

      let activeTarget: ClickableTarget | null = null;
      let minDistance = 180; // Widen connection range for Tesla Hook

      // Find closest clickable element
      clickables.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;
        const dx = mouse.x - elCenterX;
        const dy = mouse.y - elCenterY;
        const dist = Math.hypot(dx, dy);

        if (dist < minDistance) {
          minDistance = dist;
          activeTarget = { rect, element: el };
        }
      });

      // Handle "Guitar String Snap" ripple on target transition (cursor leaving a button)
      if (lastActiveTargetRef.current && !activeTarget) {
        const prevRect = lastActiveTargetRef.current.rect;
        ripple.x = prevRect.left + prevRect.width / 2;
        ripple.y = prevRect.top + prevRect.height / 2;
        ripple.radius = 0;
        ripple.active = true;
      }
      lastActiveTargetRef.current = activeTarget;

      // Draw Vector Grid with Bending Physics
      const cols = Math.ceil(canvas.width / gridSpacing) + 1;
      const rows = Math.ceil(canvas.height / gridSpacing) + 1;

      // Draw Horizontal Lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        const startY = r * gridSpacing;

        for (let c = 0; c < cols; c++) {
          const startX = c * gridSpacing;
          let ptX = startX;
          let ptY = startY;

          // Bending math based on mouse proximity (Gravity Field)
          const dx = mouse.x - ptX;
          const dy = mouse.y - ptY;
          const dist = Math.hypot(dx, dy);
          const maxGravityRadius = 240;

          if (dist < maxGravityRadius) {
            const force = (1 - dist / maxGravityRadius) * 22;
            ptX += (dx / dist) * force;
            ptY += (dy / dist) * force;
          }

          // Guitar String ripple vibration math
          if (ripple.active) {
            const rx = ripple.x - ptX;
            const ry = ripple.y - ptY;
            const rDist = Math.hypot(rx, ry);
            const rippleWidth = 24;

            if (Math.abs(rDist - ripple.radius) < rippleWidth) {
              const rippleForce = (1 - Math.abs(rDist - ripple.radius) / rippleWidth) * 12;
              // Add high frequency twang vibration
              ptY += Math.sin(time * 6) * rippleForce;
              ptX += Math.cos(time * 6) * rippleForce;
            }
          }

          if (c === 0) {
            ctx.moveTo(ptX, ptY);
          } else {
            ctx.lineTo(ptX, ptY);
          }
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.085)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Vertical Lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        const startX = c * gridSpacing;

        for (let r = 0; r < rows; r++) {
          const startY = r * gridSpacing;
          let ptX = startX;
          let ptY = startY;

          const dx = mouse.x - ptX;
          const dy = mouse.y - ptY;
          const dist = Math.hypot(dx, dy);
          const maxGravityRadius = 240;

          if (dist < maxGravityRadius) {
            const force = (1 - dist / maxGravityRadius) * 22;
            ptX += (dx / dist) * force;
            ptY += (dy / dist) * force;
          }

          if (ripple.active) {
            const rx = ripple.x - ptX;
            const ry = ripple.y - ptY;
            const rDist = Math.hypot(rx, ry);
            const rippleWidth = 24;

            if (Math.abs(rDist - ripple.radius) < rippleWidth) {
              const rippleForce = (1 - Math.abs(rDist - ripple.radius) / rippleWidth) * 12;
              ptX += Math.sin(time * 6) * rippleForce;
              ptY += Math.cos(time * 6) * rippleForce;
            }
          }

          if (r === 0) {
            ctx.moveTo(ptX, ptY);
          } else {
            ctx.lineTo(ptX, ptY);
          }
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Secret Historical Holograms (Mandala & Quote nodes)
      const currentScrollY = window.scrollY;
      const docHeight = Math.max(document.documentElement.scrollHeight, 6000);

      figures.forEach((fig) => {
        const posX = fig.x * canvas.width;
        const posY = fig.y * docHeight - currentScrollY;

        // Render only if currently in the viewport to maximize performance
        if (posY < -150 || posY > canvas.height + 150) return;

        const dx = mouse.x - posX;
        const dy = mouse.y - posY;
        const dist = Math.hypot(dx, dy);
        const maxHighlightDist = 240;

        if (dist < maxHighlightDist) {
          const revealAlpha = (1 - dist / maxHighlightDist) * 0.25; // beautiful glowing alpha

          // 1. Draw glowing background aura under the mandala
          ctx.save();
          ctx.globalAlpha = revealAlpha * 0.45;
          const figAura = ctx.createRadialGradient(posX, posY, 0, posX, posY, 55);
          figAura.addColorStop(0, fig.type === 'lotus' ? 'rgba(168, 85, 247, 0.45)' : fig.type === 'spiral' ? 'rgba(6, 182, 212, 0.45)' : fig.type === 'tetrahedron' ? 'rgba(239, 68, 68, 0.45)' : 'rgba(251, 191, 36, 0.45)');
          figAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = figAura;
          ctx.beginPath();
          ctx.arc(posX, posY, 55, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // 2. Draw Sacred Geometry Mandala Vector
          ctx.save();
          ctx.globalAlpha = revealAlpha * 1.5;
          ctx.shadowBlur = 15;
          ctx.shadowColor = fig.type === 'lotus' ? '#a855f7' : fig.type === 'spiral' ? '#06b6d4' : fig.type === 'tetrahedron' ? '#ef4444' : '#fbbf24';
          ctx.strokeStyle = fig.type === 'lotus' ? '#d8b4fe' : fig.type === 'spiral' ? '#99f6e4' : fig.type === 'tetrahedron' ? '#fca5a5' : '#fef08a';
          ctx.lineWidth = 1.5;

          if (fig.type === 'lotus') {
            // Sacred Lotus Mandala
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
              const angle = (i * Math.PI) / 4 + time * 0.15;
              const petalX = posX + Math.cos(angle) * 16;
              const petalY = posY + Math.sin(angle) * 16;
              ctx.arc(petalX, petalY, 14, 0, Math.PI * 2);
            }
            ctx.stroke();
          } else if (fig.type === 'spiral') {
            // Fibonacci Golden Spiral
            ctx.beginPath();
            for (let i = 0; i < 70; i++) {
              const angle = i * 0.15 - time * 0.3;
              const rad = i * 0.55;
              ctx.lineTo(posX + Math.cos(angle) * rad, posY + Math.sin(angle) * rad);
            }
            ctx.stroke();
          } else if (fig.type === 'tetrahedron') {
            // Interlocking Star Tetrahedron
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
              const angle = (i * Math.PI * 2) / 3 + time * 0.15;
              const tx = posX + Math.cos(angle) * 28;
              const ty = posY + Math.sin(angle) * 28;
              if (i === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
            }
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
              const angle = (i * Math.PI * 2) / 3 + Math.PI - time * 0.15;
              const tx = posX + Math.cos(angle) * 28;
              const ty = posY + Math.sin(angle) * 28;
              if (i === 0) ctx.moveTo(tx, ty); else ctx.lineTo(tx, ty);
            }
            ctx.closePath();
            ctx.stroke();
          } else {
            // Geometric Constellation Star
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (i * Math.PI * 4) / 5 + time * 0.2;
              const sx = posX + Math.cos(angle) * 26;
              const sy = posY + Math.sin(angle) * 26;
              if (i === 0) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
            }
            ctx.closePath();
            ctx.stroke();
          }
          ctx.restore();

          // 3. Render Glowing Text Details
          ctx.save();
          ctx.globalAlpha = revealAlpha * 1.5;
          ctx.shadowBlur = 8;
          ctx.shadowColor = fig.type === 'lotus' ? '#a855f7' : fig.type === 'spiral' ? '#06b6d4' : fig.type === 'tetrahedron' ? '#ef4444' : '#fbbf24';
          
          ctx.fillStyle = fig.type === 'lotus' ? '#e9d5ff' : fig.type === 'spiral' ? '#ccfbf1' : fig.type === 'tetrahedron' ? '#fee2e2' : '#fef9c3';
          ctx.font = 'bold 12px JetBrains Mono, monospace';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          ctx.fillText(fig.name.toUpperCase(), posX, posY + 52);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.font = 'bold 9px JetBrains Mono, monospace';
          ctx.fillText(fig.origin, posX, posY + 70);

          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.font = 'italic 10px Inter, sans-serif';
          ctx.fillText(`"${fig.quote}"`, posX, posY + 88);
          ctx.restore();
        }
      });

      // Draw Tesla Electric Arc Hook (if near a button)
      if (activeTarget) {
        const rect = (activeTarget as ClickableTarget).rect;

        // Find closest point on button rectangle to cursor
        const targetX = Math.max(rect.left, Math.min(mouse.x, rect.left + rect.width));
        const targetY = Math.max(rect.top, Math.min(mouse.y, rect.top + rect.height));

        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 5) {
          ctx.save();

          // Outer Glow
          ctx.shadowBlur = 32;
          ctx.shadowColor = Math.sin(time) > 0 ? 'rgba(6, 182, 212, 1)' : 'rgba(168, 85, 247, 1)';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 3.5;

          // Generate jagged tesla coil lightning path
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);

          const segments = 8;
          for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const segmentX = mouse.x + dx * t;
            const segmentY = mouse.y + dy * t;

            // Perpendicular vector for lightning jagged displacement
            const pX = -dy / dist;
            const pY = dx / dist;

            // Frequency and random noise logic
            const displacementStrength = Math.min(dist * 0.15, 12);
            const displacement = (Math.sin(time * 12 + i * 2) + (Math.random() - 0.5) * 0.6) * displacementStrength;

            ctx.lineTo(segmentX + pX * displacement, segmentY + pY * displacement);
          }

          ctx.lineTo(targetX, targetY);
          ctx.stroke();

          // Core Hot Inner Path
          ctx.shadowBlur = 0;
          ctx.strokeStyle = '#e0f2fe';
          ctx.lineWidth = 1.6;
          ctx.stroke();

          ctx.restore();

          // Small spark particles at connection endpoints
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
          ctx.arc(targetX, targetY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
        }
      }

      frameIdRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
    />
  );
};
