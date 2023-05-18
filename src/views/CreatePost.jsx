import './../css/index.css';
// Components
import { CreatePostText } from '../components/content/CreatePostText';


export function CreatePost() {
    return (
        <div className="">
            <div className="bg-primary">
                <div className="flex items-center justify-center py-6">
                    <span className="lines | block -mr-2 w-8 bg-white"></span>
                    <div className="flex flex-col items-center">
                        <span className="pb-3 text-xxs text-white">Stap 1</span>
                        <span className="block border-white border-2 rounded-full w-5 h-5 bg-primary z-10"></span>
                        </div>
                    <span className="lines | block -mx-2 w-12 bg-gray-300"></span>
                    <div className="flex flex-col items-center">
                        <span className="pb-3 text-xxs text-gray-300">Stap 2</span>
                        <span className="block border-gray-300 border-2 rounded-full w-5 h-5 bg-primary z-10"></span>
                    </div>
                    <span className="lines | block -mx-2 w-12 bg-gray-300"></span>
                    <div className="flex flex-col items-center">
                        <span className="pb-3 text-xxs text-gray-300">Stap 3</span>
                        <span className="block border-gray-300 border-2 rounded-full w-5 h-5 bg-primary z-10"></span>
                    </div>
                    <span className="lines | block -ml-2 w-8 bg-gray-300"></span>
                </div>
                <div className="flex flex-col items-center px-16 pb-6">
                    <h1 className="text-xl text-white font-semibold pb-1">Context</h1>
                    <p className="text-center text-xxs text-white">Lorum Ipsum bullshit tekst geen idee wat hier moet staan</p>
                </div>
            </div>

            <CreatePostText />
        </div>
    )
}