import './../css/index.css';
// Components
import { NotificationButton } from '../components/buttons/NotificationButton.js';
import { Searchbar } from '../components/forms/Searchbar.js';
import { FilterButton } from '../components/buttons/FilterButton';
import { TagButtonsSlider } from '../components/buttons/TagButtonsSlider';
import { PostCardLarge } from '../components/PostCardLarge.js';


export function Home() {
    return (
        <div className="">
            <div className="m-1 px-6 py-4 rounded-xl h-80 bg-primary">
                <div className="tnn | flex justify-end">
                    { <NotificationButton /> }
                </div>
                <div className="pt-2 pb-6">
                    <h1 className="text-3xl text-white font-semibold">Hallo</h1>
                    <h1 className="text-3xl text-white font-semibold">User</h1>
                </div>
                <div className="flex">
                    <div className="w-full">
                       { <Searchbar /> }
                    </div>
                    <div className="">
                        { <FilterButton /> }
                    </div>
                </div>
                <div className="-mr-5">
                    { <TagButtonsSlider />}
                </div>
            </div>

            <div className="-mt-8 px-6">
                <div className="pb-5">
                    <div className="content-box | flex rounded-lg w-full h-40 drop-shadow">
                        <div className="flex items-end w-full h-full">
                            <span className="mx-4 my-3 px-3 py-1 rounded text-sm text-white font-regular bg-dark bg-opacity-50">Post Titel</span>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center justify-end px-5 py-4 w-full">
                                <span className="pr-2 text-sm text-white font-medium">0</span>
                                <svg className="fill-white" width="24" height="24" viewBox="0 0 32 32"><g>
                                    <path d="M0.1,7.2C0.1,7,0.2,6.7,0.3,6.4c3.2,3.3,6.4,6.5,9.5,9.7c-3.1,3.1-6.3,6.4-9.5,9.7c-0.1-0.3-0.2-0.6-0.3-0.9 C0.1,19,0.1,13.1,0.1,7.2z"/>
                                    <path d="M32.1,24.9c-0.1,0.3-0.2,0.5-0.3,0.9c-3.2-3.3-6.4-6.5-9.5-9.7c3.1-3.1,6.3-6.4,9.5-9.7 C31.9,6.7,32,7,32.1,7.2C32.1,13.1,32.1,19,32.1,24.9z"/>
                                    <path d="M1.7,5c0.5-0.1,0.9-0.2,1.4-0.2c6.8,0,13.7,0,20.5,0c1.8,0,3.7,0,5.5,0c0.4,0,0.9,0.1,1.3,0.2c0,0,0,0.1,0,0.1 c-0.1,0.1-0.1,0.2-0.2,0.2c-4,4-8,8-12,11.9c-0.9,0.9-1.9,1.2-3.1,0.8c-0.4-0.1-0.8-0.4-1.1-0.7c-4.1-4-8.1-8.1-12.2-12.1 c0,0-0.1-0.1-0.1-0.1C1.7,5.1,1.7,5,1.7,5z"/>
                                    <path d="M20.8,17.3c3.2,3.3,6.4,6.5,9.6,9.8c-0.3,0.1-0.6,0.1-0.9,0.2c-0.1,0-0.2,0-0.4,0c-8.7,0-17.3,0-26,0 c-0.5,0-0.9-0.1-1.4-0.2c3.2-3.3,6.4-6.5,9.6-9.8c0.1,0.1,0.2,0.2,0.3,0.3c0.5,0.5,1,1.1,1.6,1.5c1.9,1.5,4.5,1.3,6.2-0.4 C19.9,18.3,20.3,17.8,20.8,17.3z"/>
                                </g></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="pb-3">
                        <h2 className="text text-dark font-semibold">Vandaag Voor Jou Gekozen</h2>
                    </div>
                    <div className="">
                        {<PostCardLarge />}
                        {<PostCardLarge />}
                        {<PostCardLarge />}
                        {<PostCardLarge />}
                    </div>
                </div>
            </div>

        </div>
    );
}