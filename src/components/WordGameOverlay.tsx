import React, { useState, useEffect, useRef } from 'react';
import { X, Trophy, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface GridCell {
  letter: string;
  row: number;
  col: number;
}

export const WordGameOverlay: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [showInitiate, setShowInitiate] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  
  // Game states
  const [gridSize] = useState(12);
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [targetWord, setTargetWord] = useState('');
  const [currentSelection, setCurrentSelection] = useState<{ row: number; col: number }[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [targetCells, setTargetCells] = useState<{ row: number; col: number }[]>([]);
  const [score, setScore] = useState(0);

  // Sparkle particle effect state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; color: string; size: number; alpha: number }[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Monitor global mouse text selections
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection ? selection.toString().trim() : '';
        // Only accept letters, length between 3 and 12 characters
        if (text && /^[a-zA-Z]{3,12}$/.test(text)) {
          setSelectedWord(text.toUpperCase());
          setShowInitiate(true);
        }
      }, 30);
    };

    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  // Set up portfolio background fade when game starts
  useEffect(() => {
    const content = document.getElementById('portfolio-content');
    if (content) {
      if (isGameActive) {
        content.style.opacity = '0.05';
        content.style.filter = 'blur(16px)';
        content.style.pointerEvents = 'none';
        content.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      } else {
        content.style.opacity = '1';
        content.style.filter = 'none';
        content.style.pointerEvents = 'auto';
      }
    }
  }, [isGameActive]);

  // Canvas particle logic for celebration
  useEffect(() => {
    if (!isWon) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Create burst of celebration particles
    const colors = ['#06b6d4', '#a855f7', '#fbbf24', '#22c55e', '#ec4899'];
    const particles = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 5 + 3,
        alpha: 1
      });
    }
    particlesRef.current = particles;

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // simple gravity
        p.alpha -= 0.01;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Remove dead particles
        if (p.alpha <= 0) {
          particlesRef.current.splice(idx, 1);
        }
      });

      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animateParticles);
      }
    };

    animateParticles();
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isWon]);

  // Generate the Word Search Puzzle Grid
  const generateGame = (wordToHide: string) => {
    const tempWord = wordToHide.toUpperCase();
    setTargetWord(tempWord);
    setIsWon(false);
    setCurrentSelection([]);
    
    // Create empty grid
    const emptyGrid: GridCell[][] = Array(gridSize).fill(null).map((_, r) => 
      Array(gridSize).fill(null).map((_, c) => ({ letter: '', row: r, col: c }))
    );

    // Random direction: 0 = Horizontal, 1 = Vertical, 2 = Diagonal
    const direction = Math.floor(Math.random() * 3);
    let startRow = 0;
    let startCol = 0;
    
    if (direction === 0) {
      // Horizontal
      startRow = Math.floor(Math.random() * gridSize);
      startCol = Math.floor(Math.random() * (gridSize - tempWord.length));
    } else if (direction === 1) {
      // Vertical
      startRow = Math.floor(Math.random() * (gridSize - tempWord.length));
      startCol = Math.floor(Math.random() * gridSize);
    } else {
      // Diagonal Down-Right
      startRow = Math.floor(Math.random() * (gridSize - tempWord.length));
      startCol = Math.floor(Math.random() * (gridSize - tempWord.length));
    }

    const placedCells: { row: number; col: number }[] = [];

    // Place the target word
    for (let i = 0; i < tempWord.length; i++) {
      const r = startRow + (direction === 1 || direction === 2 ? i : 0);
      const c = startCol + (direction === 0 || direction === 2 ? i : 0);
      emptyGrid[r][c].letter = tempWord[i];
      placedCells.push({ row: r, col: c });
    }

    // Fill remaining cells with random letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (emptyGrid[r][c].letter === '') {
          emptyGrid[r][c].letter = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    setGrid(emptyGrid);
    setTargetCells(placedCells);
  };

  const startWordGame = () => {
    setIsGameActive(true);
    generateGame(selectedWord);
    setShowInitiate(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isWon) return;

    // Check if cell is already selected
    const alreadySelectedIdx = currentSelection.findIndex(cell => cell.row === row && cell.col === col);
    let newSelection = [...currentSelection];

    if (alreadySelectedIdx > -1) {
      // Deselect if clicked the last selected cell
      if (alreadySelectedIdx === currentSelection.length - 1) {
        newSelection.pop();
      }
    } else {
      // Limit selection length to target word length
      if (currentSelection.length < targetWord.length) {
        newSelection.push({ row, col });
      }
    }

    setCurrentSelection(newSelection);

    // Form spelled word
    const spelled = newSelection.map(cell => grid[cell.row][cell.col].letter).join('');
    
    if (spelled === targetWord) {
      setIsWon(true);
      setScore(prev => prev + 100);
    } else if (spelled.length >= targetWord.length) {
      // Reset selection on wrong full spelled word automatically after 800ms
      setTimeout(() => {
        setCurrentSelection([]);
      }, 800);
    }
  };

  const isCellSelected = (row: number, col: number) => {
    return currentSelection.some(cell => cell.row === row && cell.col === col);
  };

  const isCellTarget = (row: number, col: number) => {
    return isWon && targetCells.some(cell => cell.row === row && cell.col === col);
  };

  const closeGame = () => {
    setIsGameActive(false);
    setSelectedWord('');
  };

  return (
    <>
      {/* 1. FLOATING ACTION INITIATION CARD */}
      {showInitiate && (
        <div className="fixed bottom-6 right-6 z-[99999] p-4 bg-neutral-950/90 border border-cyan-500/40 rounded-xl shadow-2xl glass-panel animate-fade-in flex flex-col gap-3 max-w-[280px]">
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Word Detected</span>
            </div>
            <button 
              onClick={() => setShowInitiate(false)} 
              className="text-neutral-500 hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div>
            <div className="text-slate-100 font-bold text-sm truncate uppercase tracking-widest bg-neutral-900 px-2 py-1 rounded border border-neutral-800 font-mono">
              "{selectedWord}"
            </div>
            <p className="text-[10px] text-neutral-400 mt-1.5 leading-relaxed">
              Initiate the cyber matrix and find this word hidden inside our letter grid!
            </p>
          </div>
          <button
            onClick={startWordGame}
            className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-100 rounded-lg text-xs font-bold font-mono tracking-wider shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            INITIATE WORD GAME
          </button>
        </div>
      )}

      {/* 2. FULLSCREEN ARCADE OVERLAY */}
      {isGameActive && (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md p-6 overflow-y-auto animate-fade-in">
          {isWon && <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[10000]" />}

          <div className="relative w-[95%] max-w-5xl bg-neutral-950/95 border border-neutral-850 rounded-2xl p-6 md:p-8 flex flex-col items-center space-y-6 shadow-2xl z-[9999] glass-panel select-none">
            
            {/* Header / Scoreboard */}
            <div className="w-full flex justify-between items-center border-b border-neutral-900 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-850">
                  <Trophy className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-slate-100 font-bold text-base md:text-lg tracking-wider font-display">Cyber Grid Arena</h2>
                  <p className="text-[11px] text-neutral-500 font-mono">Find the target word hidden inside</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right font-mono">
                  <div className="text-[10px] text-neutral-500">SCORE</div>
                  <div className="text-sm md:text-base font-bold text-cyan-400">{score}</div>
                </div>
                <button
                  onClick={closeGame}
                  className="p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-slate-100 transition-all active:scale-95"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Content: Dual-Column Widescreen Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-stretch">
              
              {/* Left Column: Stats & Controls */}
              <div className="md:col-span-5 flex flex-col gap-6 justify-between bg-neutral-950/40 p-4 md:p-6 rounded-2xl border border-neutral-900/60">
                
                <div className="flex flex-col gap-5">
                  {/* Target Word Alert Banner */}
                  <div className="w-full p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between font-mono">
                    <div>
                      <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">Target Word</span>
                      <span className="text-xl font-bold text-slate-100 uppercase tracking-widest">{targetWord}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">Letters</span>
                      <span className="text-base font-bold text-purple-400">{targetWord.length}</span>
                    </div>
                  </div>

                  {/* Live spelled text progress */}
                  <div className="w-full flex flex-col items-start gap-2 bg-neutral-900/50 p-4 border border-neutral-900 rounded-xl">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono font-bold">Spelled Sequence</span>
                    <div className="flex flex-wrap items-center gap-1.5 min-h-[36px] font-mono w-full">
                      {currentSelection.length === 0 ? (
                        <span className="text-xs text-neutral-600 italic">Click letters in the grid to spell...</span>
                      ) : (
                        currentSelection.map((cell, idx) => (
                          <React.Fragment key={idx}>
                            <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800/60 font-bold text-xs text-cyan-300 shadow shadow-cyan-500/10">
                              {grid[cell.row][cell.col].letter}
                            </span>
                            {idx < currentSelection.length - 1 && <span className="text-neutral-600">-</span>}
                          </React.Fragment>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Victory / Option Buttons */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-900/60">
                  <button
                    onClick={() => generateGame(targetWord)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-slate-200 text-xs font-bold font-mono rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Grid
                  </button>

                  {isWon ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-sm animate-bounce py-1">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      WORD SECURED!
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setIsWon(true);
                      }}
                      className="text-xs text-neutral-500 hover:text-neutral-300 font-mono transition-colors py-2"
                    >
                      Solve Grid
                    </button>
                  )}
                </div>

              </div>

              {/* Right Column: Letter Grid Matrix */}
              <div className="md:col-span-7 flex justify-center items-center">
                <div className="grid grid-cols-12 gap-1.5 p-3 bg-neutral-950 rounded-2xl border border-neutral-900 w-full aspect-square max-w-md md:max-w-full">
                  {grid.map((rowArr, rIdx) => (
                    rowArr.map((cell, cIdx) => {
                      const selected = isCellSelected(cell.row, cell.col);
                      const isTarget = isCellTarget(cell.row, cell.col);
                      return (
                        <button
                          key={`${rIdx}-${cIdx}`}
                          onClick={() => handleCellClick(cell.row, cell.col)}
                          className={`
                            aspect-square w-full rounded font-mono text-xs md:text-sm font-bold tracking-normal transition-all duration-150 active:scale-90 flex items-center justify-center
                            ${isTarget 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/80 shadow-md shadow-emerald-500/20 animate-pulse' 
                              : selected 
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/80 shadow-md shadow-cyan-500/20' 
                                : 'bg-neutral-900/60 text-neutral-400 border border-neutral-900/50 hover:bg-neutral-800 hover:text-slate-100'
                            }
                          `}
                        >
                          {cell.letter}
                        </button>
                      );
                    })
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};
