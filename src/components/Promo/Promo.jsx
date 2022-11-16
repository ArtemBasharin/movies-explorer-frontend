import './Promo.css';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <div className='promo__link-container'>
            <a href="/#project-about__title" className="promo__learn-more-link">
              О проекте
            </a>
            <a href="/#techs__title" className="promo__learn-more-link">
              Технологии
            </a>
            <a href="/#aboutme__title" className="promo__learn-more-link">
              Студент
            </a>
          </div>
        </div>
    </section>
  );
}
