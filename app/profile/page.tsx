import Layout from '@/components/layout'

const ProfilePage = () => {
  const mockProfileData = {
    avatarUrl: 'https://via.placeholder.com/150',
    name: 'Иван Иванов',
    nickname: 'ivan_dev',
    status: 'Доступен',
    bio: 'Я опытный разработчик с более чем 5 годами опыта в разработке веб-приложений. Моя специализация - фронтенд разработка с использованием React и TypeScript.',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 70 },
    ],
    projects: [
      {
        title: 'Проект 1',
        description: 'Описание проекта 1',
        link: '#',
        image: 'https://via.placeholder.com/400',
      },
      {
        title: 'Проект 2',
        description: 'Описание проекта 2',
        link: '#',
        image: 'https://via.placeholder.com/400',
      },
    ],
    reviews: [
      {
        client: 'ООО "Компания"',
        comment: 'Отличная работа! Быстро и качественно.',
        rating: 5,
        clientImage: 'https://via.placeholder.com/50',
      },
      {
        client: 'ИП "Клиент"',
        comment: 'Хороший специалист, рекомендую!',
        rating: 4,
        clientImage: 'https://via.placeholder.com/50',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Layout.Profile {...mockProfileData} />
    </div>
  )
}

export default ProfilePage
