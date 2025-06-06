'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';
import Image from "next/image";
import useContactStore from '@/app/store/contactStore';

/**
 * добавить asyng/await для получение menuLinks по api
 */

const menuLinks = [
    {
        title: "О компании",
        link: "/about",
    },
    {
        title: "Условия доставки",
        link: "/delivery",
    },
    {
        title: "Способы оплаты",
        link: "/payment",
    },
    {
        title: "Гарантия на товар",
        link: "/guarantee",
    },
    {
        title: "Контакты",
        link: "/contacts",
    },
    {
        title: "Публичная оферта",
        link: "/offer",
    },
]

const PageMenu = ({ opened, setOpened, isHome }) => {
    const pathname = usePathname();
    const { contacts } = useContactStore();

    return (
        <div className={`${styles.nav_wrapper} ${opened ? styles.popup_active : ''}`}>
            <Image
                className={styles.popup_logo}
                src="/logo.svg"
                alt="logo"
                width={120}
                height={46}
                priority
            />

            <Image
                className={styles.popup_close}
                src="/сlose.svg"
                alt="сlose"
                width={20}
                height={20}
                priority
                onClick={() => setOpened(false)}
            />
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {menuLinks.map(item => {
                        const isActive = pathname === item.link;
                        return (
                            <li key={item.link}>
                                <Link
                                    className={`
                                        ${styles.link} ${isActive ? styles.active : ''}
                                        ${isHome ? styles.link_homeColor : styles.link_otherColor}
                                        `}
                                    href={item.link}
                                    onClick={() => setOpened(false)}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className={styles.nav_contacts}>
                <div className={styles.phone_wrapper}>
                    <svg className={`${isHome ? styles.phone_icon : styles.phone_icon_black}`} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_171_4331)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.6343 18.0922C19.5015 18.2245 19.3413 18.3938 19.1715 18.5729C18.7478 19.0226 18.2184 19.5817 17.8866 19.8084C16.1409 21.0013 13.8054 20.4305 12.1534 19.7422C9.97418 18.8342 7.60156 17.1605 5.47121 15.0299C3.33887 12.8991 1.66535 10.5258 0.757342 8.34774C0.0698416 6.6954 -0.502151 4.35946 0.690935 2.61337C0.917498 2.28134 1.47785 1.75278 1.92699 1.32821C2.10668 1.15892 2.27465 0.998955 2.40746 0.866572C2.64325 0.631953 2.96235 0.500244 3.29498 0.500244C3.62761 0.500244 3.94671 0.631953 4.1825 0.866572L7.39453 4.07767C7.62902 4.31345 7.76065 4.63246 7.76065 4.96499C7.76065 5.29752 7.62902 5.61653 7.39453 5.85231L6.51953 6.72556C6.22731 7.01564 6.03657 7.39232 5.97569 7.79955C5.91482 8.20678 5.98706 8.62278 6.18168 8.98563C7.38518 11.2571 9.24318 13.1148 11.5149 14.3179C11.8777 14.5125 12.2936 14.5846 12.7007 14.5237C13.1078 14.4627 13.4843 14.2718 13.7742 13.9795L14.647 13.1063C14.8828 12.8716 15.2019 12.7399 15.5345 12.7399C15.8672 12.7399 16.1863 12.8716 16.4221 13.1063L19.6343 16.3179C19.8688 16.5536 20.0004 16.8726 20.0004 17.205C20.0004 17.5375 19.8688 17.8565 19.6343 18.0922Z" />
                        </g>
                        <defs>
                            <clipPath id="clip0_171_4331">
                                <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                    {contacts[0]?.phones.map((item, idx) =>
                        idx === 0 && (
                            <a key={idx} className={`${isHome ? styles.link_homeColor : styles.link_otherColor}`} href={`tel:${item.tel_for_robot}`}>{item.tel}</a>
                        )
                    )}
                </div>
                <div className={styles.icons_wrapper}>
                    <a href="#" className={`${styles.icon} ${isHome ? styles.icon_homeColor : styles.icon_otherColor}`}>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.50126 0.492432H6.49825C3.18583 0.492432 0.492188 3.18683 0.492188 6.5C0.492188 7.81416 0.915721 9.03219 1.63588 10.0212L0.887185 12.253L3.19634 11.5148C4.14629 12.1441 5.27947 12.5076 6.50126 12.5076C9.81368 12.5076 12.5073 9.81242 12.5073 6.5C12.5073 3.18758 9.81368 0.492432 6.50126 0.492432ZM9.99691 8.97587C9.85198 9.38513 9.27675 9.72456 8.81793 9.82369C8.50403 9.89052 8.09401 9.94384 6.71378 9.37162C4.9483 8.6402 3.81137 6.84619 3.72276 6.72979C3.6379 6.61339 3.00936 5.77984 3.00936 4.91776C3.00936 4.05567 3.44716 3.63589 3.62363 3.45566C3.76857 3.30773 4.00812 3.24014 4.23791 3.24014C4.31225 3.24014 4.37908 3.2439 4.43916 3.2469C4.61563 3.25441 4.70424 3.26492 4.82064 3.54353C4.96557 3.89272 5.31852 4.7548 5.36057 4.84341C5.40337 4.93202 5.44618 5.05218 5.3861 5.16857C5.32978 5.28872 5.28022 5.34204 5.19161 5.44417C5.103 5.5463 5.01889 5.6244 4.93028 5.73404C4.84918 5.82941 4.75756 5.93153 4.85969 6.10801C4.96182 6.28072 5.31476 6.8567 5.83442 7.31928C6.50501 7.91628 7.0487 8.10702 7.24319 8.18813C7.38812 8.2482 7.56084 8.23393 7.66673 8.12129C7.80115 7.97636 7.9671 7.73606 8.13607 7.49951C8.25622 7.3298 8.40791 7.30877 8.56711 7.36884C8.72931 7.42517 9.58765 7.84945 9.76412 7.93731C9.94059 8.02592 10.057 8.06798 10.0998 8.14232C10.1418 8.21666 10.1418 8.56585 9.99691 8.97587Z" />
                        </svg>
                    </a>
                    <a href="#" className={`${styles.icon} ${isHome ? styles.icon_homeColor : styles.icon_otherColor}`}>
                        <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.19347 7.2383L4.9926 10.2895C5.27999 10.2895 5.40446 10.1562 5.55372 9.99612L6.9011 8.60546L9.69301 10.8136C10.205 11.1218 10.5658 10.9595 10.7039 10.3048L12.5365 1.03091L12.537 1.03036C12.6995 0.212908 12.2633 -0.106751 11.7644 0.0937872L0.992445 4.5477C0.257279 4.85589 0.26841 5.29849 0.867472 5.49903L3.62144 6.42413L10.0183 2.10136C10.3194 1.88606 10.5931 2.00518 10.368 2.22048L5.19347 7.2383Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default PageMenu