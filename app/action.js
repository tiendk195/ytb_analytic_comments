"use server";
export async function getComment(videoId) {
  const apiUrl = "https://youtube.googleapis.com/youtube/v3/commentThreads";
  const apiKey = process.env.API_KEY;
  const accessToken = "";

  const url = `${apiUrl}?part=snippet&order=relevance&videoId=${videoId}&key=${apiKey}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        //    Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const snippet = data.items.map((item) => item.snippet);
    console.log(snippet);
    return snippet;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
