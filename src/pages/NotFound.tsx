import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, RefreshCw, Home, Compass } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface Obstacle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Target {
  x: number;
  y: number;
  radius: number;
  pulse: number;
}

export const NotFound: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [shields, setShields] = useState(100);
  const [gameState, setGameState] = useState<'playing' | 'gameover' | 'victory'>('playing');
  
  // Game loop controls
  const shipRef = useRef({ x: 150, y: 150, vx: 0, vy: 0, angle: 0, targetAngle: 0, radius: 12 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const targetsRef = useRef<Target[]>([]);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameIdRef = useRef<number>(0);

  // Restart the minigame
  const restartGame = () => {
    setScore(0);
    setShields(100);
    setGameState('playing');
    
    // Position ship in center
    if (canvasRef.current) {
      shipRef.current = {
        x: canvasRef.current.width / 2,
        y: canvasRef.current.height / 2,
        vx: 0,
        vy: 0,
        angle: 0,
        targetAngle: 0,
        radius: 12,
      };
    }
    
    // Initialize targets & obstacles
    spawnTargets(1);
    spawnObstacles(4);
    particlesRef.current = [];
  };

  const spawnTargets = (count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    targetsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * (canvas.width - 60) + 30,
      y: Math.random() * (canvas.height - 60) + 30,
      radius: 8,
      pulse: 0,
    }));
  };

  const spawnObstacles = (count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    obstaclesRef.current = Array.from({ length: count }, () => {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      // Keep away from center initially
      while (Math.hypot(x - canvas.width / 2, y - canvas.height / 2) < 150) {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      }
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 12 + 8,
      };
    });
  };

  useEffect(() => {
    document.title = '404 - Lost in Space Node';
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 420; // Bound height inside card
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial setups
    shipRef.current.x = canvas.width / 2;
    shipRef.current.y = canvas.height / 2;
    spawnTargets(1);
    spawnObstacles(4);

    // Listeners for keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Mouse control within canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Game loop logic
    let time = 0;
    const loop = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw starry space background
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw faint grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSpacing = 40;
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (gameState === 'playing') {
        const ship = shipRef.current;
        const keys = keysRef.current;
        const mouse = mouseRef.current;

        // Space thruster force vectors
        let ax = 0;
        let ay = 0;
        const thrust = 0.22;

        // Keyboard controls (WASD & Arrows)
        if (keys['w'] || keys['arrowup']) {
          ax += Math.cos(ship.angle) * thrust;
          ay += Math.sin(ship.angle) * thrust;
        }
        if (keys['s'] || keys['arrowdown']) {
          ax -= Math.cos(ship.angle) * thrust * 0.5;
          ay -= Math.sin(ship.angle) * thrust * 0.5;
        }
        if (keys['a'] || keys['arrowleft']) {
          ship.angle -= 0.08;
        }
        if (keys['d'] || keys['arrowright']) {
          ship.angle += 0.08;
        }

        // Mouse attraction physics (Secondary control option)
        if (mouse.x !== -1000) {
          const dx = mouse.x - ship.x;
          const dy = mouse.y - ship.y;
          const dist = Math.hypot(dx, dy);

          if (dist > 30) {
            ship.targetAngle = Math.atan2(dy, dx);
            // Rotate smoothly toward target
            let angleDiff = ship.targetAngle - ship.angle;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            ship.angle += angleDiff * 0.1;

            // Apply light thrust toward mouse
            ax += Math.cos(ship.angle) * thrust * 0.45;
            ay += Math.sin(ship.angle) * thrust * 0.45;
          }
        }

        // Apply velocities, friction, and boundaries
        ship.vx += ax;
        ship.vy += ay;
        ship.vx *= 0.975; // Drag
        ship.vy *= 0.975;
        ship.x += ship.vx;
        ship.y += ship.vy;

        // Screen boundary collisions
        if (ship.x < ship.radius) { ship.x = ship.radius; ship.vx *= -0.5; }
        if (ship.x > canvas.width - ship.radius) { ship.x = canvas.width - ship.radius; ship.vx *= -0.5; }
        if (ship.y < ship.radius) { ship.y = ship.radius; ship.vy *= -0.5; }
        if (ship.y > canvas.height - ship.radius) { ship.y = canvas.height - ship.radius; ship.vy *= -0.5; }

        // Spawn thruster particle plumes
        if (Math.hypot(ax, ay) > 0.05) {
          particlesRef.current.push({
            x: ship.x - Math.cos(ship.angle) * ship.radius,
            y: ship.y - Math.sin(ship.angle) * ship.radius,
            vx: -Math.cos(ship.angle) * 2 + (Math.random() - 0.5),
            vy: -Math.sin(ship.angle) * 2 + (Math.random() - 0.5),
            life: 15,
            maxLife: 15,
            color: Math.random() > 0.5 ? '#06b6d4' : '#a855f7',
          });
        }

        // Render Ship
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.angle);

        // Core Shuttle Path
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(ship.radius * 1.5, 0);
        ctx.lineTo(-ship.radius, -ship.radius * 0.95);
        ctx.lineTo(-ship.radius * 0.5, 0);
        ctx.lineTo(-ship.radius, ship.radius * 0.95);
        ctx.closePath();
        ctx.fill();

        // Inner cabin detail
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.moveTo(ship.radius * 0.6, 0);
        ctx.lineTo(-ship.radius * 0.2, -ship.radius * 0.35);
        ctx.lineTo(-ship.radius * 0.2, ship.radius * 0.35);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // Target rendering and collection math
        targetsRef.current.forEach((target, tIdx) => {
          target.pulse = Math.sin(time * 3) * 3;
          
          // Draw pulsing core node
          ctx.save();
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'rgba(56, 189, 248, 0.9)';
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.arc(target.x, target.y, target.radius + target.pulse * 0.3, 0, Math.PI * 2);
          ctx.fill();

          // Outer orbit rings
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(target.x, target.y, target.radius + 12, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Check target collections
          const distToTarget = Math.hypot(ship.x - target.x, ship.y - target.y);
          if (distToTarget < ship.radius + target.radius + 8) {
            // Trigger particle explosions
            for (let i = 0; i < 20; i++) {
              particlesRef.current.push({
                x: target.x,
                y: target.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 30,
                maxLife: 30,
                color: '#22d3ee',
              });
            }

            // Update scores
            const nextScore = score + 1;
            setScore(nextScore);

            if (nextScore >= 5) {
              setGameState('victory');
            } else {
              // Move target
              spawnTargets(1);
            }
          }
        });

        // Obstacles (Corrupted Code Blobs) rendering & collision math
        obstaclesRef.current.forEach((obs) => {
          obs.x += obs.vx;
          obs.y += obs.vy;

          // Wrap boundaries
          if (obs.x < -obs.radius) obs.x = canvas.width + obs.radius;
          if (obs.x > canvas.width + obs.radius) obs.x = -obs.radius;
          if (obs.y < -obs.radius) obs.y = canvas.height + obs.radius;
          if (obs.y > canvas.height + obs.radius) obs.y = -obs.radius;

          // Draw floating obstacle
          ctx.save();
          ctx.shadowBlur = 12;
          ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Check collisions with spaceship
          const distToObs = Math.hypot(ship.x - obs.x, ship.y - obs.y);
          if (distToObs < ship.radius + obs.radius) {
            // Shield damage
            setShields((prev) => {
              const next = prev - 0.65; // High rate damage over continuous touch
              if (next <= 0) {
                setGameState('gameover');
                return 0;
              }
              return next;
            });

            // Spark sparks
            particlesRef.current.push({
              x: ship.x,
              y: ship.y,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              life: 10,
              maxLife: 10,
              color: '#ef4444',
            });
          }
        });
      }

      // Render and update active particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        return p.life > 0;
      });

      frameIdRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [gameState, score]);

  return (
    <div className="min-h-screen w-full bg-black text-slate-100 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden select-none">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Core Terminal Panel */}
      <div className="w-full max-w-3xl rounded-3xl p-6 md:p-8 bg-neutral-950 border border-neutral-900 glass-panel shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-900">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              system_failure.dll
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-display text-white">404 — Lost In Space</h1>
          </div>

          {/* Scores Panel */}
          <div className="flex items-center gap-4 font-mono text-xs">
            <div className="space-y-1 bg-neutral-900/60 border border-neutral-850 p-2.5 rounded-xl flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Nodes Saved</div>
                <div className="font-semibold text-slate-200">{score} / 5</div>
              </div>
            </div>

            <div className="space-y-1 bg-neutral-900/60 border border-neutral-850 p-2.5 rounded-xl flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-[9px] text-neutral-500 uppercase tracking-wider">Shield Strength</div>
                <div className="font-semibold text-slate-200">{Math.round(shields)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Arcade Minigame Viewport */}
        <div className="relative rounded-2xl border border-neutral-900 bg-black overflow-hidden h-[420px]">
          <canvas ref={canvasRef} className="absolute inset-0 block cursor-crosshair w-full h-full" />

          {/* Start / Gameover Overlay */}
          <AnimatePresence>
            {gameState === 'gameover' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-lg font-mono">
                  ⚠
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white font-display">System Integrity Compromised</h3>
                  <p className="text-xs text-neutral-500 max-w-xs font-light">
                    Corrupted data blocks have drained your spaceship shields. Please restart to re-attempt node capture.
                  </p>
                </div>
                <button
                  onClick={restartGame}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors font-display"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Restart System
                </button>
              </motion.div>
            )}

            {gameState === 'victory' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-lg font-mono">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white font-display">Connection Restored</h3>
                  <p className="text-xs text-neutral-400 max-w-xs font-light">
                    Excellent pilot! You have successfully collected 5 core system nodes and rebuilt the server connection to Earth.
                  </p>
                </div>
                <Link
                  to="/"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors font-display shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  <Home className="w-3.5 h-3.5" />
                  Return to Earth Portal
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simple controls help footer */}
          {gameState === 'playing' && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-neutral-950/80 border border-neutral-900/60 backdrop-blur text-[10px] font-mono text-neutral-500 text-center pointer-events-none select-none tracking-tight">
              Controls: Move Mouse to steer & fly, or use <span className="text-cyan-400">W, A, S, D / Arrows</span>
            </div>
          )}
        </div>

        {/* Bottom instructions row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-900 text-xs text-neutral-500">
          <div className="font-light max-w-md text-left leading-relaxed">
            It appears you drifted into an unrouted node chunk. Rebuild the link by capturing the glowing cyan data modules or bypass the arcade completely.
          </div>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-slate-300 font-medium text-xs transition-colors border border-neutral-850 hover:border-neutral-800"
          >
            Bypass Arcade
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
