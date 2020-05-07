import styled from 'styled-components';

// ul + ul - każde ul od poprzedniego ul ma być ...

export const List = styled.ul`
    li + li {
        margin-top: ${({ theme }) => theme.spacing.xs}px;
    }
    li {
        margin: 0;
    }
`
// > *:nth-child(1) - ile ma zajmować podany children w ListItem
export const ListItem = styled.li`
    border: 1px solid ${({theme}) => theme.colors.grey.dark};
    padding: ${({ theme }) => theme.spacing.xs}px;
    display: flex;
    justify-content: space-between;

    > *:nth-child(1) {
        text-align: left;
        flex: 4;
    }
    > *:nth-child(2) {
        text-align: right;
        flex: 2;
    }
    > *:nth-child(3) {
        flex: 3;
    }
    > *:nth-child(4) {
        flex: 1;
    }
`