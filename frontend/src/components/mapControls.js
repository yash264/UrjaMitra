const MapControls = ({ mapStyle, setMapStyle, mapStyles }) => {
    return (
        <div className="absolute top-4 left-4 z-10">
            <select
                value={mapStyle}
                onChange={(e) => setMapStyle(e.target.value)}
                className="bg-[#0f172a] text-white px-4 py-2 rounded-lg shadow-lg border border-gray-600"
            >
                {Object.entries(mapStyles).map(([name, style]) => (
                    <option key={name} value={style}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MapControls;