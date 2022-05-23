import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { Router } from '../routes';

const Header = (props) => {
    return (
        <Menu style={{ marginTop: '15px' }}>
            <Menu.Item onClick={() => Router.pushRoute('/')}>Crowdnest</Menu.Item>

            <Menu.Menu position="right">
                <Menu.Item onClick={() => Router.pushRoute('/')}>Campaigns</Menu.Item>

                <Menu.Item onClick={() => Router.pushRoute('/campaigns/new')}> 
                    <Icon name="add circle" />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;