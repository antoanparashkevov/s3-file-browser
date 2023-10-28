import { ChangeEvent, FocusEvent, useState } from "react";

const useInput = (
        validateInputHandler: (value: any) => boolean, initialInputValue: string | number = ''
) => {
    const [inputValue, setInputValue] = useState<string | number>(initialInputValue ?? "");
    const [isTouched, setIsTouched] = useState<boolean>(false);
    
    const valueIsValid: boolean = validateInputHandler(inputValue);
    const hasError: boolean = !valueIsValid && isTouched;
    
    const valueChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }
    
    const inputBlurHandler = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsTouched(true);
    }
    
    const reset = (): void => {
        setInputValue("")
        setIsTouched(false)
    }
    
    return {
        value: inputValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset,
    }
}

export default useInput;