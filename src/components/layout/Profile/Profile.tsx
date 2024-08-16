'use client'

import { useEffect } from 'react'
import { ProfileProps } from './Profile.d'
import styles from './Profile.module.css'

export const Profile: React.FC<ProfileProps> = ({
  avatarUrl,
  name,
  nickname,
  status,
  bio,
  skills,
  projects,
  reviews,
}) => {
  useEffect(() => {
    const skillbars = document.querySelectorAll(`.${styles.skillbar}`)
    skillbars.forEach((bar) => {
      const width = bar.getAttribute('data-width')
      if (width) {
        setTimeout(() => {
          ;(bar as HTMLElement).style.width = width
        }, 100)
      }
    })
  }, [])

  return (
    <div className={`max-w-4xl mx-auto p-6 ${styles.container}`}>
      <div className={styles.header}>
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.nickname}>@{nickname}</p>
          <p className={styles.status}>{status}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Обо мне</h2>
        <p>{bio}</p>
      </div>

      <div className={styles.section}>
        <h2>Навыки</h2>
        <ul>
          {skills.map((skill) => (
            <li key={skill.name} className={styles.skill__item}>
              <span className={styles.skill__name}>{skill.name}</span>
              <div className={styles.skillbar__container}>
                <div
                  className={styles.skillbar}
                  data-width={`${skill.level}%`}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Проекты</h2>
        <div>
          {projects.map((project) => (
            <div key={project.title} className={styles.project__card}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.project__image}
              />
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-700">{project.description}</p>
              <a href={project.link} className="text-blue-600 underline">
                Подробнее
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Отзывы</h2>
        <div className={styles.review__carousel}>
          {reviews.map((review, index) => (
            <div key={index} className={styles.review__item}>
              <img src={review.clientImage} alt={review.client} />
              <p className="font-semibold">{review.client}</p>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-yellow-500">Рейтинг: {review.rating} / 5</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
