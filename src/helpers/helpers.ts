export default function isValidCPF(cpf: string){

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let sum = 0, remainder;
  
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf.substring(10, 11));
}

export const isValidPhoneNumber = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return mobilephoneRegex.test(cleanPhone);
};

export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
export const mobilephoneRegex = /^(?!00)([1-9]{2})9\d{8}(?!\d\1{4})$/;
export const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+(?:'[A-Za-zÀ-ÖØ-öø-ÿ]+)*)*$/;
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const getBackgroundColor = (programCode: string) => {
    if (programCode === '983') return 'bg-green-rare';
    if (programCode === '984') return 'bg-purple-rare';
    if (programCode === '987') return 'bg-yellow-rare';
    if (programCode === '') return 'bg-no-program';
    return 'bg-no-program';
  };
  
  export const getTextColor = (programCode: string) => {
    if (programCode === '983') return 'text-green-rare';
    if (programCode === '984') return 'text-purple-rare';
    if (programCode === '987') return 'text-yellow-rare';
    if (programCode === '') return 'text-no-program';
    return 'text-no-program';
  };
  
  export const getBorderColor = (programCode: string) => {
    if (programCode === '983') return 'border-green-rare';
    if (programCode === '984') return 'border-purple-rare';
    if (programCode === '987') return 'border-yellow-rare';
    if (programCode === '') return 'border-no-program';
    return 'border-no-program';
  };