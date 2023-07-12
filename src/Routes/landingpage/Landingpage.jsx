import css from "./CSS.module.css";
import icon from "../../assets/images/database1light.svg";
import heroimg from "../../assets/images/img1.png";
const Landingpage = () => {
  return (
    <div className={css.maincontainer}>
      <div className={css.subconatiner}>
        <section className={css.hero_section}>
          <header className={css.header}>
            <div>
              <div className={css.header_iconandtitle_div}>
                <img src={icon} />
                <h1>Collab db</h1>
              </div>

              <div className={css.header_button_div}>
                <button>Login</button>
                <button>Sign Up</button>
              </div>
            </div>
          </header>
          <div className={css.heroconatiner}>
            <div className={css.hero_textandimg_div}>
              <div className={css.hero_txtdiv}>
                <h1>
                  Read and display data from designs. <br /> Using code.
                </h1>
                <p>
                  Collab db a collaborative online<b> realtime </b>
                  database for anyone to use. Signup to continue.
                </p>

                <button>Get Started</button>
              </div>
              <div className={css.bw}>
                <img src={heroimg} className={css.hero_img} />
              </div>
            </div>
          </div>
        </section>
        <div>whiledwdwdwd</div>
      </div>
    </div>
  );
};

export default Landingpage;
