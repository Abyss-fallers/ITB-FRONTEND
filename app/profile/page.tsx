'use server'

import Profile from '@/components/Templates/Profile/Profile'
import { getProfile } from '@/services/profileService'
import { cookies } from 'next/headers'

const ProfilePage = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value || ''

  const name = await getProfile(accessToken)

  return <Profile name={name} />
}

export default ProfilePage
