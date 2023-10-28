import styled from "styled-components";

//primary button
export const Button = styled.button<{$primary?: boolean, $small?: boolean}>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    white-space: nowrap;
    font-size: 15px;
    border-radius: 16px;
    font-weight: ${props => props.$primary ? 400 : 700};
    background-color: ${props => props.$primary ? '#FFFFFF' : '#adadad'};
    color: ${props => props.$primary ? "#adadad" : "#FFFFFF"};
    border: ${props => props.$primary ? "2px solid #C8C8C8" : "none"};
    padding: ${props => props.$small ? "10px 20px" : "13px 26px"};
    
    &:hover {
        background-color: ${props => props.$primary ? "#bdbdbd" : "#888888"};
        color: ${props => props.$primary ? "#FFFFFF" : ""}
    }
    
    &:focus {
        box-shadow: 0 0 10px black;
    }
    
//TODO disabled
`;

//secondary button
export const SecondaryButton = styled(Button)<{$secondary?: boolean}>`
    font-weight: ${props => props.$secondary ? 600 : 700};
    color: ${props => props.$secondary ? "#1FCC79" : "#FFFFFF" };
    background-color: ${props => props.$primary ? "#FFFFFF" : "#1FCC79"};
    border: ${props => props.$primary ? "2px solid #1FCC79" : "none"};
`