export async function fetchCommitHistory() {
  const apiUrl = "http://127.0.0.1:5000/get_history";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch the data: ", error);
  }
}
