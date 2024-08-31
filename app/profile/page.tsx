'use server'

import Profile from '@/components/Templates/Profile/Profile'
import { getProfile } from '@/services/profileService'
import { cookies } from 'next/headers'

const ProfilePage = async () => {
  const token = cookies().get('token')?.value || ''
  const name = await getProfile(token)

  return <Profile name={name} />
}

export default ProfilePage
