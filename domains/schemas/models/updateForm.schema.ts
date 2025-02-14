import { z } from "zod";

export const updateFormSchema = z.object({
  formName: z.string().min(1, "Vui lòng nhập tên vào"),
  formReleaseDate: z.date(),
  formManufacturerId: z.string().min(1, "Vui lòng chọn nhà sản xuất"),
});
