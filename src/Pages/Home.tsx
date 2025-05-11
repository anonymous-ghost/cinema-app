import FilmsCard from "../components/FilmsCard";

const Home = () => {
  // Додаємо два нові фільми з різними жанрами та рейтингами
  const films = [
    
    // Додаємо решту фільмів як заглушки
    ...Array(10).fill(null)
  ];

  return (
    <main>
      <div className="container">
        <div className="main-text">
          <h1 className="text-netflix">NETFLIX MOVIES</h1>
          <h3 className="text-current">Current and New Releases</h3>
        </div>
        <div className="films">
          {films.map((film, index) => (
            <FilmsCard 
              key={index} 
              title={film?.title} 
              rating={film?.rating} 
              image={film?.image} 
              categories={film?.categories} 
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
