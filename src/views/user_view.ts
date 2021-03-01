import User from "../entities/User"

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }

}
