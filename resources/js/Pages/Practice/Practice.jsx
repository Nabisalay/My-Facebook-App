// import Guest from "@/Layouts/GuestLayout";
// import { Link, router } from "@inertiajs/react";
// import { useEffect } from "react";

// function Practice({user}) {
//     function IAmButton () {
//         router.reload({
//             onSuccess: () => alert('User has been updated successfully'),
//           })
//     }
//     // let removeStartEventListener = router.on('start', (event) => {
//     //     console.log(`Starting a visit to ${event.detail.visit.url}`)
//     //   })

//     //   router.on('finish', () => {
//     //   removeStartEventListener();
//     //   })
//     let removeStartEventListener = router.on('before', (event) => {
//         if (!confirm('Are you sure you want to navigate away?')) {
//           event.preventDefault()
//         }
//       })
//       router.on('finish', () => {
//       removeStartEventListener();
//       })
//     return (
//         <>
//         <h1>Hello {user} </h1>
//         <Link href='/'  as='button' type="button">Home</Link>
//         <br />
//         <button onClick={IAmButton}>Click me to check manuel routing</button>
//         </>
//     )
// }

// Practice.layout = page => (
//     <Guest children={page}/>
// );

// export default Practice;