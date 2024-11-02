import * as Yup from 'yup';

export const validateRegister = Yup.object().shape({
    username: Yup.string().required('نام کاربری اجباری است'),
    email: Yup.string().email('ایمیل نامعتبر است').required('ایمیل اجباری است'),
    password: Yup.string().required('کلمه عبور اجباری است'),
});