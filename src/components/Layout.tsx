import React from 'react'
import NavBar from './NavBar'

type LayoutProps = {
    children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <NavBar />
            <main className="z-10">{children}</main>

        </>
    )
}

export default Layout
