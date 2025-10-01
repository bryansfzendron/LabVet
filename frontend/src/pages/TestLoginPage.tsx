import React from 'react';

const TestLoginPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', margin: '20px' }}>
      <h1>TESTE - Formulário de Login</h1>
      
      <form style={{ border: '2px solid red', padding: '20px', margin: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            id="email"
            type="email"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #333',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Digite seu email"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Senha:
          </label>
          <input
            id="password"
            type="password"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #333',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            placeholder="Digite sua senha"
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          ENTRAR
        </button>
      </form>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>Credenciais de Teste:</h3>
        <p><strong>Admin:</strong> admin@labvet.com / admin123</p>
        <p><strong>Gerente:</strong> gerente@labvet.com / gerente123</p>
      </div>
    </div>
  );
};

export default TestLoginPage;
