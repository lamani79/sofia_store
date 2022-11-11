// import Footer from "./footer";
// import Nav from "./nav";
// import { collection, getDoc, getDocs } from "firebase/firestore";
// import { db } from "../pages/admin/firebase";

// import { useEffect, useRef, useState } from "react";

// const Layout = ({ children }) => {
//   const [site_data,setSite_data] = useState();
//   useEffect(() => {
//     const fetcher = (url) => fetch(url).then((res) => res.json());
//     fetcher("/api/get-site-info").then((data) => {
//       setSite_data(() => JSON.parse(data)); 
//     });
//     console.log(site_data);
//   }, [site_data]);

//   return (
//     <body lang='ar' dir="rtl" className="bg-white">
//       <Nav info={site_data} />
//       {/* <main>{children}</main> */}
//       {/* <Footer info={info} /> */}
//     </body>
//   );
// };

// export default Layout;
