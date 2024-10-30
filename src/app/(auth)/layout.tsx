import Image from "next/image"

interface AuthlayoutProps {
    children: React.ReactNode
}
const Authlayout = ({ children }: AuthlayoutProps) => {
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auth max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="lgo-site" height={56} width={152} />
                    </div>
                </nav>
                {children}
            </div>
        </main>
    )
}

export default Authlayout