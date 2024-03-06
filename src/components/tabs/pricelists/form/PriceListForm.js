// PriceListForm.js
import React, {useEffect, useState} from 'react';
import './PriceListForm.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripVertical, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const PriceListForm = ({onSubmitPriceList, priceList}) => {
    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [dropIndex, setDropIndex] = useState(null);
    const id = priceList.id;
    const creatorId = priceList.creatorId;

    const fetchPriceList = (priceList) => {
        setName(priceList.name)
        setProducts(priceList.products)
    };

    useEffect(() => {
        fetchPriceList(priceList);
    }, [priceList]);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation here
        if (!name || !products.length) {
            alert('Please enter name and at least one product');
            return;
        }
        // Call onAdd function to add or update price list
        const reorderedProducts = [...products];
        reorderedProducts.forEach((product, index) => product.order = index + 1);
        onSubmitPriceList({name, products, id, creatorId});
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
            updatedProducts.forEach((product, index) => product.order = index + 1);
            setProducts(updatedProducts);
        }
        setDraggingIndex(null);
        setDropIndex(null);
    };
    const handleAddProduct = () => {
        setProducts([...products, { name: '', code: '', price: '0.00', unit: 'KG', order: products.length + 1 }]);
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        updatedProducts.forEach((product, index) => product.order = index + 1)
        setProducts(updatedProducts);
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
                        <th></th> {/* Add an extra column for delete buttons */}
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
                            <td>
                                <button type="button" onClick={() => handleDeleteProduct(index)}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button type="button" onClick={handleAddProduct}>Add Product</button>
            </div>
            <button type="submit" className="btn">Save</button>
        </form>
    );
}

export default PriceListForm;