const convertUnixTime = (time: number) => {
    let currentTimeString = 'Now';
    const timeNow = new Date(((new Date().getTime() - time)))

    const minutes = timeNow.getMinutes()
    const hours = Math.abs(Math.round((timeNow.getTime() / 1000 / 3600)))
    const days = hours > 24 ? (hours / 24).toFixed(0) : 0
    const weeks = days > 7 ? (days as number / 7).toFixed(0) : 0
    const months = days > 30 ? (days as number/ 30).toFixed(0) : 0
    const years = months > 12 ? (months as number / 12).toFixed(0) : 0
    const nowTime = minutes === 0 ? 'Now' : 0

    const currentTime = (years || months || weeks || days || hours || minutes || nowTime)
    currentTimeString = (currentTime === years && currentTime.toString() + ' year')
        || (currentTime === months && currentTime.toString() + ' month')
        || (currentTime === weeks && currentTime.toString() + ' week')
        || (currentTime === days && currentTime.toString() + ' day')
        || (currentTime === hours && currentTime.toString() + ' hour')
        || (currentTime === minutes && currentTime.toString() + ' minutes')
        || 'Now'

    return currentTimeString
}

export default convertUnixTime