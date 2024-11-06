import * as Yup from 'yup';

export const validateRegister = Yup.object().shape({
    username: Yup.string().required('نام کاربری اجباری است'),
    password: Yup.string().required('کلمه عبور اجباری است'),
    phone: Yup.string().required('شماره تلفن عبور اجباری است'),
});