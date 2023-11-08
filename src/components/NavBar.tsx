import React from 'react';
import Image from 'next/image';
import logo from "../images/Logo(2).png"
import userPhoto from "../images/user_image.png"

const NavBar = () => {

    return (
        <nav className=" text-white ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <Image src={logo} width={48} height={48} alt="Logo" />
                <div className="flex items-center gap-5">
                    <Image
                        src={userPhoto}
                        width={48}
                        height={48}
                        className="w-8 h-8 rounded-full"
                        alt="profile photo"
                    />
                    <div className="px-3">
                        <h1 className="text-sm">Lisa</h1>
                        <p className="text-xs">operator</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
