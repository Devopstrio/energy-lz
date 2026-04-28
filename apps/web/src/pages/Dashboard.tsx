import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { ShieldCheck, Activity, Database, TrendingUp, RefreshCcw, ExternalLink, Zap, Globe, AlertTriangle, Factory, Wind, Droplets, Wallet, Cpu } from 'lucide-react';

const gridReliabilityTrend = [
  { name: 'Mon', score: 99.99 },
  { name: 'Tue', score: 99.98 },
  { name: 'Wed', score: 99.99 },
  { name: 'Thu', score: 99.97 },
  { name: 'Fri', score: 99.99 },
  { name: 'Sat', score: 99.99 },
  { name: 'Sun', score: 99.98 },
];

const generationMix = [
  { name: 'Renewables', value: 450, color: '#10b981' },
  { name: 'Natural Gas', value: 320, color: '#3b82f6' },
  { name: 'Nuclear', value: 280, color: '#f59e0b' },
  { name: 'Coal', value: 150, color: '#ef4444' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Industrial Executive</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl font-medium">Enterprise energy cloud health, sustainability benchmarks, and industrial foundation hubs.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2">
             <RefreshCcw size={18} /> Sync Industrial
          </button>
          <button className="bg-amber-600 hover:bg-amber-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-amber-900/40 flex items-center gap-2">
             <Zap size={18} /> Provision Site
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Grid Reliability" value="99.99%" change="+0.01" icon={<Activity className="text-emerald-400" />} />
        <StatCard title="Security Posture" value="97.2" change="Stable" icon={<ShieldCheck className="text-amber-400" />} />
        <StatCard title="Managed Assets" value="154,200" change="+1.2k" icon={<Cpu className="text-blue-400" />} />
        <StatCard title="Carbon Score" value="A+" change="Leader" icon={<Droplets className="text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reliability Trend */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-600 rounded-full"></span>
              Global Grid Platform Reliability (7-Day)
            </h2>
            <div className="text-[10px] font-black uppercase text-amber-400 tracking-[0.2em] bg-amber-900/20 px-4 py-2 rounded-full border border-amber-800/50">Industrialized Foundation</div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gridReliabilityTrend}>
                <defs>
                  <linearGradient id="colorReliability" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={[99.9, 100]} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={4} fillOpacity={1} fill="url(#colorReliability)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Generation Mix */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Institutional Portfolio Generation Mix (%)
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold italic">
               <Droplets size={20} />
               Sustainability Hub
            </div>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={generationMix}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {generationMix.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Industrial Hub Preview */}
      <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3 text-amber-400 uppercase tracking-widest">
           <Factory size={28} />
           High-Priority Industrial Site Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <ProjectCard name="Grid-East-01" status="Ready" score="98%" type="Utility" icon={<Activity size={20} />} />
           <ProjectCard name="Wind-Offshore-A" status="Optimized" score="99%" type="Renewable" icon={<Wind size={20} />} />
           <ProjectCard name="Refinery-TX-04" status="Maintenance" score="85%" type="Plant" icon={<Factory size={20} />} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-amber-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-1000 rotate-12">
       {React.cloneElement(icon, { size: 160 })}
    </div>
    <div className="relative z-10">
      <div className="p-4 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800/50 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('+') || change.startsWith('-') || change === 'Stable' || change === 'Leader' || change.endsWith('%') ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ name, status, score, type, icon }: any) => (
  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl hover:bg-slate-800/50 transition cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-amber-400 transition">{icon}</div>
        <h3 className="text-xl font-bold text-slate-100">{name}</h3>
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full border border-slate-700 uppercase tracking-tighter ${status === 'Ready' || status === 'Optimized' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-800/50' : 'bg-amber-950/20 text-amber-400 border-amber-800/50'}`}>{status}</span>
    </div>
    <div className="flex justify-between items-center mt-8">
       <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Type: {type} | Readiness: {score}</span>
       <ExternalLink size={14} className="text-slate-700 group-hover:text-white transition" />
    </div>
  </div>
);

export default Dashboard;
