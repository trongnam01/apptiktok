import { useEffect, useState, useRef } from 'react';

import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippys from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import style from './Search.module.scss';
import * as searchServices from '~/services/searchService';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';
import { Iconsearch } from '~/components/Icons';

const cx = classNames.bind(style);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    // delay tìm kiếm
    const deboucedFValue = useDebounce(searchValue, 500);

    const inputRef = useRef();
    useEffect(() => {
        if (!deboucedFValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(deboucedFValue);
            setSearchResult(result);
            setLoading(false);
        };

        // const fetchApi = async () => {
        //     try {
        //         const res = await request.get('users/search', {
        //             params: {
        //                 q: searchValue,
        //                 type: 'less',
        //             },
        //         });
        //         setSearchResult(res.data);
        //         setLoading(false);
        //     } catch (error) {
        //         setLoading(false);
        //     }
        // };
        fetchApi();

        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(deboucedFValue)}&type=less`)
        //     .then((res) => res.json())
        //     .then((datas) => {
        //         setSearchResult(datas.data);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deboucedFValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    const handeleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        // warning tippy
        <div>
            <HeadlessTippys
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}> Tài khoản</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult} // khi click ra ngoài tippy
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm tài khoản và video"
                        spellCheck={false}
                        onChange={handeleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <Iconsearch />
                    </button>
                </div>
            </HeadlessTippys>
        </div>
    );
}

export default Search;
