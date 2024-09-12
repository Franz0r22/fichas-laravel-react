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