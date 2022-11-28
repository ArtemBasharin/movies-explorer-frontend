import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

export default function AboutMe() {
  return (
    <section className="aboutme">
      <div className="aboutme__container">
        <h2 id="aboutme__title" className="aboutme__title">I'm a developer</h2>
        <div className="aboutme__biography-container">
          <div className="aboutme__biography">
            <h3 className="aboutme__name">Artem Basharin</h3>
            <p className="aboutme__age">Frontend developer, {new Date().getFullYear()-1985} years</p>
            <p className="aboutme__text"> I was born in Siberia, now i'm working in PJSC "Russian Railways" and learn frontend and some backend development in Yandex.Praktikum.
            I'm not new to development. I had my own microcontroller programming projects in C/C++. I also created a functional sample for an automatic irrigation and climate control system.
            As a side job, I design 3D models in CAD applications and prototype plastic on my FDM 3D printer. One of the expensive projects was the design and manufacture of a commercial model
            of a 4-axis CNC furniture machine with a working field of 3 by 2 meters.
            </p>
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
