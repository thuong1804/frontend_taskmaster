// import React from 'react'
// import { cookies } from 'next/headers'

// export default function MasterLayout() {
//     const cookieStore = cookies()
//     const cookies = cookieStore.get('login')

//      useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const cookies = getCookies('login');
//                 if (cookies && cookies.login) {
//                     const res = await handelGetProfileUser();
//                     setUser(res.data.data.content);
//                 }
//             } catch (error) {
//                 console.error("Error fetching user profile:", error);
//             }
//         };
//         fetchData();
//     }, [setUser])

//   return (
//     <div>MasterLayout</div>
//   )
// }
