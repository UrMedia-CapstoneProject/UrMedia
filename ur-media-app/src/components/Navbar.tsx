import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (
        <nav style={{display: "flex", justifyContent: "space-between", backgroundColor: "#26007a"}}>
            <div style={{display: "flex"}}>
                <Link href="/catalog">
                <Image
                src="/test-images/madoka.png"
                alt="Browse"
                width={40}
                height={40}
                />
                </Link>
                <input type="text" placeholder="Search..."/>
            </div>
            <Link href="/">
                <h1>UrMedia</h1>
            </Link>
            <div style={{margin: "10px", padding: "10px"}}>
                <Link href="profile">
                    <Image
                    src="/test-images/azusa.jpg"
                    alt="Profile"
                    width={40}
                    height={40}
                    style={{ borderRadius: "15%"}}
                    />
                </Link>
            </div>
        </nav>
    )
}