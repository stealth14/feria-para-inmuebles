const baseUrl = "https://6160ddabfaa03600179fbbb1.mockapi.io";

export const getAll = async () => {
  try {
    const response = await fetch(`${baseUrl}/properties`);
    console.log("properties:", response);

    return [response, null];
  } catch (error: any) {
    return [null, error];
  }
};
