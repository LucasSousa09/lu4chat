type InputBox = {
    inputType?: 'text' | 'password'
    inputId: string
    inputPlaceholder: string
    labelText: string
}

export function InputBox({labelText, inputId, inputType = 'text', inputPlaceholder}: InputBox){
    return (
        <>
            <label className="text-primary text-base sm:text-xl leading-normal" htmlFor={inputId}>{labelText}</label>
            <input
                id={inputId} 
                type={inputType} 
                placeholder={inputPlaceholder}
                className="border border-primary rounded py-3 px-4 font-light mb-3 text-sm sm:text-base text-secondary last-of-type:mb-6" 
            />
        </>
    )
}