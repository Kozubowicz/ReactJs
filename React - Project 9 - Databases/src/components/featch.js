export default async function fetchData(name) {
  try {
    console.log(name);
    const response = await fetch(`http://192.168.1.3:8080/api/${name}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error during downloading data", error);
    throw error;
  }
}
