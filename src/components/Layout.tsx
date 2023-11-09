import React from 'react'
import NavBar from './NavBar'
import { useAppContext } from '@/context/AppContext'

type LayoutProps = {
    children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
    const { editModal } = useAppContext();

    return (
        <>
            <NavBar />
            <main className="z-10">{children}</main>

        </>
    )
}

export default Layout
