import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/VendorList.css'

const VendorList = () => {
    const [vendors, setVendors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchVendors();
    }, []);

    const fetchVendors = async () => {
        try {
            const response = await axios.get('http://localhost:6001/view-vendors');
            setVendors(response.data);
        } catch (error) {
            console.error('Error fetching vendors', error);
        }
    };

    const deleteVendor = async (vendorId) => {
        try {
            await axios.delete(`http://localhost:6001/delete-vendor/${vendorId}`);
            fetchVendors();
        } catch (error) {
            console.error('Error deleting vendor', error);
        }
    };

    return (
        <div className="vendor-management-page" style={{ marginTop: '17vh' }}>
            <h2>Vendor Management</h2>
            <div className="vendor-list">
                {vendors.map((vendor) => (
                    <div key={vendor._id} className="vendor-card">
                        <h3>{vendor.vendorName}</h3>
                        <p><b>Contact Email: </b>{vendor.contactInfo.email}</p>
                        <p><b>Contact Phone: </b>{vendor.contactInfo.phone}</p>
                        <p><b>Rating: </b>{vendor.rating}</p>

                        <div className="vendor-actions">
                        <button onClick={()=> navigate(`/update-vendor/${vendor._id}`)}>Update</button>
                            <button className="btn btn-danger" onClick={() => deleteVendor(vendor._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorList;
