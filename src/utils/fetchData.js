// export const exerciseOptions = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
//     "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
//   },
// };

// export const youtubeOptions = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Host":
//       "youtube-search-and-download.p.rapidapi.com",
//     "X-RapidAPI-Key":
//       import.meta.env.VITE_YOUTUBE_RAPID_API_KEY,
//   },
// };

// export const fetchData = async (url, options) => {
//   const response = await fetch(url, options);

//   const data = await response.json();

//   if (!response.ok) {
//     console.error("API Error:", response.status, data);

//     throw new Error(
//       data?.message || `API Error: ${response.status}`
//     );
//   }

//   return data;
// };


export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);

  const data = await response.json();

  if (!response.ok) {
    console.error("API Error:", response.status, data);

    throw new Error(
      data?.message || `API Error: ${response.status}`
    );
  }

  return data;
};