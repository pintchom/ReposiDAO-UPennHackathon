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

export async function fetchBalances() {
  const apiUrl = "http://127.0.0.1:5000/get_balances";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch the balances: ", error);
    return null; // or throw the error, depending on how you want to handle failures
  }
}
