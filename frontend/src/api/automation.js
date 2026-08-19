import api from "./client";

export const evaluateAutomation = async (sensorData) => {
  const response = await api.post(
    "/automation/evaluate",
    sensorData
  );

  return response.data;
};