import * as Yup from "yup";

export const SignupValidationSchema = Yup.object({
  Username: Yup.string().required(),
  Email: Yup.string().email().required(),
  Password: Yup.string().required(),
});
