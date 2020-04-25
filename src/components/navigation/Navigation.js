import React from 'react';
import {Container, NavigationWrapper, List} from './Navigation.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

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
                            <Link to={item.to}>{t(item.content)}</Link>
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