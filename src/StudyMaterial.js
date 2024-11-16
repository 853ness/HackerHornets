import React, { useState, useEffect } from "react";
import axios from "axios";

const StudyMaterial = ({ gradesArray }) => {

  console.log(gradesArray)

  const [suggestions, setSuggestions] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        // Filter gradesArray
        const filteredGrades = gradesArray.filter(
          (item) => !item.includes("not graded")
        );

        // Generate prompts for OpenAI API
        const prompt = `Provide study material suggestions for the following topics: ${filteredGrades.join(
          ", "
        )}.`;

        // Fetch study material from OpenAI
        const openAIResponse = await axios.get(
          "https://api.openai.com//v1/chat/completions",
          {
            model: "GPT-3.5", // Use your desired model
            prompt: prompt,
            max_tokens: 150,
          },
          {
            headers: {
              Authorization: `Bearer `+`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`,
            },
          }
        );

        const studySuggestions = openAIResponse.data.choices[0].text.trim();
        setSuggestions(studySuggestions.split("\n"));

        // Fetch YouTube videos for the suggestions
        const videoSearchTerms = studySuggestions.split("\n").slice(0, 3); // Limit to top 3 suggestions
        const videoResults = [];

        for (const term of videoSearchTerms) {
          const youtubeResponse = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
              params: {
                part: "snippet",
                q: term,
                type: "video",
                maxResults: 2,
                key: "AIzaSyCInue3efFlQ_RD2thkfpPWYpO7I11iW5Y",
              },
            }
          );

          videoResults.push(...youtubeResponse.data.items);
        }

        setVideos(videoResults);
      } catch (error) {
        console.error("Error fetching study materials or videos:", error);
      }
    };

    fetchStudyMaterials();
  }, [gradesArray]);

  return (
    <div>
      <h2>Study Material Suggestions</h2>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
      <h2>YouTube Videos</h2>
      <div>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <iframe
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              frameBorder="0"
              allowFullScreen
              title={video.snippet.title}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterial;
