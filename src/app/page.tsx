'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';

// --- PALETA MIN THEME (VS Code) ---
const THEME = {
  bg: 'bg-[#1f1f1f]',        // Background
  fg: 'text-[#e1e4e8]',      // Default Text
  keyword: 'text-[#ff9b8e]', // Keywords Tech (Soft Pink)
  func: 'text-[#bd93f9]',    // Entities/Names (LILAC)
  string: 'text-[#ffab70]',  // Titles/Highlights (Orange)
  comment: 'text-[#6a737d]', // Metadata/Comments (Grey)
  border: 'border-[#333333]' // Borders
};

const USER = 'guest';
const HOST = 'lucasmori';
const PATH = '~/workspace';

// --- COMPONENT: LINE REVEALER (Typing Effect) ---
const LineRevealer = ({ 
  lines, 
  speed = 35, 
  onTyping 
}: { 
  lines: React.ReactNode[]; 
  speed?: number; 
  onTyping?: () => void 
}) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    // Scroll a cada nova linha renderizada
    if (visibleCount > 0 && onTyping) {
        onTyping();
    }

    if (visibleCount >= lines.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [visibleCount, lines.length, speed, onTyping]);

  return (
    <div className="flex flex-col space-y-1">
      {lines.slice(0, visibleCount).map((line, idx) => (
        <div key={idx} className="whitespace-pre-wrap break-words min-h-[1.2em]">
          {line}
        </div>
      ))}
    </div>
  );
};

// --- DATA ---
const COMMANDS = [
  { cmd: 'about', desc: 'About me & Career transition' },
  { cmd: 'resume', desc: 'Full Curriculum Vitae (CV)' },
  { cmd: 'stack', desc: 'Tech Stack & Tools' },
  { cmd: 'projects', desc: 'Detailed Project Portfolio' },
  { cmd: 'socials', desc: 'Instagram, LinkedIn, GitHub & Phone' },
  { cmd: 'reload', desc: 'Reload the session' },
  { cmd: 'clear', desc: 'Clear terminal' },
];

export default function TerminalPortfolio() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: string; content: any; speed?: number }>>([]);
  const [time, setTime] = useState('');
  
  // Command History
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Clock Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll Function
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  // Initial Scroll
  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const focusInput = () => inputRef.current?.focus();

  // --- CONTENT: INTRO ---
  const getIntroContent = () => {
    return [
      <div key="intro-1">
        Hello 👋 I'm <span className={`${THEME.func} font-bold`}>Lucas Mori</span>.
      </div>,
      <div key="intro-2">
        You can start knowing about me just by typing <span className={`${THEME.keyword} font-bold`}>about</span> at this terminal.
      </div>,
      <div key="intro-3">
        To see a list of available commands, type <span className={`${THEME.keyword} font-bold`}>help</span> and hit <span className={`${THEME.func} font-bold`}>enter button</span>.
      </div>,
      <div key="intro-4" className="mt-4">
  
      </div>
    ];
  };

  // Initialize
  useEffect(() => {
    setHistory([{ type: 'custom-lines', content: getIntroContent() }]);
  }, []);

  // --- CONTENT: ABOUT ---
  const getAboutContent = () => {
    return [
      <div key="p1" className="mb-4">
        Hello! I'm Lucas, a professional bridging the worlds of <span className={THEME.func}>Architecture</span> and <span className={THEME.func}>Technology</span>.
      </div>,
      <div key="p2" className="mb-4">
        My journey began designing physical spaces. As an Architect, I spent years managing complex projects and optimizing resources. 
        That's where I realized my true passion wasn't just "design", but the <span className={THEME.string}>logic and data</span> supporting every decision.
      </div>,
      <div key="p3" className="mb-4">
        I decided to pivot my career. Today, as a Systems Development student at <span className={THEME.func}>SENAC</span>, I'm swapping technical blueprints for scripts in 
        <span className={THEME.keyword}> Python</span> and queries in <span className={THEME.keyword}> SQL</span>. I bring analytical rigor to build software that solves real problems.
      </div>,
      <div key="p4" className="mb-4">
        I didn't leave design behind. I work at the intersection of code and usability, using <span className={THEME.keyword}>Figma</span> and <span className={THEME.func}>UX Design </span> concepts
         to ensure complex data becomes clear visual stories — as I recently did as a volunteer at the <span className={THEME.func}>Public Comptroller's Office</span>.
      </div>,
      <div key="p5" className="mt-6 text-[#6a737d]">
        Want to know my tools? Type <span className={`${THEME.keyword} font-bold`}>stack</span> or check what I'm building in <span className={`${THEME.keyword} font-bold`}>projects</span>.
      </div>
    ];
  };

  // --- CONTENT: RESUME ---
  const getResumeContent = () => {
    return [
      <div key="header" className="mb-2">
        <span className={`${THEME.func} text-lg font-bold block`}>LUCAS HENRIQUE ALVES MORI</span>
        <span className={THEME.string}>Tech Transition (UX & Data)</span>
        <span className={`${THEME.comment} block text-xs`}>Poços de Caldas, MG • lucashamori@gmail.com</span>
      </div>,
      <span key="sep" className={THEME.comment}>----------------------------------------</span>,
      <span key="edu" className={`${THEME.keyword} font-bold mt-2 block`}>EDUCATION</span>,
      <div key="senac"><span className={THEME.func}>SENAC</span> - <span className={THEME.string}>Systems Analysis & Development</span> <span className={THEME.comment}>(2024-2026)</span></div>,
      <div key="unifeob"><span className={THEME.func}>UNIFEOB</span> - <span className={THEME.string}>Bachelor in Architecture</span> <span className={THEME.comment}>(2013-2018)</span></div>,
      <span key="skills" className={`${THEME.keyword} font-bold mt-4 block`}>SKILLS</span>,
      <div key="s1"><span className={THEME.fg}>Languages:</span> <span className={THEME.string}>Python, SQL, Java, Javascript</span></div>,
      <div key="s2"><span className={THEME.fg}>Tools:</span> <span className={THEME.string}>Figma, Git, Power BI</span></div>,
      <div key="s3"><span className={THEME.fg}>Soft Skills:</span> <span className={THEME.string}>Project Management, Problem Solving, Cost Analysis</span></div>,
      <div key="s4"><span className={THEME.fg}>Methodologies:</span> <span className={THEME.string}>Scrum, Kanban</span></div>,
      <span key="exp" className={`${THEME.keyword} font-bold mt-4 block`}>EXPERIENCE</span>,
      <div key="exp1"><span className={THEME.func}>Public Comptroller</span> <span className={THEME.comment}>(Volunteer)</span>: <span className={THEME.string}>UX Designer</span></div>,
      <div key="exp2"><span className={THEME.func}>Urban Planning Dept.</span>: <span className={THEME.string}>Public Projects & Inspection</span></div>,
      <div key="exp3"><span className={THEME.func}>Mori Architect</span>: <span className={THEME.string}>Project Management & Analysis</span></div>,
    ];
  };

  // --- CONTENT: STACK ---
  const getStackContent = () => {
    return [
      <div key="intro-stack" className="mb-4">
        My toolbox combines backend rigor with frontend and UX creativity.
      </div>,
      <span key="cat1" className={`${THEME.func} font-bold block mb-1`}>🧩 Backend & Data Engineering</span>,
      <div key="stack1" className="pl-4 border-l-2 border-[#333] ml-1 mb-3">
         <div className="mb-1"><span className={THEME.keyword}>Python</span> <span className={THEME.fg}>&</span> <span className={THEME.keyword}>SQL</span></div>
         <div className={THEME.comment}>// Data manipulation, automation scripts, and complex queries.</div>
      </div>,
      <div key="stack2" className="pl-4 border-l-2 border-[#333] ml-1 mb-3">
         <div className="mb-1"><span className={THEME.keyword}>Java</span> <span className={THEME.fg}>&</span> <span className={THEME.keyword}>Salesforce (Apex/SOQL)</span></div>
         <div className={THEME.comment}>// Corporate business logic and CRM architecture.</div>
      </div>,
      <span key="cat2" className={`${THEME.func} font-bold block mb-1 mt-4`}>🎨 UX Design & Frontend</span>,
      <div key="stack3" className="pl-4 border-l-2 border-[#333] ml-1 mb-3">
         <div className="mb-1"><span className={THEME.keyword}>Figma</span></div>
         <div className={THEME.comment}>// Wireframing, Prototyping, and Information Design.</div>
      </div>,
      <div key="stack4" className="pl-4 border-l-2 border-[#333] ml-1 mb-3">
         <div className="mb-1"><span className={THEME.keyword}>Next.js</span> <span className={THEME.fg}>+</span> <span className={THEME.keyword}>Tailwind CSS</span></div>
         <div className={THEME.comment}>// Development of modern and responsive interfaces.</div>
      </div>,
      <span key="cat3" className={`${THEME.func} font-bold block mb-1 mt-4`}>🛠️ Workflow & Tools</span>,
      <div key="stack5" className="pl-4 border-l-2 border-[#333] ml-1">
         <span className={THEME.string}>Git/GitHub</span>, <span className={THEME.string}>VS Code</span>, <span className={THEME.string}>Power BI</span>.
      </div>
    ];
  };

  // --- CONTENT: PROJECTS ---
  const getProjectsContent = () => {
    return [
      <div key="p-intro" className="mb-6">
        Below are the main projects I developed, focusing on <span className={THEME.string}>Fullstack</span>, <span className={THEME.string}>Salesforce</span>, and <span className={THEME.string}>Data Science</span>:
      </div>,

      // --- PROJECT 1: SGP ---
      <div key="p1-header" className="flex items-center gap-2 mb-1">
          <span className={THEME.keyword}>const</span>
          <span className={THEME.func}>SGP_System</span>
          <span className={THEME.fg}>=</span>
          <span className={THEME.string}>'Product Management System'</span>;
      </div>,
      <div key="p1-body" className="pl-4 border-l-2 border-[#333] ml-1 mb-6 text-sm">
          <div className="mb-1"><span className={THEME.fg}>Type: </span><span className={THEME.string}>Full-Stack ERP (Case Study)</span></div>
          <div className="mb-1">
             <span className={THEME.fg}>Stack: </span>
             <span className={THEME.keyword}>Next.js 14</span>, <span className={THEME.keyword}>Prisma</span>, <span className={THEME.keyword}>Neon DB (Postgres)</span>, <span className={THEME.keyword}>Firebase Auth</span>.
          </div>
          <div className="mb-2 text-[#e1e4e8] leading-relaxed">
             ERP core to manage Clients, Products, and Inventory. Focus on complex database architecture (composite keys) and secure auth. Automated Vercel deploy.
          </div>
          <div className="flex gap-4">
              <a href="https://morisgp.vercel.app/" target="_blank" className={`${THEME.func} hover:underline`}>➜ View Deploy</a>
          </div>
      </div>,

      // --- PROJECT 2: BLOG SEIGAN ---
      <div key="p2-header" className="flex items-center gap-2 mb-1">
          <span className={THEME.keyword}>const</span>
          <span className={THEME.func}>BlogSeigan</span>
          <span className={THEME.fg}>=</span>
          <span className={THEME.string}>'Content Platform'</span>;
      </div>,
      <div key="p2-body" className="pl-4 border-l-2 border-[#333] ml-1 mb-6 text-sm">
           <div className="mb-1">
             <span className={THEME.fg}>Stack: </span>
             <span className={THEME.keyword}>Next.js 14</span>, <span className={THEME.keyword}>Tailwind</span>, <span className={THEME.keyword}>Sanity CMS</span>.
          </div>
          <div className="mb-2 text-[#e1e4e8]">
             High-performance platform for content distribution. Focus on SEO and performance.
          </div>
          <div className="flex gap-4">
              <a href="https://blogseigan.vercel.app" target="_blank" className={`${THEME.func} hover:underline`}>➜ View Deploy</a>
          </div>
      </div>,

      // --- PROJECT 3: SALESFORCE ---
      <div key="p3-header" className="flex items-center gap-2 mb-1">
          <span className={THEME.keyword}>class</span>
          <span className={THEME.func}>SmartLeadQualifier</span>
          <span className={THEME.keyword}>implements</span>
          <span className={THEME.func}>SalesForceAutomation</span>
      </div>,
      <div key="p3-body" className="pl-4 border-l-2 border-[#333] ml-1 mb-6 text-sm">
          <div className="mb-1"><span className={THEME.fg}>Focus: </span><span className={THEME.string}>Data Quality & Backend Apex</span></div>
          <div className="mb-1">
             <span className={THEME.fg}>Tech: </span>
             <span className={THEME.keyword}>Apex Triggers</span>, <span className={THEME.keyword}>SOQL</span>, <span className={THEME.keyword}>Unit Tests</span>.
          </div>
          <div className="mb-2 text-[#e1e4e8] leading-relaxed">
             Automation that blocks leads without income and automatically classifies "Hot Leads" (&gt;10k), creating urgent tasks for sales reps. Follows Enterprise patterns (Trigger Handler).
          </div>
          <div className="flex gap-4">
              <a href="https://github.com/lucashamori/Smart-Lead-Qualifier-Sales-Cloud-Automation-" target="_blank" className={`${THEME.func} hover:underline`}>➜ View Code</a>
          </div>
      </div>,

      // --- PROJECT 4: BEER CONSUMPTION ---
      <div key="p4-header" className="flex items-center gap-2 mb-1">
          <span className={THEME.keyword}>class</span>
          <span className={THEME.func}>BeerConsumptionModel</span>
          <span className={THEME.keyword}>extends</span>
          <span className={THEME.func}>LinearRegression</span>
      </div>,
      <div key="p4-body" className="pl-4 border-l-2 border-[#333] ml-1 mb-6 text-sm">
          <div className="mb-1"><span className={THEME.fg}>Topic: </span><span className={THEME.string}>Machine Learning (Data Science)</span></div>
          <div className="mb-1">
             <span className={THEME.fg}>Stack: </span>
             <span className={THEME.keyword}>Python</span>, <span className={THEME.keyword}>Scikit-learn</span>, <span className={THEME.keyword}>Pandas</span>, <span className={THEME.keyword}>Seaborn</span>.
          </div>
          <div className="mb-2 text-[#e1e4e8] leading-relaxed">
             Predictive model (R² = 0.75) to estimate consumption in SP based on weather and weekends. Complete EDA and feature engineering.
          </div>
          <div className="flex gap-4">
              <a href="https://github.com/lucashamori/beerConsumption" target="_blank" className={`${THEME.func} hover:underline`}>➜ View Code</a>
          </div>
      </div>,

      // --- PROJECT 5: E-COMMERCE ---
      <div key="p5-header" className="flex items-center gap-2 mb-1">
          <span className={THEME.keyword}>import</span>
          <span className={THEME.func}>Ecommerce_EDA</span>
          <span className={THEME.keyword}>from</span>
          <span className={THEME.string}>'./data_analysis/sales'</span>
      </div>,
      <div key="p5-body" className="pl-4 border-l-2 border-[#333] ml-1 mb-6 text-sm">
          <div className="mb-1"><span className={THEME.fg}>Focus: </span><span className={THEME.string}>Data Analysis & Insights</span></div>
          <div className="mb-1">
             <span className={THEME.fg}>Libs: </span>
             <span className={THEME.keyword}>Python (Pandas, Matplotlib)</span>.
          </div>
          <div className="mb-2 text-[#e1e4e8] leading-relaxed">
             Data cleaning, outlier treatment, and revenue visualization by category and payment method. Strategic insight generation.
          </div>
          <div className="flex gap-4">
              <a href="https://github.com/lucashamori/Analise_de_Vendas_-E-commerce" target="_blank" className={`${THEME.func} hover:underline`}>➜ View Code</a>
          </div>
      </div>,

      <div key="footer" className="mt-4 text-[#6a737d] text-xs">
          // Type <span className="font-bold">socials</span> to connect.
      </div>
    ];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = Math.max(0, historyPointer === -1 ? cmdHistory.length - 1 : historyPointer - 1);
        setHistoryPointer(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer !== -1) {
        if (historyPointer < cmdHistory.length - 1) {
          const newIndex = historyPointer + 1;
          setHistoryPointer(newIndex);
          setInput(cmdHistory[newIndex]);
        } else {
          setHistoryPointer(-1);
          setInput('');
        }
      }
    }
    else if (e.key === 'Enter') {
      const cmdTrimmed = input.trim();
      const cmd = cmdTrimmed.toLowerCase();
      
      if (cmdTrimmed) {
        setCmdHistory(prev => [...prev, cmdTrimmed]);
        setHistoryPointer(-1);
      }

      const newEntry = { type: 'command', content: cmdTrimmed };
      let responseEntry;

      switch (cmd) {
        case 'help':
          responseEntry = { type: 'help', content: COMMANDS };
          break;
        case 'resume':
          // Speed 15ms for large blocks
          responseEntry = { type: 'custom-lines', content: getResumeContent(), speed: 15 };
          break;
        case 'about':
          responseEntry = { type: 'custom-lines', content: getAboutContent() };
          break;
        case 'stack':
          responseEntry = { type: 'custom-lines', content: getStackContent() };
          break;
        case 'projects':
          responseEntry = { type: 'custom-lines', content: getProjectsContent(), speed: 15 };
          break;
        case 'socials':
            responseEntry = {
              type: 'custom-lines',
              content: [
                 <div key="c-github" className="flex gap-2 mb-2">
                    <span className={THEME.func}>github:</span>
                    <a href="https://github.com/lucashamori" target="_blank" className={`${THEME.string} hover:underline`}>github.com/lucashamori</a>
                 </div>,
                 <div key="c-linkedin" className="flex gap-2 mb-2">
                    <span className={THEME.func}>linkedin:</span>
                    <a href="https://linkedin.com/in/lucashamori" target="_blank" className={`${THEME.string} hover:underline`}>linkedin.com/in/lucashamori</a>
                 </div>,
                 <div key="c-instagram" className="flex gap-2 mb-4">
                    <span className={THEME.func}>instagram:</span>
                    <a href="https://www.instagram.com/lucasmorii/" target="_blank" className={`${THEME.string} hover:underline`}>instagram.com/lucasmorii</a>
                 </div>,
                 <div key="c-phone" className="flex gap-2 text-[#6a737d]">
                    // Phone: (35) 99244 5674
                 </div>
              ]
            };
            break;
        case 'reload':
          setHistory(prev => [...prev, newEntry, { type: 'error', content: 'System rebooting...' }]);
          setTimeout(() => window.location.reload(), 1000);
          return;
        case 'clear':
          setHistory([{ type: 'custom-lines', content: getIntroContent() }]); 
          setInput('');
          return;
        case '':
          responseEntry = null; 
          break;
        default:
          responseEntry = { type: 'error', content: [`bash: ${cmd}: command not found`] };
      }

      if (responseEntry) {
        // Pass optional speed if defined in responseEntry
        setHistory(prev => [...prev, newEntry, responseEntry]);
      } else if (cmd !== '') {
        setHistory(prev => [...prev, newEntry]);
      } else {
        setHistory(prev => [...prev, { type: 'command', content: ''}]);
      }

      setInput('');
    }
  };

  return (
    <div className={`min-h-screen ${THEME.bg} flex flex-col font-mono text-sm md:text-base`} onClick={focusInput}>
      {/* HEADER */}
      <div className="w-full flex items-center bg-[#181818] h-9 select-none border-b border-[#2b2b2b]">
        <div className={`flex items-center h-full ${THEME.bg} px-3 border-t border-[#bd93f9] min-w-[140px] gap-2`}>
            <TerminalIcon size={13} className={THEME.keyword} />
            <span className="text-[#e1e4e8] text-xs">bash — {USER}</span>
            <X size={13} className="ml-4 text-gray-500 hover:text-white cursor-pointer" />
        </div>
        <div className="flex-1"></div>
        
        {/* RIGHT SIDE: CLOCK */}
        <div className="px-4 text-[#ff9b8e] text-xs font-medium tracking-widest hidden sm:block">
            {time}
        </div>
      </div>

      {/* BODY */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        <div className="w-full text-left">
            {history.map((item, index) => (
                <div key={index} className="w-full mb-2">
                    
                    {/* Prompt */}
                    {item.type === 'command' && (
                        <div className="flex flex-wrap items-center gap-x-2 mt-4">
                            <span className={`${THEME.keyword} font-bold`}>➜</span>
                            <span className={THEME.string}>{USER}@{HOST}</span>
                            <span className={THEME.comment}>:</span>
                            <span className={THEME.func}>{PATH}</span>
                            <span className={THEME.fg}>$ {item.content}</span>
                        </div>
                    )}

                    {/* Custom Responses (Passed onTyping to allow smooth scroll) */}
                    {item.type === 'custom-lines' && (
                         <div className="mt-1 pl-0 text-[#e1e4e8] max-w-3xl leading-relaxed">
                            {/* Uses custom speed if provided, else default 35ms */}
                            <LineRevealer 
                                lines={item.content} 
                                speed={item.speed || 35} 
                                onTyping={scrollToBottom} 
                            />
                         </div>
                    )}

                    {/* Simple Lines */}
                    {item.type === 'lines' && (
                         <div className={`mt-1 pl-0 ${THEME.string} max-w-2xl`}>
                            <LineRevealer 
                                lines={item.content.map((l: string) => <span key={l}>{l}</span>)} 
                                onTyping={scrollToBottom}
                            />
                         </div>
                    )}

                    {/* Error */}
                    {item.type === 'error' && (
                         <div className={`mt-1 pl-0 ${THEME.keyword}`}>
                            <LineRevealer 
                                lines={typeof item.content === 'string' ? [item.content] : item.content} 
                                onTyping={scrollToBottom}
                            />
                         </div>
                    )}

                    {/* Help */}
                    {item.type === 'help' && (
                        <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 max-w-2xl">
                            {item.content.map((c: any) => (
                                <div key={c.cmd} className="contents">
                                    <span className={`${THEME.keyword} font-bold`}>{c.cmd}</span>
                                    <span className={THEME.comment}>// {c.desc}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* INPUT */}
            <div className="flex flex-wrap items-center gap-x-2 mt-2 pb-10">
                <span className={`${THEME.keyword} font-bold`}>➜</span>
                <span className={THEME.string}>{USER}@{HOST}</span>
                <span className={THEME.comment}>:</span>
                <span className={THEME.func}>{PATH}</span>
                <span className={THEME.fg}>$</span>
                <div className="relative flex-1 group min-w-[10px]">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="absolute inset-0 w-full opacity-0 cursor-default z-10"
                        autoComplete="off"
                        spellCheck="false"
                    />
                    <div className="flex items-center">
                        <span className="text-[#e1e4e8] whitespace-pre font-medium">{input}</span>
                        <span className="block w-2.5 h-5 bg-[#e1e4e8] animate-pulse ml-[1px]"></span>
                    </div>
                </div>
            </div>
            
            <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}