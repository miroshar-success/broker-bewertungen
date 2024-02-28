export default class FormErrors {
  static errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage = null,
  ) {
    if (externalErrorMessage) {
      return externalErrorMessage;
    }

    if (!isSubmitted && !touched[name]) {
      return null;
    }

    const fieldErrors = errors[name];

    return (
      fieldErrors?.[0]?.message ||
      fieldErrors?.message ||
      fieldErrors ||
      null
    );
  }
}
