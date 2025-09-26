import UserModel, { IUser } from "../../../models/user.model";

class UserRepository {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  async save(
    userData: Pick<IUser, "userName" | "email" | "phoneNumber" | "password">
  ) {
    try {
      const user = new this.userModel({
        userName: {
          firstName: userData.userName.firstName,
          lastName: userData.userName.lastName,
        },
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
      });

      return await user.save();
    } catch (error) {
      throw new Error(`Error saving user: ${error}`);
    }
  }

  async getAdminUser(email: string) {
    try {
      return await this.userModel.findOne({ email: email, role: "admin" });
    } catch (error) {
      throw new Error(`Error fetching admin user: ${error}`);
    }
  }

  async getAllUsers(searchQuery?: Partial<IUser>) {
    try {
      const query: any = {
        role: "customer", // ✅ only customers
      };

      if (searchQuery?.userName?.firstName) {
        query["userName.firstName"] = {
          $regex: searchQuery.userName.firstName,
          $options: "i",
        }; // case-insensitive
      }
      if (searchQuery?.userName?.lastName) {
        query["userName.lastName"] = {
          $regex: searchQuery.userName.lastName,
          $options: "i",
        };
      }
      if (searchQuery?.email) {
        query.email = { $regex: searchQuery.email, $options: "i" };
      }
      if (searchQuery?.phoneNumber) {
        query.phoneNumber = { $regex: searchQuery.phoneNumber, $options: "i" };
      }

      return await this.userModel.find(query).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async getUserByID(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error}`);
    }
  }

  async updateUser(
    id: string,
    data: Pick<IUser, "userName" | "email" | "phoneNumber">
  ) {
    try {
      return await this.userModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }

  // get total number of userfrom database
  async countUsers() {
    try {
      return await this.userModel.countDocuments();
    } catch (error) {
      throw new Error(`Error counting users: ${error}`);
    }
  }
}

export default new UserRepository();
