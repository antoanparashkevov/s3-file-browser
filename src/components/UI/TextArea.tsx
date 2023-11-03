import styled from "styled-components";

interface AttrsInterface {
    rows?: number,
    cols?: number
}

const TextArea = styled.textarea.attrs(({rows = 25, cols = 10}: AttrsInterface) => ({
    rows,
    cols
}))`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    border: 1px solid #ccc;
    font-size: 16px;
    padding: .5rem;
    resize: none;

    &:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
    }
`

export default TextArea