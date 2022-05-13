const { render, screen, fireEvent } = require("@testing-library/react")
const { default: Status } = require("../../components/Profile/MyPosts/Status")

describe("Profile status tests", () => {
  test("status should be in state", () => {
    render(<Status status="newStatus" />)
    const statusElement = screen.getByText(/newStatus/i)
    expect(statusElement).toBeInTheDocument()
  })
  test("initially in DOM must be span", () => {
    render(<Status status="newStatus" />)
    expect(screen.getByTitle("span")).toBeInTheDocument()
    expect(screen.getByText("newStatus")).toBeInTheDocument()
  })
  test("after dc in DOM must be input and backwards", () => {
    render(<Status status="newStatus" updateStatus={() => {}} />)
    const span = screen.getByTitle("span")
    fireEvent.doubleClick(span)
    const input = screen.getByTitle("input")
    expect(input).toBeInTheDocument()
    expect(input.value).toBe("newStatus")
    fireEvent.focusOut(input)
    expect(input).not.toBeInTheDocument()
  })
})
