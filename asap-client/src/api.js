const API_BASE_URL = "http://localhost:5000"; // Update if deployed

export const fetchEntities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/entities`);
    if (!response.ok) throw new Error("Failed to fetch entities");
    return await response.json();
  } catch (error) {
    console.error("Error fetching entities:", error);
    return [];
  }
};
