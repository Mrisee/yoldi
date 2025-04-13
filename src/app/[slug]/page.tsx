'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'

import { EditProfileModal } from '@/components/EditProfileModal'
import { Button, SIZE, VARIANT } from '@/components/UI/Button'
import { Avatar, AVARIANT } from '@/components/Avatar'
import { Loader } from '@/components/UI/Loader'
import { Cover } from '@/components/Cover'

import { selectImageFile } from '@/lib/selectImageFile'
import { uploadImage } from '@/lib/uploadImage'

import styles from './styles.module.scss'
import { Pen, SignOut } from '@/assets/icons'

export default function UserProfilePage() {
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { slug } = useParams()
  const currentUser = useAuthStore((state) => state.currentUser)
  const token = useAuthStore((state) => state.token)
  const updateProfile = useAuthStore.getState().updateProfile
  const { selectedUser, fetchUserBySlug, error, isLoading } = useUsersStore()

  const logout = useAuthStore((state) => state.logout)

  const handleAvatarUpload = async () => {
    const file = await selectImageFile()
    if (!file) return

    const image = await uploadImage(file)
    updateProfile({ imageId: image.id, ...selectedUser }, token!)
    if (selectedUser)
      useUsersStore.setState({
        selectedUser: {
          ...selectedUser,
          image: image,
        },
      })
  }

  const handleCoverUpload = async () => {
    const file = await selectImageFile()
    if (!file || !token) return

    const image = await uploadImage(file)
    updateProfile({ coverId: image.id, ...selectedUser }, token)
    if (selectedUser)
      useUsersStore.setState({
        selectedUser: {
          ...selectedUser,
          cover: image,
        },
      })
  }

  const handleCoverRemove = async () => {
    if (!token) return

    updateProfile({ coverId: null, ...selectedUser }, token)
    if (selectedUser)
      useUsersStore.setState({
        selectedUser: {
          ...selectedUser,
          cover: null,
        },
      })
  }

  useEffect(() => {
    if (typeof slug === 'string') {
      fetchUserBySlug(slug)
    }
  }, [slug, fetchUserBySlug])

  if (error) return <p>Ошибка: {error}</p>

  const isOwnProfile = currentUser?.slug === slug

  return (
    <div className={styles.wrapper}>
      <Cover
        isOwnProfile={isOwnProfile}
        cover={selectedUser?.cover}
        onUpload={handleCoverUpload}
        onRemove={handleCoverRemove}
        isLoading={isLoading}
      />
      <div className={styles.container}>
        <Avatar
          variant={AVARIANT.PROFILE}
          name={selectedUser?.name}
          img={selectedUser?.image}
          onUpload={isOwnProfile ? handleAvatarUpload : undefined}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.about}>
              <div className={styles.info}>
                <p className={styles.name}>{selectedUser?.name}</p>
                <p className={styles.mail}>{selectedUser?.email}</p>
              </div>
              {isOwnProfile && (
                <Button
                  variant={VARIANT.SECONDARY}
                  size={SIZE.WITH_ICON}
                  onClick={() => setIsEditOpen(true)}
                  startIcon={<Pen />}
                >
                  Редактировать
                </Button>
              )}
            </div>
            <div className={styles.description}>
              {selectedUser?.description}
            </div>

            {isOwnProfile && (
              <Button
                variant={VARIANT.SECONDARY}
                size={SIZE.WITH_ICON}
                onClick={() => {
                  logout()
                  router.push('/')
                }}
                startIcon={<SignOut />}
              >
                Выйти
              </Button>
            )}
          </>
        )}
      </div>
      {isEditOpen && currentUser && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </div>
  )
}
