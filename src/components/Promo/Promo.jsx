import './Promo.css';


export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">

          <h1 className="promo__title">
            Учебный проект студента факультета&nbsp;Веб&#8209;разработки.
          </h1>
          <div className='promo__link-container'>
          <a href="https://goo.su/P65u" target="_blank" rel="noopener noreferrer" className="promo__learn-more-link" >
          О проекте
          </a>
          <a href="https://goo.su/P65u" target="_blank" rel="noopener noreferrer" className="promo__learn-more-link" >
          Технологии
          </a>
          <a href="https://goo.su/P65u" target="_blank" rel="noopener noreferrer" className="promo__learn-more-link" >
          Студент
          </a>
          </div>
        </div>

    </section>
  );
}
