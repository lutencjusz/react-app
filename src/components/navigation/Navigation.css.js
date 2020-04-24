import styled from 'styled-components';
import Wrapper from '../wrapper'; // na widows nie można scieżki bezwzględnej

// styled.div to stack function tworzy element div
export const Container = styled.div`
 background-color: ${({theme}) => theme.colors.gray.light};
 display: flex;
 padding: ${({theme}) => theme.spacing.sm}px 0;
 justify-content: space-between;
`;

// dzielenie styli - czyli dziedziczenie po rodzicu
export const NavigationWrapper = styled(Wrapper)`
    display: flex;
    justify-content: space-between;
`;

export const List = styled.ul`
 display:flex;
`;