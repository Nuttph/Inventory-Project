"use client"
import { useEffect } from 'react'
import { create } from 'zustand'

// state eiei
interface DetailStore {
  detailId: number
  setDetailId: (id: number) => void
}

export const DetailStoreP = create<DetailStore>((set) => ({
    detailId: parseInt(localStorage.getItem('detailId') || '0'),
  setDetailId: (id: number) => {
    set({ detailId: id })
    if (typeof window !== 'undefined') {  // ตรวจสอบว่าเป็น client-side
        localStorage.setItem('detailId', id.toString()) // เก็บค่าลง localStorage
      }
  },
}))

export const useSyncDetailId = () => {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedDetailId = localStorage.getItem('detailId')
        if (storedDetailId) {
          DetailStoreP.getState().setDetailId(parseInt(storedDetailId))
        }
      }
    }, [])
  }