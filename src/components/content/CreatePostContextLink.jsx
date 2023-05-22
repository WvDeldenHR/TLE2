import './../../css/index.css';

export function CreatePostContextLink() {
    return (
        <>
            <div>
                <h2 className="text-dark font-bold">Links</h2>
            </div>

            <div className="py-2">
                <input className="rounded px-3 py-1 w-full bg-gray-200"></input>
            </div>

            <div className="py-2">
                <button className="rounded-lg border-2 border-primary py-2 w-full text-sm text-primary font-semibold bg-white drop-shadow">Voeg extra link toe +</button>
            </div>
        </>
    )
}