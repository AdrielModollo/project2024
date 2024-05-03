export const loginService = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Olá, bem-vindo ao nosso projeto TypeScript!");
    }, 1000);
  });
};
