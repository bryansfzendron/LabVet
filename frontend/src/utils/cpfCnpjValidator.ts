import React from 'react';

export interface ValidationResult {
  isValid: boolean;
  type: 'CPF' | 'CNPJ' | null;
  formatted: string;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export class CpfCnpjValidator {
  /**
   * Remove todos os caracteres não numéricos
   */
  static cleanDocument(document: string): string {
    return document.replace(/\D/g, '');
  }

  /**
   * Formata CPF ou CNPJ baseado no número de dígitos
   */
  static formatDocument(document: string): string {
    const numbers = this.cleanDocument(document);
    
    if (numbers.length <= 11) {
      return this.formatCPF(numbers);
    } else {
      return this.formatCNPJ(numbers);
    }
  }

  /**
   * Formata CPF (###.###.###-##)
   */
  static formatCPF(cpf: string): string {
    const numbers = this.cleanDocument(cpf);
    
    if (numbers.length === 0) return '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  }

  /**
   * Formata CNPJ (##.###.###/####-##)
   */
  static formatCNPJ(cnpj: string): string {
    const numbers = this.cleanDocument(cnpj);
    
    if (numbers.length === 0) return '';
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  }

  /**
   * Valida CPF usando algoritmo oficial
   */
  static validateCPF(cpf: string): boolean {
    const numbers = this.cleanDocument(cpf);
    
    // Verifica se tem 11 dígitos
    if (numbers.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    
    // Valida primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(numbers.charAt(9))) return false;
    
    // Valida segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    
    return remainder === parseInt(numbers.charAt(10));
  }

  /**
   * Valida CNPJ usando algoritmo oficial
   */
  static validateCNPJ(cnpj: string): boolean {
    const numbers = this.cleanDocument(cnpj);
    
    // Verifica se tem 14 dígitos
    if (numbers.length !== 14) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(numbers)) return false;
    
    // Valida primeiro dígito verificador
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(numbers.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(numbers.charAt(12))) return false;
    
    // Valida segundo dígito verificador
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(numbers.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    
    return digit2 === parseInt(numbers.charAt(13));
  }

  /**
   * Valida documento completo com feedback detalhado
   */
  static validateDocument(document: string): ValidationResult {
    const numbers = this.cleanDocument(document);
    const formatted = this.formatDocument(document);
    
    // Documento vazio
    if (numbers.length === 0) {
      return {
        isValid: false,
        type: null,
        formatted: '',
        message: 'Digite um CPF ou CNPJ',
        severity: 'info'
      };
    }
    
    // CPF
    if (numbers.length <= 11) {
      if (numbers.length < 11) {
        return {
          isValid: false,
          type: 'CPF',
          formatted,
          message: `CPF incompleto (${numbers.length}/11 dígitos)`,
          severity: 'warning'
        };
      }
      
      const isValid = this.validateCPF(numbers);
      return {
        isValid,
        type: 'CPF',
        formatted,
        message: isValid ? 'CPF válido' : 'CPF inválido',
        severity: isValid ? 'success' : 'error'
      };
    }
    
    // CNPJ
    if (numbers.length <= 14) {
      if (numbers.length < 14) {
        return {
          isValid: false,
          type: 'CNPJ',
          formatted,
          message: `CNPJ incompleto (${numbers.length}/14 dígitos)`,
          severity: 'warning'
        };
      }
      
      const isValid = this.validateCNPJ(numbers);
      return {
        isValid,
        type: 'CNPJ',
        formatted,
        message: isValid ? 'CNPJ válido' : 'CNPJ inválido',
        severity: isValid ? 'success' : 'error'
      };
    }
    
    // Muito longo
    return {
      isValid: false,
      type: null,
      formatted: document,
      message: 'Documento muito longo',
      severity: 'error'
    };
  }

  /**
   * Gera CPF válido para testes (apenas desenvolvimento)
   */
  static generateValidCPF(): string {
    const randomDigits = () => Math.floor(Math.random() * 9);
    
    // Gera 9 primeiros dígitos
    let cpf = '';
    for (let i = 0; i < 9; i++) {
      cpf += randomDigits();
    }
    
    // Calcula primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    cpf += remainder;
    
    // Calcula segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    if (remainder === 10 || remainder === 11) remainder = 0;
    cpf += remainder;
    
    return this.formatCPF(cpf);
  }

  /**
   * Gera CNPJ válido para testes (apenas desenvolvimento)
   */
  static generateValidCNPJ(): string {
    const randomDigits = () => Math.floor(Math.random() * 9);
    
    // Gera 12 primeiros dígitos
    let cnpj = '';
    for (let i = 0; i < 12; i++) {
      cnpj += randomDigits();
    }
    
    // Calcula primeiro dígito verificador
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    cnpj += digit1;
    
    // Calcula segundo dígito verificador
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    cnpj += digit2;
    
    return this.formatCNPJ(cnpj);
  }

  /**
   * Detecta o tipo de documento baseado no comprimento
   */
  static detectDocumentType(document: string): 'CPF' | 'CNPJ' | null {
    const numbers = this.cleanDocument(document);
    
    if (numbers.length === 0) return null;
    if (numbers.length <= 11) return 'CPF';
    if (numbers.length <= 14) return 'CNPJ';
    
    return null;
  }

  /**
   * Verifica se o documento está completo
   */
  static isDocumentComplete(document: string): boolean {
    const numbers = this.cleanDocument(document);
    return numbers.length === 11 || numbers.length === 14;
  }

  /**
   * Obtém máscara baseada no tipo de documento
   */
  static getMask(type: 'CPF' | 'CNPJ'): string {
    return type === 'CPF' ? '###.###.###-##' : '##.###.###/####-##';
  }

  /**
   * Obtém placeholder baseado no tipo de documento
   */
  static getPlaceholder(type: 'CPF' | 'CNPJ' | null): string {
    if (type === 'CPF') return '000.000.000-00';
    if (type === 'CNPJ') return '00.000.000/0000-00';
    return 'CPF ou CNPJ';
  }
}

// Hook personalizado para usar validação de CPF/CNPJ
export const useCpfCnpjValidation = (initialValue: string = '') => {
  const [value, setValue] = React.useState(initialValue);
  const [validation, setValidation] = React.useState<ValidationResult>(
    CpfCnpjValidator.validateDocument(initialValue)
  );

  const handleChange = (newValue: string) => {
    const formatted = CpfCnpjValidator.formatDocument(newValue);
    const validationResult = CpfCnpjValidator.validateDocument(newValue);
    
    setValue(formatted);
    setValidation(validationResult);
  };

  const reset = () => {
    setValue('');
    setValidation(CpfCnpjValidator.validateDocument(''));
  };

  const generateValid = (type: 'CPF' | 'CNPJ') => {
    const generated = type === 'CPF' 
      ? CpfCnpjValidator.generateValidCPF()
      : CpfCnpjValidator.generateValidCNPJ();
    
    setValue(generated);
    setValidation(CpfCnpjValidator.validateDocument(generated));
  };

  return {
    value,
    validation,
    handleChange,
    reset,
    generateValid,
    isValid: validation.isValid,
    type: validation.type,
    message: validation.message,
    severity: validation.severity
  };
};
