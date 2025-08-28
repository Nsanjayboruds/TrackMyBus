// import React from "react";
// import { signInWithPopup, UserCredential } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";

// const GoogleSignInButton: React.FC = () => {
//   const handleGoogleSignIn = async (): Promise<void> => {
//     try {
//       const result: UserCredential = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       console.log("Google User:", user);
//       alert(`Welcome ${user.displayName}`);
//       // You can redirect with React Router here if needed
//     } catch (error) {
//       console.error("Google Sign-in Error:", error);
//     }
//   };

//   return (
//     <button
//       onClick={handleGoogleSignIn}
//       className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
//     >
//       Sign in with Google
//     </button>
//   );
// };

// export default GoogleSignInButton;
