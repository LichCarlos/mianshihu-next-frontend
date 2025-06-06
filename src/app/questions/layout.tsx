export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    //改为div，避免水合嵌套错误
    <div>
      {children}
    </div>

  )
}
