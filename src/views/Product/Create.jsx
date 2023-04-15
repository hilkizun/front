import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import Input from '../../components/Input/Input';
import { useFormik } from 'formik';
import FormControl from '../../components/FormControl/FormControl';
import { createProduct, createAuction } from '../../services/ProductService';
import AuthContext from '../../contexts/AuthContext';

const Create = () => {
  const [values, setvalues] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    initialPrice: 0,
  });

  const [productType, setProductType] = useState('');

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleTypeChange = (event) => {
    setProductType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, type, value, files } = event.target;
    const finalValue = type === 'file'
      ? files
      : value
    setvalues({
      ...values,
      [name]: finalValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key === "image" && values.image) {
        [...values["image"]].forEach((img, i) => {
          formData.append(`img-${i}`, img);
        });
      } else {
        formData.append(key, values[key]);
      }
      
    });

    if (productType === 'product') {
      await createProduct(formData);
    } else if (productType === 'auction') {
      await createAuction(formData);
    }
    navigate('/products');
  };

  return (
    <div>
      <h1>Create {productType === 'auction' ? 'Auction' : 'Product'}</h1>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <FormControl
          text="Type"
          htmlFor="type"
        >
          <select
            id="type"
            name="type"
            value={productType}
            onChange={handleTypeChange}
          >
            <option value="">Select a type</option>
            <option value="product">Product</option>
            <option value="auction">Auction</option>
          </select>
        </FormControl>

        {productType === 'product' && (
          <>
            <FormControl
              text="Name"
              htmlFor="name"
            >
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                placeholder="Enter the name of the product"
              />
            </FormControl>

            <FormControl
              text="Description"
              htmlFor="description"
            >
              <Input
                id="description"
                name="description"
                value={values.description}
                onChange={handleInputChange}
                placeholder="Enter a description"
              />
            </FormControl>

            <FormControl
              text="Price"
              htmlFor="price"
            >
              <Input
                id="price"
                name="price"
                value={values.price}
                onChange={handleInputChange}
                type="number"
                placeholder="Enter the price"
              />
            </FormControl>

            <FormControl
                text="Imágenes"
                htmlFor="image"
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  multiple
                  onChange={handleInputChange}
                />
              </FormControl>
          </>
        )}

        {productType === 'auction' && (
          <>
            <FormControl
              text="Name"
              htmlFor="name"
            >
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
                placeholder="Enter the name of the auction"
              />
            </FormControl>

            <FormControl
              text="Description"
              htmlFor="description"
            >
              <Input
                id="description"
                name="description"
                value={values.description}
                onChange={handleInputChange}
                placeholder="Enter a description"
              />
            </FormControl>

            <FormControl
              text="Initial Price"
              htmlFor="initialPrice"
            >
              <Input
                id="initialPrice"
                name="initialPrice"
                value={values.initialPrice}
                onChange={handleInputChange}
                type="number"
                placeholder="Enter the starting price"
              />
            </FormControl>

            <FormControl
                text="Imágenes"
                htmlFor="image"
              >
                <input
                  id="image"
                  name="image"
                  type="file"
                  multiple
                  onChange={handleInputChange}
                />
              </FormControl>
          </>
        )}

        <button type="submit" className="btn btn-secondary">Create</button>
      </form>
    </div>
  );
};

export default Create;

