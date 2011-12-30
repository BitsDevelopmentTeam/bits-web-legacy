func genCounter(i int) (func(int) int, func(int) int) {
  add := func(n int) int {
    i += n
    return i
  }

  sub := func(n int) int {
    i -= n
    return i
  }
  return add, sub
}
