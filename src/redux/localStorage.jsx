export const saveToLocalStorage = (storeAPI) => (next) => (action) => {
  const result = next(action);
  const state = storeAPI.getState();
  try {
    localStorage.setItem("boards", JSON.stringify(state.boards));
  } catch (e) {
    console.warn("Error saving to localStorage", e);
  }
  return result;
};
