import './../../css/index.css';

export function CreatePostContextOther() {
    return (
        <>
            <div>
                <h2 className="text-dark font-bold">Extra Informatie (Optioneel)</h2>
            </div>

            <div className="py-2">
                <textarea className="rounded w-full h-40 bg-gray-200"></textarea>
            </div>
        </>
    )
}