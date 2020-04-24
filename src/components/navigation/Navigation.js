import React from 'react';
import {Container, NavigationWrapper, List} from './Navigation.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

//({theme}) destrukturyzacja obiektu
//key jest potrzebny do reconciliation, czyli porównianie elementów i zmianę tylko zmienionych
function Navigation({items = [], RightElement}) {
    return <div>
        <Container>
            <NavigationWrapper>
                <List>
                    {items.map(item =>(
                        <li key={item.to}>
                            <Link to={item.to}>{item.content}</Link>
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