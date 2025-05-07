import { ReactNode } from 'react'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type CardStatsVerticalProps = {
  NomDemande: string
  User: string
  icon: ReactNode
  NombreJours: number
  color?: ThemeColor
  Date_debut: string
  Date_fin: string
  typeConge: string
  Statut: string
}
