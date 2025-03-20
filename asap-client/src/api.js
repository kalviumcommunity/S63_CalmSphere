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

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/create`, { // 🔥 Fix this line
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });
    return await response.json();
  } catch (error) {
    return { error: "Failed to create post" };
  }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/posts/all`); // 🔥 Fix this line
    return await response.json();
  } catch (error) {
    return { error: "Failed to fetch posts" };
  }
};