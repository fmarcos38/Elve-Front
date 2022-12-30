import styled from 'styled-components'

const Button = styled.button`
    position: ${props => props.position};
    top: ${props => props.top};
    left: ${props => props.left};
    right: ${props => props.right};
    background: ${props => props.color || '#E52F50'};
    color: ${props => props.color || '#fff'};
    cursor: pointer;
    font-size: 14px;
    padding: 4px 10px;
    border: 2px solid #E52F50;
    font-weight: 500;
    border-radius: 30px;
    margin: ${props => props.margin};
    &:hover {
        background-color: #fff;
        color: #444;
        border: 2px solid #E52F50;
    }   
`
export default Button