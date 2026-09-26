export async function generateResponse(message, model = "EchoGPT") {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return `This is a simulated ${model} response to: "${message}"`;
}