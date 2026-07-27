export function getErrorMessage(error) {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Une erreur est survenue";
}
