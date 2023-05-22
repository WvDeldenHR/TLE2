import './../../css/index.css';

export function CreatePostContextPhoto({handleFileChange}) {
    return (
        <>
            <div className="">
                <h2 className="text-dark font-bold">Foto Toevoegen</h2>
            </div>

            <div className="py-2">
                <input
                    className="upload-img | rounded-lg w-full h-40 text-dark placeholder-dark text-center bg-gray-200"
                    placeholder="Upload foto / Maak foto"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    multiple
                    onChange={handleFileChange}
                />
            </div>
        </>
    )
}