import FilmsCard from "../components/FilmsCard";

const Home = () => {
  return (
    <main>
      <div className="container">
        <div className="main-text">
          <h1 className="text-netflix">NETFLIX MOVIES</h1>
          <h3 className="text-current">Current and New Releases</h3>
        </div>
        <div className="films">
          {[...Array(12)].map((_, index) => (
            <FilmsCard key={index} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;