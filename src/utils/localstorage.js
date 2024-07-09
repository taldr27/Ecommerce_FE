const getStorage = (name) => {
  const data = localStorage.getItem(name);
  return data ? JSON.parse(data) : null;
};

const saveStorage = (name, data) => {
  const dataString = JSON.stringify(data);
  localStorage.setItem(name, dataString);
};

const removeStorage = (name) => {
  localStorage.removeItem(name);
};

export { getStorage, saveStorage, removeStorage };
