const config: Config = {
    rooms: [
        {
            name: `Зеленая`,
            capacity: `5`,
        },
        {
            name: `Красная`,
            capacity: `15`,
        },
        {
            name: `Синяя`,
            capacity: `25`,
        },
        {
            name: `Фиолетовая`,
            capacity: `25`,
        },
    ],
    timeSlots: [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00'
    ],
};

interface Config {
    rooms: MeetingRoom[];
    timeSlots: string[];
}

type MeetingRoom = {
    name: string,
    capacity: string
};

export {config, Config, MeetingRoom}
