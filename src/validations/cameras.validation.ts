import * as yup from "yup";

export const postCameraValidation = yup.object().shape({
  name: yup
    .string()
    .typeError("Nome deve ser alfanumérico")
    .required("Nome é obrigatório"),
  ip: yup
    .string()
    .typeError("IP deve ser uma string")
    .matches(
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$|((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:|([0-9A-Fa-f]{1,4}|([0-9]{1,3}\.){3}[0-9]{1,3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:([0-9A-Fa-f]{1,4}|:))|(:((([0-9A-Fa-f]{1,4}:){1,4})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){4}(((:(([0-9A-Fa-f]{1,4}:){1,3}|:))|(:((([0-9A-Fa-f]{1,4}:){2,4})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:(([0-9A-Fa-f]{1,4}:){1,2}|:))|(:((([0-9A-Fa-f]{1,4}:){3,5})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){4,6})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){5,7})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(:(:(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){6})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))))$/,
      "IP deve ser um endereço IPv4 ou IPv6 válido"
    )
    .required("IP é obrigatório"),
  isEnabled: yup
    .boolean()
    .typeError("isEnabled deve ser um booleano")
    .required("isEnabled é obrigatório"),
  customerId: yup
    .string()
    .uuid("customerId deve ser um UUID válido")
    .typeError("customerId deve ser uma string")
    .required("customerId é obrigatório"),
});

export const cameraNotFound = yup.object().shape({
  camera: yup.object().required("UUID da câmera não encontrado ou inválido"),
});

export const getCamerasByCustomerIdValidation = yup.object().shape({
  id: yup
    .string()
    .uuid("id deve ser um UUID válido")
    .typeError("id deve ser uma string")
    .required("id é obrigatório"),
  status: yup
    .string()
    .oneOf(["true", "false"], "state deve ser 'true' ou 'false'")
    .typeError("state deve ser uma string")
    .optional(),
});

export type CameraPostProps = yup.InferType<typeof postCameraValidation>;
export type GetCamerasByCustomerIdProps = yup.InferType<typeof getCamerasByCustomerIdValidation>;
