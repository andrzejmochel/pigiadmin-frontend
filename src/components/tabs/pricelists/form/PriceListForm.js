// PriceListForm.js
import React, {useEffect, useState} from 'react';
import './PriceListForm.css';
import priceListsApiService from "../../../../api/pricelist/pricelists.api.service";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripVertical} from "@fortawesome/free-solid-svg-icons";

const PriceListForm = ({onSubmitPriceList, priceListId}) => {
    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [dropIndex, setDropIndex] = useState(null);

    const fetchPriceList = async (id) => {
        try {
            const response = await priceListsApiService.getPriceList(id);

            setName(response.name);
            setProducts(response.products)
        } catch (error) {
            console.error('Error fetching price lists:', error);
        }
    };

    useEffect(() => {
        console.log(priceListId)
        fetchPriceList(priceListId);
    }, [priceListId]);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation here
        if (!name || !products.length) {
            alert('Please enter name and at least one product');
            return;
        }
        // Call onAdd function to add or update price list
        onSubmitPriceList({name, products});
        // Reset form fields
        setName('');
        setProducts([]);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleProductChange = (index, key, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][key] = value;
        setProducts(updatedProducts);
    };

    const handleDragStart = (e, index) => {
        setDraggingIndex(index);
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDropIndex(index);
    };

    const handleDragEnd = () => {
        setDropIndex(null);
        setDraggingIndex(null);
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
        if (sourceIndex !== targetIndex) {
            const updatedProducts = [...products];
            const movedProduct = updatedProducts.splice(sourceIndex, 1)[0];
            updatedProducts.splice(targetIndex, 0, movedProduct);
            setProducts(updatedProducts);
        }
        setDraggingIndex(null);
        setDropIndex(null);
    };

    return (
        <form onSubmit={handleSubmit}  className="price-list-form">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} />
            </div>
            <div className="form-group">
                <label>Products:</label>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Price</th>
                        <th>Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={index}
                            className={index === draggingIndex ? 'dragging' : index === dropIndex ? 'drop-target' : ''}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}>
                            <td className="drag-handle"
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}>
                                <FontAwesomeIcon icon={faGripVertical}/>
                            </td>
                            <td><input type="text" value={product.name}
                                       onChange={(e) => handleProductChange(index, 'name', e.target.value)}/></td>
                            <td><input type="text" value={product.code}
                                       onChange={(e) => handleProductChange(index, 'code', e.target.value)}
                                       maxLength="6" className="small-input"/></td>
                            <td><input type="number" value={product.price}
                                       onChange={(e) => handleProductChange(index, 'price', e.target.value)} step="0.01"
                                       className="small-input"/></td>
                            <td>
                                <select value={product.unit}
                                        onChange={(e) => handleProductChange(index, 'unit', e.target.value)}>
                                    <option value="KG">KG</option>
                                    <option value="PCS">PCS</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/*<button type="button" onClick={handleAddProduct}>Add Product</button>*/}
            </div>
            <button type="submit" className="btn">Save</button>
        </form>
    );
}

export default PriceListForm;