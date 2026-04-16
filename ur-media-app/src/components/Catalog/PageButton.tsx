'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function PageButton() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (page: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page)
        router.push(`${pathname}?${params.toString()}`)
    }
}