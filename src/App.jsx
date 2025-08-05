import React, { useState, useEffect } from 'react';
import { Calendar, User, Settings, BookOpen, Share2, LogIn, LogOut, Moon, Sun, ChevronDown, ChevronUp, Plus, Edit3, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- МОК-ДАННЫЕ ИЗ ВАШЕГО КАЛЕНДАРЯ ---
// Данные для 24 дней цикла
const CYCLE_DATA = [
  {
    "day": 1,
    "date": "07.07.2025",
    "lunarCycle": "",
    "hormones": "Понижение эстрогена и прогестерона",
    "phase": "Менструация",
    "feelings": "Усталость, интроверсия",
    "tasksGeneral": "Отдых, восстановление",
    "tasksSpecific": "Список желаний – 5 мин",
    "lunarRitual": "Спа обертывания; \nмедитация в тишине; ",
    "ritualMovements": "Поглаживание вниз по центру тела",
    "affirmation": "Я даю себе отдых.",
    "colorDay": "Чёрный серый",
    "aroma": "Ладан",
    "spaRitual": "Тёплая ванна с солью и лавандой",
    "music": "Эмбиент, звуки природы, \nмантры, тибетские чаши",
    "reading": "Поэзия, дневники, философия, мягкая женская проза",
    "teas": "Мята, ромашка, мелисса,\n крапива (восполнение железа), \nимбирь (против боли)",
    "workouts": "Йога лёжа, прогулка",
    "nutrition": "Каша на воде / суп / тушёные овощи",
    "supportGoal": "Обезболивание, снятие спазмов,\n расслабление"
  },
  {
    "day": 2,
    "date": "08.07.2025",
    "lunarCycle": "",
    "hormones": "Снижение гормонов",
    "phase": "Менструация",
    "feelings": "Слабость, тяга к уединению",
    "tasksGeneral": "Планирование лёгкое",
    "tasksSpecific": "Контроль показателей веса и фигуры\nРазмышление: что меня вдохновляет?",
    "lunarRitual": "",
    "ritualMovements": "Поглаживание вниз по центру тела",
    "affirmation": "Моё тело знает, что ему нужно.",
    "colorDay": "Чёрный серый",
    "aroma": "Шалфей мускатный",
    "spaRitual": "Лёгкий массаж живота с маслом лаванды",
    "music": "Эмбиент, звуки природы, \nмантры, тибетские чаши",
    "reading": "Поэзия, дневники, философия, мягкая женская проза",
    "teas": "Мята, ромашка, мелисса,\n крапива (восполнение железа), \nимбирь (против боли)",
    "workouts": "Прогулка",
    "nutrition": "Ячневая каша / тушеные кабачки / отварное яйцо",
    "supportGoal": "Обезболивание, снятие спазмов,\n расслабление"
  },
  {
    "day": 3,
    "date": "09.07.2025",
    "lunarCycle": "",
    "hormones": "Низкие гормоны",
    "phase": "Менструация",
    "feelings": "Интуитивность, слабость",
    "tasksGeneral": "Освобождение от лишнего",
    "tasksSpecific": "Чтение/просмотр: фэнтези, фантастика\nСудоку, гайст",
    "lunarRitual": "",
    "ritualMovements": "Поглаживание вниз по центру тела",
    "affirmation": "Я принимаю себя полностью.",
    "colorDay": "Чёрный серый",
    "aroma": "Лаванда",
    "spaRitual": "Маска для лица + успокаивающий чай",
    "music": "Эмбиент, звуки природы, \nмантры, тибетские чаши",
    "reading": "Поэзия, дневники, философия, мягкая женская проза",
    "teas": "Мята, ромашка, мелисса,\n крапива (восполнение железа), \nимбирь (против боли)",
    "workouts": "Лёгкая растяжка",
    "nutrition": "Печёное яблоко / суп / пюре с гречкой",
    "supportGoal": "Обезболивание, снятие спазмов,\n расслабление"
  },
  {
    "day": 4,
    "date": "10.07.2025",
    "lunarCycle": "",
    "hormones": "Медленно растёт эстроген",
    "phase": "Менструация",
    "feelings": "Возврат энергии, чуткость",
    "tasksGeneral": "Лёгкие дела",
    "tasksSpecific": "Написать шутку\nПосмотреть комедию",
    "lunarRitual": "",
    "ritualMovements": "Поглаживание вниз по центру тела",
    "affirmation": "Я достойна любви и покоя.",
    "colorDay": "Чёрный серый",
    "aroma": "Ладан",
    "spaRitual": "СПА для ног: ванночка, скраб, крем",
    "music": "Эмбиент, звуки природы, \nмантры, тибетские чаши",
    "reading": "Поэзия, дневники, философия, мягкая женская проза",
    "teas": "Мята, ромашка, мелисса,\n крапива (восполнение железа), \nимбирь (против боли)",
    "workouts": "Танец в комнате",
    "nutrition": "Овсянка / лёгкое рагу / овощи на пару",
    "supportGoal": "Обезболивание, снятие спазмов,\n расслабление"
  },
  {
    "day": 5,
    "date": "11.07.2025",
    "lunarCycle": "",
    "hormones": "Начало роста эстрогена",
    "phase": "Менструация",
    "feelings": "Осознание, очищение",
    "tasksGeneral": "Подведение итогов",
    "tasksSpecific": "Написать подруге Ане Воробей\nНаписать Диане (подружка)",
    "lunarRitual": "",
    "ritualMovements": "Поглаживание вниз по центру тела",
    "affirmation": "Я прощаю и отпускаю.",
    "colorDay": "Чёрный серый",
    "aroma": "Шалфей мускатный",
    "spaRitual": "Йога и ароматерапия, благовония",
    "music": "Эмбиент, звуки природы, \nмантры, тибетские чаши",
    "reading": "Поэзия, дневники, философия, мягкая женская проза",
    "teas": "Мята, ромашка, мелисса,\n крапива (восполнение железа), \nимбирь (против боли)",
    "workouts": "Растяжка",
    "nutrition": "Рис с овощами / йогурт / суп с зеленью",
    "supportGoal": "Обезболивание, снятие спазмов,\n расслабление"
  },
  {
    "day": 6,
    "date": "12.07.2025",
    "lunarCycle": "",
    "hormones": "Рост эстрогена",
    "phase": "Фолликулярная",
    "feelings": "Лёгкость, энергия",
    "tasksGeneral": "Новые идеи, активность",
    "tasksSpecific": "Планирование: составить план на месяц по всем сферам\nОценить сферу хобби, написать задачу",
    "lunarRitual": "Лёгкая разминка; \nтанец под музыку;\nзапись трёх намерений",
    "ritualMovements": "Руки вверх “Y”, дождь вниз",
    "affirmation": "Я наполнена свежестью.",
    "colorDay": "Голубой розовый белый",
    "aroma": "Лимон",
    "spaRitual": "Скраб тела + контрастный душ",
    "music": "Инди-поп, chill house, арт-рок",
    "reading": "Саморазвитие, фэнтези, приключения, бизнес, мемуары",
    "teas": "Крапива, шиповник, одуванчик, \nзелёный чай (в умеренном количестве)",
    "workouts": "Йога, пилатес",
    "nutrition": "Тост с яйцом / киноа с овощами / курица на пару",
    "supportGoal": "Энергия, восстановление, очищение"
  },
  {
    "day": 7,
    "date": "13.07.2025",
    "lunarCycle": "",
    "hormones": "Повышается эстроген",
    "phase": "Фолликулярная",
    "feelings": "Соц-активность, ясность ума",
    "tasksGeneral": "Встречи, мозговые штурмы",
    "tasksSpecific": "Профессиональные навыки: обучение\nПсихология: уроки",
    "lunarRitual": "",
    "ritualMovements": "Руки вверх “Y”, дождь вниз",
    "affirmation": "Я открыта возможностям.",
    "colorDay": "Голубой розовый белый",
    "aroma": "Мята",
    "spaRitual": "",
    "music": "Инди-поп, chill house, арт-рок",
    "reading": "Саморазвитие, фэнтези, приключения, бизнес, мемуары",
    "teas": "Крапива, шиповник, одуванчик, \nзелёный чай (в умеренном количестве)",
    "workouts": "Силовая + кардио",
    "nutrition": "Овсянка / паста с овощами / индейка с рисом",
    "supportGoal": "Энергия, восстановление, очищение"
  },
  {
    "day": 8,
    "date": "14.07.2025",
    "lunarCycle": "",
    "hormones": "Эстроген высок",
    "phase": "Фолликулярная",
    "feelings": "Энергия на подъёме",
    "tasksGeneral": "Проекты, творчество",
    "tasksSpecific": "1 задача из списка геймдизайн\nПост в канале геймдизайн \nурок этикета ",
    "lunarRitual": "",
    "ritualMovements": "Руки вверх “Y”, дождь вниз",
    "affirmation": "Я сияю энергией.",
    "colorDay": "Голубой розовый белый",
    "aroma": "Розмарин",
    "spaRitual": "Маска для волос + обёртывание",
    "music": "Инди-поп, chill house, арт-рок",
    "reading": "Саморазвитие, фэнтези, приключения, бизнес, мемуары",
    "teas": "Крапива, шиповник, одуванчик, \nзелёный чай (в умеренном количестве)",
    "workouts": "Танцы, плавание",
    "nutrition": "Творог / курица с булгуром / тушёные овощи",
    "supportGoal": "Энергия, восстановление, очищение"
  },
  {
    "day": 9,
    "date": "15.07.2025",
    "lunarCycle": "",
    "hormones": "Высокий эстроген",
    "phase": "Фолликулярная",
    "feelings": "Вдохновение, мотивация",
    "tasksGeneral": "Развитие, обучение",
    "tasksSpecific": "Уборка\nПроверить список клиентов (страхование)",
    "lunarRitual": "",
    "ritualMovements": "Руки вверх “Y”, дождь вниз",
    "affirmation": "Я создаю свою реальность.",
    "colorDay": "Розовый Жёлтый белый",
    "aroma": "Лимон",
    "spaRitual": "",
    "music": "Инди-поп, chill house, арт-рок",
    "reading": "Саморазвитие, фэнтези, приключения, бизнес, мемуары",
    "teas": "Крапива, шиповник, одуванчик, \nзелёный чай (в умеренном количестве)",
    "workouts": "Йога и растяжка",
    "nutrition": "Хлебцы / рис с курицей / салат с яйцом",
    "supportGoal": "Энергия, восстановление, очищение"
  },
  {
    "day": 10,
    "date": "16.07.2025",
    "lunarCycle": "",
    "hormones": "Пик эстрогена",
    "phase": "Фолликулярная",
    "feelings": "Харизма, концентрация",
    "tasksGeneral": "Общение, уверенность",
    "tasksSpecific": "Время психотерапии\nПосетить светское мероприятие",
    "lunarRitual": "",
    "ritualMovements": "Руки вверх “Y”, дождь вниз",
    "affirmation": "Я уверена в своей ценности.",
    "colorDay": "Розовый Жёлтый белый",
    "aroma": "Мята",
    "spaRitual": "Ритуал красоты лица: скраб, маска, крем",
    "music": "Инди-поп, chill house, арт-рок",
    "reading": "Саморазвитие, фэнтези, приключения, бизнес, мемуары",
    "teas": "Крапива, шиповник, одуванчик, \nзелёный чай (в умеренном количестве)",
    "workouts": "Прогулка + танец",
    "nutrition": "Омлет / чечевица / запечённые кабачки",
    "supportGoal": "Энергия, восстановление, очищение"
  },
  {
    "day": 11,
    "date": "17.07.2025",
    "lunarCycle": "",
    "hormones": "Пик ЛГ и ФСГ, овуляция",
    "phase": "Овуляторный пик",
    "feelings": "Пик энергии, сексуальность",
    "tasksGeneral": "Флирт, творчество, выступления",
    "tasksSpecific": "Посетить светское мероприятие\nподготовка к Свидание\nРитуал Искра",
    "lunarRitual": "Зажечь свечу; \n5 вдохов-выдохов;\n мантра вдохновения",
    "ritualMovements": "Круг вокруг груди и живота, раскрытие рук",
    "affirmation": "Я магнетична и притягательна.",
    "colorDay": "Красный белый чёрный",
    "aroma": "Жасмин",
    "spaRitual": "Ванна с лепестками, свечи, музыка",
    "music": "Поп, R&B, танцевальная музыка",
    "reading": "Современные романы, юмор, эротика, мотивационные книги",
    "teas": "Красный клевер, лепестки розы, \nлист малины (гормональный баланс)",
    "workouts": "Активный танец",
    "nutrition": "Йогурт / бурый рис / индейка с зеленью",
    "supportGoal": "Поддержка овуляции, женское здоровье"
  },
  {
    "day": 12,
    "date": "18.07.2025",
    "lunarCycle": "",
    "hormones": "Эстроген на пике",
    "phase": "Овуляция",
    "feelings": "Женственность, романтика",
    "tasksGeneral": "Свидание, творчество",
    "tasksSpecific": "свидание\nСалон красоты – маникюр, педикюр, \nламинирование",
    "lunarRitual": "",
    "ritualMovements": "Круг вокруг груди и живота, раскрытие рук",
    "affirmation": "Я наслаждаюсь своей женственностью.",
    "colorDay": "Красный белый чёрный",
    "aroma": "Иланг-иланг",
    "spaRitual": "Увлажнение и аромат с феромонами",
    "music": "Поп, R&B, танцевальная музыка",
    "reading": "Современные романы, юмор, эротика, мотивационные книги",
    "teas": "Красный клевер, лепестки розы, \nлист малины (гормональный баланс)",
    "workouts": "Вода, танцы",
    "nutrition": "Смузи / киноа / куриные рулеты",
    "supportGoal": "Поддержка овуляции, женское здоровье"
  },
  {
    "day": 13,
    "date": "19.07.2025",
    "lunarCycle": "",
    "hormones": "Начало роста прогестерона",
    "phase": "Постовуляторная",
    "feelings": "Стабильность, уют",
    "tasksGeneral": "Домашние дела, финансы",
    "tasksSpecific": "Пост на канале «Авк.Полис»\nНаписать пост геймдизайн",
    "lunarRitual": "",
    "ritualMovements": "Круг вокруг груди и живота, раскрытие рук",
    "affirmation": "Я чувствую тепло и заботу.",
    "colorDay": "Жёлтый белый",
    "aroma": "Герань",
    "spaRitual": "Патчи для глаз + массаж лица",
    "music": "Поп, R&B, танцевальная музыка",
    "reading": "Современные романы, юмор, эротика, мотивационные книги",
    "teas": "Красный клевер, лепестки розы, \nлист малины (гормональный баланс)",
    "workouts": "Вода, танцы",
    "nutrition": "Каша с маслом / суп-пюре / курица с картофелем",
    "supportGoal": "Поддержка овуляции, женское здоровье"
  },
  {
    "day": 14,
    "date": "20.07.2025",
    "lunarCycle": "",
    "hormones": "Начало роста прогестерона",
    "phase": "Постовуляторная",
    "feelings": "Легкое напряжение, сонливость",
    "tasksGeneral": "Планирование бюджета",
    "tasksSpecific": "Планирование: «Яркость жизни, путешествия и мероприятия»\nПланирование: «Семья и друзья»\nЗадача из списка для рефералки (1)\nЗадача из списка для рефералки (2)",
    "lunarRitual": "Свечи и уют; тёплый чай;\n фиксация трёх завершённых дел",
    "ritualMovements": "Восьмёрка руками перед телом",
    "affirmation": "Я забочусь о себе с любовью.",
    "colorDay": "Жёлтый белый",
    "aroma": "Роза",
    "spaRitual": "Ванна с магниевой солью + музыка",
    "music": "Поп, R&B, танцевальная музыка",
    "reading": "Современные романы, юмор, эротика, мотивационные книги",
    "teas": "\"Красный клевер, лепестки розы, \nлист малины (гормональный баланс)\"",
    "workouts": "Медленная йога",
    "nutrition": "Сырники / тушёные овощи / яйцо вкрутую",
    "supportGoal": "Поддержка овуляции, женское здоровье"
  },
  {
    "day": 15,
    "date": "21.07.2025",
    "lunarCycle": "",
    "hormones": "Прогестерон активно растёт",
    "phase": "Лютеиновая",
    "feelings": "Потребность в заботе",
    "tasksGeneral": "Минимум общения, отдых",
    "tasksSpecific": "Планирование: «Как увеличить доход на Яндекс»\nПланирование: «Подработка > 40 тыс»\nПланирование: «Финансовая гармония»\nПланирование: «Стабильный доход 60–80 к»",
    "lunarRitual": "",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я достойна покоя и уюта.",
    "colorDay": "Зелёный, синий",
    "aroma": "Кедр",
    "spaRitual": "",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Мистика, психологическая проза, эзотерика, историческая проза",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Прогулка",
    "nutrition": "Рис / овощной суп / индейка",
    "supportGoal": "Успокоение"
  },
  {
    "day": 16,
    "date": "22.07.2025",
    "lunarCycle": "",
    "hormones": "Прогестерон высокий",
    "phase": "Лютеиновая",
    "feelings": "Эмоциональность, чувствительность",
    "tasksGeneral": "Дневник, внутренняя работа",
    "tasksSpecific": "Планирование: «Квартира на море»\nПланирование: «Выпустила свою игру»\nПланирование: «Достичь гармонии с собой»",
    "lunarRitual": "",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я отпускаю всё лишнее.",
    "colorDay": "Зелёный, синий",
    "aroma": "Бергамот",
    "spaRitual": "Уход за руками: ванночка, массаж, маникюр",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Мистика, психологическая проза, эзотерика, историческая проза",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Дыхательные практики",
    "nutrition": "Гречка / салат / отварное яйцо",
    "supportGoal": "Успокоение"
  },
  {
    "day": 17,
    "date": "23.07.2025",
    "lunarCycle": "",
    "hormones": "Гормоны в равновесии",
    "phase": "Лютеиновая",
    "feelings": "Глубина, интуиция",
    "tasksGeneral": "Молчание, планирование",
    "tasksSpecific": "Планирование: «Комфорт, уют, безопасность»\nПланирование: «Красивый сад»\nРазбор гардероба\nШахматы, логика, стратегия",
    "lunarRitual": "",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я центр своей силы.",
    "colorDay": "Зелёный, синий",
    "aroma": "Лаванда",
    "spaRitual": "",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Мистика, психологическая проза, эзотерика, историческая проза",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Медитация на свечу",
    "nutrition": "Тост / рагу / нежный белок",
    "supportGoal": "Успокоение"
  },
  {
    "day": 18,
    "date": "24.07.2025",
    "lunarCycle": "",
    "hormones": "Стабильный прогестерон",
    "phase": "Лютеиновая",
    "feelings": "Немного тревожно",
    "tasksGeneral": "Задания по мелочам",
    "tasksSpecific": "Планирование: «Чек-ап здоровья»\nПосмотреть вакансии руководителя/куратора\nМезотерапия\nПосмотреть афиши/Biglion",
    "lunarRitual": "",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я в безопасности в себе.",
    "colorDay": "Зелёный, синий",
    "aroma": "Кедр",
    "spaRitual": "Тёплый компресс на живот с маслом герани",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Мистика, психологическая проза, эзотерика, историческая проза",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Прогулка, йога",
    "nutrition": "Хлебцы / овощи на пару / куриная грудка",
    "supportGoal": "Успокоение"
  },
  {
    "day": 19,
    "date": "25.07.2025",
    "lunarCycle": "",
    "hormones": "Прогестерон на пике",
    "phase": "Лютеиновая",
    "feelings": "Сонливость, раздражительность",
    "tasksGeneral": "Выбор тишины",
    "tasksSpecific": "Беговая дорожка\nТанцы\nФэнтези, летсплей, игра\nВ гости к мамочке",
    "lunarRitual": "Очисти пространство с помощью соли или дыма шалфея, зажги свечу и поставь обсидиан рядом. Сядь в спокойной позе, закрой глаза, расслабься и сосредоточься на своем дыхании. Произнеси заклинание: «Я — плод своего пути, зрелая и сияющая, принимаю изобилие с благодарностью и знаю: моя сила — во мне.» Положи обсидиан под подушку на ночь или носи с собой. Поблагодари Луну за её свет и выпей немного лунной воды для закрепления намерений. :  Очисти пространство с помощью соли или дыма шалфея, зажги свечу и поставь обсидиан рядом. Сядь в спокойной позе, закрой глаза, расслабься и сосредоточься на своем дыхании. Произнеси заклинание: «Я — плод своего пути, зрелая и сияющая, принимаю изобилие с благодарностью и знаю: моя сила — во мне.» Положи обсидиан под подушку на ночь или носи с собой. Поблагодари Луну за её свет и выпей немного лунной воды для закрепления намерений.",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я достойна любви, покоя и ясности.",
    "colorDay": "Зелёный, синий",
    "aroma": "Бергамот",
    "spaRitual": "",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Мистика, психологическая проза, эзотерика, историческая проза",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Небольшая растяжка",
    "nutrition": "Ячневая каша / отвар овощей / яйцо",
    "supportGoal": "Успокоение"
  },
  {
    "day": 20,
    "date": "26.07.2025",
    "lunarCycle": "",
    "hormones": "Эстроген и прогестерон снижаются",
    "phase": "Лютеиновая",
    "feelings": "Лёгкое ПМС, потребность в покое",
    "tasksGeneral": "Сбор энергии",
    "tasksSpecific": "Купить металл 0.1 (инвестиции)",
    "lunarRitual": "Укутаться в плед; тёплый напиток; тихая музыка",
    "ritualMovements": "Объятие себя",
    "affirmation": "Моё тело — мой союзник.",
    "colorDay": "Серый синий",
    "aroma": "Лаванда",
    "spaRitual": "",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Лёгкая проза, сказки для взрослых, короткие рассказы, притчи",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Йога при ПМС",
    "nutrition": "Печёное яблоко / суп / тёплая еда",
    "supportGoal": "Успокоение, уменьшение ПМС, \nгормональная поддержка"
  },
  {
    "day": 21,
    "date": "27.07.2025",
    "lunarCycle": "",
    "hormones": "Падение прогестерона",
    "phase": "Лютеиновая",
    "feelings": "Усталость, раздражение",
    "tasksGeneral": "Минимум дел",
    "tasksSpecific": "Написать подруге Диане\nДень отдыха\nПодготовить расписание к работе – 2 мес",
    "lunarRitual": "",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я могу замедляться.",
    "colorDay": "Серый синий",
    "aroma": "Кедр",
    "spaRitual": "Растирание стоп + лаванда",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Лёгкая проза, сказки для взрослых, короткие рассказы, притчи",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Ходьба, стретчинг",
    "nutrition": "Каша / овощи / яйцо или тофу",
    "supportGoal": "Успокоение, уменьшение ПМС, \nгормональная поддержка"
  },
  {
    "day": 22,
    "date": "28.07.2025",
    "lunarCycle": "",
    "hormones": "Гормоны снижаются",
    "phase": "Лютеиновая",
    "feelings": "Эмоциональный спад",
    "tasksGeneral": "Подготовка к менструации",
    "tasksSpecific": "Планирование: «Гармония в отношениях»\nПланирование: «Оценить колесо баланса»\nПланирование: «Ухоженная, дорогая, стройная Я»",
    "lunarRitual": "",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я принимаю свои ритмы.",
    "colorDay": "Серый синий",
    "aroma": "Бергамот",
    "spaRitual": "",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Лёгкая проза, сказки для взрослых, короткие рассказы, притчи",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Йога лежа",
    "nutrition": "Лёгкая еда, суп, варёные овощи",
    "supportGoal": "Успокоение, уменьшение ПМС, \nгормональная поддержка"
  },
  {
    "day": 23,
    "date": "29.07.2025",
    "lunarCycle": "",
    "hormones": "Низкие гормоны",
    "phase": "Лютеиновая",
    "feelings": "Грусть, ностальгия",
    "tasksGeneral": "Меньше стимулов, больше тишины",
    "tasksSpecific": "Контроль показателей веса и фигуры\nПланирование: «Вес 53 кг»\nПланирование: «Здоровая спина и шея»\nРазмышление: что меня вдохновляет?\nРазбор гардероба (завершение)",
    "lunarRitual": "",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я даю себе заботу.",
    "colorDay": "Серый синий",
    "aroma": "Лаванда",
    "spaRitual": "",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Лёгкая проза, сказки для взрослых, короткие рассказы, притчи",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Ходьба",
    "nutrition": "Банан / крем-суп / мягкая каша",
    "supportGoal": "Успокоение, уменьшение ПМС, \nгормональная поддержка"
  },
  {
    "day": 24,
    "date": "30.07.2025",
    "lunarCycle": "",
    "hormones": "Гормоны на минимуме",
    "phase": "Лютеиновая",
    "feelings": "Отпускание, завершение",
    "tasksGeneral": "Завершение цикла",
    "tasksSpecific": "Планирование: AI-гардероб\nДень подведения итогов (запись в дневник)",
    "lunarRitual": "",
    "ritualMovements": "Объятие себя",
    "affirmation": "Я достойна обновления.",
    "colorDay": "Серый синий",
    "aroma": "Кедр",
    "spaRitual": "СПА-день: душ, маска, массаж, чай, дневник",
    "music": "Lo-fi, соул, блюз, медитативный джаз",
    "reading": "Лёгкая проза, сказки для взрослых, короткие рассказы, притчи",
    "teas": "Витекс (прутняк), пижма (в малых дозах), \nлаванда, липа, ромашка, лист малины",
    "workouts": "Йога, лёжа",
    "nutrition": "Гречка / суп / тёплая овощная запеканка",
    "supportGoal": "Успокоение, уменьшение ПМС, \nгормональная поддержка"
  }
];

// Цвета фаз
const PHASE_COLORS = {
  "Менструация": "from-gray-700 to-gray-900",
  "Фолликулярная": "from-blue-200 to-pink-200",
  "Овуляторный пик": "from-red-500 to-black",
  "Овуляция": "from-red-500 to-black",
  "Постовуляторная": "from-yellow-200 to-white",
  "Лютеиновая": "from-green-200 to-blue-200"
};

// Иконки фаз
const PHASE_ICONS = {
  "Менструация": "💧",
  "Фолликулярная": "🌱",
  "Овуляторный пик": "🔥",
  "Овуляция": "🌸",
  "Постовуляторная": "🏠",
  "Лютеиновая": "🌙"
};

// Мотивационные фразы для каждого дня
const DAILY_MOTIVATION = [
  "Время заботы о себе. Дай телу отдохнуть и восстановиться. Ты заслуживаешь этого.",
  "Слушай своё тело. Оно знает, что тебе нужно сегодня.",
  "Твоя интуиция сильна. Доверяй себе и своим ощущениям.",
  "Маленькие шаги вперёд — тоже движение. Не забывай об отдыхе.",
  "Отпусти старое. Очисти пространство для нового.",
  "Твоя энергия растёт! Это отличный день для воплощения идей в жизнь.",
  "Ты полна сил и ясности. Используй это для продуктивного общения.",
  "Творчество внутри тебя бурлит. Выпусти его наружу!",
  "Ты вдохновляешь окружающих. Не бойся делиться своими идеями.",
  "Твоя харизма на пике. Расправь плечи и сияй!",
  "Ты в самом центре своей силы. Используй энергию для достижения целей.",
  "Наслаждайся своей женственностью. Ты прекрасна!",
  "Стабильность — твой союзник. Создай уют вокруг себя.",
  "Планируй с заботой о себе. Ты заслуживаешь спокойствия.",
  "Ты нуждаешься в ласке. Подари себе немного тепла и заботы.",
  "Твои эмоции важны. Позволь себе почувствовать их полностью.",
  "Твоя интуиция — твой компас. Следуй за ней.",
  "Ты справляешься отлично. Даже маленькие шаги имеют значение.",
  "Ты зрелая и сияющая. Прими изобилие с благодарностью.",
  "Твоё тело — твой союзник. Поддержи его заботой.",
  "Замедление — тоже сила. Дай себе возможность отдохнуть.",
  "Ты принимаешь свои ритмы. Это часть твоей уникальности.",
  "Ты даёшь себе заботу. Это самый важный подарок.",
  "Ты достойна обновления. Отпусти старое и встреть новое."
];

// --- КОНЕЦ МОК-ДАННЫХ ---

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ---
const getCurrentCycleDay = (lastPeriodStart) => {
  if (!lastPeriodStart) return 1;
  const start = new Date(lastPeriodStart);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return (diffDays % 24) + 1; // 1-24
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

// --- ОСНОВНОЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ ---
export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);
  const [lastPeriodStart, setLastPeriodStart] = useState('2025-07-07'); // По умолчанию из данных
  const [notes, setNotes] = useState({}); // { 'day1': 'Моя заметка' }
  const [customTasks, setCustomTasks] = useState({}); // { 'day1': ['Пользовательская задача'] }
  const [isPartnerView, setIsPartnerView] = useState(false);
  const [sharedDataSettings, setSharedDataSettings] = useState({
    phase: true,
    feelings: true,
    tasks: true,
    colorDay: true,
    affirmation: true,
    supportGoal: true
  });

  const currentDay = getCurrentCycleDay(lastPeriodStart);
  const dayData = CYCLE_DATA.find(d => d.day === currentDay) || CYCLE_DATA[0];

  // Загрузка данных из localStorage при монтировании (для офлайн-режима)
  useEffect(() => {
    const savedUser = localStorage.getItem('cycleUser');
    const savedPeriodStart = localStorage.getItem('lastPeriodStart');
    const savedNotes = localStorage.getItem('cycleNotes');
    const savedCustomTasks = localStorage.getItem('customTasks');

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedPeriodStart) setLastPeriodStart(savedPeriodStart);
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedCustomTasks) setCustomTasks(JSON.parse(savedCustomTasks));
  }, []);

  // Сохранение данных в localStorage при изменении (для офлайн-режима)
  useEffect(() => {
    if (currentUser) localStorage.setItem('cycleUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lastPeriodStart', lastPeriodStart);
  }, [lastPeriodStart]);

  useEffect(() => {
    localStorage.setItem('cycleNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('customTasks', JSON.stringify(customTasks));
  }, [customTasks]);

  // --- ФУНКЦИИ ДЛЯ ВЗАИМОДЕЙСТВИЯ С ПРИЛОЖЕНИЕМ ---
  const handleLogin = () => {
    const email = prompt("Введите ваш email:");
    if (email) {
      const user = { id: Date.now(), email, name: email.split('@')[0] };
      setCurrentUser(user);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cycleUser');
  };

  const handleSetPeriodStart = () => {
    const date = prompt("Введите дату начала последней менструации (ГГГГ-ММ-ДД):", lastPeriodStart);
    if (date) {
      setLastPeriodStart(date);
    }
  };

  const handleAddNote = (day, note) => {
    setNotes(prev => ({ ...prev, [`day${day}`]: note }));
  };

  const handleAddCustomTask = (day, task) => {
    setCustomTasks(prev => ({
      ...prev,
      [`day${day}`]: [...(prev[`day${day}`] || []), task]
    }));
  };

  const togglePartnerView = () => {
    setIsPartnerView(!isPartnerView);
  };

  const toggleSharedData = (key) => {
    setSharedDataSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- КОМПОНЕНТЫ ---
  const CollapsibleSection = ({ title, children, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border border-gray-200 rounded-lg mb-3 overflow-hidden">
        <button
          className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <span className="font-medium">{title}</span>
          </div>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-3 bg-white">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const DayDetail = ({ day, isPartner = false }) => {
    const data = CYCLE_DATA.find(d => d.day === day) || CYCLE_DATA[0];
    const note = notes[`day${day}`] || '';
    const userTasks = customTasks[`day${day}`] || [];

    const handleNoteChange = (e) => {
      handleAddNote(day, e.target.value);
    };

    const handleAddTask = () => {
      const task = prompt("Введите новую задачу:");
      if (task) handleAddCustomTask(day, task);
    };

    if (isPartner) {
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">День {data.day}: {data.phase}</h2>
          <div className="space-y-4">
            {sharedDataSettings.phase && (
              <div>
                <h3 className="font-semibold">Фаза:</h3>
                <p>{data.phase}</p>
              </div>
            )}
            {sharedDataSettings.feelings && (
              <div>
                <h3 className="font-semibold">Самочувствие:</h3>
                <p>{data.feelings}</p>
              </div>
            )}
            {sharedDataSettings.tasks && (
              <div>
                <h3 className="font-semibold">Задачи:</h3>
                <ul className="list-disc pl-5">
                  <li>{data.tasksGeneral}</li>
                  {data.tasksSpecific.split('\n').map((task, i) => <li key={i}>{task}</li>)}
                </ul>
              </div>
            )}
            {sharedDataSettings.colorDay && (
              <div>
                <h3 className="font-semibold">Цвет дня:</h3>
                <p>{data.colorDay}</p>
              </div>
            )}
            {sharedDataSettings.affirmation && (
              <div>
                <h3 className="font-semibold">Аффирмация:</h3>
                <p>{data.affirmation}</p>
              </div>
            )}
            {sharedDataSettings.supportGoal && (
              <div>
                <h3 className="font-semibold">Цель поддержки:</h3>
                <p>{data.supportGoal}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">День {data.day}: {data.phase}</h2>
        <p className="text-sm text-gray-500 mb-4">{formatDate(data.date)}</p>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium">Мотивация дня:</p>
          <p className="italic">"{DAILY_MOTIVATION[data.day - 1]}"</p>
        </div>

        <CollapsibleSection title="Гормоны" icon=" hormone">
          <p>{data.hormones}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Самочувствие" icon="🧘‍♀️">
          <p>{data.feelings}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Задачи" icon="✅">
          <ul className="list-disc pl-5 mb-2">
            <li>{data.tasksGeneral}</li>
            {data.tasksSpecific.split('\n').map((task, i) => <li key={i}>{task}</li>)}
          </ul>
          <h4 className="font-medium mt-3 mb-1">Мои задачи:</h4>
          <ul className="list-disc pl-5 mb-2">
            {userTasks.map((task, i) => <li key={i}>{task}</li>)}
          </ul>
          <button
            onClick={handleAddTask}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Plus size={16} className="mr-1" /> Добавить задачу
          </button>
        </CollapsibleSection>

        <CollapsibleSection title="Лунный ритуал" icon="🌙">
          {data.lunarRitual ? (
            <p className="whitespace-pre-line">{data.lunarRitual}</p>
          ) : (
            <p>Нет ритуала для этого дня.</p>
          )}
        </CollapsibleSection>

        <CollapsibleSection title="Ритуальные движения" icon="💃">
          <p>{data.ritualMovements}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Аффирмация" icon="✨">
          <p>{data.affirmation}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Цвет и аромат" icon="🎨">
          <p><span className="font-medium">Цвет дня:</span> {data.colorDay}</p>
          <p><span className="font-medium">Аромат:</span> {data.aroma}</p>
        </CollapsibleSection>

        <CollapsibleSection title="СПА-ритуал" icon="🛁">
          <p>{data.spaRitual}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Музыка" icon="🎵">
          <p className="whitespace-pre-line">{data.music}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Чтение" icon="📚">
          <p>{data.reading}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Чаи" icon="🍵">
          <p className="whitespace-pre-line">{data.teas}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Тренировки" icon="💪">
          <p>{data.workouts}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Питание" icon="🥗">
          <p>{data.nutrition}</p>
        </CollapsibleSection>

        <CollapsibleSection title="Цель поддержки" icon="🎯">
          <p className="whitespace-pre-line">{data.supportGoal}</p>
        </CollapsibleSection>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Мои заметки:</h3>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Добавьте свои заметки к этому дню..."
            className="w-full p-2 border border-gray-300 rounded h-24"
          />
        </div>
      </div>
    );
  };

  const CalendarView = () => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Календарь цикла (24 дня)</h2>
        <div className="grid grid-cols-4 gap-2">
          {CYCLE_DATA.map((day) => (
            <motion.button
              key={day.day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg text-center border ${
                day.day === currentDay
                  ? 'bg-blue-500 text-white border-blue-600'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => {
                setCurrentView('day');
                // В реальном приложении мы бы передавали day.day как prop
                // Но для простоты мок-данных, мы просто меняем view
              }}
            >
              <div className="text-lg font-bold">{day.day}</div>
              <div className="text-xs mt-1">{PHASE_ICONS[day.phase]}</div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    return (
      <div className="p-4">
        <div className={`p-4 rounded-xl mb-6 text-white ${PHASE_COLORS[dayData.phase] || 'bg-gray-200'}`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">День {currentDay}</h2>
              <p className="text-lg">{dayData.phase} {PHASE_ICONS[dayData.phase]}</p>
              <p className="mt-2">{dayData.feelings}</p>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">Начало цикла:</p>
              <p className="text-sm">{formatDate(lastPeriodStart)}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
          <p className="font-medium">Мотивация дня:</p>
          <p className="italic">"{DAILY_MOTIVATION[currentDay - 1]}"</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setCurrentView('calendar')}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Calendar className="mb-2" />
            <span>Календарь</span>
          </button>
          <button
            onClick={() => setCurrentView('day')}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="mb-2" />
            <span>Детали дня</span>
          </button>
          <button
            onClick={() => setCurrentView('settings')}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Settings className="mb-2" />
            <span>Настройки</span>
          </button>
          <button
            onClick={togglePartnerView}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Share2 className="mb-2" />
            <span>
              {isPartnerView ? "Мой профиль" : "Для партнера"}
            </span>
          </button>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-bold mb-2">Быстрые действия</h3>
          <button
            onClick={handleSetPeriodStart}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded mb-2 text-left"
          >
            Установить начало цикла
          </button>
          <button
            onClick={() => {
              const note = prompt("Быстрая заметка для сегодняшнего дня:");
              if (note) handleAddNote(currentDay, note);
            }}
            className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded text-left"
          >
            Добавить заметку
          </button>
        </div>
      </div>
    );
  };

  const SettingsView = () => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Настройки</h2>
        
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-bold mb-3">Настройки цикла</h3>
          <div className="mb-3">
            <p className="text-sm text-gray-600">Дата начала последнего цикла:</p>
            <p className="font-medium">{formatDate(lastPeriodStart)}</p>
          </div>
          <button
            onClick={handleSetPeriodStart}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Изменить дату
          </button>
        </div>

        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-bold mb-3">Общий доступ для партнера</h3>
          <p className="text-sm text-gray-600 mb-3">
            Выберите, какие данные видны вашему партнеру:
          </p>
          <div className="space-y-2">
            {Object.entries(sharedDataSettings).map(([key, value]) => {
              const labels = {
                phase: "Фаза",
                feelings: "Самочувствие",
                tasks: "Задачи",
                colorDay: "Цвет дня",
                affirmation: "Аффирмация",
                supportGoal: "Цель поддержки"
              };
              return (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => toggleSharedData(key)}
                    className="mr-2"
                  />
                  <label htmlFor={key}>{labels[key]}</label>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <p className="text-sm">
              <span className="font-medium">Ссылка для партнера:</span>
              <br />
              <span className="break-all text-blue-600">
                {window.location.origin}/partner?view=shared
              </span>
            </p>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-bold mb-3">Аккаунт</h3>
          {currentUser ? (
            <div>
              <p>Вы вошли как: <span className="font-medium">{currentUser.email}</span></p>
              <button
                onClick={handleLogout}
                className="mt-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded flex items-center"
              >
                <LogOut size={16} className="mr-2" /> Выйти
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            >
              <LogIn size={16} className="mr-2" /> Войти / Зарегистрироваться
            </button>
          )}
        </div>
      </div>
    );
  };

  const PartnerView = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-2">Гормональный календарь</h1>
          <p className="text-purple-600 mb-6">Информация от вашего партнера</p>
          
          <div className={`max-w-md mx-auto p-6 rounded-2xl shadow-lg text-white ${PHASE_COLORS[dayData.phase] || 'bg-gray-200'} mb-6`}>
            <div className="text-4xl mb-2">{PHASE_ICONS[dayData.phase]}</div>
            <h2 className="text-xl font-bold">День {currentDay}</h2>
            <p className="text-lg">{dayData.phase}</p>
            <p className="mt-2 italic">"{DAILY_MOTIVATION[currentDay - 1]}"</p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <DayDetail day={currentDay} isPartner={true} />
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Эта информация предоставлена вашим партнером.</p>
            <p>Для полного доступа к календарю, попросите пригласительную ссылку.</p>
          </div>
        </div>
      </div>
    );
  };

  // --- ОСНОВНАЯ НАВИГАЦИЯ ---
  const renderContent = () => {
    if (isPartnerView) {
      return <PartnerView />;
    }

    switch (currentView) {
      case 'calendar':
        return <CalendarView />;
      case 'day':
        return <DayDetail day={currentDay} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard />;
    }
  };

  // --- РЕНДЕР ---
  if (isPartnerView) {
    return renderContent();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-purple-800">Гормоны & Я</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              День {currentDay}
            </span>
            {currentUser ? (
              <div className="flex items-center">
                <span className="text-sm mr-2 hidden sm:inline">{currentUser.name}</span>
                <button onClick={handleLogout} className="p-1 rounded-full hover:bg-gray-100">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button onClick={handleLogin} className="p-1 rounded-full hover:bg-gray-100">
                <LogIn size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto pb-16">
        {renderContent()}
      </main>

      {/* Navigation */}
      {!isPartnerView && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex justify-around">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center justify-center py-2 px-4 ${
                currentView === 'dashboard' ? 'text-purple-600' : 'text-gray-500'
              }`}
            >
              <div className={`p-1 rounded-full ${currentView === 'dashboard' ? 'bg-purple-100' : ''}`}>
                {PHASE_ICONS[dayData.phase]}
              </div>
              <span className="text-xs mt-1">Главная</span>
            </button>
            <button
              onClick={() => setCurrentView('calendar')}
              className={`flex flex-col items-center justify-center py-2 px-4 ${
                currentView === 'calendar' ? 'text-purple-600' : 'text-gray-500'
              }`}
            >
              <Calendar size={20} />
              <span className="text-xs mt-1">Календарь</span>
            </button>
            <button
              onClick={() => setCurrentView('day')}
              className={`flex flex-col items-center justify-center py-2 px-4 ${
                currentView === 'day' ? 'text-purple-600' : 'text-gray-500'
              }`}
            >
              <BookOpen size={20} />
              <span className="text-xs mt-1">День</span>
            </button>
            <button
              onClick={togglePartnerView}
              className="flex flex-col items-center justify-center py-2 px-4 text-gray-500"
            >
              <Share2 size={20} />
              <span className="text-xs mt-1">Партнер</span>
            </button>
            <button
              onClick={() => setCurrentView('settings')}
              className={`flex flex-col items-center justify-center py-2 px-4 ${
                currentView === 'settings' ? 'text-purple-600' : 'text-gray-500'
              }`}
            >
              <Settings size={20} />
              <span className="text-xs mt-1">Настройки</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
