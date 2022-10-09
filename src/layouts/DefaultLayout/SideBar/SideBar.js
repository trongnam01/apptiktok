import styles from './SideBar.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);

function SiderBar() {
    return <aside className={cx('wapper')}></aside>;
}

export default SiderBar;
