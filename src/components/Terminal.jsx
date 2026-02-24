import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audio';
import { getAIResponse } from '../utils/aiResponder';

const COMMANDS = {
    help: 'Available commands: help, about, experience, projects, skills, contact, education, clear',
    about: 'I am Vishnu P V, a Full Stack Developer with 4+ years of experience specializing in Java, Spring Boot, React.js, and GCP. I build scalable applications and modernize legacy systems.',
    experience: 'Systems Engineer @ Tata Consultancy Services (TCS) | Jul 2021 - Present\n- Built full-stack apps with React, Node, and Spring Boot.\n- Led PCF to GCP migration, reducing infrastructure overhead by 20%.\n- Modernized legacy COBOL jobs to cloud-native Spring Boot + Dataflow pipelines.',
    projects: '1. Pricing Optimization System: Scalable pricing engine using Spring Boot & React.\n2. Legacy Modernization: Cloud-native orchestration of COBOL batch jobs on GCP.',
    skills: 'Languages: Java, SQL, Python, JavaScript\nBackend: Spring Boot, Microservices, Node.js\nFrontend: React.js, HTML5, CSS3\nCloud: GCP (Certified Associate), Docker, K8s, Terraform',
    contact: 'Email: vishnupv2020official@gmail.com\nGitHub: github.com/Vishnu-pv\nPhone: +91 9846239491',
    education: 'Master of Computer Applications (MCA) - College of Engineering Trivandrum (2021)\nBachelor of Computer Applications (BCA) - St. Thomas College, Thrissur (2018)',
};

const Terminal = ({ isMobile }) => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'VISHNU P V - VIRTUAL TERMINAL v4.0.0' },
        { type: 'output', content: 'Systems Initialized. Welcome, User.' },
        { type: 'output', content: 'Type "help" to see available commands.' },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd) => {
        const cleanCmd = cmd.toLowerCase().trim();
        if (cleanCmd === 'clear') {
            setHistory([]);
            return;
        }

        setHistory((prev) => [...prev, { type: 'input', content: cmd }]);
        setTyping(true);

        const isKnownCommand = !!COMMANDS[cleanCmd];
        const response = isKnownCommand ? COMMANDS[cleanCmd] : getAIResponse(cmd);
        const delay = isKnownCommand ? 500 : 1500; // AI takes longer to "think"

        setTimeout(() => {
            setHistory((prev) => [...prev, {
                type: 'output',
                content: response,
                isAI: !isKnownCommand
            }]);
            setTyping(false);
            soundEngine.playTyping();
        }, delay);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input) return;
        soundEngine.playTyping();
        handleCommand(input);
        setInput('');
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
        soundEngine.playTyping();
    };

    return (
        <div className="text-matrix-green space-y-2 terminal-text">
            {history.map((line, i) => (
                <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300">
                    {line.type === 'input' ? (
                        <div className="flex">
                            <span className="mr-2 text-matrix-green/70">{isMobile ? '>' : 'vishnu@portfolio:~$'}</span>
                            <span className="text-white/90">{line.content}</span>
                        </div>
                    ) : (
                        <div className={`whitespace-pre-wrap opacity-90 text-[13px] sm:text-base ${line.isAI ? 'text-blue-400/90' : ''}`}>
                            {line.isAI && <span className="mr-2 text-blue-500 font-bold">[SYSTEM MIND]</span>}
                            {line.content}
                        </div>
                    )}
                </div>
            ))}

            {typing && (
                <div className="flex items-center space-x-2 text-matrix-green/50 text-xs italic animate-pulse">
                    <span>Searching subroutines...</span>
                    <span className="flex space-x-1">
                        <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                    </span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex">
                <span className="mr-2 text-matrix-green/70">{isMobile ? '>' : 'vishnu@portfolio:~$'}</span>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-matrix-green flex-grow caret-matrix-green font-mono text-sm sm:text-base md:text-xl"
                    autoFocus
                    autoCapitalize="none"
                    autoComplete="off"
                    spellCheck="false"
                />
            </form>
            <div ref={bottomRef} />
        </div>
    );
};

export default Terminal;
