import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  Email: Yup.string().email().required(),
  Password: Yup.string().required(),
});
