// GenerateRandomKey.js

function generateRandomKey(length: number) {
  return Array.from({ length: length }, () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");
}

export default generateRandomKey;
