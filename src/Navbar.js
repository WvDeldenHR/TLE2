import "./css/App.css";
import home from './img/icons/home.png'
import overzicht from './img/icons/overzicht.png'
import discover from './img/icons/ontdekken.png'
import profile from './img/icons/profiel.png'

export function Navbar() {
    return (
        <div className="h-16">
            <nav className="">
                <div className="">
                    <ul className="flex place-content-center space-x-20 inset-x-0 bottom-0">
                        <li className="">
                            <div className="">
                                <img className="h-10" src={home} alt={"Home"}></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="h-10" src={discover} alt={"Ontdekken"}></img></div></li>
                        <li className="">
                            <div className="">
                                <button className="h-10 w-10 bg-green-600 rounded-full border-black"><p className="text-white">+</p></button></div></li>
                        <li className="">
                            <div className="">
                                <img className="h-10" src={overzicht} alt={"Overzicht"}></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="h-10" src={profile} alt={"Ontdekken"}></img></div></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}