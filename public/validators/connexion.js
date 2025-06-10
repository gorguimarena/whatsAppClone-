function IsNumeric(number) {
  return /^\d+$/.test(number.replace(/[\s-]/g, ""));
}

export function notEmpty(string) {
  return string.trim().length > 0;
}

export function isValidLocalPhoneNumber(localNumber, output) {
  if (!notEmpty(localNumber)) {
    output.textContent = 'Veuillez entrer un numéro !';  
    return false;
  }

  if (!IsNumeric(localNumber)) {  
    output.textContent = 'Vous devez entrer un numéro valide !';
    return false;
  }

  return true;
}

export function isOnline() {
  return navigator.onLine;
}









