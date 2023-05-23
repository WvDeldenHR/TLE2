export function PostCreateData() {
    return (
        <>
            <div className="py-8">
                <h2 className="text-base text-dark font-bold">Locatie</h2>

                <div>
                    <div className="flex gap-3 my-2">
                        <button className="border-2 rounded py-1 w-full h-8 text-xs border-gray-400 text-gray-400 font-medium">Mijn Adres</button>
                        <button className="border-2 rounded py-1 w-full h-8 text-xs border-gray-400 text-gray-400 font-medium">Buurtcentrum</button>
                    </div>
                    <div className="">

                    </div>
                </div>
            </div>

            <div className="">
                <h2 className="text-base text-dark font-bold">Gegevens Delen</h2>
                <div className="flex flex-col gap-3 mt-2 mb-4 pl-3 ">
                    <div className="flex items-center w-full">
                        <span className="text-sm text-dark font-medium">Achternaam</span>
                        <div className="flex justify-end w-full">
                            <label className="relative inline-block w-12 h-6">
                                <input className="switch-input | w-0 h-0 opacity-0" type="checkbox"/>
                                <span className="toggle | absolute border-2 border-dark rounded-xl inset-0 bg-white"></span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <span className="text-sm text-dark font-medium">Telefoonnummer</span>
                        <div className="flex justify-end w-full">
                            <label className="relative inline-block w-12 h-6">
                                <input className="switch-input | w-0 h-0 opacity-0" type="checkbox"/>
                                <span className="toggle | absolute border-2 border-dark rounded-xl inset-0 bg-white"></span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center w-full">
                        <span className="text-sm text-dark font-medium">Facebook</span>
                        <div className="flex justify-end w-full">
                            <label className="relative inline-block w-12 h-6">
                                <input className="switch-input | w-0 h-0 opacity-0" type="checkbox"/>
                                <span className="toggle | absolute border-2 border-dark rounded-xl inset-0 bg-white"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 mb-12">
                <h2 className="text-base text-dark font-bold">Post Deelbaar Maken</h2>
                <div className="flex items-center mt-2 pl-3 w-full">
                    <span className="text-sm text-dark font-medium">Facebook</span>
                    <div className="flex justify-end w-full">
                        <label className="relative inline-block w-12 h-6">
                            <input className="switch-input | w-0 h-0 opacity-0" type="checkbox"/>
                            <span className="toggle | absolute border-2 border-dark rounded-xl inset-0 bg-white"></span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}