import './../../css/index.css';
// Images
import iconFilter from './../../assets/icons/icon_filter_001_FFFFFF_32x32.svg';

export function FilterButton() {
    return (
        <button className="rounded p-2 h-10 bg-white bg-opacity-25">
            <img className="w-8" src={iconFilter} alt="Filter"></img>
        </button>
    );
}