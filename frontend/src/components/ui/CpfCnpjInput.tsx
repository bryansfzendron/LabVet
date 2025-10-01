import React, { forwardRef, useEffect } from 'react';
import { CpfCnpjValidator, useCpfCnpjValidation } from '../../utils/cpfCnpjValidator';
import { CheckCircle, XCircle, AlertCircle, Info, Shuffle } from 'lucide-react';

interface CpfCnpjInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string;
  onChange?: (value: string, isValid: boolean) => void;
  onValidationChange?: (validation: any) => void;
  showValidationIcon?: boolean;
  showValidationMessage?: boolean;
  showGenerateButton?: boolean;
  label?: string;
  error?: string;
  required?: boolean;
}

const CpfCnpjInput = forwardRef<HTMLInputElement, CpfCnpjInputProps>(({
  value = '',
  onChange,
  onValidationChange,
  showValidationIcon = true,
  showValidationMessage = true,
  showGenerateButton = false,
  label,
  error,
  required = false,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const {
    value: inputValue,
    validation,
    handleChange,
    generateValid
  } = useCpfCnpjValidation(value);

  // Sincroniza com valor externo
  useEffect(() => {
    if (value !== inputValue) {
      handleChange(value);
    }
  }, [value]);

  // Notifica mudanças
  useEffect(() => {
    onChange?.(inputValue, validation.isValid);
    onValidationChange?.(validation);
  }, [inputValue, validation, onChange, onValidationChange]);

  const getValidationIcon = () => {
    if (!showValidationIcon || inputValue.length === 0) return null;

    const iconProps = { size: 20, className: 'absolute right-3 top-1/2 transform -translate-y-1/2' };

    switch (validation.severity) {
      case 'success':
        return <CheckCircle {...iconProps} className={`${iconProps.className} text-green-500`} />;
      case 'error':
        return <XCircle {...iconProps} className={`${iconProps.className} text-red-500`} />;
      case 'warning':
        return <AlertCircle {...iconProps} className={`${iconProps.className} text-yellow-500`} />;
      case 'info':
        return <Info {...iconProps} className={`${iconProps.className} text-blue-500`} />;
      default:
        return null;
    }
  };

  const getValidationMessageColor = () => {
    switch (validation.severity) {
      case 'success': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getBorderColor = () => {
    if (error) return 'border-red-500 focus:border-red-500';
    if (inputValue.length === 0) return 'border-gray-300 focus:border-blue-500';
    
    switch (validation.severity) {
      case 'success': return 'border-green-500 focus:border-green-500';
      case 'error': return 'border-red-500 focus:border-red-500';
      case 'warning': return 'border-yellow-500 focus:border-yellow-500';
      case 'info': return 'border-blue-500 focus:border-blue-500';
      default: return 'border-gray-300 focus:border-blue-500';
    }
  };

  const handleGenerateValid = () => {
    const type = Math.random() > 0.5 ? 'CPF' : 'CNPJ';
    generateValid(type);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={CpfCnpjValidator.getPlaceholder(validation.type)}
          disabled={disabled}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${getBorderColor()}
            ${showValidationIcon && inputValue.length > 0 ? 'pr-10' : ''}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            ${className}
          `}
          {...props}
        />
        
        {getValidationIcon()}
        
        {showGenerateButton && !disabled && (
          <button
            type="button"
            onClick={handleGenerateValid}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Gerar documento válido para teste"
          >
            <Shuffle size={16} />
          </button>
        )}
      </div>

      {/* Mensagens de validação */}
      {showValidationMessage && inputValue.length > 0 && (
        <p className={`text-xs mt-1 ${getValidationMessageColor()}`}>
          {validation.message}
        </p>
      )}

      {/* Mensagem de erro externa */}
      {error && (
        <p className="text-xs mt-1 text-red-600">
          {error}
        </p>
      )}

      {/* Informações do documento detectado */}
      {validation.type && inputValue.length > 0 && (
        <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
          <span>Tipo: {validation.type}</span>
          {validation.type && (
            <span>Máscara: {CpfCnpjValidator.getMask(validation.type)}</span>
          )}
        </div>
      )}
    </div>
  );
});

CpfCnpjInput.displayName = 'CpfCnpjInput';

export default CpfCnpjInput;
