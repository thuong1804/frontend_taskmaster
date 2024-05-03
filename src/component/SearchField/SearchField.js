import Search from 'antd/es/input/Search'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function SearchField({
    objectName,
    queryName,
    ...props
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [input, setInput] = useState();
    const searchParams = useSearchParams();
    const search = searchParams.get(queryName)

    const onSearch = (value, _e, info) => {
        console.log({value})
        setInput(value)
        const url = value ? `${queryName}=${value}` : '';
        router.replace(`${pathname}${url ? '?' + url : ''}`);
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        if (queryName) {
            setInput(search)
        }
    }, [queryName, search])

    return (
        <>
            <Search
                onChange={onChange}
                placeholder={`Please input ${objectName ? objectName : ''}!`}
                allowClear
                onSearch={onSearch}
                value={input}
                style={{
                    width: 300,
                }}
                {...props}
            />
        </>


    )
}
