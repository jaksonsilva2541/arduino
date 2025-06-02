
Node.js
MariaDB
Arduino

📌 Descrição
Sistema de monitoramento em tempo real do nível de água utilizando Arduino, Node.js, Socket.IO e MariaDB.

Leitura contínua via sensor ultrassônico (HC-SR04)

Armazenamento em banco de dados

Visualização em dashboard web com atualização em tempo real

🚀 Como Executar
📋 Pré-requisitos
Node.js (v18+)

MariaDB/MySQL

Arduino IDE (para upload do sketch)

Git (opcional)

⚙️ Configuração Inicial
Clone o repositório

bash
git clone https://github.com/jaksonsilva2541/arduino.git
cd monitoramento-agua
Instale as dependências

bash
npm install
Configure o banco de dados

Execute o script SQL em banco-mariadb.sql no seu MariaDB/MySQL.

Configure o .env

Renomeie .env.example para .env e preencha com suas credenciais:

env
# Banco de Dados
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=arduino
DB_PORT=3306

# Porta Serial (Arduino)
SERIAL_PORT=/dev/ttyUSB0  # Windows: COM3, COM4, etc.
SERIAL_BAUD=9600

# Servidor Web
PORT=3000
Carregue o código no Arduino

Veja o sketch em Código do Arduino.

🖥️ Executando o Projeto
Conecte o Arduino via USB.

Inicie o servidor Node.js:

bash
node server.js
Acesse a interface web:

http://localhost:3000
📡 Código do Arduino
arduino
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duration = pulseIn(echoPin, HIGH);
  float distance = duration * 0.034 / 2;
  
  Serial.println(distance);
  delay(1000);
}
📊 Funcionalidades
✅ Monitoramento em tempo real
✅ Armazenamento automático no banco de dados
✅ Histórico das últimas 100 medições
✅ Interface web responsiva
✅ Reconexão automática em caso de falha

📂 Estrutura do Projeto
monitoramento-agua/
├── public/            # Frontend estático
│   └── index.html     # Dashboard web
├── server.js          # Backend (Node.js)
├── banco-mariadb.sql  # Script SQL do banco
├── .env.example       # Modelo de configuração
└── package.json       # Dependências