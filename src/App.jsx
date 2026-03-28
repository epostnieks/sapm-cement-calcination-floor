// Cement7aCalcinationFloor.jsx
// Erik Postnieks © 2026 — SAPM Companion Dashboard
// Bloomberg terminal aesthetic: JetBrains Mono + Newsreader, navy/gold/crimson/green
// Drop into Next.js: pages/dashboards/Cement7aCalcinationFloor.jsx  (or app/dashboards/Cement7aCalcinationFloor/page.jsx)
// Dependencies: none (pure React + inline styles)

import { useState } from 'react';
import SAPMNav from "./SAPMNav";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

// ─── Data ─────────────────────────────────────────────────────────────────
const META = {
  title: "The Calcination Floor",
  subtitle: "§7a Cement SAPM — A New Impossibility Theorem",
  beta: "6.55",
  ci: "5.50–7.73",
  pi: "$13.5B",
  psa: "-$18.2B/yr",
  mu: "0.7407 (74.1%)",
  kappa: "0.54",
  type: "Impossibility Theorem | Calcination Floor | A2 Inviolable (Conservation of Mass)",
  companion: "",
};

const CHANNELS = [
        { id:1, name:"Climate: Calcination process CO₂", beta:"~1.2", value:"$430-460B/yr", weight:"55-60%" },
        { id:2, name:"Aggregate extraction externalities", beta:"~0.48", value:"$115B/yr", weight:"15%" },
        { id:3, name:"Health externalities (PM2.5, NOx)", beta:"~0.33", value:"$80B/yr", weight:"10%" },
        { id:4, name:"Structural overdesign & waste", beta:"~0.40", value:"$95B/yr", weight:"12%" },
];

const CROSS_DOMAIN = [
        { domain:"Algorithmic Pricing", beta:"5.28", type:"Institutional", pi:"$39.5B", key:"sapm-algorithmic-pricing" },
        { domain:"Arms Exports", beta:"2.54", type:"Institutional", pi:"$293B", key:"sapm-arms-exports" },
        { domain:"Aviation Emissions", beta:"4.91", type:"Institutional", pi:"$1.007T", key:"sapm-aviation-emissions" },
        { domain:"Big Tech Monopoly", beta:"9.60", type:"Institutional", pi:"$158B", key:"sapm-big-tech-platform-monopoly" },
        { domain:"Cement (Calcination Floor)", beta:"6.55", type:"Impossibility", pi:"$330B", key:"sapm-cement-calcination-floor" },
        { domain:"Coal Combustion", beta:"6.96", type:"Institutional", pi:"$990B", key:"sapm-coal" },
        { domain:"CRE Urban Hollowing", beta:"11.0", type:"Institutional", pi:"$13.5B", key:"sapm-cre-urban-hollowing" },
        { domain:"Deep-Sea Mining (Abyssal Floor)", beta:"8.45", type:"Impossibility", pi:"$4.8B", key:"sapm-dsm-abyssal-recovery-floor" },
        { domain:"Global Fisheries", beta:"4.77", type:"Institutional", pi:"$37.6B", key:"sapm-fisheries-no-impossibility" },
        { domain:"Gambling Industry", beta:"7.19", type:"Institutional", pi:"$44.2B", key:"sapm-gambling" },
        { domain:"Gene Drives (Ecological Ratchet)", beta:"42.5", type:"Impossibility", pi:"$2.8B", key:"sapm-gene-drives" },
        { domain:"Gig Economy", beta:"4.56", type:"Institutional", pi:"$62.0B", key:"sapm-gig-economy" },
        { domain:"Oil & Gas Extraction", beta:"6.58", type:"Institutional", pi:"$3.50T", key:"sapm-oil-gas" },
        { domain:"Opioid Industry", beta:"12.5", type:"Institutional", pi:"$24.0B", key:"sapm-opioids" },
        { domain:"Orbital Debris (Kessler Ceiling)", beta:"5,066", type:"Impossibility", pi:"$293B", key:"sapm-orbital-debris" },
        { domain:"Palm Oil Deforestation", beta:"8.86", type:"Institutional", pi:"$67B", key:"sapm-palm-oil" },
        { domain:"Pharmacy Benefit Managers", beta:"35.4", type:"Institutional", pi:"$27.6B", key:"sapm-pbm-rebate" },
        { domain:"POPs Beyond PFAS (Inheritance Floor)", beta:"6.08", type:"Impossibility", pi:"$70B", key:"sapm-pops-beyond-pfas" },
        { domain:"For-Profit Student Loans", beta:"4.80", type:"Institutional", pi:"$46.8B", key:"sapm-student-loans-forprofit" },
        { domain:"Tobacco Industry", beta:"6.80", type:"Institutional", pi:"$965B", key:"sapm-tobacco" },
        { domain:"Topsoil Erosion (Pedogenesis Floor)", beta:"5.52", type:"Impossibility", pi:"$380B", key:"sapm-topsoil-erosion" },
        { domain:"Ultra-Processed Food", beta:"6.11", type:"Institutional", pi:"$293B", key:"sapm-upf-full" },
        { domain:"Ultra-Processed Food (No Impossibility)", beta:"6.11", type:"Institutional", pi:"$293B", key:"sapm-upf-no-impossibility" },
        { domain:"Water Privatization", beta:"3.16", type:"Institutional", pi:"$246B", key:"sapm-water-privatization" },
        { domain:"WMD/LAWS (Capability Diffusion Ceiling)", beta:"79,512", type:"Impossibility", pi:"$85B", key:"sapm-wmd-capability-diffusion-ceiling" },
];

const HIGHLIGHTS = [
        "The Calcination Floor: E_process(u) ≥ 0.51 t CO₂/t clinker for all u ∈ U — a mass-balance identity invariant to process design.",
        "Even at 100% renewable thermal energy, E(t) → 0.50–0.54 t CO₂/t clinker. The energy transition alone can eliminate at most 40% of current emissions.",
        "βW at full decarbonization (95% CCUS + full fuel switching) ≈ 1.35 — climate policy necessary but not sufficient.",
        "Expiry condition: calcium silicate cement production exceeds 1% of global clinker output (~41 Mt/yr). As of 2026: ~0.003%.",
        "DOE's cancellation of Brimstone's $189M grant (May 2025) is a documented sovereign act reducing deployment of the primary A1-escaping technology.",
        "A3 confirmed: ICC astroturfing (ProPublica 2021), €5B EU ETS windfall, Brimstone DOE grant cancellation — institutional lock-in operating on three simultaneous tracks.",
];

const PSF_PARAMS = {pi_c:85.0,pi_p:330.0,w_c:2014.0,kappa:1.35};
const PSF_DATA = [{pi:8.5,w:1748.92},{pi:22.52,w:1837.18},{pi:36.53,w:1907.58},{pi:50.55,w:1960.24},{pi:64.57,w:1995.09},{pi:78.58,w:2012.13},{pi:92.6,w:2011.38},{pi:106.62,w:1992.83},{pi:120.63,w:1956.5},{pi:134.65,w:1902.34},{pi:148.67,w:1830.38},{pi:162.68,w:1740.67},{pi:176.7,w:1633.11},{pi:190.72,w:1507.74},{pi:204.73,w:1364.67},{pi:218.75,w:1203.69},{pi:232.77,w:1024.92},{pi:246.78,w:828.47},{pi:260.8,w:614.09},{pi:274.82,w:381.91},{pi:288.83,w:132.1},{pi:302.85,w:-135.69},{pi:316.87,w:-421.29},{pi:330.88,w:-724.47},{pi:344.9,w:-1045.66},{pi:358.92,w:-1384.67},{pi:372.93,w:-1741.22},{pi:386.95,w:-2115.82},{pi:400.97,w:-2508.23},{pi:414.98,w:-2918.15},{pi:429.0,w:-3346.16}];

const MC_HIST = [{bin:"5.16",lo:5.1564,hi:5.2183,count:31},{bin:"5.22",lo:5.2183,hi:5.2801,count:44},{bin:"5.28",lo:5.2801,hi:5.3420,count:61},{bin:"5.34",lo:5.3420,hi:5.4039,count:100},{bin:"5.40",lo:5.4039,hi:5.4658,count:112},{bin:"5.47",lo:5.4658,hi:5.5276,count:168},{bin:"5.53",lo:5.5276,hi:5.5895,count:175},{bin:"5.59",lo:5.5895,hi:5.6514,count:192},{bin:"5.65",lo:5.6514,hi:5.7133,count:210},{bin:"5.71",lo:5.7133,hi:5.7752,count:240},{bin:"5.78",lo:5.7752,hi:5.8370,count:243},{bin:"5.84",lo:5.8370,hi:5.8989,count:264},{bin:"5.90",lo:5.8989,hi:5.9608,count:308},{bin:"5.96",lo:5.9608,hi:6.0227,count:294},{bin:"6.02",lo:6.0227,hi:6.0845,count:310},{bin:"6.08",lo:6.0845,hi:6.1464,count:338},{bin:"6.15",lo:6.1464,hi:6.2083,count:340},{bin:"6.21",lo:6.2083,hi:6.2702,count:326},{bin:"6.27",lo:6.2702,hi:6.3321,count:300},{bin:"6.33",lo:6.3321,hi:6.3939,count:346},{bin:"6.39",lo:6.3939,hi:6.4558,count:323},{bin:"6.46",lo:6.4558,hi:6.5177,count:302},{bin:"6.52",lo:6.5177,hi:6.5796,count:310},{bin:"6.58",lo:6.5796,hi:6.6414,count:307},{bin:"6.64",lo:6.6414,hi:6.7033,count:310},{bin:"6.70",lo:6.7033,hi:6.7652,count:287},{bin:"6.77",lo:6.7652,hi:6.8271,count:318},{bin:"6.83",lo:6.8271,hi:6.8890,count:288},{bin:"6.89",lo:6.8890,hi:6.9508,count:296},{bin:"6.95",lo:6.9508,hi:7.0127,count:263},{bin:"7.01",lo:7.0127,hi:7.0746,count:200},{bin:"7.07",lo:7.0746,hi:7.1365,count:232},{bin:"7.14",lo:7.1365,hi:7.1983,count:217},{bin:"7.20",lo:7.1983,hi:7.2602,count:237},{bin:"7.26",lo:7.2602,hi:7.3221,count:209},{bin:"7.32",lo:7.3221,hi:7.3840,count:173},{bin:"7.38",lo:7.3840,hi:7.4459,count:163},{bin:"7.45",lo:7.4459,hi:7.5077,count:159},{bin:"7.51",lo:7.5077,hi:7.5696,count:136},{bin:"7.57",lo:7.5696,hi:7.6315,count:128},{bin:"7.63",lo:7.6315,hi:7.6934,count:127},{bin:"7.69",lo:7.6934,hi:7.7553,count:104},{bin:"7.76",lo:7.7553,hi:7.8171,count:90},{bin:"7.82",lo:7.8171,hi:7.8790,count:56},{bin:"7.88",lo:7.8790,hi:7.9409,count:64},{bin:"7.94",lo:7.9409,hi:8.0028,count:63},{bin:"8.00",lo:8.0028,hi:8.0646,count:44},{bin:"8.06",lo:8.0646,hi:8.1265,count:42},{bin:"8.13",lo:8.1265,hi:8.1884,count:27},{bin:"8.19",lo:8.1884,hi:8.2503,count:23}];
const MC_STATS = {mean:6.5463,median:6.5020,ci_lo:5.5049,ci_hi:7.7313,pct_hw:100.0,pct_above_3:100.0,pct_above_5:99.9,min:4.7070,max:8.8084,n_draws:10000,seed:42};
const MC_CHANNELS = [{name:"Calcination CO2 (process)",mean:1222.57,p5:1056.62,p50:1218.54,p95:1394.84,share:0.5702},{name:"Combustion CO2 (energy)",mean:546.70,p5:460.38,p50:545.10,p95:637.50,share:0.2550},{name:"Air quality mortality",mean:196.68,p5:143.70,p50:194.67,p95:253.16,share:0.0917},{name:"Quarrying ecosystem",mean:79.93,p5:44.10,p50:80.21,p95:115.85,share:0.0373},{name:"NOx & particulate health",mean:58.14,p5:38.43,p50:57.29,p95:79.88,share:0.0271},{name:"Governance failure",mean:40.07,p5:17.46,p50:40.35,p95:62.56,share:0.0187}];
const MC_WELFARE = {mean:2144.09,ci_lo:1948.11,ci_hi:2348.00};

const THRESHOLDS = [{domain:"Clinker-to-cement ratio below 0.65 globally",year:2030,confidence:"Medium",status:"Currently ~0.72; SCM substitution advancing in emerging markets",crossed:false},{domain:"First commercial CCS cement plant >1Mt/yr",year:2028,confidence:"Medium",status:"Heidelberg Materials Brevik (Norway) targeting 2024 startup",crossed:false},{domain:"Calcium silicate cement >1% global clinker share",year:2035,confidence:"Low",status:"Brimstone first plant ~103K-140K tonnes; 0.003% of global output",crossed:false},{domain:"Carbon price >$100/tCO2 in all major cement markets",year:2032,confidence:"Low",status:"EU ETS ~€65; China ETS ~$10; U.S. no federal price",crossed:false},{domain:"DOE Brimstone grant reinstatement or equivalent",year:2027,confidence:"Low",status:"Grant cancelled May 2025; administration reversal required",crossed:false}];

const AXIOMS = {type:"impossibility",items:[{id:"A1",name:"Calcination Necessity",description:"Portland cement clinker requires CaCO3 (limestone) as its primary feedstock; no demonstrated alternative feedstock produces equivalent binding properties at commercial scale."},{id:"A2",name:"Stoichiometric Irreducibility",description:"CaCO3 → CaO + CO2 is a conservation-of-mass identity: 100 kg of limestone yields 56 kg of lime and 44 kg of CO2. No process chemistry can eliminate this CO2 while preserving the CaO product."},{id:"A3",name:"Institutional Lock-in",description:"The $330B global cement industry\'s infrastructure, supply chains, and capital stock are configured for limestone-based production; sovereign regulatory action cancelled the primary alternative funding stream (DOE Brimstone grant, May 2025)."}]};

const METHODS_DATA = {
  welfare_function: "W computed via Social Cost of Carbon ($190/tCO2) applied to 2.6 GtCO2/year process emissions plus 1.1 GtCO2 combustion emissions, plus VSL-weighted mortality from PM2.5 and NOx from cement kilns.",
  cooperative_baseline: "Cement production under full CCS for process emissions plus electrified kilns, retaining $85B in essential construction material value with net-zero CO2 impact.",
  falsification: ["F1: Demonstrate that calcium silicate cement (Brimstone process) achieves ASTM C150 compliance at >1% of global clinker output, establishing commercial-scale A1 escape.","F2: Show that CaCO3 calcination can produce binding CaO without releasing stoichiometric CO2 — i.e., refute A2 via novel process chemistry.","F3: Demonstrate that supplementary cementitious materials (fly ash, slag, calcined clay) can fully replace Portland clinker in all structural applications without strength or durability penalty."],
  key_sources: ["IEA, Cement sector tracking (2024)","IPCC AR6 WG3, Industry chapter (2022)","Brimstone Energy technical specifications (2024)","Global Cement and Concrete Association, Getting the Numbers Right (2023)"]
};

// ─── Color palette ───────────────────────────────────────────────────────────
const C = {
  bg:      '#0D0D0D',
  panel:   '#1A1A1A',
  border:  'rgba(255,255,255,0.08)',
  navy:    '#1A1A1A',
  gold:    '#F59E0B',
  crimson: '#EF4444',
  green:   '#22C55E',
  text:    '#F5F0E8',
  muted:   'rgba(255,255,255,0.4)',
  thead:   '#141414',
  mono:    "'JetBrains Mono', 'Fira Code', monospace",
  serif:   "'Newsreader', 'Georgia', serif",
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function Metric({ label, value, sub, color }) {
  return (
    <div style={{flex:1,minWidth:140,background:C.panel,border:`1px solid ${C.border}`,borderRadius:3,padding:'12px 16px'}}>
      <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{fontFamily:C.mono,fontSize:28,fontWeight:700,color:color||C.gold,lineHeight:1}}>{value}</div>
      {sub && <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,marginTop:4}}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{fontFamily:C.mono,fontSize:12,color:C.muted,letterSpacing:2,borderBottom:`1px solid ${C.border}`,paddingBottom:6,marginBottom:12,marginTop:20,textTransform:'uppercase'}}>
      {children}
    </div>
  );
}

function BetaBar({ beta, max }) {
  const pct = Math.min(100, (parseFloat(beta)||0) / (max||15) * 100);
  const color = pct > 80 ? C.crimson : pct > 50 ? '#D97706' : C.gold;
  return (
    <div style={{background:'rgba(255,255,255,0.04)',borderRadius:2,height:8,flex:1,margin:'0 8px'}}>
      <div style={{width:`${pct}%`,height:'100%',background:color,borderRadius:2,transition:'width 0.4s'}} />
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily:C.mono, fontSize:12, letterSpacing:1,
      padding:'6px 14px', border:'none', cursor:'pointer',
      background: active ? C.gold : 'transparent',
      color: active ? '#000' : C.muted,
      borderBottom: active ? `2px solid ${C.gold}` : '2px solid transparent',
      textTransform:'uppercase',
    }}>{label}</button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Cement7aCalcinationFloorDashboard() {
  const [tab, setTab] = useState('overview');
  const maxBeta = Math.max(...CROSS_DOMAIN.map(d => parseFloat(d.beta)||0), parseFloat(META.beta)||0, 10);

  return (
    <div style={{background:C.bg,minHeight:'100vh',padding:'0',fontFamily:C.mono,color:C.text}}>

      {/* Header */}
      <div style={{background:C.panel,borderBottom:`2px solid ${C.gold}`,padding:'14px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:2,marginBottom:4}}>ERIK POSTNIEKS · SAPM</div>
          <div style={{fontFamily:C.serif,fontSize:24,fontWeight:700,color:C.text}}>{META.title}</div>
          {META.subtitle && <div style={{fontFamily:C.serif,fontSize:15,color:C.muted,marginTop:2,fontStyle:'italic'}}>{META.subtitle}</div>}
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:1}}>SYSTEM BETA</div>
          <div style={{fontFamily:C.mono,fontSize:36,fontWeight:700,color:C.gold,lineHeight:1}}>β<sub>W</sub> = {META.beta}</div>
          {META.ci && <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>90% CI [{META.ci}]</div>}
        </div>
      </div>

      {/* PST badge + type */}
      <div style={{background:'rgba(245,158,11,0.06)',padding:'8px 24px',display:'flex',gap:10,alignItems:'center',borderBottom:`1px solid ${C.border}`}}>
        <span style={{background:'#7b1a1a',color:'#ffdddd',fontSize:12,padding:'4px 10px',borderRadius:2,fontFamily:'JetBrains Mono,monospace',letterSpacing:0.5}}>IMPOSSIBILITY THEOREM</span>
        <span style={{fontFamily:C.mono,fontSize:12,color:C.muted}}>{META.type}</span>
        {META.companion && <a href={META.companion} target="_blank" rel="noreferrer" style={{marginLeft:'auto',fontFamily:C.mono,fontSize:11,color:C.gold,textDecoration:'none'}}>↗ Companion Dashboard</a>}
      </div>

      {/* Tab bar */}
      <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:'0 24px',display:'flex',gap:4}}>
        {['overview','channels','psf','monte-carlo','thresholds','cross-domain','methods','highlights'].map(t => (
          <Tab key={t} label={t} active={tab===t} onClick={()=>setTab(t)} />
        ))}
      </div>

      <div style={{padding:'20px 24px',maxWidth:1100}}>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            {/* Key metrics row */}
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <Metric label={<>β<sub>W</sub>  (System Beta)</>} value={META.beta} sub={META.ci ? `90% CI [${META.ci}]` : 'Headline estimate'} color={C.gold} />
              {META.pi && <Metric label="Private Payoff Π" value={META.pi+'/yr'} sub="Private sector capture" color={C.text} />}
              {META.psa && <Metric label={<>System-Adj. Payoff Π<sub>SA</sub></>} value={META.psa} sub={<>β<sub>W</sub> · Π − W</>} color={C.crimson} />}
              {META.mu && <Metric label="Break-Even μ*" value={META.mu} sub="Welfare neutrality threshold" color={'#22C55E'} />}
              {META.kappa && <Metric label="PSF Curvature κ" value={META.kappa} sub="Pareto shortfall index" color={C.muted} />}
            </div>

            
      {/* Theorem Statement */}
      <div style={{background:'#1A1A1A',border:'2px solid #F59E0B',borderRadius:4,padding:'16px 20px',marginBottom:16}}>
        <div style={{fontFamily:'Newsreader,serif',fontSize:11,color:'#aabbcc',marginBottom:6,letterSpacing:1}}>THEOREM STATEMENT</div>
        <div style={{fontFamily:'Newsreader,serif',fontSize:14,color:'#e8e8e8',fontStyle:'italic',lineHeight:1.6}}>No production process u ∈ U — no fuel-switching strategy, efficiency program, or process innovation operating within Portland cement using CaCO₃ feedstock — can eliminate process CO₂ emissions. The system beta for Portland cement cannot be reduced below approximately 1.35 through energy and climate policy alone. (Postnieks, 2026)</div>
      </div>

            {/* Channel waterfall */}
            {CHANNELS.length > 0 && (
              <div>
                <SectionTitle>Channel Decomposition — Welfare Cost Waterfall</SectionTitle>
                {CHANNELS.map((ch,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',marginBottom:8,gap:8}}>
                    <div style={{fontFamily:C.mono,fontSize:12,color:C.muted,width:22,textAlign:'right'}}>{ch.id}</div>
                    <div style={{fontFamily:C.serif,fontSize:15,color:C.text,width:300,flexShrink:0}}>{ch.name}</div>
                    <BetaBar beta={ch.beta} max={parseFloat(META.beta)||15} />
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.gold,width:55,textAlign:'right'}}>{ch.beta}</div>
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.text,width:110,textAlign:'right'}}>{ch.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHANNELS TAB */}
        {tab === 'channels' && (
          <div>
            <SectionTitle>Channel-by-Channel Breakdown</SectionTitle>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead>
                <tr style={{background:C.thead}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>#</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Channel</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>β<sub>W</sub>(i)</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>δ_i ($/yr)</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {CHANNELS.map((ch,i) => (
                  <tr key={i} style={{background: i%2===0 ? C.panel : C.bg}}>
                    <td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{ch.id}</td>
                    <td style={{padding:'8px 12px',color:C.text,fontFamily:C.serif,fontSize:14,borderBottom:`1px solid ${C.border}`}}>{ch.name}</td>
                    <td style={{padding:'8px 12px',color:C.gold,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.beta}</td>
                    <td style={{padding:'8px 12px',color:C.text,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.value}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.weight}</td>
                  </tr>
                ))}
                <tr style={{background:C.thead}}>
                  <td colSpan={2} style={{padding:'10px 12px',color:C.gold,fontWeight:700,fontSize:14}}>AGGREGATE β<sub>W</sub></td>
                  <td colSpan={3} style={{padding:'10px 12px',color:C.gold,fontWeight:700,fontSize:16,textAlign:'right'}}>{META.beta}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* CROSS-DOMAIN TAB */}
        {tab === 'cross-domain' && (
          <div>
            <SectionTitle>Cross-Domain SAPM Registry</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={Math.min(500, CROSS_DOMAIN.filter(d => parseFloat(d.beta) > 0 && parseFloat(d.beta) <= 50).length * 28 + 60)}>
                <BarChart data={[...CROSS_DOMAIN].filter(d => parseFloat(d.beta) > 0 && parseFloat(d.beta) <= 50).sort((a,b) => parseFloat(a.beta) - parseFloat(b.beta)).map(d => ({...d, betaNum: parseFloat(d.beta)}))} layout="vertical" margin={{top:10,right:30,left:200,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} />
                  <YAxis type="category" dataKey="domain" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} width={190} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <ReferenceLine x={1} stroke={C.crimson} strokeDasharray="3 3" label={{value:"β=1",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                  <Bar dataKey="betaNum" fill={C.gold} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead>
                <tr style={{background:C.thead}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Domain</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>β<sub>W</sub></th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>PST Type</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Π ($/yr)</th>
                </tr>
              </thead>
              <tbody>
                {[...CROSS_DOMAIN].sort((a,b) => (parseFloat(b.beta)||0) - (parseFloat(a.beta)||0)).map((d,i) => (
                  <tr key={i} style={{background: d.key==='sapm-cement-calcination-floor' ? 'rgba(34,197,94,0.08)' : i%2===0 ? C.panel : C.bg}}>
                    <td style={{padding:'8px 12px',color: d.key==='sapm-cement-calcination-floor' ? '#22C55E' : C.text,fontFamily:C.serif,fontSize:14,borderBottom:`1px solid ${C.border}`}}>
                      {d.key==='sapm-cement-calcination-floor' ? '▶ ' : ''}{d.domain}
                    </td>
                    <td style={{padding:'8px 12px',color: parseFloat(d.beta)>10 ? C.crimson : C.gold,textAlign:'right',fontWeight:700,borderBottom:`1px solid ${C.border}`}}>{d.beta}</td>
                    <td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{d.type}</td>
                    <td style={{padding:'8px 12px',color:C.text,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{d.pi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* PSF TAB */}
        {tab === 'psf' && (
          <div>
            <SectionTitle>Private-Systemic Frontier</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={PSF_DATA} margin={{top:10,right:30,left:20,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="pi" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"Π (Private Payoff)",position:"bottom",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <YAxis stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"W (System Welfare)",angle:-90,position:"insideLeft",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <Area type="monotone" dataKey="w" stroke={C.gold} fill="rgba(245,158,11,0.15)" strokeWidth={2} />
                  <ReferenceLine x={PSF_PARAMS.pi_c} stroke={C.green} strokeDasharray="5 5" label={{value:"Πᶜ",fill:C.green,fontFamily:C.mono,fontSize:11}} />
                  <ReferenceLine x={PSF_PARAMS.pi_p} stroke={C.crimson} strokeDasharray="5 5" label={{value:"Current",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Metric label={<>COOPERATIVE PAYOFF Π<sub>C</sub></>} value={'$'+PSF_PARAMS.pi_c+'B'} sub="Welfare-maximizing extraction" color={C.green} />
              <Metric label={<>CURRENT PAYOFF Π<sub>P</sub></>} value={'$'+PSF_PARAMS.pi_p+'B'} sub="Actual private extraction" color={C.crimson} />
              <Metric label="OVER-EXTRACTION" value={'$'+(PSF_PARAMS.pi_p - PSF_PARAMS.pi_c)+'B'} sub="Gap driving welfare loss" color={C.gold} />
            </div>
            <div style={{marginTop:16,padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>SAPM ↔ CAPM CORRESPONDENCE</div>
              <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>SAPM CONSTRUCT</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>CAPM ANALOGUE</th>
                </tr></thead>
                <tbody>
                  {[[<>β<sub>W</sub> (System Beta)</>,<>β (Market Beta)</>],['PSF (Private-Systemic Frontier)','SML (Security Market Line)'],[<>μ* (Shadow Price)</>,<>r<sub>f</sub> (Risk-Free Rate)</>],['Πˢᵃ (System-Adjusted Payoff)','α (Jensen\'s Alpha)'],['W (System Welfare)','No equivalent — structurally invisible'],[<>𝒮<sub>W</sub> (Welfare Efficiency)</>,<>Sharpe Ratio</>]].map(([s,c],i) => (
                    <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                      <td style={{padding:'8px 12px',color:C.text}}>{s}</td>
                      <td style={{padding:'8px 12px',color:C.muted,fontFamily:C.serif}}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* MONTE CARLO TAB */}
        {tab === 'monte-carlo' && (
          <div>
            <SectionTitle>Monte Carlo Simulation — {MC_STATS.n_draws.toLocaleString()} Draws (seed={MC_STATS.seed})</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MC_HIST} margin={{top:10,right:30,left:20,bottom:30}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="bin" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:9}} angle={-45} textAnchor="end" interval={4} />
                  <YAxis stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} formatter={(v)=>[v,'Draws']} />
                  <Bar dataKey="count" fill={C.gold} />
                  <ReferenceLine x={MC_STATS.mean.toFixed(2)} stroke={C.crimson} strokeWidth={2} strokeDasharray="5 5" label={{value:'μ='+MC_STATS.mean.toFixed(2),fill:C.crimson,fontFamily:C.mono,fontSize:11,position:'top'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <Metric label={<>MEAN β<sub>W</sub></>} value={MC_STATS.mean.toFixed(2)} sub={'Median: '+MC_STATS.median.toFixed(2)} color={C.gold} />
              <Metric label="90% CI" value={'['+MC_STATS.ci_lo.toFixed(2)+', '+MC_STATS.ci_hi.toFixed(2)+']'} sub={'Range: '+MC_STATS.min.toFixed(2)+'–'+MC_STATS.max.toFixed(2)} color={C.muted} />
              <Metric label="% HOLLOW WIN" value={MC_STATS.pct_hw.toFixed(1)+'%'} sub={<>β<sub>W</sub> &gt; 1 in all draws</>} color={MC_STATS.pct_hw > 95 ? C.crimson : C.gold} />
              <Metric label={<>% β<sub>W</sub> &gt; 3</>} value={MC_STATS.pct_above_3.toFixed(1)+'%'} color={MC_STATS.pct_above_3 > 90 ? C.crimson : C.gold} />
              <Metric label={<>% β<sub>W</sub> &gt; 5</>} value={MC_STATS.pct_above_5.toFixed(1)+'%'} color={MC_STATS.pct_above_5 > 50 ? '#D97706' : C.gold} />
            </div>
            <SectionTitle>Channel Welfare Contributions</SectionTitle>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>CHANNEL</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>MEAN $B</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P5</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P50</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P95</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>SHARE</th>
              </tr></thead>
              <tbody>
                {MC_CHANNELS.map((ch,i) => (
                  <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.04)`,background:i%2===0?C.panel:C.bg}}>
                    <td style={{padding:'8px 12px',color:C.text,fontFamily:C.serif,fontSize:14}}>{ch.name}</td>
                    <td style={{padding:'8px 12px',color:C.gold,textAlign:'right',fontWeight:600}}>{ch.mean.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p5.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p50.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p95.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{(ch.share*100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:16,padding:12,background:'rgba(245,158,11,0.06)',border:`1px solid rgba(245,158,11,0.15)`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>Total welfare cost: <span style={{color:C.gold}}>${MC_WELFARE.mean.toFixed(1)}B</span> (90% CI: ${MC_WELFARE.ci_lo.toFixed(1)}B – ${MC_WELFARE.ci_hi.toFixed(1)}B) · Source: sapm_monte_carlo.py (seed=42)</div>
            </div>
          </div>
        )}

        {/* THRESHOLDS TAB */}
        {tab === 'thresholds' && (
          <div>
            <SectionTitle>Critical Thresholds & Predicted Crossover</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={Math.max(200, THRESHOLDS.length * 44)}>
                <BarChart data={THRESHOLDS.map(t=>({...t,yearsFromNow:t.year-2026}))} layout="vertical" margin={{top:10,right:30,left:180,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"Years from 2026",position:"bottom",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <YAxis type="category" dataKey="domain" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} width={170} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <ReferenceLine x={0} stroke={C.crimson} strokeDasharray="3 3" label={{value:"NOW",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                  <Bar dataKey="yearsFromNow" fill={C.gold} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'grid',gap:12}}>
              {THRESHOLDS.map((t,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'12px 16px',background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,borderLeft:`3px solid ${t.crossed ? C.crimson : C.gold}`}}>
                  <div style={{fontFamily:C.mono,fontSize:14,color:t.crossed ? C.crimson : C.gold,fontWeight:700,minWidth:50}}>{t.year}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.text}}>{t.domain}</div>
                    <div style={{fontFamily:C.serif,fontSize:13,color:C.muted,marginTop:2}}>{t.status}</div>
                  </div>
                  <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,padding:'2px 8px',border:`1px solid ${C.border}`,borderRadius:2}}>{t.confidence}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* METHODS TAB */}
        {tab === 'methods' && (
          <div>
            <SectionTitle>{AXIOMS.type === 'impossibility' ? 'Impossibility Axioms' : 'Institutional Failure Mechanisms'}</SectionTitle>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12,marginBottom:20}}>
              {AXIOMS.items.map((a,i) => (
                <div key={i} style={{padding:16,background:C.panel,border:`1px solid ${AXIOMS.type === 'impossibility' ? 'rgba(239,68,68,0.2)' : C.border}`,borderRadius:4}}>
                  <div style={{fontFamily:C.mono,fontSize:12,color:AXIOMS.type === 'impossibility' ? C.crimson : C.gold,letterSpacing:1,marginBottom:6}}>{a.id}</div>
                  <div style={{fontFamily:C.serif,fontSize:15,color:C.text,fontWeight:600,marginBottom:6}}>{a.name}</div>
                  <div style={{fontFamily:C.serif,fontSize:14,color:C.muted,lineHeight:1.6}}>{a.description}</div>
                </div>
              ))}
            </div>

            <SectionTitle>System Welfare Function</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{METHODS_DATA.welfare_function}</div>
            </div>

            <SectionTitle>Cooperative Baseline</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{METHODS_DATA.cooperative_baseline}</div>
            </div>

            <SectionTitle>Falsification Criteria</SectionTitle>
            <div style={{display:'grid',gap:8,marginBottom:20}}>
              {METHODS_DATA.falsification.map((f,i) => (
                <div key={i} style={{padding:'10px 16px',background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,fontFamily:C.serif,fontSize:14,color:C.text,lineHeight:1.6}}>{f}</div>
              ))}
            </div>

            <SectionTitle>Key Sources</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              {METHODS_DATA.key_sources.map((s,i) => (
                <div key={i} style={{fontFamily:C.mono,fontSize:12,color:C.muted,padding:'4px 0',borderBottom:`1px solid rgba(255,255,255,0.04)`}}>{s}</div>
              ))}
            </div>

            <div style={{padding:16,background:'rgba(245,158,11,0.06)',border:`1px solid rgba(245,158,11,0.15)`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>CITATION</div>
              <div style={{fontFamily:C.serif,fontSize:14,color:C.text,lineHeight:1.6}}>
                Postnieks, E. (2026). System Asset Pricing Model: {META.title}. SAPM Working Paper.
              </div>
            </div>
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {tab === 'highlights' && (
          <div>
            <SectionTitle>Key Findings</SectionTitle>
            {HIGHLIGHTS.map((h,i) => (
              <div key={i} style={{display:'flex',gap:12,marginBottom:12,background:C.panel,border:`1px solid ${C.border}`,borderRadius:3,padding:'12px 16px'}}>
                <div style={{fontFamily:C.mono,fontSize:16,color:C.gold,flexShrink:0}}>▸</div>
                <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{h}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      
      {/* 𝒮W WELFARE EFFICIENCY RATIO */}
      <div style={{padding:"24px",background:C.panel,border:"2px solid #F59E0B40",borderRadius:4,margin:"24px 0"}}>
        <div style={{fontFamily:C.mono,fontSize:12,color:"#F59E0B",letterSpacing:2,marginBottom:16}}>WELFARE EFFICIENCY RATIO</div>
        <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:12}}>
          <span style={{fontFamily:C.mono,fontSize:42,fontWeight:700,color:"#F59E0B"}}>𝒮<sub>W</sub> = 0.74</span>
        </div>
        <div style={{fontFamily:C.mono,fontSize:13,color:C.muted,marginBottom:16}}>
          S&P 500 long-run Sharpe ≈ 0.40 &nbsp;|&nbsp; Acceptable ≥ 0.30 &nbsp;|&nbsp; Poor &lt; 0.10
        </div>
        <div style={{fontFamily:C.serif,fontSize:16,color:"#F59E0B",lineHeight:1.7,fontStyle:"italic"}}>
          This sector generates meaningful private value relative to welfare cost — but remains in Hollow Win territory.
        </div>
      </div>

      {/* GREEK SYMBOL GLOSSARY */}
      <details style={{margin:"24px 0"}}>
        <summary style={{fontFamily:C.mono,fontSize:13,color:C.gold,cursor:"pointer",padding:"12px 16px",background:C.panel,border:"1px solid rgba(245,158,11,0.15)",borderRadius:4,letterSpacing:1,listStyle:"none",display:"flex",alignItems:"center",gap:8}}>
          <span style={{color:C.gold,fontSize:14}}>▸</span> WHAT THESE SYMBOLS MEAN — AND WHY THEY MATTER
        </summary>
        <div style={{background:C.panel,border:"1px solid rgba(245,158,11,0.15)",borderTop:"none",borderRadius:"0 0 4px 4px",padding:"16px",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:C.mono,fontSize:13}}>
            <thead>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>SYMBOL</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>PRONOUNCED</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>WHAT IT MEASURES</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>CAPM EQUIVALENT</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>WHY IT MATTERS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>β<sub>W</sub></td>
                <td style={{padding:"10px",color:C.text}}>beta-W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>How much social welfare this sector destroys per dollar of private gain. β<sub>W</sub> = 5.0 means $5 of welfare destroyed per $1 earned.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>β (market beta) — measures how much an asset moves with the market</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>In CAPM, high beta means high financial risk. In SAPM, high β<sub>W</sub> means high welfare destruction per dollar of revenue.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>𝒮<sub>W</sub></td>
                <td style={{padding:"10px",color:C.text}}>S-W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Private gain per dollar of system welfare cost. Higher is better — but in PST domains it is always low.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Sharpe Ratio — return per unit of risk</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>S&P 500 long-run Sharpe ≈ 0.40. A Sharpe of 0.10 is poor. VW Dieselgate: 𝒮<sub>W</sub> = 0.12. LIBOR: 𝒮<sub>W</sub> ≈ 0. ERCOT: 𝒮<sub>W</sub> = 0.0005. These are welfare efficiency ratios of industries that GDP calls productive.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>T*</td>
                <td style={{padding:"10px",color:C.text}}>T-star</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The predicted time until a Hollow Win collapses into outright failure.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to duration or time-to-default in credit analysis</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: T* = 6.1 years predicted, ~6 years observed. LIBOR: T* ≤ 0 — the system was failing from day one. Seven years of concealment, not surplus.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>μ*</td>
                <td style={{padding:"10px",color:C.text}}>mu-star</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The efficient price of system welfare — what it would cost to make the deal system-preserving. μ* = 1/β<sub>W</sub>. Derived from frontier geometry, not assigned by an analyst.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to the risk-free rate as a floor price for risk</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>β<sub>W</sub> = 7.4 → μ* ≈ 0.135. β<sub>W</sub> = 35.2 → μ* ≈ 0.028. Lower μ* means cheaper welfare preservation in theory — PST means it never happens without intervention.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>Πˢᵃ</td>
                <td style={{padding:"10px",color:C.text}}>pi-SA</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The deal's true value after subtracting welfare cost. Πˢᵃ = Π − μ* · ΔW. If negative, the deal destroys more welfare than it creates.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Jensen's alpha — return above what risk justifies</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>A deal that looks like +$2.3M joint gain may be −$2.4M system-adjusted. Every GDSS deployed today shows only the first number.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>W</td>
                <td style={{padding:"10px",color:C.text}}>W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The health of the shared system both parties are embedded in. Not A's welfare. Not B's welfare. The system's.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No CAPM equivalent — this is the variable CAPM cannot see</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The Private Pareto Theorem proves W cannot be computed from bilateral payoffs. It is structurally outside the payoff space. This is the impossibility.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>δ</td>
                <td style={{padding:"10px",color:C.text}}>delta</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Total accumulated welfare cost at crossover — the damage done before the Hollow Win collapses.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No direct equivalent</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: δ ≈ $3.7 billion in accumulated emissions damage before EPA notice of violation.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>η</td>
                <td style={{padding:"10px",color:C.text}}>eta</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>How quickly system damage feeds back into private costs. Low η means the Hollow Win persists longer before collapsing.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to mean reversion speed in financial models</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: η ≈ 0.3. ERCOT: η ≈ 0 — no feedback until catastrophic failure.</td>
              </tr>
              <tr>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>λ</td>
                <td style={{padding:"10px",color:C.text}}>lambda</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Rate of welfare cost accumulation per unit of private gain. Combined with η and δ determines T*.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No direct equivalent</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Higher λ means faster damage accumulation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      {/* Footer */}
      <div style={{background:C.panel,borderTop:`1px solid ${C.border}`,padding:'10px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:40}}>
        <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>Erik Postnieks · © 2026 Erik Postnieks · © 2026 Erik Postnieks</div>
        <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>SAPM Working Paper · 2026</div>
      </div>
    <SAPMNav />
      </div>
  );
}
