import UserModel, { IUser } from "../../../models/user.model";

class UserRepository {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  async save(
    userData: Pick<
      IUser,
      "userName" | "email" | "password" | "phoneNumber" | "role"
    >
  ) {
    try {
      const user = new this.userModel({
        userName: {
          firstName: userData.userName.firstName,
          lastName: userData.userName.lastName,
        },
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
      });
      return await user.save();
    } catch (error) {
      throw new Error(`Error saving user: ${error}`);
    }
  }

  async get(searchQuery?: Partial<IUser>) {
    try {
      const query: any = {};

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

      return await this.userModel.find(query);
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  }

  async getByID(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error}`);
    }
  }

  async update(
    id: string,
    data: Pick<IUser, "userName" | "email" | "password" | "phoneNumber">
  ) {
    try {
      return await this.userModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }

  async delete(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }
}

export default new UserRepository();
