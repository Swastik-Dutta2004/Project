export const getBuses = () => {
    if (typeof window === "undefined")
        return[]

    const data = localStorage.getItem("buses")
    return data ? JSON.parse(data): []
}

export const savedBuses = (buses: any) => {
    localStorage.setItem("buses", JSON.stringify(buses))
}