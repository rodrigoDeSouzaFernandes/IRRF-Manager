export const beforeInput = {
  onlyNumbers: (event: React.InputEvent<HTMLElement>) => {
    const char = event.data;
    const notNumber = /^\D$/;
    if (!char) return;
    if (notNumber.test(char)) {
      event.preventDefault();
    }
  },
};
