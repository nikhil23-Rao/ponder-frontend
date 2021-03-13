import * as Yup from "yup";

export const StoryValidationSchema = Yup.object({
  title: Yup.string().required(),
  image_url: Yup.string().url().required(),
  category: Yup.string().required(),
});
