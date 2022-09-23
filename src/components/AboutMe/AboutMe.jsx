import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

export default function AboutMe() {
  return (
    <section className="aboutme">
      <div className="aboutme__container">
        <h2 className="aboutme__title">I'm a developer</h2>
        <div className="aboutme__biography-container">
          <div className="aboutme__biography">
            <h3 className="aboutme__name">Artem Basharin</h3>
            <p className="aboutme__age">Frontend developer, {new Date().getFullYear()-1985} лет</p>
            <p className="aboutme__text"> I Was born in Siberia, now i'm working in PJSC "Russian Railways" and learn frontend and some backend development</p>
            <ul className="aboutme__contacts">
              <li>
                <a href="https://github.com/ArtemBasharin" className="aboutme__contact-link" target="_blank" rel="noreferrer">Github</a>
              </li>
            </ul>
          </div>
          <img
            className="aboutme__avatar"
            src={avatar}
            alt="мое фото"
          />
        </div>
      </div>
    </section>
  );
}
