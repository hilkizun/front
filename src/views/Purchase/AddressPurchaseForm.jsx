import { useFormik } from 'formik';
import { useContext } from 'react';
import FormControl from '../../components/FormControl/FormControl';
import Input from '../../components/Input/Input';
import { updateProductPurchase } from '../../services/ProductPurchaseService';
import AuthContext from '../../contexts/AuthContext';

const AddressPurchaseForm = ({ productPurchase, user, onSubmit }) => {
  const { currentUser } = useContext(AuthContext);
  const initialValues = {
    location: currentUser.location || {},
    phone: currentUser.phone || ''
  };

  const {
    values, errors, touched, handleChange, handleBlur,
    isSubmitting, handleSubmit, setSubmitting, setFieldError
  } = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    validationSchema: purchaseSchema,
    onSubmit: (values) => {
      updateProductPurchase(productPurchase._id, values)
        .then(response => {
          onSubmit(response.data);
        })
        .catch(err => {
          console.error(err);
          setSubmitting(false);
        });
    }
  });

  return (
    <div>
      <h1>Completa la dirección de envío</h1>

      <form onSubmit={handleSubmit}>
        <FormControl label="Dirección">
          <Input
            name="location.address"
            value={values.location.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location?.address && errors.location?.address}
          />
        </FormControl>

        <FormControl label="Ciudad">
          <Input
            name="location.city"
            value={values.location.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location?.city && errors.location?.city}
          />
        </FormControl>

        <FormControl label="Código postal">
          <Input
            name="location.postalCode"
            type="number"
            value={values.location.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location?.postalCode && errors.location?.postalCode}
          />
        </FormControl>

        <FormControl label="Teléfono">
          <Input
            name="phone"
            type="number"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone && errors.phone}
          />
        </FormControl>

        <button className="btn btn-secondary" type="submit" disabled={isSubmitting}>
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
