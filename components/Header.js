import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
// Link gives you the ability to 'open link in new tab'. Router does not.
import { Link } from '../routes';

const Header = (props) => {
    return (
        <Menu style={{ marginTop: '15px' }}>
            <Link route='/'>
                <a className='item'>Crowdnest</a>
            </Link>

            <Link route='https://github.com/Project-Crowdnest/crowdnest-website'>
                <a className='item'><Icon name ='github' />Source code</a>
            </Link>

            <Menu.Menu position='right'>
                <Link route='/'>
                    <a className='item'>Campaigns</a>
                </Link>
                <Link route='/campaigns/new'>
                    <a className='item'><Icon name='add circle' /></a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;