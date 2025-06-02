const int trigPin = 8;
const int echoPin = 9;
const float alturaMaxima = 15.0; // altura do recipiente em cm

void setup() {
  Serial.begin(9600);  // Inicia comunicação serial a 9600 baud
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Envia pulso ultrassônico
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Mede o tempo do pulso recebido
  long duracao = pulseIn(echoPin, HIGH, 30000); // timeout 30ms

  // Calcula a distância em cm
  float distancia = duracao * 0.0343 / 2;

  // Calcula o nível da água
  float nivel = alturaMaxima - distancia;

  // Limita valores fora do intervalo
  if (nivel < 0) nivel = 0;
  if (nivel > alturaMaxima) nivel = alturaMaxima;

  // Envia o nível pela Serial (apenas o número)
  Serial.println(nivel);

  delay(1000); // aguarda 1 segundo antes da próxima leitura
}
