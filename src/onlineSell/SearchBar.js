import React, { useState } from 'react';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');

    const handleTextSearch = () => {
        console.log('Text Search:', searchTerm);
        // Implement the search logic for the text input here
    };

    const handlePriceSearch = () => {
        console.log('Price Search from', priceFrom, 'to', priceTo);
        // Implement the search logic for price range here
    };

    return (
        <div className='row' style={{ display: 'flex', gap: '10px', margin: '20px' }}>
            {/* Text Search Input */}
            <div className='col-3' style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: "200px" }}>
                <div>
                    <label style={{ fontWeight: "15px" }} >Tìm Theo Tên</label>
                    <input
                        id='nameSearch'
                        type="text"
                        placeholder="product name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '10px', border: "none", outline: 'none', backgroundColor: "rgb(222, 222, 222)", borderRadius: "10px" }}
                    />
                </div>
                <button onClick={handleTextSearch} className='btn btn-primary'>
                    Search
                </button>
            </div>

            {/* Price Range Search */}
            <div className='col-6' style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: "150px" }}>
                <label style={{ fontWeight: "15px" }} >Tìm Theo Giá</label>
                <input
                    type="number"
                    placeholder="Price from"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                    style={{ padding: '10px', border: "none", outline: 'none', backgroundColor: "rgb(222, 222, 222)", borderRadius: "10px" }}
                />
                <span>to</span>
                <input
                    type="number"
                    placeholder="Price to"
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                    style={{ padding: '10px', border: "none", outline: 'none', backgroundColor: "rgb(222, 222, 222)", borderRadius: "10px" }}
                />
                <button className='btn btn-primary' onClick={handlePriceSearch}>
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
