import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faUser,
    faGear,
    faCoins,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons';

// hover vào hiện title
import Tippy from '@tippyjs/react';
// hover hiện nội dung
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import config from '~/config';

import style from './Header.module.scss';
import images from '~/assets/images';
import { IconsMesseger, UploadIcons } from '~/components/Icons';
import Search from '../Search';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@hoa',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEM,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
    },
];

function Header() {
    const currentUser = true;

    const handleMenuChange = (MenuItem) => {
        switch (MenuItem.type) {
            case 'language':
                break;
            default:
        }
    };
    return (
        <header className={cx('wapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="logo" />
                </Link>

                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy delay={[0, 50]} content="Upload Video" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <UploadIcons className={cx('icons-upload')} />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <IconsMesseger />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Login</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/301567267_634843714870337_3613473942201013157_n.png?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=gZkXfDtPAqQAX_F5Dj5&_nc_ht=scontent.fhan2-4.fna&oh=00_AT_4-GxPiQhtDIeBhlZugXFXYNuJvbe96OB4gVXboQ6QzQ&oe=630E6012"
                                alt="Nguyễn Văn A"
                                // link img
                                // fallback="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/300370594_10159963490886352_2292500501761394417_n.png?_nc_cat=109&ccb=1-7&_nc_sid=730e14&_nc_ohc=rr0sRYcZNbkAX_wNXgT&_nc_ht=scontent.fhan2-3.fna&oh=00_AT-2am3oqlWs6zCQ7wRRToJIX9zljor8dV25McCqQ_EMgQ&oe=630EB333"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
