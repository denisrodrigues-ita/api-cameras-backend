import * as yup from "yup";

export const hasNameValidation = yup.object().shape({
  name: yup.string().required(),
});

export const customerNotFoundValidation = yup.object().shape({
  customer: yup.object().required(),
});

export const ipValidation = yup.object().shape({
  ip: yup
    .string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$|((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:|([0-9A-Fa-f]{1,4}|([0-9]{1,3}\.){3}[0-9]{1,3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:([0-9A-Fa-f]{1,4}|:))|(:((([0-9A-Fa-f]{1,4}:){1,4})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){4}(((:(([0-9A-Fa-f]{1,4}:){1,3}|:))|(:((([0-9A-Fa-f]{1,4}:){2,4})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:(([0-9A-Fa-f]{1,4}:){1,2}|:))|(:((([0-9A-Fa-f]{1,4}:){3,5})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){4,6})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){5,7})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))|(:(:(((:(([0-9A-Fa-f]{1,4}:)?|:))|(:((([0-9A-Fa-f]{1,4}:){6})|:)|(([0-9]{1,3}\.){3}[0-9]{1,3})))|:))))$/,
     
    ),
});

export const isEnabledValidation = yup.object().shape({
  isEnabled: yup
    .boolean()
    .required(),
});

export const isUUIDvalidation = yup.object().shape({
  uuid: yup.string().uuid().required(),
});

export type CustomerPostProps = yup.InferType<typeof hasNameValidation>;
