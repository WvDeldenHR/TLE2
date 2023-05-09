import './../../css/index.css';
// Images
import iconNotification from './../../assets/icons/icon_mail_001_212427_32x32.svg';


export function NotificationButtonAlt() {
    return (
        <button className="flex items-center justify-center rounded-full w-12 h-12 bg-gray-200 drop-shadow">
            <img className="w-6" src={iconNotification} alt="Notifications"></img>
        </button>
    );
}