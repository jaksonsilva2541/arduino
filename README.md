# 📡 Monitoramento de Nível de Água em Tempo Real

**Tecnologias utilizadas:**  
Node.js | MariaDB | Arduino | Socket.IO

## 📌 Descrição

Sistema de monitoramento em tempo real do nível de água, utilizando:

- Sensor ultrassônico **HC-SR04** via **Arduino**
- Comunicação via porta serial com **Node.js**
- Armazenamento em **MariaDB**
- Atualização dinâmica em uma **dashboard web** com **Socket.IO**

---

## 🚀 Como Executar

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- [MariaDB](https://mariadb.org/) ou MySQL
- [Arduino IDE](https://www.arduino.cc/en/software)


---

### ⚙️ Configuração Inicial

1. **Clone o repositório:**

```bash
git clone https://github.com/jaksonsilva2541/arduino.git
cd arduino
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o banco de dados:**

- Execute o script `banco-mariadb.sql` no seu servidor MariaDB/MySQL.

4. **Configure as variáveis de ambiente:**

- Renomeie o arquivo `.env.example` para `.env`:

```env
# Banco de Dados
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=arduino
DB_PORT=3306

# Porta Serial (Arduino)
SERIAL_PORT=/dev/ttyUSB0  # Ex: COM3 no Windows
SERIAL_BAUD=9600

# Servidor Web
PORT=3000
```

5. **Carregue o código no Arduino:**

- Veja o sketch abaixo e carregue via Arduino IDE.

---

## 🖥️ Executando o Projeto

1. Conecte o Arduino via USB

2. Inicie o servidor:

```bash
node server.js
```

3. Acesse o dashboard no navegador:

```
http://localhost:3000
```

---

## 🔌 Código do Arduino

```cpp
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
```

---

## 📊 Funcionalidades

✅ Monitoramento em tempo real  
✅ Armazenamento automático no banco de dados  
✅ Histórico das últimas 100 medições  
✅ Interface web responsiva  
✅ Reconexão automática em caso de falha

---

## 📂 Estrutura do Projeto

```
monitoramento-agua/
├── public/            # Frontend estático
│   └── index.html     # Dashboard web
├── server.js          # Backend (Node.js)
├── banco-mariadb.sql  # Script SQL do banco
├── .env.example       # Modelo de configuração
└── package.json       # Dependências
```

---



> Link do Projeto: [https://github.com/jaksonsilva2541/arduino.git](https://github.com/jaksonsilva2541/arduino.git)
