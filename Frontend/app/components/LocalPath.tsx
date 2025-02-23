"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LocalPath = () => {
  const path = usePathname()
  const [aryPath, setAryPath] = useState<string[]>([])

  useEffect(() => {
    const ary = path.split('/').filter(Boolean) // กรองค่าว่างออก
    setAryPath(ary)
  }, [path])

  return (
    <div className='w-full flex flex-row gap-2 p-2'>
      {/* Home */}
      <Link href="/"></Link>
      {aryPath.map((item, index) => {
        const fullPath = '/' + aryPath.slice(0, index + 1).join('/')
        return (
          <div key={index} className="flex items-center">
            <span>/</span>
            <Link href={fullPath} className='hover:underline hover:text-blue-500 duration-300 px-2'>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default LocalPath
