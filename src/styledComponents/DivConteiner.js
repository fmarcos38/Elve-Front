import styled from "styled-components";

const DivContainer = styled.div`
  border-radius: 20px;
  margin: ${props => props.margin || '15px auto 15px auto'};
  padding: ${props => props.padding || '20px 30px 30px 10px'}; /* de aca modif los inputs */
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 18px; */
  transition: .2s ease all;
  width: ${props => props.width};
  gap: ${props => props.gap || '2px'};
  /* background: #FFDF74; */
 
`
export default DivContainer;