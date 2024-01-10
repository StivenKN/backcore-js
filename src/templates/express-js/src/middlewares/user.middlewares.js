export const checkUserData = async (req, res, next) => {
  try {
    next()
  } catch (error) {
    console.error(error)
  }
}
