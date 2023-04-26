import "./css/App.css";

export function Navbar() {
    return (
        <div className="fixed flex w-full h-full">
            <nav className="mt-auto w-full">
                <div className="">
                    <ul className="">
                        <li className="">
                            <div className="">
                                <img className="" src="./img/icons/icon_home_002_212427_32x32.svg" alt="Home"></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="" src="img/icons/icon_discover_001_212427_32x32.svg" alt="Ontdekken"></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="" src="img/icons/icon_plus_001_FFFFFF_32x32.svg" alt="Post Maken"></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="" src="img/icons/icon_list_001_212427_32x32.svg" alt="Overzicht"></img></div></li>
                        <li className="">
                            <div className="">
                                <img className="" src="img/icons/icon_user_001_212427_32x32.svg" alt="Instellingen"></img></div></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}