import Link from "next/link";

 export default function NotFound() {
  return (
    <div className='flex w-full'>
        <div className="w-full flex-col min-h-screen flex items-center justify-center text-red-500 font-bold text-[30px]">
            <div>404 : Not found page</div>
            <Link href="/admin">Return to true page</Link>
        </div>
        
    </div>
  )
}