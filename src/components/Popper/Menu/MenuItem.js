import PropTypes from 'prop-types';
import Button from '~/components/Button';

import classNames from 'classnames/bind';
import style from './Menu.module.scss';

const cx = classNames.bind(style);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });
    return (
        <Button LeftIcon={data.icon} to={data.to} className={classes} onClick={onClick}>
            {data.title}
        </Button>
    );
}
MenuItem.prototypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
