import styled from 'styled-components';

export const Category = styled.div`
    border: 1px solid ${({theme}) => theme.colors.grey.dark};
    padding: ${({ theme}) => theme.spacing.xs};
    display: flex;
    justify-content: space-between;
`

export const ParentCategory = styled(Category)`
    background-color: ${({ theme }) => theme.colors.grey.normal};
`


export const CategoryItem = styled.div`
    background-color: ${({ theme }) => theme.colors.grey.light};
`
// jeżeli negative to albo zieone albo czerwone
export const CategoryAmount = styled.span`
    font-weight: 700;
    color: ${({ theme, negative }) => negative ? theme.colors.red.normal : theme.colors.green.normal}
`