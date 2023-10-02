export const randomString = (stringLength?: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  const length = stringLength ? stringLength : 7;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getPaymentCode = (string: string) => {
  const paymentString = string
    .toLowerCase()
    .substring(string.indexOf('vitamin'), string.indexOf('vitamin') + 13);
  return paymentString.substring(7);
};

export const randomResetPasswordString = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const getUUIDFromAccount = (text: string) => {
  if (!text) return '';
  return text.split('|')[0];
};
