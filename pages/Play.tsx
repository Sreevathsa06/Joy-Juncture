import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { useWallet } from '../contexts/WalletContext';
import { useAuth } from '../contexts/AuthContext';

const SUDOKU_PUZZLE = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SUDOKU_SOLUTION = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const SudokuGrid: React.FC = () => {
    const { addPoints } = useWallet();
    const [grid, setGrid] = useState(SUDOKU_PUZZLE.map(row => [...row]));
    const [solved, setSolved] = useState(false);
    const [claiming, setClaiming] = useState(false);

    const handleChange = (row: number, col: number, value: string) => {
        const num = parseInt(value) || 0;
        if (num >= 0 && num <= 9) {
            const newGrid = grid.map(r => [...r]);
            newGrid[row][col] = num;
            setGrid(newGrid);
        }
    };

    const checkSolution = () => {
        if (JSON.stringify(grid) === JSON.stringify(SUDOKU_SOLUTION)) {
            setSolved(true);
        } else {
            alert('Not quite right. Keep trying!');
        }
    };

    const handleClaim = async () => {
        if(claiming) return;
        setClaiming(true);
        try {
            await addPoints('Solved Sudoku Puzzle', 25);
            alert('25 Joy Points added to your wallet!');
            setGrid(SUDOKU_PUZZLE.map(row => [...row]));
            setSolved(false);
        } catch (error) {
            console.error("Error claiming points:", error);
            alert("Could not claim points. Please check your connection.");
        } finally {
            setClaiming(false);
        }
    };

    return (
        <div className="p-6 bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10 h-full">
            <h3 className="text-xl font-bold mb-2 text-jj-gray-900 dark:text-white">Daily Sudoku Challenge</h3>
            <p className="text-sm text-jj-gray-800 dark:text-jj-gray-300 mb-4">Fill the grid so that every row, column, and 3x3 box contains the digits 1 through 9.</p>
            <div className="grid grid-cols-9 gap-1 mx-auto w-min">
                {grid.map((row, rIndex) => 
                    row.map((cell, cIndex) => (
                        <input
                            key={`${rIndex}-${cIndex}`}
                            type="text"
                            pattern="\d*"
                            maxLength={1}
                            value={cell === 0 ? '' : cell}
                            readOnly={SUDOKU_PUZZLE[rIndex][cIndex] !== 0}
                            onChange={(e) => handleChange(rIndex, cIndex, e.target.value)}
                            className={`w-8 h-8 md:w-10 md:h-10 text-center text-lg font-semibold border rounded-sm
                                ${SUDOKU_PUZZLE[rIndex][cIndex] !== 0 ? 'bg-jj-gray-200 dark:bg-jj-gray-600 text-jj-gray-900 dark:text-white' : 'bg-white dark:bg-jj-gray-700 text-jj-blue'}
                                ${cIndex % 3 === 2 && cIndex < 8 ? 'border-r-2 border-r-jj-gray-400 dark:border-r-jj-gray-500' : 'border-r-gray-300 dark:border-r-jj-gray-600'}
                                ${rIndex % 3 === 2 && rIndex < 8 ? 'border-b-2 border-b-jj-gray-400 dark:border-b-jj-gray-500' : 'border-b-gray-300 dark:border-b-jj-gray-600'}
                            `}
                        />
                    ))
                )}
            </div>
            {solved ? (
                <button 
                    onClick={handleClaim} 
                    disabled={claiming}
                    className="mt-6 w-full bg-green-500 text-white font-bold py-2 rounded-full hover:bg-green-600 animate-bounce shadow-lg disabled:opacity-50 disabled:animate-none">
                    {claiming ? 'Claiming...' : 'Claim 25 Joy Points'}
                </button>
            ) : (
                <button onClick={checkSolution} className="mt-6 w-full bg-jj-blue text-white font-bold py-2 rounded-full hover:bg-opacity-90">
                    Check Solution
                </button>
            )}
        </div>
    );
};

const RiddleGame: React.FC = () => {
    const { addPoints } = useWallet();
    const [answer, setAnswer] = useState('');
    const [solved, setSolved] = useState(false);
    const [claiming, setClaiming] = useState(false);

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (answer.toLowerCase().includes('echo')) {
            setSolved(true);
        } else {
            alert('Not quite right. Give it another thought!');
        }
    };

    const handleClaim = async () => {
        if(claiming) return;
        setClaiming(true);
        try {
            await addPoints('Solved Daily Riddle', 10);
            alert('10 Joy Points added to your wallet!');
            setAnswer('');
            setSolved(false);
        } catch (error) {
            console.error(error);
        } finally {
            setClaiming(false);
        }
    };

    return (
        <div className="p-6 bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-jj-gray-900 dark:text-white">Daily Riddle</h3>
            <p className="text-sm text-jj-gray-800 dark:text-jj-gray-300 mb-4">Solve this riddle to earn 10 points! A new one appears every day.</p>
            <div className="flex-grow flex items-center justify-center p-8 bg-jj-yellow/10 rounded-2xl mb-4 border border-jj-yellow/30">
                <p className="text-jj-gray-900 dark:text-white text-lg font-serif italic text-center">"I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?"</p>
            </div>
            <form onSubmit={checkAnswer} className="space-y-4">
                <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} disabled={solved} className="w-full px-4 py-3 border rounded-xl focus:ring-jj-orange bg-white/50 dark:bg-jj-gray-700/50" placeholder="Your answer..."/>
                {solved ? (
                    <button type="button" onClick={handleClaim} disabled={claiming} className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 animate-bounce shadow-lg disabled:opacity-50">
                        {claiming ? 'Claiming...' : 'Claim 10 Joy Points'}
                    </button>
                ) : (
                    <button type="submit" className="w-full bg-jj-orange text-white font-bold py-3 rounded-full hover:bg-opacity-90">
                        Submit Answer
                    </button>
                )}
            </form>
        </div>
    );
};

const SnakeGame: React.FC = () => {
    const { addPoints } = useWallet();
    const GRID_SIZE = 15;
    const INITIAL_SNAKE = [{x: 7, y: 7}];
    const INITIAL_FOOD = {x: 10, y: 10};

    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState<'UP'|'DOWN'|'LEFT'|'RIGHT'>('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [claiming, setClaiming] = useState(false);

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const moveSnake = setInterval(() => {
            setSnake(prevSnake => {
                const head = prevSnake[0];
                let newHead = { ...head };

                if (direction === 'UP') newHead.y -= 1;
                if (direction === 'DOWN') newHead.y += 1;
                if (direction === 'LEFT') newHead.x -= 1;
                if (direction === 'RIGHT') newHead.x += 1;

                if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE || prevSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(s => s + 10);
                    let newFood = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
                    while(newSnake.some(s => s.x === newFood.x && s.y === newFood.y)) {
                        newFood = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
                    }
                    setFood(newFood);
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, 200);

        return () => clearInterval(moveSnake);
    }, [isPlaying, gameOver, direction, food]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
            if (e.key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
            if (e.key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
            if (e.key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    const startGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setIsPlaying(true);
    };

    const claimPoints = async () => {
        if (score > 0 && !claiming) {
            setClaiming(true);
            try {
                await addPoints(`Snake Game High Score`, score);
                alert(`${score} Joy Points added to your wallet!`);
                setSnake(INITIAL_SNAKE);
                setFood(INITIAL_FOOD);
                setDirection('RIGHT');
                setGameOver(false);
                setScore(0);
                setIsPlaying(false);
            } catch (err) {
                console.error(err);
            } finally {
                setClaiming(false);
            }
        }
    };

    return (
        <div className="p-6 bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10 h-full flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-jj-gray-900 dark:text-white">Classic Snake</h3>
            <p className="text-sm text-jj-gray-800 dark:text-jj-gray-300 mb-4">Use arrow keys to eat food and grow. Don't hit the walls!</p>

            <div className="relative bg-jj-gray-900 rounded-lg overflow-hidden border-4 border-jj-gray-600" style={{ width: 300, height: 300 }}>
                {gameOver && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-10">
                        <p className="text-2xl font-bold mb-2">Game Over</p>
                        <p className="mb-4">Score: {score}</p>
                        
                        <div className="flex flex-col gap-2">
                            <button onClick={startGame} className="bg-jj-purple px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition">Play Again</button>
                            {score > 0 && (
                                <button onClick={claimPoints} disabled={claiming} className="bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-green-600 transition-colors disabled:opacity-50">
                                    {claiming ? 'Claiming...' : `Claim ${score} Joy Points`}
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {!isPlaying && !gameOver && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white z-10">
                        <button onClick={startGame} className="bg-green-500 px-6 py-3 rounded-full font-bold hover:bg-green-600">Start Game</button>
                    </div>
                )}

                {snake.map((s, i) => (
                    <div key={i} className="absolute bg-green-400 rounded-sm" style={{ 
                        left: s.x * (300/GRID_SIZE), 
                        top: s.y * (300/GRID_SIZE), 
                        width: (300/GRID_SIZE) - 1, 
                        height: (300/GRID_SIZE) - 1 
                    }}/>
                ))}
                <div className="absolute bg-red-500 rounded-full" style={{ 
                    left: food.x * (300/GRID_SIZE), 
                    top: food.y * (300/GRID_SIZE), 
                    width: (300/GRID_SIZE) - 1, 
                    height: (300/GRID_SIZE) - 1 
                }}/>
            </div>

            <div className="mt-4 text-xl font-bold text-jj-gray-900 dark:text-white">Score: {score}</div>
        </div>
    );
};

const MemoryGame: React.FC = () => {
    const { addPoints } = useWallet();
    const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const [cards, setCards] = useState<{id: number, content: string, flipped: boolean, matched: boolean}[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);
    const [score, setScore] = useState(0);
    const [claiming, setClaiming] = useState(false);

    const initializeGame = () => {
        const shuffled = [...EMOJIS, ...EMOJIS]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, content: emoji, flipped: false, matched: false }));
        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setScore(0);
        setGameWon(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleCardClick = (id: number) => {
        if (flippedCards.length === 2) return;
        const clickedCard = cards.find(c => c.id === id);
        if (clickedCard?.flipped || clickedCard?.matched) return;

        const newCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
        setCards(newCards);
        setFlippedCards([...flippedCards, id]);

        if (flippedCards.length === 1) {
            setMoves(m => m + 1);
            const firstId = flippedCards[0];
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = clickedCard;

            if (firstCard?.content === secondCard?.content) {
                setTimeout(() => {
                    setCards(prev => prev.map(c => (c.id === firstId || c.id === id) ? { ...c, matched: true } : c));
                    setFlippedCards([]);

                    if (newCards.filter(c => !c.matched).length <= 2) {
                        setGameWon(true);
                        setScore(Math.max(10, 50 - (moves + 1)));
                    }
                }, 500);
            } else {
                setTimeout(() => {
                    setCards(prev => prev.map(c => (c.id === firstId || c.id === id) ? { ...c, flipped: false } : c));
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    const handleClaim = async () => {
        if(claiming) return;
        setClaiming(true);
        try {
            await addPoints(`Memory Master Win (${moves} moves)`, score);
            alert(`${score} Joy Points added to your wallet!`);
            initializeGame();
        } catch(err) {
            console.error(err);
        } finally {
            setClaiming(false);
        }
    };

    return (
        <div className="p-6 bg-white/70 dark:bg-jj-gray-800/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/50 dark:border-white/10 h-full flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-jj-gray-900 dark:text-white">Memory Match</h3>
            <p className="text-sm text-jj-gray-800 dark:text-jj-gray-300 mb-4">Find all matching pairs!</p>

            <div className="grid grid-cols-4 gap-2 mb-4">
                {cards.map(card => (
                    <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`w-12 h-12 sm:w-16 sm:h-16 text-2xl sm:text-3xl flex items-center justify-center rounded-xl transition-all transform duration-300 ${
                            card.flipped || card.matched 
                            ? 'bg-white border-2 border-jj-blue rotate-y-180' 
                            : 'bg-jj-blue text-transparent hover:bg-jj-blue/80'
                        }`}
                        disabled={gameWon}
                    >
                        {card.flipped || card.matched ? card.content : ''}
                    </button>
                ))}
            </div>

            <div className="flex justify-between w-full px-4 items-center">
                <span className="font-bold text-jj-gray-900 dark:text-white">Moves: {moves}</span>
                <button onClick={initializeGame} className="text-sm text-jj-purple underline">Reset</button>
            </div>
            {gameWon && (
                <div className="mt-4 w-full">
                    <button onClick={handleClaim} disabled={claiming} className="w-full bg-green-500 text-white font-bold py-2 rounded-full hover:bg-green-600 animate-bounce shadow-lg disabled:opacity-50">
                        {claiming ? 'Claiming...' : `Claim ${score} Joy Points`}
                    </button>
                </div>
            )}
        </div>
    );
};

const Play: React.FC = () => {
    const { user, login, loading } = useAuth();

    if (loading) {
        return <div className="text-center py-20"><Loading size="large" /></div>;
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                <h2 className="text-2xl font-bold text-jj-gray-900 dark:text-white">Log in to Play & Earn</h2>
                <p className="text-jj-gray-800 dark:text-jj-gray-300 mt-2 max-w-md mx-auto">Our online games are a fun way to earn Joy Points! Log in to save your progress and add points to your wallet.</p>
                <button onClick={() => login()} className="mt-6 bg-jj-orange text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all">
                    Login to Play
                </button>
            </div>
        );
    }

    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-jj-gray-900 dark:text-white">The Joy Arcade</h1>
                    <p className="mt-4 text-lg text-jj-gray-800 dark:text-jj-gray-300">Sharpen your mind, have some fun, and earn Joy Points! A perfect break for your day.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-stretch">
                    <SnakeGame />
                    <MemoryGame />
                    <SudokuGrid />
                    <RiddleGame />
                </div>
            </div>
        </div>
    );
};

export default Play;