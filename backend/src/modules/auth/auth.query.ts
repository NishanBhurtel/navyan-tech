// // import { AppRouteImplementationOrOptions } from "@ts-rest/express/src/lib/types";
// // import { authContract } from "../../contract/auth/auth.contract";
// // import usersRepository from "../../repository/mangodb/user/users.repository";
// // // import { AuthRequest } from "../../middleware/auth.middleware";

// // const getUserDetails: AppRouteImplementationOrOptions<
// //   typeof authContract.getProfile
// // > = async ({ req, res }) => {};

// // export const authQueryHandler = {
// //   getUserDetails,
// // };
// import { AppRouteImplementationOrOptions } from "@ts-rest/express/src/lib/types";
// import { authContract } from "../../contract/auth/auth.contract";

// const getUserDetails: AppRouteImplementationOrOptions<
//   typeof authContract.getProfile
// > = async ({ req }) => {
//   try {
//     const user = req.user;

//     if (!user) {
//       return {
//         status: 404,
//         body: {
//           success: false,
//           error: "Unauthorized: No user found",
//         },
//       };
//     }

//     return {
//       status: 200,
//       body: {
//         success: true,
//         user: {
//           _id: user._id.toString(),
//           firstName: user.firstName,
//           lastName: user.lastName,
//           email: user.email,
//           role: user.role,
//           bio: user.bio,
//           location: user.location,
//           phoneNumber: user.phoneNumber,
//           createdAt: user.createdAt.toISOString(),
//           updatedAt: user.updatedAt.toISOString(),
//         },
//       },
//     };
//   } catch (error: any) {
//     console.error("Error in getUserDetails:", error.message);
//     return {
//       status: 500,
//       body: {
//         success: false,
//         error: "Internal Server Error",
//       },
//     };
//   }
// };

// export const authQueryHandlers = {
//   getUserDetails,
// };

// export default authQueryHandlers;
