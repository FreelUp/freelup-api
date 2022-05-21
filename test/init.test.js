function sum(a, b) {
    return a+b
}

// a: 2, b: 3, resultado esperado: 5
test("Soma 2+3 com resultado 5", () => {
    expect(sum(2, 3)).toBe(5)
})