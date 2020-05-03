import styled from 'styled-components';

export const ParentCategory = styled.div`
    border: 1px solid ${({theme}) => theme.colors.grey.dark};
    padding: ${({ theme}) => theme.spacing.xs};
    display: flex;
    justify-content: space-between;
`

export const CategoryItem = styled.div`
    background-color: ${({ theme }) => theme.colors.grey.light};
`