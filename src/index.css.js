import {createGlobalStyle} from 'styled-components';
import {normalize} from 'styled-normalize'; // normalizator styli usuwa domyślne z Reacta

export default createGlobalStyle`
  ${normalize}
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li + li {
      margin-left: ${({theme}) => theme.spacing.xs}px;
    }
  }
`
