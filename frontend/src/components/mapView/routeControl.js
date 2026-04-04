import { useState } from "react";
import { fetchSuggestions } from "../../externalAPI/suggestionService";
import { FaRoute } from "react-icons/fa"; // small route icon


const RouteControls = ({
    src, setSrc,
    dst, setDst,
    srcCoords, setSrcCoords,
    range, setRange,
    battery, setBattery,
    onSubmit
}) => {
    const [srcSuggestions, setSrcSuggestions] = useState([]);
    const [dstSuggestions, setDstSuggestions] = useState([]);
    const [expanded, setExpanded] = useState(false); // track collapsed/expanded

    const handleSubmit = () => {
        if (!src || !dst) {
            alert("Please enter source and destination");
            return;
        }
        onSubmit({ src, dst, srcCoords, range, battery });
    };

    return (
        <div className="absolute bottom-6 right-12 z-20">
            {!expanded ? (
                // 🔹 Collapsed icon button
                <button
                    onClick={() => setExpanded(true)}
                    className="
                        w-14 h-14 rounded-full
                        bg-blue-500 hover:bg-blue-600
                        flex items-center justify-center
                        shadow-lg text-white
                        transition-all duration-200
                    "
                    title="Open EV Route Planner"
                >
                    <FaRoute size={20} />
                </button>
            ) : (
                // 🔹 Expanded card
                <div
                    className="
                        w-80 p-5 rounded-2xl
                        bg-white/90 backdrop-blur-xl
                        border border-gray-200
                        shadow-[0_8px_30px_rgba(0,0,0,0.15)]
                        text-gray-800
                        relative"
                >
                    {/* 🔹 Close button */}
                    <button
                        onClick={() => setExpanded(false)}
                        className="absolute top-2 right-2 text-black hover:text-gray-800"
                    >
                        ✕
                    </button>

                    {/* 🔹 Title */}
                    <h2 className="text-lg font-semibold mb-4 text-center">
                        ⚡ EV Route Planner
                    </h2>

                    {/* 🔹 Source */}
                    <div className="mb-3 relative">
                        <label className="text-xs text-blue-500 font-medium">
                            Source
                        </label>
                        <input
                            value={src}
                            onChange={async (e) => {
                                const value = e.target.value;
                                setSrc(value);
                                if (value.length > 2) {
                                    const results = await fetchSuggestions(value);
                                    setSrcSuggestions(results);
                                } else {
                                    setSrcSuggestions([]);
                                }
                            }}
                            placeholder="Enter starting point"
                            className="
                                w-full mt-1 p-2.5 rounded-lg
                                bg-white border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400
                                placeholder-gray-400"
                        />

                        {srcSuggestions.length > 0 && (
                            <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg z-50">
                                {srcSuggestions.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            setSrc(item.place_name);
                                            setSrcCoords(item.center);
                                            setSrcSuggestions([]);
                                        }}
                                        className="p-2 hover:bg-blue-50 cursor-pointer text-sm"
                                    >
                                        {item.place_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 🔹 Destination */}
                    <div className="mb-3 relative">
                        <label className="text-xs text-blue-500 font-medium">
                            Destination
                        </label>
                        <input
                            value={dst}
                            onChange={async (e) => {
                                const value = e.target.value;
                                setDst(value);
                                if (value.length > 2) {
                                    const results = await fetchSuggestions(value);
                                    setDstSuggestions(results);
                                } else {
                                    setDstSuggestions([]);
                                }
                            }}
                            placeholder="Enter destination"
                            className="
                                w-full mt-1 p-2.5 rounded-lg
                                bg-white border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-400
                                placeholder-gray-400"
                        />

                        {dstSuggestions.length > 0 && (
                            <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg z-50">
                                {dstSuggestions.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => {
                                            setDst(item.place_name);
                                            setDstSuggestions([]);
                                        }}
                                        className="p-2 hover:bg-blue-50 cursor-pointer text-sm"
                                    >
                                        {item.place_name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 🔹 Range */}
                    <div className="mb-3">
                        <label className="text-xs text-green-500 font-medium">
                            Range (km)
                        </label>
                        <input
                            type="number"
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                            className="
                                w-full mt-1 p-2.5 rounded-lg
                                bg-white border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* 🔹 Battery */}
                    <div className="mb-4">
                        <label className="text-xs text-yellow-500 font-medium">
                            Battery Performance (%)
                        </label>
                        <input
                            type="number"
                            value={battery}
                            onChange={(e) => setBattery(e.target.value)}
                            className="
                                w-full mt-1 p-2.5 rounded-lg
                                bg-white border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* 🔹 Submit button */}
                    <button
                        onClick={handleSubmit}
                        className="
                            w-full p-2.5 rounded-lg font-medium text-white
                            bg-gradient-to-r from-blue-500 to-indigo-500
                            hover:from-blue-600 hover:to-indigo-600
                            transition-all duration-200
                            shadow-md hover:shadow-lg"
                    >
                        Start Navigation 🚗⚡
                    </button>
                </div>
            )}
        </div>
    );
};

export default RouteControls;