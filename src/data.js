export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': Boolean(Math.round(Math.random())),
    'sa': false,
    'su': false,
  },
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const filterData = (arr) => {
  return [
    {
      'title': `all`,
      'count': arr.length,
    },
    {
      'title': `overdue`,
      'count': arr.filter((it) => {
        return new Date(it.dueDate).getDate() > new Date(Date.now()).getDate();
      }).length
    },
    {
      'title': `today`,
      'count': arr.filter((it) => {
        return new Date(it.dueDate).getDate() === new Date(Date.now()).getDate();
      }).length
    },
    {
      'title': `favorites`,
      'count': arr.filter((it) => it.isFavorite).length
    },
    {
      'title': `repeating`,
      'count': arr.filter((obj) => {
        return Object.keys(obj.repeatingDays).some((it) => {
          return obj.repeatingDays[it];
        });
      }).length
    },
    {
      'title': `tags`,
      'count': arr.filter((it) => {
        return it.tags.size > 0;
      }).length
    },
    {
      'title': `archives`,
      'count': arr.filter((it) => it.isArchive).length
    },
  ];
};
