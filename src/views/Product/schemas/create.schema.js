import * as Yup from 'yup';

export const signupSchema = Yup.object({
  name: Yup
    .string('First name err')
    .required('Required'),
  description: Yup
    .string('Last name err'),
  email: Yup
    .string('Email err')
    .email('Invalid email')
    .required('Required'),
  password: Yup
    .string('Password err')
    .min(8, 'Length invalid')
    .required('Required')
});