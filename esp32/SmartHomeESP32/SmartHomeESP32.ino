#include <DHT.h>

// =========================
// PIN CONFIGURATION
// =========================

#define DHT_PIN       5
#define DHT_TYPE      DHT22

#define PIR_PIN       12
#define MQ2_PIN       34
#define BUZZER_PIN    13

// =========================
// SMOKE THRESHOLD
// =========================

#define SMOKE_THRESHOLD 1000

DHT dht(DHT_PIN, DHT_TYPE);


// =========================
// SETUP
// =========================

void setup() {

  Serial.begin(115200);

  pinMode(PIR_PIN, INPUT);
  pinMode(MQ2_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  digitalWrite(BUZZER_PIN, LOW);

  dht.begin();

  Serial.println();
  Serial.println("======================================");
  Serial.println("       SMART HOME SENSOR SYSTEM");
  Serial.println("======================================");
  Serial.println("DHT22  : D5");
  Serial.println("PIR    : D12");
  Serial.println("MQ-2   : D34");
  Serial.println("BUZZER : D13");
  Serial.println("======================================");
}


// =========================
// MAIN LOOP
// =========================

void loop() {

  // -------------------------
  // READ TEMPERATURE
  // -------------------------

  float temperature = dht.readTemperature();

  // -------------------------
  // READ HUMIDITY
  // -------------------------

  float humidity = dht.readHumidity();

  // -------------------------
  // READ MOTION
  // -------------------------

  int motion = digitalRead(PIR_PIN);

  // -------------------------
  // READ MQ-2
  // -------------------------

  int smokeValue = analogRead(MQ2_PIN);


  // =========================
  // DISPLAY TEMPERATURE
  // =========================

  if (isnan(temperature)) {

    Serial.println("Temperature: ERROR");

  } else {

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");
  }


  // =========================
  // DISPLAY HUMIDITY
  // =========================

  if (isnan(humidity)) {

    Serial.println("Humidity: ERROR");

  } else {

    Serial.print("Humidity: ");
    Serial.print(humidity);
    Serial.println(" %");
  }


  // =========================
  // DISPLAY MOTION
  // =========================

  if (motion == HIGH) {

    Serial.println("Motion: DETECTED");

  } else {

    Serial.println("Motion: NOT DETECTED");
  }


  // =========================
  // DISPLAY SMOKE
  // =========================

  Serial.print("MQ-2 Smoke Value: ");
  Serial.println(smokeValue);


  // =========================
  // BUZZER LOGIC
  // =========================

  bool smokeDetected = smokeValue >= SMOKE_THRESHOLD;
  bool motionDetected = motion == HIGH;


  if (smokeDetected && motionDetected) {

    digitalWrite(BUZZER_PIN, HIGH);

    Serial.println("!!! SMOKE + MOTION DETECTED !!!");
    Serial.println("BUZZER: ON");

  }

  else if (smokeDetected) {

    digitalWrite(BUZZER_PIN, HIGH);

    Serial.println("!!! SMOKE DETECTED !!!");
    Serial.println("BUZZER: ON");

  }

  else if (motionDetected) {

    digitalWrite(BUZZER_PIN, HIGH);

    Serial.println("Motion detected!");
    Serial.println("BUZZER: ON");

  }

  else {

    digitalWrite(BUZZER_PIN, LOW);

    Serial.println("BUZZER: OFF");
  }


  // =========================
  // SEPARATOR
  // =========================

  Serial.println("--------------------------------------");

  delay(2000);
}