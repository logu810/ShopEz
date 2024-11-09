import React, { useEffect, useState } from 'react'
import '../../styles/Products.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wishlist = (props) => {

const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);

    useEffect(()=>{
        fetchData();
      }, [])
    
      const fetchData = async() =>{
        const userId = sessionStorage.getItem('userId');
        await axios.get('http://localhost:6001/fetch-wishlist').then(
          (response)=>{
            if(props.category === 'all'){
                setProducts(response.data.filter(item=> item.userId === userId));
                setVisibleProducts(response.data.filter(item=> item.userId === userId));
            }else{
                setProducts(response.data.filter(product=> product.category === props.category, item=> item.userId === userId));
                setVisibleProducts(response.data.filter(product=> product.category === props.category, item=> item.userId === userId));
            }
          }
        )
        await axios.get('http://localhost:6001/fetch-categories').then(
          (response)=>{
            setCategories(response.data);
          }
        )
      }

      const removeItemWishlist = async (itemId) => {
        try {
            await axios.delete(`http://localhost:6001/remove-wishlist-item/${itemId}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting item', error);
        }
    };


      const [sortFilter, setSortFilter] = useState('popularity');
      const [categoryFilter, setCategoryFilter] = useState([]);
      const [genderFilter, setGenderFilter] = useState([]);


      const handleCategoryCheckBox = (e) =>{
        const value = e.target.value;
        if(e.target.checked){
            setCategoryFilter([...categoryFilter, value]);
        }else{
            setCategoryFilter(categoryFilter.filter(size=> size !== value));
        }
      }


      const handleGenderCheckBox = (e) =>{
        const value = e.target.value;
        if(e.target.checked){
            setGenderFilter([...genderFilter, value]);
        }else{
            setGenderFilter(genderFilter.filter(size=> size !== value));
        }
      }

      const handleSortFilterChange = (e) =>{
        const value = e.target.value;
        setSortFilter(value);
        if(value === 'low-price'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  a.price - b.price))
        } else if (value === 'high-price'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  b.price - a.price))
        }else if (value === 'discount'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  b.discount - a.discount))
        }
      }


      useEffect(()=>{

            if (categoryFilter.length > 0 && genderFilter.length > 0){
                setVisibleProducts(products.filter(product=> categoryFilter.includes(product.category) && genderFilter.includes(product.gender) ));
            }else if(categoryFilter.length === 0 && genderFilter.length > 0){
                setVisibleProducts(products.filter(product=> genderFilter.includes(product.gender) ));
            } else if(categoryFilter.length > 0 && genderFilter.length === 0){
                setVisibleProducts(products.filter(product=> categoryFilter.includes(product.category)));
            }else{
                setVisibleProducts(products);
            }


      }, [categoryFilter, genderFilter])





  return (
    <div className="products-container" style={{ marginTop: '17vh' }}>
        <div className="products-filter">
            <h4>Filters</h4>
            <div className="product-filters-body">

                <div className="filter-sort">
                    <h6>Sort By</h6>
                    <div className="filter-sort-body sub-filter-body">

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio1" value="popularity" checked={sortFilter === 'popularity'} onChange={handleSortFilterChange} />
                            <label class="form-check-label" for="filter-sort-radio1" >
                                Popular
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio2" value="low-price" checked={sortFilter === 'low-price'} onChange={handleSortFilterChange} />
                            <label class="form-check-label" for="filter-sort-radio2">
                                Price (low to high)
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio3" value="high-price" checked={sortFilter === 'high-price'} onChange={handleSortFilterChange} />
                            <label class="form-check-label" for="filter-sort-radio3">
                                Price (high to low)
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" value="discount" checked={sortFilter === 'discount'} onChange={handleSortFilterChange} />
                            <label class="form-check-label" for="filter-sort-radio4">
                                Discount
                            </label>
                        </div>

                    </div>
                </div>

                {props.category === 'all' ?
                     <div className="filter-categories">
                        <h6>Categories</h6>
                        <div className="filter-categories-body sub-filter-body">
    
                            {categories.map((category)=>{
                                return(
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value={category} id={'productCategory'+ category} checked={categoryFilter.includes(category)} onChange={handleCategoryCheckBox} />
                                        <label class="form-check-label" for={'productCategory'+ category}>
                                            {category}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                 :

                 ""
                }

                
                <div className="filter-gender">
                    <h6>Gender</h6>
                    <div className="filter-gender-body sub-filter-body">
                        
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Men" id="filter-gender-check-1" checked={genderFilter.includes('Men')} onChange={handleGenderCheckBox} />
                            <label class="form-check-label" for="filter-gender-check-1">
                                Men
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Women" id="filter-gender-check-2" checked={genderFilter.includes('Women')} onChange={handleGenderCheckBox} />
                            <label class="form-check-label" for="filter-gender-check-2">
                                Women
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="Unisex" id="filter-gender-check-3" checked={genderFilter.includes('Unisex')} onChange={handleGenderCheckBox} />
                            <label class="form-check-label" for="filter-gender-check-3">
                                Unisex
                            </label>
                        </div>

                    </div>
                </div>

            </div>
        </div>


        <div className="products-body">
            <h3>Wishlist</h3>
            <div className="products">

            {visibleProducts && visibleProducts.length > 0 ? (
  visibleProducts.map((item) => {
    let product = item.productId;
    console.log(product);
    return (
      <div key={item._id}> {/* Add a key for each list item */}
        <div className="product-item">
          <div
            className="product"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            <img src={product.mainImg} alt={product.title} />
            <div className="product-data">
              <h6>{product.title}</h6>
              <p>{product.description.slice(0, 30) + '....'}</p>
              <h5>
                &#8377; {parseInt(product.price - (product.price * product.discount) / 100)}
                <s>{product.price}</s>
                <p>({product.discount}% off)</p>
              </h5>
            </div>
          </div>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => removeItemWishlist(item._id)}
        >
          Delete
        </button>
      </div>
    );
  })
) : (
  <h2>No items found</h2> // Render this if no products are found
)}


 
            </div>
        </div>
    </div>
  )
}

export default Wishlist