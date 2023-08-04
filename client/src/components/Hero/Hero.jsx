import "./Hero.css";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* Left Side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle"/>
            <h1>
              Discover <br /> Most Suitable <br /> Property
            </h1>
          </div>
          <div className="flexColStart hero-desc">
            <span>Find a variety of properties that suit you very easily</span>
            <span>Forget all difficulties in finding a residence for you</span>
          </div>
          <div className="search-bar">
            Search Bar
          </div>

        </div>
        {/* Right Side */}
        <div className="flexCenter hero-right">
          <div className="image-container">
            <img src="./hero-image.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
