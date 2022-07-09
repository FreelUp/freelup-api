export function getMongooseErrorMessage(error) {
  let message = "";
  if (error.errors) {
    const errorsLenght = Object.keys(error.errors).length;
    let i = 0;
    for (const key in error.errors) {
      i++;
      if (i == errorsLenght) message += error.errors[key].message;
      else if (i == errorsLenght - 1)
        message += error.errors[key].message + " e ";
      else message += error.errors[key].message + ", ";
    }
  }
  return message;
}
