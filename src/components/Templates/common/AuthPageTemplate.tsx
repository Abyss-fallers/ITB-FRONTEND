import Atom from '@/components/atoms'
import styles from '@/styles/(auth)/Auth.module.css'
import React from 'react'

interface AuthPageTemplateProps {
  title: string
  subtitle: string
  formFields: React.ReactNode
  submissionError: string | null
  isFormValid: boolean
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const AuthPageTemplate: React.FC<AuthPageTemplateProps> = ({
  title,
  subtitle,
  formFields,
  submissionError,
  isFormValid,
  isSubmitting,
  onSubmit,
}) => (
  <div className={styles.container}>
    <div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
    <form onSubmit={onSubmit} autoComplete="on" className={styles.form}>
      {formFields}
      {submissionError && <div className={styles.error}>{submissionError}</div>}
      <Atom.Button
        variant="primary"
        type="submit"
        disabled={!isFormValid || isSubmitting}
      >
        {title}
      </Atom.Button>
    </form>
  </div>
)

export default AuthPageTemplate
