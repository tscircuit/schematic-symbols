export const mapColor = (color: string) => {
  switch (color) {
    case "primary":
      return "black"
    case "secondary":
      return "gray"
    default:
      return color
  }
}
