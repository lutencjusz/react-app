import React from 'react';
import styled from 'styled-components';

 // styled.div to stack function tworzy element div
const Container = styled.div`
    background-color: ${({theme}) => theme.colors.gray.light};
    display: flex;
    padding: ${({theme}) => theme.spacing.sm}px 0;
    justify-content: space-between;
`
//({theme}) destrukturyzacja obiektu

function Navigation() {
    return <div>
        <Container><h3>Przykładowa nawigacja</h3></Container>
    </div>
}

export default Navigation;