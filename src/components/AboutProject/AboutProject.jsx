import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="project-about">
      <div className="project-about__container">
        <h2 className="project-about__title">О проекте</h2>
        <ul className="project-about__def-list">
          <li className="project-about__def-item">
            <h3 className="project-about__def-title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="project-about__def-description">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>

          <li className="project-about__def-item">
            <h3 className="project-about__def-title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project-about__def-description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <div className="project-about__scheme">
          <div className="project-about__backend">
            <span className="project-about__backend-duration">1 неделя</span>
            <span className="project-about__scheme-title">Back-end</span>
          </div>
          <div className="project-about__frontend">
            <span className="project-about__frontend-duration">4 недели</span>
            <span className="project-about__scheme-title">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}
