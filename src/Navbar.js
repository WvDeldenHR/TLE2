import "./css/App.css";
import home from './img/icons/home.png'
import menu from './img/icons/menu.png'
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
                                <img className="h-10" src={menu} alt={"Ontdekken"}></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="h-10" src={"img/icons/icon_plus_001_FFFFFF_32x32.svg"} alt={"Post Maken"}></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="h-10" src={discover} alt={"Overzicht"}></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="h-10" src={profile} alt={"Instellingen"}></img></div></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}