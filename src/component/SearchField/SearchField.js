import Search from 'antd/es/input/Search'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function SearchField({
    objectName,
    queryName,
    ...props
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [input, setInput] = useState();

    const onSearch = (value, _e, info) => {
        setInput(value)
        const url = `${queryName}=${value}`
        router.replace(`${pathname}?${url}`)
    }

  return (
    <Search
        placeholder={`Please input ${queryName}!`}
        allowClear
        onSearch={onSearch}
        style={{
            width: 300,
        }}
        {...props}
    />
  )
}
