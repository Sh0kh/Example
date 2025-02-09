import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { NavLink } from 'react-router-dom';


export default function Home() {

    useGSAP(() => {
        gsap.fromTo('.Title ',
            {
                opacity: 0,
                y: -100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.3,
                ease: "power1.inOut"
            }
        )
    });

    return (
        <div className=' bg-black h-screen flex items-center justify-center'>
            <div className='Title'>
                <h1 className=" text-center text-[white]  text-[50px]">
                    Welcome
                </h1>
                <NavLink to={'/example/UI'} className={'block text-center bg-[white] rounded-[10px] py-[5px] border-[2px] border-[white] duration-500 hover:bg-transparent hover:text-[white]'}>
                    UI
                </NavLink>
            </div>
        </div>
    );
}
