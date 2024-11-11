import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/NewProducts.css'

const AddVendor = () => {
    const [vendorName, setVendorName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:6001/add-vendor', {
                vendorName,
                contactInfo: { email, phone },
                rating
            });
            alert('Vendor added successfully');
            setVendorName('');
            setEmail('');
            setPhone('');
            setRating(0);
        } catch (error) {
            console.error('Error adding vendor', error);
        }
    };

    return (
        <div className="new-product-page">
        <div className="new-product-container">
            <h3>Add Vendor</h3>
            <div className="new-product-body">
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingVendorName"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        placeholder="Vendor Name"
                        required
                    />
                    <label htmlFor="floatingVendorName">Vendor Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingVendorEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <label htmlFor="floatingVendorEmail">Email</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="tel"
                        className="form-control"
                        id="floatingVendorPhone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                        required
                    />
                    <label htmlFor="floatingVendorPhone">Phone</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="floatingVendorRating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating (0-5)"
                        min="0"
                        max="5"
                        required
                    />
                    <label htmlFor="floatingVendorRating">Rating (0-5)</label>
                </div>
            </div>
            <button className="btn btn-primary" style={{ backgroundColor: "#f8991c" }}  onClick={handleSubmit}>
                Add Vendor
            </button>
        </div>
    </div>
    );
};

export default AddVendor;
