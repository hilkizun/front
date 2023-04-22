import { useFormik } from 'formik';
import React , { useContext, useEffect, useState } from 'react';
import FormControl from '../../components/FormControl/FormControl';
import Input from '../../components/Input/Input';
import { updateProductPurchase, deleteProductPurchase } from '../../services/ProductPurchaseService';
import AuthContext from '../../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductPurchaseById } from '../../services/ProductPurchaseService';

const AddressPurchaseForm = () => { 
  const { purchaseId } = useParams();
  const [productPurchase, setProductPurchase] = useState(null);
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductPurchase = async () => {
      const purchase = await getProductPurchaseById(purchaseId);
      setProductPurchase(purchase);
      setUser(purchase.buyer);
    };

    fetchProductPurchase();
  }, [purchaseId]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isFormSubmitted) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
  ////////////////////
    const handleUnload = async () => {
      if (!isFormSubmitted) {
        alert('Si sales de la página sin completar el formulario, la compra no se realizará.');
          try {
          await deleteProductPurchase(purchaseId);
        } catch (error) {
        }
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
    };
  }, [isFormSubmitted, purchaseId]);
///////////////////////  

  const initialValues = {
    location: user?.location || {},
    phone: user?.phone || ''
  };

  const {
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur,
    isSubmitting, 
    handleSubmit, 
    setSubmitting, 
    setFieldError
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const updatedValues = {
          ...values,
          productPurchaseId: productPurchase._id,
          buyerId: user._id
        };
  
        await updateProductPurchase(productPurchase._id, updatedValues);
        setIsFormSubmitted(true);
        navigate(`/thank-you/${productPurchase._id}`);
      } catch (err) {
        console.error(err);
        setSubmitting(false);
      }
    }
  });
  

  return (
    <div>
      <h1>Completa la dirección de envío</h1>

      <form onSubmit={handleSubmit}>
        <FormControl 
              text="Dirección"
              htmlFor="location.address">
          <Input
            name="location.address"
            value={values.location.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location?.address && errors.location?.address}
            disabled={!productPurchase || !user}
          />
        </FormControl>

        <FormControl 
              text="Número"
              htmlFor="location.number">
          <Input
            name="location.number"
            type="number"
            value={values.location.number}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location?.number && errors.location?.number}
            disabled={!productPurchase || !user}
          />
        </FormControl>

        <FormControl 
              text="Piso"
              htmlFor="location.floor">
          <Input
            name="location.floor"
            value={values.location.floor}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location?.floor && errors.location?.floor}
            disabled={!productPurchase || !user}
          />
        </FormControl>

        <FormControl 
        text="Ciudad"
        htmlFor="location.city">
          <Input
            name="location.city"
            value={values.location.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location?.city && errors.location?.city}
            disabled={!productPurchase || !user}
          />
        </FormControl>

        <FormControl 
          text="Código postal"
          htmlFor="location.postalCode">
          <Input
            name="location.postalCode"
            type="number"
            value={values.location.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location?.postalCode && errors.location?.postalCode}
            disabled={!productPurchase || !user}
          />
        </FormControl>

        <FormControl
              text="Teléfono"
              htmlFor="phone">
          <Input
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
            disabled={!productPurchase || !user}
          />
        </FormControl>

        <button className="btn btn-secondary" type="submit" disabled={isSubmitting || !productPurchase || !user}>
          {isSubmitting
            ? 'Submitting...'
            : 'Submit'
          }
        </button>
      </form>
    </div>
  )
}

export default AddressPurchaseForm;
