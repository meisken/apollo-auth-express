const onlyNumber = (string: string) => {
    return /^\d+$/.test(string)
}

export { onlyNumber } 