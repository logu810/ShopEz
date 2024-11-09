import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Authentication from './pages/Authentication';

import Cart from './pages/customer/Cart';
import Profile from './pages/customer/Profile';
import CategoryProducts from './pages/customer/CategoryProducts';
import IndividualProduct from './pages/customer/IndividualProduct';
import Wishlist from './pages/customer/Wishlist';

import Admin from './pages/admin/Admin';
import AllProducts from './pages/admin/AllProducts';
import AllUsers from './pages/admin/AllUsers';
import AllOrders from './pages/admin/AllOrders';
import NewProduct from './pages/admin/NewProduct';
import UpdateProduct from './pages/admin/UpdateProduct';
import AddVendor from './pages/admin/AddVendor';
import VendorList from './pages/admin/VendorList';
import UpdateVendor from './pages/admin/UpdateVendor';


function App() {
  return (
    <div className="App">
      
      <Navbar />
      
      <Routes>

        <Route path='/auth' element={<Authentication />} />

        <Route exact path='' element={<Home />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<IndividualProduct />} />
        <Route path='/category/:category' element={<CategoryProducts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/wishlist' element={<Wishlist category = 'all' />} />


        <Route path='/admin' element={<Admin />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/all-orders' element={<AllOrders />} />
        <Route path='/new-product' element={<NewProduct />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
        <Route path='/vendor-list' element={<VendorList />} />
        <Route path='/add-vendor' element={<AddVendor />} />
        <Route path='/update-vendor/:id' element={<UpdateVendor />} />


      </Routes>

    </div>
  );
}

export default App;
