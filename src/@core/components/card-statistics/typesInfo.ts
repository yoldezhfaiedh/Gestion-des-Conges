// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type CardStatsVerticalProps = {
  Email: string
  Nom: string
  icon: ReactNode
  Prenom: string
  color?: ThemeColor
  Departement: string
  Role: string
  
}

