import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import React  from 'react';

import logo from '../../images/logo.png';

const NavBarItem = ({title, classprops}:any) => (
    <li className={`mx-4 cursor-pointer text-black ${classprops}`}>
        {title}
    </li>
)

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);

    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justtify-center items-center'>
                <img src={logo} alt='logo' className='w-32 cursor-pointer'/>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
            {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                <NavBarItem key={item + index} title={item} classprops="py-2 px-7 mx-4"/>
            ))}
                <li className='text-black hover:bg-[#85929e] py-2 px-7 mx-4 rounded-full cursor-pointer bg-[#C0C0C0]'>
                    Login
                </li>
            </ul>
            <div className='flex relative'>
                {toggleMenu
                    ? <AiOutlineClose fontSize={28} className='text-black md:hidden cursor-pointer' onClick={() => setToggleMenu(false)}/>
                    :<HiMenuAlt4 fontSize={28} className='text-black md:hidden cursor-pointer' onClick={() => setToggleMenu(true)}/>
                }
                {toggleMenu && (
                    <ul className='z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
                        flex flex-col justify-start items-end rounded-md blue-glassmorphism text-black animate-slide-in'>
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                        </li>
                        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
                            <NavBarItem key={item + index} title={item} classprops="my-2 text-lg"/>
                        ))}
                    </ul>
                    )

                }
            </div>
        </nav>
    );
}

export default Navbar;