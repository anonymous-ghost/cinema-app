// Props expected by the component
interface MovieTrailerProps {
  trailerUrl: string;
}

const MovieTrailer = ({ trailerUrl }: MovieTrailerProps) => {
  
  // Function to extract the video ID from a YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYouTubeId(trailerUrl);
  
  // Video ID validation
  if (!videoId) {
    return <p className="text-white">Invalid YouTube URL</p>;
  }

  // Construct iframe embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="w-full aspect-video bg-black relative rounded-lg overflow-hidden">
      <iframe 
        className="w-full h-full" 
        src={embedUrl} 
        title="Movie Trailer" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
