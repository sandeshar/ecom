import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";

const Navbar = () => {
    return (
        <div className="bg-transparent absolute w-screen z-10 text-white flex px-10 py-3 items-center justify-between">
            <div className="flex items-center justify-between">
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                <h1 className="font-semibold text-lg">Design Hub</h1>
                <ul className="flex space-x-4 text-gray-100 ml-10">
                    <li>Home</li>
                    <li>Products</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="flex space-x-4 items-center">
                <label className="relative hidden min-w-40 max-w-64 md:block">
                    <label className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" htmlFor="search"> <BiSearch /> </label>
                    <input id="search" className="h-10 w-full rounded-full border-none bg-white/10 pl-10 text-sm text-white placeholder-white/50 transition-all duration-300 focus:w-64 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Search" />
                </label>
                <span className="bg-white/15 p-2 rounded-full hover:bg-white hover:text-red-500 h-10 w-10 flex items-center justify-center">
                    <IoHeartOutline className="text-xl" />
                </span>
                <span className="bg-white/15 p-2 rounded-full hover:bg-white hover:text-red-500 h-10 w-10 flex items-center justify-center">
                    <BsCart className="text-xl" />
                </span>
            </div>
        </div>
    );
};

export default Navbar;