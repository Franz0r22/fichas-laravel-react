export const validateName = (name) => {
  if (!name.trim()) return 'El nombre es obligatorio';
  if (name.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres';
  if (name.trim().length > 50) return 'El nombre no puede exceder los 50 caracteres';
  if (/\d/.test(name)) return 'El nombre no debe contener números';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) return 'El nombre solo debe contener letras y espacios';
  return '';
};

export const validateEmail = (email) => {
  if (!email.trim()) return 'El email es obligatorio';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Email inválido';
  return '';
};

export const validateRut = (rut) => {
  if (!rut.trim()) return 'El RUT es obligatorio';
  
  const rutLimpio = cleanRut(rut);
  
  if (!/^[0-9]{7,8}[0-9Kk]$/.test(rutLimpio)) return 'Formato de RUT inválido';
  
  const dv = rutLimpio.charAt(rutLimpio.length - 1);
  const rutSinDv = rutLimpio.slice(0, -1);
  
  let suma = 0;
  let multiplicador = 2;
  
  for (let i = rutSinDv.length - 1; i >= 0; i--) {
    suma += parseInt(rutSinDv.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  
  const dvEsperado = 11 - (suma % 11);
  const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
  
  if (dv.toUpperCase() !== dvCalculado) return 'RUT inválido';
  
  return '';
};

export const formatRut = (rut) => {
  const rutLimpio = cleanRut(rut);
  
  if (rutLimpio.length <= 1) return rutLimpio;
  
  const dv = rutLimpio.slice(-1);
  const rutSinDv = rutLimpio.slice(0, -1);
  const rutFormateado = rutSinDv.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  return `${rutFormateado}-${dv}`;
};

const cleanRut = (rut) => {
  return rut.replace(/[^0-9kK]/g, "").toUpperCase();
};

export const validateMessage = (message) => {
  if (!message.trim()) return '';
  
  // Expresión regular para detectar URLs
  const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
  
  if (urlRegex.test(message)) {
    return 'El mensaje no puede contener URLs';
  }
  
  return '';
};

export const validatePie = (pie, carPrice) => {
  if (pie === undefined || pie === null || pie === '') return ''; 
  
  const pieNumber = Number(pie);
  
  if (isNaN(pieNumber)) return 'El pie debe ser un número válido';
  if (!Number.isInteger(pieNumber)) return 'El pie debe ser un número entero';
  if (pieNumber > carPrice * 0.5) return 'El pie no puede ser mayor que el 50% del precio del auto';
  if (pieNumber < carPrice * 0.1) return 'El pie debe ser al menos el 10% del precio del auto';
  
  return '';
};

export const validateCreditTerm = (pie, creditTerm) => {

if (pie && pie.toString().trim() !== '') {
    if (!creditTerm) {
        return 'Debe seleccionar un plazo de crédito.';
    }
}
return '';
};

export const validatePhone = (phone) => {
if (!phone.trim()) return 'El teléfono es obligatorio';
if (!/^\+?56?\s?(\d{9}|\d{2}\s?\d{4}\s?\d{4})$/.test(phone)) return 'Teléfono inválido';
return '';
};  

export const validateCreditAmount = (creditAmount) => {
if (!creditAmount.trim()) return 'El monto de crédito es obligatorio';
if (isNaN(creditAmount) || creditAmount <= 0) return 'Monto de crédito inválido';
return '';
};

export const validateInstallments = (installments) => {
if (!installments.trim()) return 'La cantidad de cuotas es obligatoria';
if (isNaN(installments) || installments <= 0) return 'Cantidad de cuotas inválida';
return '';
};

