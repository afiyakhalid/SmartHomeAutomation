// #include <Arduino.h>
// #include <WiFi.h>
// #include <HTTPClient.h>
// #include <DHT.h>

// // =====================================================
// // WIFI CONFIGURATION
// // =====================================================

// const char* WIFI_SSID = "Alisha";
// const char* WIFI_PASSWORD = "Kf@22071972";

// // Your laptop's IPv4 address
// // Backend is running on port 8000
// const char* SERVER_URL = "http://192.168.29.110:8000/sensors/data";

// // =====================================================
// // PIN CONFIGURATION
// // =====================================================

// #define DHT_PIN       5
// #define DHT_TYPE      DHT22

// #define PIR_PIN       12
// #define MQ2_PIN       34
// #define BUZZER_PIN    13

// // =====================================================
// // SMOKE THRESHOLD
// // =====================================================

// #define SMOKE_THRESHOLD 1000

// // =====================================================
// // TEMPERATURE THRESHOLD
// // =====================================================

// #define FAN_TEMPERATURE_THRESHOLD 25.0

// // =====================================================
// // SENSOR OBJECT
// // =====================================================

// DHT dht(DHT_PIN, DHT_TYPE);


// // =====================================================
// // SEND SENSOR DATA TO BACKEND
// // =====================================================

// void sendSensorData(const char* type, float value)
// {
//     if (WiFi.status() != WL_CONNECTED)
//     {
//         Serial.println("Cannot send data - WiFi disconnected");
//         return;
//     }

//     HTTPClient http;

//     http.begin(SERVER_URL);
//     http.addHeader("Content-Type", "application/json");

//     String json = "{";
//     json += "\"type\":\"";
//     json += type;
//     json += "\",";
//     json += "\"value\":";
//     json += String(value, 2);
//     json += "}";

//     Serial.print("Sending ");
//     Serial.print(type);
//     Serial.print(": ");
//     Serial.println(value);

//     int httpResponseCode = http.POST(json);

//     if (httpResponseCode > 0)
//     {
//         Serial.print("Backend response: ");
//         Serial.println(httpResponseCode);

//         String response = http.getString();

//         Serial.print("Response: ");
//         Serial.println(response);
//     }
//     else
//     {
//         Serial.print("HTTP request failed: ");
//         Serial.println(http.errorToString(httpResponseCode));
//     }

//     http.end();
// }


// // =====================================================
// // WIFI CONNECTION
// // =====================================================

// void connectToWiFi()
// {
//     WiFi.mode(WIFI_STA);
//     WiFi.setAutoReconnect(true);
//     WiFi.persistent(true);

//     Serial.println();
//     Serial.println("================================");
//     Serial.println("        ESP32 WIFI CONNECTION");
//     Serial.println("================================");

//     Serial.print("Connecting to: ");
//     Serial.println(WIFI_SSID);

//     WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

//     int attempts = 0;

//     while (WiFi.status() != WL_CONNECTED && attempts < 40)
//     {
//         delay(500);
//         Serial.print(".");
//         attempts++;
//     }

//     Serial.println();

//     if (WiFi.status() == WL_CONNECTED)
//     {
//         Serial.println("WIFI CONNECTED!");

//         Serial.print("ESP32 IP: ");
//         Serial.println(WiFi.localIP());

//         Serial.print("Signal: ");
//         Serial.print(WiFi.RSSI());
//         Serial.println(" dBm");

//         Serial.println("================================");
//     }
//     else
//     {
//         Serial.println("WIFI CONNECTION FAILED");

//         Serial.print("Status code: ");
//         Serial.println(WiFi.status());
//     }
// }


// // =====================================================
// // SETUP
// // =====================================================

// void setup()
// {
//     Serial.begin(115200);

//     delay(1000);

//     // -------------------------
//     // SENSOR PIN SETUP
//     // -------------------------

//     pinMode(PIR_PIN, INPUT);
//     pinMode(MQ2_PIN, INPUT);

//     pinMode(BUZZER_PIN, OUTPUT);
//     digitalWrite(BUZZER_PIN, LOW);

//     // -------------------------
//     // START DHT22
//     // -------------------------

//     dht.begin();

//     // -------------------------
//     // CONNECT WIFI
//     // -------------------------

//     connectToWiFi();

//     Serial.println();
//     Serial.println("======================================");
//     Serial.println("       SMART HOME SENSOR SYSTEM");
//     Serial.println("======================================");
//     Serial.println("DHT22  : GPIO 5");
//     Serial.println("PIR    : GPIO 12");
//     Serial.println("MQ-2   : GPIO 34");
//     Serial.println("OUTPUT : GPIO 13");
//     Serial.println("--------------------------------------");
//     Serial.println("Output turns ON above 25°C");
//     Serial.println("Backend:");
//     Serial.println(SERVER_URL);
//     Serial.println("======================================");
// }


// // =====================================================
// // MAIN LOOP
// // =====================================================

// void loop()
// {
//     // =================================================
//     // WIFI CHECK
//     // =================================================

//     if (WiFi.status() != WL_CONNECTED)
//     {
//         Serial.println("WiFi disconnected - reconnecting...");

//         WiFi.reconnect();

//         delay(5000);

//         return;
//     }


//     // =================================================
//     // READ TEMPERATURE
//     // =================================================

//     float temperature = dht.readTemperature();


//     // =================================================
//     // READ HUMIDITY
//     // =================================================

//     float humidity = dht.readHumidity();


//     // =================================================
//     // READ MOTION
//     // =================================================

//     int motion = digitalRead(PIR_PIN);


//     // =================================================
//     // READ MQ-2
//     // =================================================

//     int smokeValue = analogRead(MQ2_PIN);


//     // =================================================
//     // DISPLAY TEMPERATURE
//     // =================================================

//     if (isnan(temperature))
//     {
//         Serial.println("Temperature: ERROR");
//     }
//     else
//     {
//         Serial.print("Temperature: ");
//         Serial.print(temperature);
//         Serial.println(" °C");
//     }


//     // =================================================
//     // DISPLAY HUMIDITY
//     // =================================================

//     if (isnan(humidity))
//     {
//         Serial.println("Humidity: ERROR");
//     }
//     else
//     {
//         Serial.print("Humidity: ");
//         Serial.print(humidity);
//         Serial.println(" %");
//     }


//     // =================================================
//     // DISPLAY MOTION
//     // =================================================

//     if (motion == HIGH)
//     {
//         Serial.println("Motion: DETECTED");
//     }
//     else
//     {
//         Serial.println("Motion: NOT DETECTED");
//     }


//     // =================================================
//     // DISPLAY SMOKE
//     // =================================================

//     Serial.print("MQ-2 Smoke Value: ");
//     Serial.println(smokeValue);


//     // =================================================
//     // BUZZER / FAN LOGIC
//     // =================================================

//     bool smokeDetected = smokeValue >= SMOKE_THRESHOLD;
//     bool motionDetected = motion == HIGH;
//     bool highTemperature =
//         !isnan(temperature) &&
//         temperature > FAN_TEMPERATURE_THRESHOLD;


//     if (highTemperature)
//     {
//         digitalWrite(BUZZER_PIN, HIGH);

//         Serial.println("!!! TEMPERATURE ABOVE 25°C !!!");
//         Serial.println("OUTPUT: ON");
//     }
//     else if (smokeDetected && motionDetected)
//     {
//         digitalWrite(BUZZER_PIN, HIGH);

//         Serial.println("!!! SMOKE + MOTION DETECTED !!!");
//         Serial.println("OUTPUT: ON");
//     }
//     else if (smokeDetected)
//     {
//         digitalWrite(BUZZER_PIN, HIGH);

//         Serial.println("!!! SMOKE DETECTED !!!");
//         Serial.println("OUTPUT: ON");
//     }
//     else if (motionDetected)
//     {
//         digitalWrite(BUZZER_PIN, HIGH);

//         Serial.println("Motion detected!");
//         Serial.println("OUTPUT: ON");
//     }
//     else
//     {
//         digitalWrite(BUZZER_PIN, LOW);

//         Serial.println("OUTPUT: OFF");
//     }


//     // =================================================
//     // SEND DATA TO BACKEND
//     // =================================================

//     Serial.println();
//     Serial.println("Sending sensor data to backend...");


//     // Temperature
//     if (!isnan(temperature))
//     {
//         sendSensorData("temperature", temperature);
//     }


//     // Humidity
//     if (!isnan(humidity))
//     {
//         sendSensorData("humidity", humidity);
//     }


//     // Motion
//     sendSensorData("motion", motion == HIGH ? 1 : 0);


//     // Smoke
//     sendSensorData("smoke", smokeValue);


//     // =================================================
//     // SEPARATOR
//     // =================================================

//     Serial.println();
//     Serial.println("--------------------------------------");

//     delay(10000);
// }
#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

// =====================================================
// WIFI CONFIGURATION
// =====================================================

const char* WIFI_SSID = "Alisha";
const char* WIFI_PASSWORD = "Kf@22071972";

// Your laptop's IPv4 address
// Backend is running on port 8000
const char* SERVER_URL = "http://192.168.29.110:8000/sensors/data";

// =====================================================
// PIN CONFIGURATION
// =====================================================

#define DHT_PIN       5
#define DHT_TYPE      DHT22

#define PIR_PIN       12
#define MQ2_PIN       34
#define FAN_PIN       13

// =====================================================
// TEMPERATURE THRESHOLD
// =====================================================

#define FAN_TEMPERATURE_THRESHOLD 25.0

// =====================================================
// SENSOR OBJECT
// =====================================================

DHT dht(DHT_PIN, DHT_TYPE);


// =====================================================
// SEND SENSOR DATA TO BACKEND
// =====================================================

void sendSensorData(const char* type, float value)
{
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("Cannot send data - WiFi disconnected");
        return;
    }

    HTTPClient http;

    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    String json = "{";
    json += "\"type\":\"";
    json += type;
    json += "\",";
    json += "\"value\":";
    json += String(value, 2);
    json += "}";

    Serial.print("Sending ");
    Serial.print(type);
    Serial.print(": ");
    Serial.println(value);

    int httpResponseCode = http.POST(json);

    if (httpResponseCode > 0)
    {
        Serial.print("Backend response: ");
        Serial.println(httpResponseCode);

        String response = http.getString();

        Serial.print("Response: ");
        Serial.println(response);
    }
    else
    {
        Serial.print("HTTP request failed: ");
        Serial.println(http.errorToString(httpResponseCode));
    }

    http.end();
}


// =====================================================
// WIFI CONNECTION
// =====================================================

void connectToWiFi()
{
    WiFi.mode(WIFI_STA);
    WiFi.setAutoReconnect(true);
    WiFi.persistent(true);

    Serial.println();
    Serial.println("================================");
    Serial.println("        ESP32 WIFI CONNECTION");
    Serial.println("================================");

    Serial.print("Connecting to: ");
    Serial.println(WIFI_SSID);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    int attempts = 0;

    while (WiFi.status() != WL_CONNECTED && attempts < 40)
    {
        delay(500);
        Serial.print(".");
        attempts++;
    }

    Serial.println();

    if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("WIFI CONNECTED!");

        Serial.print("ESP32 IP: ");
        Serial.println(WiFi.localIP());

        Serial.print("Signal: ");
        Serial.print(WiFi.RSSI());
        Serial.println(" dBm");

        Serial.println("================================");
    }
    else
    {
        Serial.println("WIFI CONNECTION FAILED");

        Serial.print("Status code: ");
        Serial.println(WiFi.status());
    }
}


// =====================================================
// SETUP
// =====================================================

void setup()
{
    Serial.begin(115200);

    delay(1000);

    // -------------------------
    // SENSOR PIN SETUP
    // -------------------------

    pinMode(PIR_PIN, INPUT);
    pinMode(MQ2_PIN, INPUT);

    // Fan
    pinMode(FAN_PIN, OUTPUT);
    digitalWrite(FAN_PIN, LOW);

    // -------------------------
    // START DHT22
    // -------------------------

    dht.begin();

    // -------------------------
    // CONNECT WIFI
    // -------------------------

    connectToWiFi();

    Serial.println();
    Serial.println("======================================");
    Serial.println("       SMART HOME SENSOR SYSTEM");
    Serial.println("======================================");
    Serial.println("DHT22  : GPIO 5");
    Serial.println("PIR    : GPIO 12");
    Serial.println("MQ-2   : GPIO 34");
    Serial.println("FAN    : GPIO 13");
    Serial.println("--------------------------------------");
    Serial.println("Fan turns ON above 25°C");
    Serial.println("Backend:");
    Serial.println(SERVER_URL);
    Serial.println("======================================");
}


// =====================================================
// MAIN LOOP
// =====================================================

void loop()
{
    // =================================================
    // WIFI CHECK
    // =================================================

    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi disconnected - reconnecting...");

        WiFi.reconnect();

        delay(5000);

        return;
    }


    // =================================================
    // READ TEMPERATURE
    // =================================================

    float temperature = dht.readTemperature();


    // =================================================
    // READ HUMIDITY
    // =================================================

    float humidity = dht.readHumidity();


    // =================================================
    // READ MOTION
    // =================================================

    int motion = digitalRead(PIR_PIN);


    // =================================================
    // READ MQ-2
    // =================================================

    int smokeValue = analogRead(MQ2_PIN);


    // =================================================
    // DISPLAY TEMPERATURE
    // =================================================

    if (isnan(temperature))
    {
        Serial.println("Temperature: ERROR");
    }
    else
    {
        Serial.print("Temperature: ");
        Serial.print(temperature);
        Serial.println(" °C");
    }


    // =================================================
    // FAN LOGIC
    // =================================================

    if (!isnan(temperature) &&
        temperature > FAN_TEMPERATURE_THRESHOLD)
    {
        digitalWrite(FAN_PIN, HIGH);

        Serial.println("Temperature above 25°C");
        Serial.println("FAN: ON");
    }
    else
    {
        digitalWrite(FAN_PIN, LOW);

        Serial.println("FAN: OFF");
    }


    // =================================================
    // DISPLAY HUMIDITY
    // =================================================

    if (isnan(humidity))
    {
        Serial.println("Humidity: ERROR");
    }
    else
    {
        Serial.print("Humidity: ");
        Serial.print(humidity);
        Serial.println(" %");
    }


    // =================================================
    // DISPLAY MOTION
    // =================================================

    if (motion == HIGH)
    {
        Serial.println("Motion: DETECTED");
    }
    else
    {
        Serial.println("Motion: NOT DETECTED");
    }


    // =================================================
    // DISPLAY SMOKE
    // =================================================

    Serial.print("MQ-2 Smoke Value: ");
    Serial.println(smokeValue);


    // =================================================
    // SEND DATA TO BACKEND
    // =================================================

    Serial.println();
    Serial.println("Sending sensor data to backend...");


    // Temperature
    if (!isnan(temperature))
    {
        sendSensorData("temperature", temperature);
    }


    // Humidity
    if (!isnan(humidity))
    {
        sendSensorData("humidity", humidity);
    }


    // Motion
    sendSensorData("motion", motion == HIGH ? 1 : 0);


    // Smoke
    sendSensorData("smoke", smokeValue);


    // =================================================
    // SEPARATOR
    // =================================================

    Serial.println();
    Serial.println("--------------------------------------");

    delay(10000);
}
