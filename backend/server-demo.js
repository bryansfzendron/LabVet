const express = require("express");
const cors = require("cors");

const app = express();

// Configuração de CORS para aceitar a porta 5177
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5178"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok", 
    message: "LabVet Backend funcionando!",
    timestamp: new Date().toISOString(),
    port: 3001
  });
});

// Login endpoint
app.post("/api/auth/login", (req, res) => {
  const { email, senha } = req.body;
  
  // Validação simples
  if (email === "admin@labvet.com" && senha === "labvet123") {
    res.json({
      token: "demo-token-" + Date.now(),
      user: {
        id: 1,
        nome: "Administrador",
        email: "admin@labvet.com",
        role: "admin"
      }
    });
  } else {
    res.status(401).json({
      error: "Credenciais inválidas",
      message: "Email ou senha incorretos"
    });
  }
});

// Middleware para rotas não encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Rota não encontrada",
    path: req.originalUrl
  });
});

app.listen(3001, () => {
  console.log("🚀 Backend LabVet Demo rodando em http://localhost:3001");
  console.log("📊 Health check: http://localhost:3001/api/health");
  console.log("🔐 Login: POST http://localhost:3001/api/auth/login");
  console.log("✅ CORS configurado para portas 5173 e 5177");
});