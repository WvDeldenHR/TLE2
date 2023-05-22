import './../../css/index.css';

export function CreatePostContextText() {
    return (
        <>
            <div className="pb-6">
                <div>
                    <h2 className="text-dark font-bold">Titel</h2>
                </div>

                <div className="py-2">
                    <input className="rounded px-3 py-2 w-full bg-gray-200"></input>
                </div>
            </div>

            <div>
                <div>
                    <h2 className="text-dark font-bold">Vertel Over Jouw Probleem</h2>
                </div>

                <div className="py-2">
                    <textarea className="rounded px-3 py-2 w-full h-32 bg-gray-200"></textarea>
                </div>
            </div>
        </>
    )
}