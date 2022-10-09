import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

import propTypes from 'prop-types';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary,
    outline,
    disabled,
    text,
    small,
    large,
    rounded,
    className,
    LeftIcon,
    RightIcon,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // loại bỏ khi có disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    // check thẻ
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    // class
    const classes = cx('wrapper', {
        primary, // nút login
        outline, // follow || sidebar
        small, // follow
        disabled, // nó disabled
        large, // sidebar
        text, // upload
        rounded, //
        [className]: className,
    });
    return (
        <Comp className={classes} {...props}>
            {LeftIcon && <span className={cx('icon')}>{LeftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {RightIcon && <span className={cx('icon')}>{RightIcon}</span>}
        </Comp>
    );
}
Button.propTypes = {
    to: propTypes.string,
    href: propTypes.string,
    primary: propTypes.bool,
    outline: propTypes.bool,
    disabled: propTypes.bool,
    text: propTypes.bool,
    small: propTypes.bool,
    large: propTypes.bool,
    rounded: propTypes.bool,
    className: propTypes.string,
    LeftIcon: propTypes.node,
    RightIcon: propTypes.node,
    children: propTypes.node.isRequired,
    onClick: propTypes.func,
};

export default Button;
