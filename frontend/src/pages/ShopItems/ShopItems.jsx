import React from 'react'
import Header from '../../Components/Header/header'
import Footer from '../../Components/Footer/footer'
import ShopItemLists from '../../Components/ShopItemLists/ShopItemLists'
import { Outlet } from 'react-router-dom'

function ShopItems() {
    return (
    <>
    <Header />
    <Outlet/>
    <Footer />
    </>
    )
}

export default ShopItems