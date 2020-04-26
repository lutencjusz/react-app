import React from 'react';
import {Container, NavigationWrapper, List} from './Navigation.css';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Button} from 'components';

//({theme}) destrukturyzacja obiektu
//key jest potrzebny do reconciliation, czyli porównianie elementów i zmianę tylko zmienionych
function Navigation({items = [], RightElement}) {
    const {t} = useTranslation();
    return <div>
        <Container>
            <NavigationWrapper>
                <List>
                    {items.map(item =>(
                        <li key={item.to}>
                            <Button variant='Inline' to={item.to}>{t(item.content)}</Button>
                        </li>
                    ))}
                </List>
                {RightElement}
            </NavigationWrapper>
        </Container>
    </div>
}

Navigation.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Navigation;