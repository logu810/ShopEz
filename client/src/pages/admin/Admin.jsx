import React, { useEffect, useState } from 'react'
import '../../styles/Admin.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Admin = () => {

  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [vendorsCount, setvendorsCount] = useState(0);

  useEffect(()=>{
    if(sessionStorage.getItem('userType') === 'admin'){
      navigate('/admin')
    }
  }, [sessionStorage])


  useEffect(()=>{
    fetchCountData();
  }, [])

  const fetchCountData = async() =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response)=>{
        setUserCount(response.data.length - 1);
      }
    )
    await axios.get('http://localhost:6001/fetch-products').then(
      (response)=>{
        setProductCount(response.data.length);
      }
    )
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrdersCount(response.data.length);
      }
    )
    await axios.get('http://localhost:6001/view-vendors').then(
      (response)=>{
        setvendorsCount(response.data.length);
      }
    )


  }



 

  const [banner, setBanner] = useState('');
  const updateBanner = async() =>{
    await axios.post('http://localhost:6001/update-banner', {banner}).then(
      (response)=>{
        alert("Banner updated");
        setBanner('');
      }
    )
  }




  return (
    <div className="admin-page">

      <div>
        <div className="admin-home-card">
          <h5>Total users</h5>
          <p>{userCount}</p>
          <button onClick={()=> navigate('/all-users')}>View all</button>
        </div>
      </div>
      
      <div>
        <div className="admin-home-card">
          <h5>All Products</h5>
          <p>{productCount}</p>
          <button onClick={()=> navigate('/all-products')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>All Orders</h5>
          <p>{ordersCount}</p>
          <button onClick={()=> navigate('/all-orders')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>All Vendors</h5>
          <p>{vendorsCount}</p>
          <button onClick={()=> navigate('/vendor-list')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>Add Product</h5>
          <p>(new)</p>
          <button onClick={()=> navigate('/new-product')}>Add now</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>Add Vendor</h5>
          <p>(new)</p>
          <button onClick={()=> navigate('/add-vendor')}>Add now</button>
        </div>
      </div>

      <div>
        <div className="admin-banner-input admin-home-card">
          <h5>Update banner</h5>
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingURLInput" value={banner} onChange={(e)=>setBanner(e.target.value)} />
            <label htmlFor="floatingURLInput" >Banner url</label>
          </div>
          <button onClick={updateBanner}>Update</button>
        </div>
      </div>
      

    </div>
  )
}

export default Admin