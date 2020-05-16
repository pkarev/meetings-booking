const WORKING_DAYS = 5;

const monthNames = [
    `Январь`, `Февраль`, `Март`, `Апрель`, `Май`, `Июнь`, `Июль`, `Август`, `Сентябрь`, `Октябрь`, `Ноябрь`, `Декабрь`
];

const dayNames = [
    `Воскресенье`, `Понедельник`, `Вторник`, `Среда`, `Четверг`, `Пятница`, `Суббота`
]

const getDayNameByNumber = (dayNumber: number): string => dayNames[dayNumber];

const getIsoShortKey = (date: Date): string => date.toISOString().substring(0, 10);

const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};

const getMonday = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);

    return day > 0 && day < 6 ?
        new Date(date.setDate(diff)) :
        new Date(date.setDate(diff + 7));
}

const getCurrentWorkWeek = (date: Date): Date[] => {
    const week = [];
    const firstDayOfWeek = getMonday(date);

    week.push(firstDayOfWeek);

    for (let i = 1; i < WORKING_DAYS; i++) {
        const nextDay = new Date(firstDayOfWeek);
        nextDay.setDate(nextDay.getDate() + i);
        week.push(nextDay);
    }

    return week;
};

export {
    monthNames,
    dayNames,
    getDayNameByNumber,
    getIsoShortKey,
    getCurrentWorkWeek,
    isToday,
};
