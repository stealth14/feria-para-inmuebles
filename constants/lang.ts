const lang = (text: string) => {
  const values = {
    photo_required: `Por favor, agrega al menos una foto`,
  };

  return values[text] || text;
};
export default lang;
