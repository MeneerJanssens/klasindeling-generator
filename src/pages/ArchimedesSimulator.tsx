import { useState, useMemo } from 'react';
import { Droplet } from 'lucide-react';

// Constanten voor veelgebruikte materialen en vloeistoffen (in kg/m³)
const MATERIAL_DENSITIES = [
    { label: 'Hout (800)', density: 800, color: 'bg-amber-500' },
    { label: 'IJs (917)', density: 917, color: 'bg-blue-300' },
    { label: 'Water (1000)', density: 1000, color: 'bg-blue-500' },
    { label: 'Baksteen (1800)', density: 1800, color: 'bg-red-600' },
    { label: 'Aluminium (2700)', density: 2700, color: 'bg-gray-400' },
    { label: 'IJzer (7870)', density: 7870, color: 'bg-gray-700' },
];

const FLUID_DENSITIES = [
    { label: 'Kerosine (820)', density: 820, color: 'bg-yellow-800' },
    { label: 'Zoet water (1000)', density: 1000, color: 'bg-blue-500' },
    { label: 'Zout water (1025)', density: 1025, color: 'bg-blue-700' },
    { label: 'Glycerine (1260)', density: 1260, color: 'bg-purple-800' },
    { label: 'Kwik (13534)', density: 13534, color: 'bg-gray-900' },
];

interface ResultDisplayProps {
    label: React.ReactNode;
    value: number;
    unit: string;
    color: string;
    isPercentage?: boolean;
}

// Component voor het tonen van berekende waarden
const ResultDisplay = ({ label, value, unit, color, isPercentage = false }: ResultDisplayProps) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">
            {label}:
        </span>
        <span className={`font-semibold ${color}`}>
            {isPercentage ? value.toFixed(1) : value.toFixed(2)} {unit}
        </span>
    </div>
);

interface ResultDisplayWithSignProps {
    label: React.ReactNode;
    value: number;
    unit: string;
    color: string;
    sign: '+' | '-';
}

// Component voor het tonen van berekende waarden met +/- teken
const ResultDisplayWithSign = ({ label, value, unit, color, sign }: ResultDisplayWithSignProps) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">
            {label}:
        </span>
        <span className={`font-semibold ${color}`}>
            {sign}{value.toFixed(2)} {unit}
        </span>
    </div>
);

interface StatusDisplayProps {
    isSinking: boolean;
    submergedRatio: number;
}

// Component voor de status (drijft/zinkt)
const StatusDisplay = ({ isSinking, submergedRatio }: StatusDisplayProps) => {
    let statusText;
    let statusColor;

    if (isSinking) {
        statusText = "Het blok zinkt";
        statusColor = "bg-red-100 text-red-800";
    } else if (submergedRatio === 1) {
        statusText = "Het blok zweeft (neutraal drijfvermogen)";
        statusColor = "bg-yellow-100 text-yellow-800";
    } else {
        statusText = "Het blok drijft";
        statusColor = "bg-green-100 text-green-800";
    }

    return (
        <div className={`mt-3 p-2 text-center rounded-lg font-medium ${statusColor}`}>
            {statusText}
        </div>
    );
};

interface DensitySliderProps {
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    densityType: 'fluid' | 'solid';
    solidInfo: { label: string; color: string };
    onPresetChange?: (value: number) => void;
    presets: Array<{ label: string; density: number; color: string }>;
}

// Tailwind CSS Utility Component voor invoer sliders
const DensitySlider = ({ value, min, max, step, onChange, densityType, solidInfo, onPresetChange, presets }: DensitySliderProps) => {
    
    const densitySymbol = 'ρ';
    const subScript = densityType === 'fluid' ? 'v' : 'b';
    const labelText = densityType === 'fluid' ? "Vloeistofdichtheid" : "Blokdichtheid";

    const currentPreset = presets.find(p => p.density === value);
    const displayLabel = currentPreset ? currentPreset.label : `Aangepast (${densityType === 'fluid' ? 'Vloeistof' : 'Blok'})`;

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDensity = parseFloat(e.target.value);
        if (onPresetChange) {
            onPresetChange(selectedDensity);
        }
    };

    return (
        <div className="mb-6 p-4 bg-indigo-50 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-200">
            <label className="block text-sm font-semibold text-indigo-900 mb-2">
                {labelText} (
                {densitySymbol}
                <sub className="text-xs">{subScript}</sub>
                ): {!isNaN(value) ? value.toFixed(0) : '0'} kg/m³
            </label>

            {onPresetChange && presets && (
                <div className="mb-4">
                    <select
                        onChange={handleSelectChange}
                        value={currentPreset ? value : ''}
                        className="w-full p-2 border border-indigo-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm cursor-pointer bg-white"
                    >
                        {!currentPreset && (
                            <option value="">Aangepast ({densityType === 'fluid' ? 'Vloeistof' : 'Blok'})</option>
                        )}
                        {presets.map(p => (
                            <option key={p.label} value={p.density}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                    <p className="mt-1 text-xs text-indigo-700 font-medium">
                        Huidige selectie: {displayLabel}
                    </p>
                </div>
            )}
            
            <div className="flex items-center space-x-3">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg"
                    style={{ accentColor: densityType === 'solid' && solidInfo ? solidInfo.color.split('-')[1] : 'blue' }}
                />
            </div>
            {densityType === 'solid' && solidInfo && (
                <p className="mt-2 text-xs font-medium text-indigo-600">
                    Huidige categorie: {solidInfo.label}
                </p>
            )}
        </div>
    );
};

interface VisualizationProps {
    isZinkend: boolean;
    objectHoogte: number;
    bovensteHoogte: number;
    solidInfo: { label: string; color: string };
    ondergedompeldeHoogte: number;
    fluidColor: string;
    fluidDensity: number;
}

// De visualisatie component
const Visualization = ({
    isZinkend,
    objectHoogte,
    bovensteHoogte,
    solidInfo,
    ondergedompeldeHoogte,
    fluidColor,
    fluidDensity 
}: VisualizationProps) => (
    <div className="flex justify-center items-end h-[350px] w-full p-4">
        {/* Het containerbekken */}
        <div className="relative w-full max-w-sm h-full bg-gray-100 rounded-b-xl border-x-4 border-b-4 border-gray-400 overflow-hidden">
            {/* De vloeistof */}
            <div
                className={`absolute bottom-0 left-0 right-0 h-4/5 ${fluidColor} opacity-70`}
                style={{
                    boxShadow: 'inset 0 0 20px rgba(0,0,255,0.4)',
                    transition: 'background-color 0.5s ease'
                }}
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/50"></div>

                {/* Het drijvende/zinkende blok */}
                <div
                    className={`absolute left-1/2 -translate-x-1/2 rounded-md transition-all duration-500 ease-out shadow-xl`}
                    style={{
                        width: '80px',
                        height: objectHoogte + 'px',
                        bottom: isZinkend ? '-40px' : bovensteHoogte + 'px',
                        transform: `translateX(-50%) translateZ(0)`,
                    }}
                >
                    {/* Zichtbaar (boven) deel van het blok */}
                    <div
                        className={`w-full ${solidInfo.color} rounded-t-md`}
                        style={{ height: bovensteHoogte + 'px', opacity: 1 }}
                    ></div>
                    {/* Ondergedompeld deel van het blok */}
                    <div
                        className={`w-full ${solidInfo.color} rounded-b-md`}
                        style={{ height: ondergedompeldeHoogte + 'px', opacity: 0.6 }}
                    ></div>
                </div>
            </div>

            {/* Label voor de vloeistof */}
            <div className="absolute top-4 left-4 text-xs font-mono text-gray-600">
                ρ<sub className="text-xs">v</sub>: {fluidDensity.toFixed(0)} kg/m³
            </div>
        </div>
    </div>
);


// De hoofdcomponent voor de Simulatie van de Wet van Archimedes
export default function ArchimedesSimulator() {
    const ZWAARTEKRACHT = 9.81; // N/kg
    const MAX_VOLUME = 0.1; // Vast blokvolume voor eenvoud (100 liter)
    const MAX_FLUID_DENSITY = 2000; 
    const MAX_OBJECT_DENSITY = 8000;

    const [fluidDensity, setFluidDensity] = useState(FLUID_DENSITIES[1].density); // Zoet water
    const [objectDensity, setObjectDensity] = useState(MATERIAL_DENSITIES[0].density); // Hout

    const getDensityType = (density: number) => {
        if (density <= 500) return { label: 'Zeer Licht', color: 'bg-yellow-400' };
        if (density <= 800) return { label: 'Licht', color: 'bg-amber-500' };
        if (density <= 1000) return { label: 'Neutraal/Licht', color: 'bg-blue-300' };
        if (density <= 2000) return { label: 'Gemiddeld', color: 'bg-red-600' };
        return { label: 'Zwaar', color: 'bg-gray-700' };
    };

    const solidInfo = getDensityType(objectDensity);

    const {
        objectGewicht,
        opwaartseKracht,
        ondergedompeldAandeel,
        nettoKracht,
        isZinkend
    } = useMemo(() => {
        const gewicht = objectDensity * MAX_VOLUME * ZWAARTEKRACHT;

        let verhouding = objectDensity / fluidDensity; 
        let ondergedompeld = 0;
        let F_b = 0;
        let zinkend = false;

        if (verhouding >= 1) {
            ondergedompeld = 1;
            zinkend = (verhouding > 1);
            F_b = fluidDensity * MAX_VOLUME * ZWAARTEKRACHT; 
        } else {
            ondergedompeld = verhouding;
            F_b = gewicht;
        }

        const F_netto = F_b - gewicht;

        return {
            objectGewicht: gewicht,
            opwaartseKracht: F_b,
            ondergedompeldAandeel: ondergedompeld,
            nettoKracht: F_netto,
            isZinkend: zinkend,
        };
    }, [fluidDensity, objectDensity]); 

    const objectHoogte = 200;
    const ondergedompeldeHoogte = ondergedompeldAandeel * objectHoogte;
    const bovensteHoogte = objectHoogte - ondergedompeldeHoogte;

    const fluidColor = fluidDensity > 1200 ? 'bg-purple-800' : fluidDensity > 1000 ? 'bg-blue-700' : 'bg-blue-500'; 

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-indigo-900 mb-8 text-center flex items-center justify-center gap-3">
                    <Droplet className="w-10 h-10" />
                    Archimedes Simulator
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Linkerkolom: Invoerbesturingen */}
                    <div className="bg-white p-6 rounded-xl shadow-xl space-y-4 border border-indigo-100">
                        <h2 className="text-xl font-semibold text-indigo-900 border-b border-indigo-200 pb-2 mb-4">
                            Instellingen
                        </h2>
                        <DensitySlider
                            value={fluidDensity} 
                            min={500}
                            max={MAX_FLUID_DENSITY}
                            step={50}
                            onChange={setFluidDensity} 
                            onPresetChange={setFluidDensity}
                            densityType="fluid"
                            solidInfo={solidInfo}
                            presets={FLUID_DENSITIES}
                        />
                        
                        <DensitySlider
                            value={objectDensity} 
                            min={100}
                            max={MAX_OBJECT_DENSITY}
                            step={50}
                            onChange={setObjectDensity} 
                            onPresetChange={setObjectDensity}
                            densityType="solid"
                            solidInfo={solidInfo}
                            presets={MATERIAL_DENSITIES}
                        />
                         <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-800">
                            Volume (V): {MAX_VOLUME.toFixed(3)} m³ <br/>
                            Zwaarteveldsterkte (<span className="italic">g</span>): {ZWAARTEKRACHT.toFixed(2)} N/kg
                        </div>
                    </div>

                    {/* Rechterkolom: Visualisatie en Resultaten */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-indigo-100">
                        <h2 className="text-xl font-semibold text-indigo-900 border-b border-indigo-200 pb-2 mb-4">
                            Resultaten & Visualisatie
                        </h2>
                        <div className="flex flex-col gap-6">
                            <Visualization 
                                isZinkend={isZinkend}
                                objectHoogte={objectHoogte}
                                bovensteHoogte={bovensteHoogte}
                                solidInfo={solidInfo}
                                ondergedompeldeHoogte={ondergedompeldeHoogte}
                                fluidColor={fluidColor}
                                fluidDensity={fluidDensity} 
                            />
                            <div className="space-y-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                <ResultDisplayWithSign
                                    label={
                                        <>
                                            Blokgewicht F<sub className="text-xs">g</sub>
                                        </>
                                    }
                                    value={objectGewicht} 
                                    unit="N" 
                                    color="text-purple-600"
                                    sign="-"
                                />
                                <ResultDisplayWithSign
                                    label={
                                        <>
                                            Opwaartse kracht F<sub className="text-xs">a</sub>
                                        </>
                                    } 
                                    value={opwaartseKracht} 
                                    unit="N" 
                                    color="text-indigo-600"
                                    sign="+"
                                />
                                <ResultDisplay 
                                    label={
                                        <>
                                            Netto Kracht F<sub className="text-xs">g</sub> + F<sub className="text-xs">a</sub>
                                        </>
                                    } 
                                    value={nettoKracht} 
                                    unit="N" 
                                    color={nettoKracht > 0 ? 'text-indigo-800 font-bold' : 'text-indigo-700'} 
                                />
                                <ResultDisplay label="Ondergedompeld deel" value={ondergedompeldAandeel * 100} unit="%" color="text-indigo-600" isPercentage={true} />
                                <StatusDisplay isSinking={isZinkend} submergedRatio={ondergedompeldAandeel}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donatie sectie - onderaan */}
            <div className="mt-8 text-center">
                <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Steun dit project
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Vind je deze tool handig? Help me om meer gratis tools te maken voor leerkrachten!
                    </p>
                    <a 
                        href='https://ko-fi.com/Z8Z01G7O8R' 
                        target='_blank' 
                        rel='noopener noreferrer'
                        className="inline-block"
                    >
                        <img 
                            src='https://ko-fi.com/img/githubbutton_sm.svg' 
                            alt='Steun me op Ko-fi' 
                            className="mx-auto"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
