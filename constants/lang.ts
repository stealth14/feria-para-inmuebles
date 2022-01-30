const lang = (text: string) => {
  const values = {
    photo_required: "Por favor, agrega al menos una foto",
    invalid_credentials: "Correo o contraseña incorrecta",
  };

  return values[text] || text;
};
export default lang;
