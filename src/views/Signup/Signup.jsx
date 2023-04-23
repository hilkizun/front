import { useFormik } from 'formik';
import FormControl from '../../components/FormControl/FormControl';
import Input from '../../components/Input/Input';
import { signup as signupService } from '../../services/AuthService';
import { signupSchema } from './schemas/signup.schema';
import { useNavigate } from "react-router-dom";

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const Signup = () => {
  const navigate = useNavigate()
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
    validationSchema: signupSchema,
    onSubmit: (values) => {
      signupService(values)
        .then((response) => {
          navigate('/login')
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            setFieldError('email', err?.response?.data?.message)
          } else {
            setFieldError('email', err.message)
          }
          setSubmitting(false)
        });
    }
  });

  return (
    <div>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <FormControl
          text="First name"
          error={touched.firstName && errors.firstName}
          htmlFor="firstName"
        >
          <Input
            id="firstName"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            error={touched.firstName && errors.firstName}
            placeholder="Enter your first name..."
          />
        </FormControl>

        <FormControl
          text="Last name"
          error={touched.lastName && errors.lastName}
          htmlFor="lastName"
        >
          <Input
            id="lastName"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            error={touched.lastName && errors.lastName}
            placeholder="Enter your last name..."
          />
        </FormControl>

        <FormControl text="Email" error={touched.email && errors.email} htmlFor="email">
          <Input
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
            placeholder="Enter your email..."
          />
        </FormControl>

        <FormControl
          text="Password"
          error={touched.password && errors.password}
          htmlFor="password"
        >
          <Input
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={touched.password && errors.password}
            placeholder="Enter your password..."
            type="password"
          />
        </FormControl>

        <button className="btn btn-secondary" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Enviando...'
            : 'Registrarse'
          }
        </button>
      </form>
    </div>
  )
}

export default Signup;
