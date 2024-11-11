import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import HomeBanner from '../images/home-banner-2.png'
import Products from '../components/Products'
import Footer from '../components/Footer'
import FlashSale from '../components/FlashSale'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const navigate = useNavigate();

  const [bannerImg, setBannerImg] = useState();

  useEffect(()=>{
    fetchBanner();
  }, [])

  const fetchBanner = async() =>{
    await axios.get('http://localhost:6001/fetch-banner').then(
      (response)=>{
        setBannerImg(response.data);
      }
    )
  }

  return (
    <div className="HomePage">
      <div className="home-banner">
        {bannerImg ?
          <img src={bannerImg} alt="" />
        :
        ""}
      </div>

      <div className="home-categories-container">

        <div className="home-category-card" onClick={()=>navigate('/category/Fashion')}>
          <img src="https://img.freepik.com/premium-photo/stylish-fashion-model-trendy-suit-male-dress-with-sandy-beige-lifestyle-mens-portrait-fashion-male-background-lifestyle-portrait_171965-42448.jpg" alt="" />
          <h5>Fashion</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Electronics')}>
          <img src="https://www.zdnet.com/a/img/resize/2b558241b3a7af8c476b3f6f5bfd26a012494ed1/2023/09/10/f87eda0e-6717-4b19-8829-170e2c098428/airpods-pro-2.jpg?auto=webp&fit=crop&height=900&width=1200" alt="" />
          <h5>Electronics</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/mobiles')}>
          <img src="https://suprememobiles.in/cdn/shop/files/mobiles.jpg?crop=center&height=2048&v=1664280076&width=2048" alt="" />
          <h5>Mobiles</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Groceries')}>
        <img src="https://food-ubc.b-cdn.net/wp-content/uploads/2020/02/Save-Money-On-Groceries_UBC-Food-Services.jpg" alt="" />
          <h5>Groceries</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Sports-Equipment')}>
          <img src="https://img.freepik.com/premium-photo/soccer-ball-banner-template-football-tournament-competition-background-generative-ai_90099-7723.jpg" alt="" />
          <h5>Sports Equipments</h5>
        </div>

      </div>


      <div id='products-body'></div>
      <Products category = 'all'  />


      <Footer />
    </div>
  )
}

export default Home