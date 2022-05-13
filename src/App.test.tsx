import { render, screen } from "@testing-library/react"
import Preloader from "./components/common/Preloader/Preloader"

test("renders learn react link", () => {
  render(<Preloader />)
  const linkElement = screen.getByTitle(/preloader/i)
  expect(linkElement).toBeInTheDocument()
})
