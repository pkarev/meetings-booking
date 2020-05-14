const monthNames = [
    `Январь`, `Февраль`, `Март`, `Апрель`, `Май`, `Июнь`, `Июль`, `Август`, `Сентябрь`, `Октябрь`, `Ноябрь`, `Декабрь`
];

const dayNames = [
    `Воскресенье`, `Понедельник`, `Вторник`, `Среда`, `Четверг`, `Пятница`, `Суббота`
]

const getDayNameByNumber = (dayNumber: number): string => dayNames[dayNumber];

const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};

export {
    monthNames,
    dayNames,
    getDayNameByNumber,
    isToday,
};
