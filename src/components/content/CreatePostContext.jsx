import React, { useState } from 'react';
import './../../css/index.css';
//Components
import { CreatePostContextText } from './CreatePostContextText';
import { CreatePostContextPhoto } from './CreatePostContextPhoto';
import { CreatePostContextLink } from './CreatePostContextLink';
import { CreatePostContextOther } from './CreatePostContextOther';


// Button
// function TabGroup() {
//     const [active, setActive] = useState(types[0]);
//     return (
//       <>
//         <div>
//           {types.map((type) => (
//             <button 
//               key={type}
//               active={active === type}
//               onClick={() => setActive(type)}
//               className={`rounded-lg px-3 py-2 font-semibold ${active ? "bg-primary text-white" : "border-2 border-gray-400 text-gray-400"}`}
//             >
//               {type}
//             </button>
//           ))}
//         </div>
//         <p />
//         <p> Your payment selection: {active} </p>
//       </>
//     );
//   }


export function CreatePostContext() {
    const switchOptions = [<CreatePostContextText />, <CreatePostContextPhoto />, <CreatePostContextLink />, <CreatePostContextOther />];
    const [active, setActive] = useState(switchOptions[0]);

    return (
        <div className="px-8">
            <div className="flex justify-center gap-4 border-b-2 border-gray-300 pt-10 pb-6">
                <button className="rounded-lg w-30 h-8 text-white text-xs font-semibold bg-primary drop-shadow">Hulp Nodig</button>
                <button className="border-2 border-gray-400 rounded-lg w-30 h-8 text-gray-400 text-xs font-semibold">Hulp Aanbieden</button>
            </div>

            <div className="flex justify-center gap-4 py-6">
                <div className="flex flex-col items-center">
                    <button onClick={() => setActive(switchOptions[0])} className={`rounded-full p-3 drop-shadow ${active ? "bg-primary" : "bg-black"}`}>
                        <svg fill="white" width="22" height="22" viewBox="0 0 32 32"><g>
                            <path d="M16.1,5.4c-3.9,0-7.9,0-11.8,0c-0.2,0-0.4,0-0.6-0.1c-0.6-0.2-1-0.8-1-1.5C2.8,3.3,3.4,2.8,4,2.7
                                c0.1,0,0.2,0,0.3,0c7.8,0,15.7,0,23.5,0c0.2,0,0.5,0,0.7,0.1c0.6,0.2,1,0.8,0.9,1.5c-0.1,0.6-0.6,1.1-1.2,1.1c-0.1,0-0.3,0-0.4,0
                                C23.9,5.4,20,5.4,16.1,5.4z"/>
                            <path d="M16.1,18.7c3.9,0,7.9,0,11.8,0c0.9,0,1.5,0.6,1.4,1.5c0,0.6-0.6,1.1-1.2,1.2c-0.1,0-0.3,0-0.4,0
                                c-7.8,0-15.7,0-23.5,0c-0.2,0-0.4,0-0.6-0.1c-0.6-0.2-1-0.8-0.9-1.5c0.1-0.6,0.6-1.1,1.3-1.1c1.1,0,2.2,0,3.4,0
                                C10.3,18.7,13.2,18.7,16.1,18.7z"/>
                            <path d="M12.1,13.4c-2.6,0-5.3,0-7.9,0c-0.9,0-1.5-0.6-1.4-1.5c0-0.6,0.6-1.1,1.2-1.2c0.1,0,0.2,0,0.4,0
                                c5.2,0,10.4,0,15.6,0c0.2,0,0.4,0,0.6,0.1c0.6,0.2,1,0.8,0.9,1.5c-0.1,0.6-0.6,1.1-1.3,1.1c-1.5,0-2.9,0-4.4,0
                                C14.5,13.4,13.3,13.4,12.1,13.4z"/>
                            <path d="M12.1,29.4c-2.6,0-5.2,0-7.8,0c-0.2,0-0.4,0-0.6-0.1c-0.6-0.2-1-0.8-0.9-1.5c0.1-0.6,0.6-1.1,1.3-1.1
                                c0.1,0,0.2,0,0.3,0c5.2,0,10.4,0,15.6,0c0.2,0,0.4,0,0.6,0.1c0.6,0.2,1,0.8,0.9,1.5c-0.1,0.6-0.6,1.1-1.3,1.1c-1.3,0-2.7,0-4,0
                                C14.8,29.4,13.4,29.4,12.1,29.4z"/>
                        </g></svg>
                    </button>
                    <span className="pt-1 text-primary text-xs font-semibold">Text</span>
                </div>
                <div className="flex flex-col items-center">
                    <button className="border-gray-400 border-2 rounded-full p-3" onClick={() => setActive(switchOptions[1])}>
                        <svg className="fill-gray" width="22" height="22" viewBox="0 0 32 32"><g>
                            <path d="M2.7,16.1c0-2,0-4,0-5.9c0-1.4,0.3-2.7,1-3.9c1.1-2,2.8-3,5-3.3c0.5-0.1,1.1-0.1,1.6-0.1c3.9,0,7.7,0,11.6,0
                                c1.3,0,2.6,0.3,3.8,0.9c2.1,1.1,3.2,2.8,3.5,5.1c0.1,0.5,0.1,1.1,0.1,1.6c0,3.9,0,7.7,0,11.6c0,1.2-0.2,2.3-0.7,3.3
                                c-1,2.3-2.8,3.5-5.3,4c-0.5,0.1-1.1,0.1-1.6,0.1c-3.9,0-7.9,0-11.8,0c-1.3,0-2.6-0.3-3.8-1c-2.1-1.2-3.1-3.1-3.4-5.4
                                c-0.1-0.6-0.1-1.2-0.1-1.8C2.7,19.5,2.7,17.8,2.7,16.1C2.7,16.1,2.7,16.1,2.7,16.1z M27.4,16.9c0-0.2,0-0.3,0-0.4c0-2,0-3.9,0-5.9
                                c0-0.5,0-0.9-0.1-1.4c-0.3-1.9-1.2-3.4-3-4.1c-0.8-0.3-1.6-0.4-2.4-0.4c-3.9,0-7.7,0-11.6,0c-0.4,0-0.7,0-1.1,0.1
                                c-1.8,0.3-3.3,1.1-4,2.9C4.9,8.4,4.8,9.2,4.8,9.9c0,3.6,0,7.2,0,10.8c0,0.5,0,1,0,1.5c0,0.7,0.2,1.4,0.5,2c0.1-0.1,0.3-0.2,0.4-0.3
                                c1.5-1,3-2,4.5-3c0.7-0.5,1.5-0.6,2.4-0.5c0.6,0.1,1.1,0.5,1.6,0.9c0.5,0.4,1,0.7,1.6,0.7c0.9,0.1,1.7-0.1,2.4-0.7
                                c1.7-1.5,3.5-3,5.2-4.5c0.7-0.6,1.4-0.9,2.3-0.8C26.2,16.1,26.8,16.4,27.4,16.9z"/>
                            <path d="M12,13.9c-1.8,0-3.2-1.4-3.2-3.2c0-1.8,1.4-3.2,3.2-3.1c1.7,0,3.2,1.4,3.1,3.2C15.2,12.5,13.8,13.9,12,13.9z"/>
                        </g></svg>
                    </button>
                    <span className="pt-1 text-gray-400 text-xs">Foto's</span>
                </div>
                <div className="flex flex-col items-center">
                    <button className="border-gray-400 border-2 rounded-full p-3" onClick={() => setActive(switchOptions[2])}>
                        <svg className="fill-gray" width="22" height="22" viewBox="0 0 32 32"><g>
                            <path d="M32.1,8.1c-0.1,0.5-0.2,1.1-0.4,1.6c-0.3,1.1-0.9,2.1-1.8,3c-2.3,2.3-4.7,4.7-7,7c-2.7,2.6-7.4,2.8-10.3-0.1
                                c-0.8-0.8-0.9-2.1-0.1-3c0.7-0.8,2-0.9,2.9-0.2c0.5,0.4,0.9,0.7,1.5,0.9c1.1,0.3,2.2,0.1,3-0.7c0.7-0.6,1.4-1.3,2-2
                                c1.6-1.6,3.2-3.2,4.8-4.8c1.5-1.6,1.2-4-0.6-5.1c-1.2-0.7-2.8-0.5-3.9,0.6c-1.3,1.2-2.5,2.5-3.8,3.8c-0.3,0.3-0.6,0.4-1.1,0.2
                                c-1-0.4-2.1-0.6-3.3-0.6c-0.3,0-0.5-0.1-0.6-0.3c-0.1-0.3,0-0.5,0.2-0.6c1.9-1.9,3.8-3.9,5.8-5.7c1.1-1.1,2.5-1.7,4.1-1.9
                                c0.1,0,0.2,0,0.2-0.1c0.4,0,0.9,0,1.3,0c0.1,0,0.2,0,0.3,0.1c3,0.5,5,2.1,6.1,4.9c0.2,0.6,0.3,1.3,0.4,1.9
                                C32.1,7.3,32.1,7.7,32.1,8.1z"/>
                            <path d="M0.1,24c0.1-0.6,0.2-1.2,0.4-1.8c0.4-1.2,1-2.1,1.9-3C4.5,17,6.7,14.8,9,12.6c2.5-2.5,6.2-3,9.2-1.1
                                c0.7,0.4,1.4,0.9,1.8,1.6c0.5,0.9,0.3,1.9-0.4,2.5c-0.8,0.7-1.9,0.7-2.7,0.1c-0.1-0.1-0.2-0.2-0.3-0.3c-1.2-1.1-3-1.1-4.3,0
                                c-0.2,0.2-0.4,0.3-0.5,0.5c-2.1,2.1-4.2,4.2-6.3,6.3c-1.1,1.2-1.3,2.9-0.4,4.1c1.1,1.7,3.5,1.9,4.9,0.4c1.3-1.2,2.5-2.5,3.8-3.8
                                c0.1-0.1,0.1-0.1,0.2-0.2c0.2-0.2,0.4-0.2,0.6-0.1c1.1,0.4,2.3,0.7,3.6,0.7c0.2,0,0.4,0.1,0.5,0.3c0.1,0.2,0,0.4-0.1,0.6
                                c-0.3,0.3-0.6,0.6-0.9,0.9c-1.6,1.6-3.3,3.3-4.9,4.9c-1.1,1.1-2.5,1.7-4,1.9c-0.1,0-0.2,0-0.3,0.1c-0.4,0-0.8,0-1.2,0
                                c-0.1,0-0.2,0-0.3-0.1c-2.9-0.5-5-2-6-4.8c-0.3-0.6-0.3-1.3-0.5-2C0.1,24.8,0.1,24.4,0.1,24z"/>
                        </g></svg>
                    </button>
                    <span className="pt-1 text-gray-400 text-xs">Links</span>
                </div>
                <div className="flex flex-col items-center">
                    <button className="border-gray-400 border-2 rounded-full p-3" onClick={() => setActive(switchOptions[3])}>
                        <svg className="fill-gray" width="22" height="22" viewBox="0 0 32 32"><g>
                            <path d="M3.1,16.1c0-1.6,1.3-3,3-3c1.7,0,3,1.3,3,3c0,1.7-1.3,3-3,3C4.4,19.1,3.1,17.7,3.1,16.1z"/>
                            <path d="M13.1,16.1c0-1.6,1.4-3,3-3c1.6,0,3,1.4,3,3c0,1.6-1.4,3-3,3C14.4,19.1,13.1,17.7,13.1,16.1z"/>
                            <path d="M26.1,13.1c1.6,0,3,1.4,3,3c0,1.6-1.4,3-3,3c-1.6,0-3-1.4-3-3C23.1,14.4,24.4,13.1,26.1,13.1z"/>
                        </g></svg>
                    </button>
                    <span className="pt-1 text-gray-400 text-xs">Overig</span>
                </div>
            </div>

            <div className="pb-6 h-72">
                {active}
            </div>
        </div>
    );
}