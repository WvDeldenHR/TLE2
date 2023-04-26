import "./css/App.css";

export function Navbar() {
    return (
        <div className="">
            <nav>
                <div className="">
                    <ul className="">
                        <li className="">
                            <a className="" href="">
                                <img className="" src="img/icons/icon_home_002_212427_32x32.svg" alt="Home"></img></a></li>
                        <li className="">
                            <a className="" href="">
                                <img className="" src="img/icons/icon_discover_001_212427_32x32.svg" alt="Ontdekken"></img></a></li>
                        <li className="">
                            <a className="" href="">
                                <img className="" src="img/icons/icon_plus_001_FFFFFF_32x32.svg" alt="Post Maken"></img></a></li>
                        <li className="">
                            <a className="" href="">
                                <img className="" src="img/icons/icon_list_001_212427_32x32.svg" alt="Overzicht"></img></a></li>
                        <li className="">
                            <a className="" href="">
                                <img className="" src="img/icons/icon_user_001_212427_32x32.svg" alt="Instellingen"></img></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}