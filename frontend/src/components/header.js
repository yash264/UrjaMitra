import Introduction from "../helpers/introduction";
import Meteors from "../helpers/meteors";

function Header() {
    return (
        <>
            <div className="relative min-h-screen w-full">
                <div
                    className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full blur-3xl" />
                <div
                    className="relative flex h-full flex-col justify-center overflow-hidden rounded border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">

                    <Introduction />

                </div>

                <Meteors />
            </div>
        </>
    )
}

export default Header;