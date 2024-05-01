"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Appbar from "./components/AppBar";
import { getChannelDetail, getComment, getVideoDetail } from "./action";
import Loading from "./components/Loading";
export default function Home() {
  const { data: session } = useSession();
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [channel, setChannel] = useState({});
  const [video, setVideo] = useState({});
  const filterText = (inputText) => {
    // Remove emojis
    const noEmojis = inputText.replace(/[\u{1F600}-\u{1F6FF}]/gu, "");
    // Remove special characters
    // const noSpecialChars = noEmojis.replace(/[^\w\s]/gi, "");
    return noEmojis;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl.includes("https://www.youtube.com/watch?v=")) {
      alert("Please enter a valid YouTube video URL");
      return;
    }
    const videoId = videoUrl.split("v=")[1].split("&")[0];
    if (session) {
      setLoading(true);
      const data = await getComment(videoId);
      const channelId = data[0].channelId;
      const videoData = await getVideoDetail(videoId);
      const channelData = await getChannelDetail(channelId);
      console.log(videoData);
      console.log(channelData);
      const comment = data.map(
        (item) => item.topLevelComment.snippet.textDisplay
      );
      let filtered_comments = comment.map((item) => filterText(item));
      filtered_comments = filtered_comments.filter((item) => item !== "");
      setComments(filtered_comments);
      setVideoUrl("");
      setLoading(false);
    } else {
      alert("Please login first");
    }
  };

  return (
    <main className="bg-main-grey flex flex-col min-h-screen text-black">
      <Appbar />
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-main-grey min-h-screen">
          <p className="m-4 text-[4rem] font-bold font-mono">
            Youtube Analytic Comments
          </p>
          <p className="ml-4 text-[1.5rem] font-normal font-mono">
            Youtube Video Comment Sentiment Explorer
          </p>
          <p className="ml-4 mt-2 font-bold"> By: MTienDev </p>
          <form onSubmit={handleSubmit}>
            <p className="ml-4 mt-12 text-[1.25rem]">Paste Youtube Video URL</p>
            <input
              className="m-4 p-2 rounded-lg border-2 border-black"
              type="text"
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              value={videoUrl}
            />
            {isLoading ? (
              <button className="m-4 p-2 rounded-lg border-2 border-black">
                <Loading />
              </button>
            ) : (
              <button
                className="m-4 p-2 rounded-lg border-2 border-black"
                type="submit"
              >
                Let's go
              </button>
            )}
          </form>
        </div>
        <div className="min-h-screen col-span-2 bg-gradient-to-br from-main-pink">
          <div className="col-span-2"></div>
        </div>
      </div>
    </main>
  );
}
