export function validateEmail(email) {
  // Expressão regular para validar o formato do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function statusEmail(product) {
  if (product.branchmarking != null) {
    if (product.branchmarking.statusEmail == 1) {
      return 1;
    }
    return 0;
  } else {
    return 0;
  }
}
