import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AuthlayoutProps {
    children: React.ReactNode
}
const Authlayout = ({ children }: AuthlayoutProps) => {
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auth max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                        <Image src="/logo.svg" alt="lgo-site" height={56} width={152} priority />
                        {/* <div className="flex items-center gap-2"> */}
                        <Button variant={"secondary"}>Sign Up</Button>
                        {/* </div> */}
                </nav>
                <div className="flex flex-col items-center justify-center pt-3 md:pt-14">
                {children}
                </div>
            </div>
        </main>
    )
}

export default Authlayout