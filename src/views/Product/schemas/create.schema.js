import * as Yup from 'yup';

export const signupSchema = Yup.object({
  name: Yup
    .string('First name err')
    .required('Required'),
  description: Yup
    .string('Last name err'),
  price: Yup
    .string('Price err')
    .required('Required'),
});