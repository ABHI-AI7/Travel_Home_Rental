import React from 'react'
import  Navbar  from "../components/Navbar"
import Slide from "../components/Slide"
import Categories from '../components/Categories'
import Listings from "../components/Listings"

const HomePage = () => {
  return (
    <div>
     <Navbar/>
     <Slide/>
     <Categories/>
    </div>
  )
}

export default HomePage
