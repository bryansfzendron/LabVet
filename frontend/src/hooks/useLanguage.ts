// Hook removido - funcionalidade de linguagem desabilitada temporariamente
// Para evitar conflitos, este arquivo foi esvaziado

export const useLanguage = () => {
  return {
    language: 'pt-BR',
    setLanguage: () => {},
    t: (key: string) => key,
  };
};

export default useLanguage;