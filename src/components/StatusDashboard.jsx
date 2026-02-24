import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Network, Zap } from 'lucide-react';

const StatWidget = ({ title, icon: Icon, value, unit, color = "matrix-green" }) => (
    <div className="bg-matrix-dark/60 border border-matrix-green/30 p-3 rounded-sm backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-sm uppercase tracking-tighter opacity-70">
                <Icon size={14} className="mr-2" />
                {title}
            </div>
            <div className={`w-2 h-2 rounded-full bg-${color} animate-pulse shadow-[0_0_5px_#00FF41]`} />
        </div>
        <div className="flex items-baseline space-x-1">
            <span className="text-3xl font-bold">{value}</span>
            <span className="text-xs uppercase opacity-50">{unit}</span>
        </div>
        <div className="mt-2 w-full h-1 bg-matrix-green/10 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(100, (value / 100) * 100)}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-matrix-green shadow-[0_0_5px_#00FF41]"
            />
        </div>
    </div>
);

const ActivityLog = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const events = [
            "Securing node 0xF1...",
            "Incoming request from 192.168.1.104",
            "Memory leak detected in module_x",
            "CPU load Spike: 92%",
            "Handshake successful: RSA-4096",
            "Cleaning buffer cache...",
            "Dumping core snapshot...",
            "Firewall block: IP 45.2.19.0",
        ];

        const interval = setInterval(() => {
            const newLog = events[Math.floor(Math.random() * events.length)];
            const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            setLogs(prev => [`[${timestamp}] ${newLog}`, ...prev].slice(0, 10));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-matrix-dark/60 border border-matrix-green/30 p-4 rounded-sm h-full backdrop-blur-sm font-mono text-xs overflow-hidden">
            <div className="uppercase text-sm mb-3 flex items-center border-b border-matrix-green/20 pb-2">
                <Activity size={16} className="mr-2" /> System Logs
            </div>
            <div className="space-y-1 opacity-80 h-[240px]">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-start"
                    >
                        <span className="text-matrix-green/40 mr-2 whitespace-nowrap">$</span>
                        <span className="leading-tight">{log}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const StatusDashboard = ({ isVisible, isMobile }) => {
    const [cpu, setCpu] = useState(24);
    const [mem, setMem] = useState(4.2);

    useEffect(() => {
        const interval = setInterval(() => {
            setCpu(Math.floor(20 + Math.random() * 40));
            setMem(parseFloat((4.0 + Math.random() * 2).toFixed(1)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            className={`fixed inset-0 pointer-events-none z-[5] ${isMobile ? 'p-4 pt-20 overflow-y-auto custom-scrollbar' : 'p-10 flex flex-col justify-between'} ${!isVisible && 'hidden'}`}
        >
            <div className={`${isMobile ? 'space-y-4 mb-4' : 'flex justify-between items-start'} pointer-events-auto`}>
                <div className={`${isMobile ? 'grid grid-cols-2 gap-3' : 'w-72 space-y-4'}`}>
                    <StatWidget title="CPU" icon={Cpu} value={cpu} unit="%" />
                    <StatWidget title="Temp" icon={Zap} value={42 + Math.floor(cpu / 2)} unit="°C" />
                    {isMobile && (
                        <>
                            <StatWidget title="RAM" icon={HardDrive} value={Math.floor((mem / 16) * 100)} unit="%" />
                            <StatWidget title="Net" icon={Network} value={Math.floor(Math.random() * 500)} unit="Mb" />
                        </>
                    )}
                </div>

                {!isMobile && (
                    <div className="w-72 space-y-4">
                        <StatWidget title="Memory Usage" icon={HardDrive} value={Math.floor((mem / 16) * 100)} unit="%" />
                        <StatWidget title="Network Speed" icon={Network} value={Math.floor(Math.random() * 500)} unit="Mbps" />
                    </div>
                )}
            </div>

            <div className={`pointer-events-auto ${isMobile ? 'w-full' : 'flex justify-end'}`}>
                <div className={`${isMobile ? 'w-full' : 'w-80'}`}>
                    <ActivityLog isMobile={isMobile} />
                </div>
            </div>
        </motion.div>
    );
};

export default StatusDashboard;
