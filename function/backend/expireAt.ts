const expireAt = (sec: number) => {
    const now = new Date();
    const time = now.getTime()
    now.setTime(time + sec * 1000);
    return now
}

export { expireAt }