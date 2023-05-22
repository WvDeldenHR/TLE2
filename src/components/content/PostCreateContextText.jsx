export function PostCreateContextText() {
    return (
        <>
            <div className="pb-4">
                <h2 className="text-base text-dark font-bold">Titel</h2>
                <input className="my-2 rounded px-3 py-2 w-full bg-gray-200"/>
            </div>

            <div>
                <h2 className="text-base text-dark font-bold">Vertel Over Jouw Probleem</h2>
                <textarea className="resize-none my-2 rounded px-3 py-2 w-full h-32 bg-gray-200"></textarea>
            </div>
        </>
    )
}