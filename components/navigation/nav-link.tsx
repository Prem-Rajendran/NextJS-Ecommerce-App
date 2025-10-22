'use client'

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './nav-link.module.css'

interface NavLinkProps {
    href:string
    children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({href, children}) => {
    const path = usePathname();

    return (
        <Link href={href} className={path.startsWith(href) ? `${styles.link} ${styles.active}` : `${styles.link}`}>
            {children}
        </Link>
    )
}

export default NavLink;