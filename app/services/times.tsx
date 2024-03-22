
export class formatTime {
    static getTime(lowFlow) {
        const hours = Math.floor(lowFlow / 3600);
        const minutes = Math.floor((lowFlow - hours * 3600) / 60);
        return `${hours} heure(s) ${minutes} minute(s)`
    }
}
