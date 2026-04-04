const MapControls = ({ mapStyle, setMapStyle, mapStyles }) => {
    return (
        <div className="absolute bottom-5 left-60 z-10">
            <select
                value={mapStyle}
                onChange={(e) => setMapStyle(e.target.value)}
                className="
                    bg-gradient-to-r from-blue-500 to-indigo-600
                    text-white font-medium
                    px-5 py-2.5
                    rounded-xl shadow-lg
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                    hover:shadow-2xl hover:scale-105
                    transition-all duration-300
                    cursor-pointer
                    appearance-none relative"
            >
                {Object.entries(mapStyles).map(([name, style]) => (
                    <option
                        key={name}
                        value={style}
                        className="bg-gray-800 text-white"
                    >
                        {name}
                    </option>
                ))}
            </select>

            {/* ▼ Arrow */}
            <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm">
                ▼
            </div>
        </div>
    );
};

export default MapControls;