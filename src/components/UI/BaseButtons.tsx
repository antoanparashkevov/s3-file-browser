import styled from "styled-components";

//primary button
export const Button = styled.button<{$fill?: boolean, $small?: boolean}>`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    white-space: nowrap;
    font-size: 15px;
    border-radius: 16px;
    font-weight: ${props => props.$fill ? 600 : 700};
    background-color: ${props => props.$fill ? '#adadad' : '#FFFFFF'};
    color: ${props => props.$fill ? "#FFFFFF" : "#adadad"};
    border: ${props => props.$fill ? "none" : "2px solid #C8C8C8"};
    padding: ${props => props.$small ? "10px 20px" : "13px 26px"};
    
    &:hover {
        background-color: ${props => props.$fill ? "#bdbdbd" : "#888888"};
        color: #FFFFFF;
    }
    
    &:focus {
        box-shadow: 0 0.5rem 1rem rgba(0,0,0, 0.4);
    }
    
    &:disabled {
        opacity: .65;
        cursor: not-allowed;
    }
    
    &:disabled:hover {
        color: ${props => props.$fill ? "#FFFFFF" : "#adadad"};
        background-color: ${props => props.$fill ? '#adadad' : '#FFFFFF'};;
    }
`;

//secondary button
export const SecondaryButton = styled(Button)<{$fill?: boolean}>`
    color: ${props => props.$fill ? "#FFFFFF" : "#1FCC79" };
    background-color: ${props => props.$fill ? "#1FCC79" : "#FFFFFF"};
    border: ${props => props.$fill ? "none" : "2px solid #1FCC79"};
    
    &:hover {
        background-color: #13a65f;
    }

    &:disabled:hover {
        color: ${props => props.$fill ? "#FFFFFF" : "#1FCC79" };
        background-color: ${props => props.$fill ? "#1FCC79" : "#FFFFFF"};
    }
`