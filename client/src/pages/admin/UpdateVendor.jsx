import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/NewProducts.css'; // You can reuse or modify this CSS for vendors

const UpdateVendor = () => {
  const { id } = useParams();  // Vendor ID from the URL

  // State hooks to manage vendor form data
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorRating, setVendorRating] = useState(0);
  
  // To handle navigation after updating
  const navigate = useNavigate();

  // Fetch vendor data for the provided ID
  useEffect(() => {
    fetchVendor();
  }, []);

  const fetchVendor = async () => {
    await axios.get(`http://localhost:6001/fetch-vendor-details/${id}`)
      .then((response) => {
        const vendor = response.data;
        setVendorName(vendor.vendorName);
        setVendorEmail(vendor.contactInfo.email);
        setVendorPhone(vendor.contactInfo.phone);
        setVendorRating(vendor.rating);
      })
      .catch((error) => {
        console.error('Error fetching vendor details', error);
      });
  };

  // Handle form submission for updating the vendor
  const handleUpdateVendor = async () => {
    const updatedVendor = {
      vendorName,
      contactInfo: {
        email: vendorEmail,
        phone: vendorPhone,
      },
      rating: vendorRating,
    };

    await axios.put(`http://localhost:6001/update-vendor/${id}`, updatedVendor)
      .then((response) => {
        alert("Vendor updated successfully");
        navigate('/vendor-list');  // Redirect to all vendors page after successful update
      })
      .catch((error) => {
        console.error('Error updating vendor', error);
      });
  };

  return (
    <div className="new-product-page" style={{ marginTop: '17vh' }}>
      <div className="new-product-container">
        <h3>Update Vendor</h3>

        <div className="new-product-body">
          <span>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingVendorName"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
              />
              <label htmlFor="floatingVendorName">Vendor Name</label>
            </div>

        
          </span>

          <span>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingVendorEmail"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
              />
              <label htmlFor="floatingVendorEmail">Vendor Email</label>
            </div>

            
          </span>

          <span>
          <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingVendorPhone"
                value={vendorPhone}
                onChange={(e) => setVendorPhone(e.target.value)}
              />
              <label htmlFor="floatingVendorPhone">Vendor Phone</label>
            </div>
          </span>

          <span>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingVendorRating"
                value={vendorRating}
                onChange={(e) => setVendorRating(e.target.value)}
              />
              <label htmlFor="floatingVendorRating">Vendor Rating (1-5)</label>
            </div>

          </span>

          <button className="btn btn-primary" style={{ backgroundColor: "#f8991c" }}  onClick={handleUpdateVendor}>
            Update Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateVendor;
