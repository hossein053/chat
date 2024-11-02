import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQuery = (url?: string) => {

    const searchParams = useSearchParams();
    const pathname = usePathname()
    const { push } = useRouter()

    const setQuery = (params: Record<string, string>, deleteParams?: string[]) => {
        const newParams = new URLSearchParams(searchParams?.toString() || '');
        if (deleteParams) {
            deleteParams.forEach(param => {
                newParams.delete(param);
            });
        }
        for (const [key, value] of Object.entries(params)) {
            newParams.set(key, value);
        }
        push(`${url?.length ? url : pathname}?${newParams.toString()}`, { scroll: false })
    }

    const delQuery = (key: string) => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.delete(key);
        push(`${pathname}?${params.toString()}`)
    }

    return { setQuery, delQuery }
}
