export const simulateBattery = (distance, range, battery) => {
    const kmPerPercent = range / 100;

    return battery - distance / kmPerPercent;
};