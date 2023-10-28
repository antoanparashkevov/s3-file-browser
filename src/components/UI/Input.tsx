import React, { ChangeEvent, FocusEvent } from "react";
import styles from './Input.module.scss';
import styled from "styled-components";

const InputWrapper = styled.div`
    position: relative;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 10px;
    width: 320px;
    margin-bottom: 16px;
`;

interface InputProps {
    id: string,
    type: string,
    name: string,
    placeholder?: string,
    showRemoveIcon?: boolean,
    inputDisabled?: boolean,
    iconSrc?: string,
    iconAlt?: string,
    iconWidth?: number,
    iconHeight?: number,
    enteredValue: string | number,
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
    onBlurHandler: (event: FocusEvent<HTMLInputElement>) => void,
    reset: () => void
}

const Input: React.FC<InputProps> = (
    {
        id,
        type,
        name,
        placeholder,
        showRemoveIcon,
        inputDisabled,
        iconSrc,
        iconAlt,
        iconWidth,
        iconHeight,
        enteredValue,
        onChangeHandler,
        onBlurHandler,
        reset
    }
) => {
    
    return(
        <InputWrapper>
            {iconSrc &&
                <div className={styles['input_icon']}>
                    <img src={iconSrc} alt={iconAlt} width={iconWidth || 24} height={iconHeight || 24}/>
                </div>
            }
            <input
                className={styles['input_element']}
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                disabled={inputDisabled}
                value={enteredValue}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            {showRemoveIcon && enteredValue.toString().length > 0 &&
                <div onClick={() => reset()} className={styles['input_remove_icon']}>
                    <img src="/icons/remove.svg" alt="Remove Icon" width={24} height={24}/>
                </div>
            }
        </InputWrapper>
    )
}

export default Input;