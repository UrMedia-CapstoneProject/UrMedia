import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
    return (
        <nav style={{display: "flex", justifyContent: "space-between", backgroundColor: "#26007a", padding: "10px"}}>
            <div style={{display: "flex", height: "40px"}}>
                <Link href="/catalog">
                <Image
                src="/navbar-icons/browse.png"
                title="Browse Catalog"
                alt="Browse"
                width={40}
                height={40}
                style={{marginRight: "15px"}}
                />
                </Link>
                <div style={{display: "flex", backgroundColor: "#200160", borderRadius:"20px"}}>
                    <input type="text" placeholder="Search..." style={{marginLeft:"4px"}}/>
                    <Link href="/catalog" style={{margin: "5px"}}>
                        <Image
                        src="/navbar-icons/search.png"
                        title="Search"
                        alt="Search"
                        width={25}
                        height={20}
                        style={{marginRight:"2px"}}
                        />
                    </Link>
                </div>
            </div>
            <Link href="/">
                <h1 style={{fontSize: "2em", color: "#4e5150"}}>UrMedia</h1>
            </Link>
            <div>
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