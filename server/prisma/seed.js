import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	// Очищення всіх таблиць (спочатку залежності, потім головні)
  await prisma.books.deleteMany({});
  await prisma.categories.deleteMany({});
  await prisma.authors.deleteMany({});
  // Категорії
  const categories = [
    { name: 'Проза' },
    { name: 'Поезія' },
    { name: 'Драма' },
  ];

  for (const cat of categories) {
    await prisma.categories.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  // Автори
  const authors = [
    { name: 'Іван Франко', birth_year: 1856, bio: 'Український письменник' },
    { name: 'Леся Українка', birth_year: 1871, bio: 'Українська поетеса' },
    { name: 'Тарас Шевченко', birth_year: 1814, bio: 'Видатний поет і художник' },
    { name: 'Панас Мирний', birth_year: 1849, bio: 'Український письменник' },
    { name: 'Ольга Кобилянська', birth_year: 1863, bio: 'Українська письменниця' },
    { name: 'Микола Хвильовий', birth_year: 1893, bio: 'Письменник та поет' },
    { name: 'Василь Стефаник', birth_year: 1871, bio: 'Український прозаїк' },
    { name: 'Григір Тютюнник', birth_year: 1931, bio: 'Український прозаїк' },
    { name: 'Іван Котляревський', birth_year: 1769, bio: 'Письменник і драматург' },
    { name: 'Пантелеймон Куліш', birth_year: 1819, bio: 'Письменник, історик' },
  ];

  for (const author of authors) {
    await prisma.authors.upsert({
      where: { name: author.name },
      update: {},
      create: author,
    });
  }

  // Книги
 const books = [
  // Іван Франко
  { title: "Захар Беркут", authorName: "Іван Франко", categoryName: "Проза", published_year: 1883, description: "Історичний роман про боротьбу карпатських селян" },
  { title: "Лис Микита", authorName: "Іван Франко", categoryName: "Проза", published_year: 1890, description: "Басня про хитрого лиса" },
  { title: "Boa і життя", authorName: "Іван Франко", categoryName: "Поезія", published_year: 1885, description: "Збірка поезій" },
  { title: "Іван з Короткої", authorName: "Іван Франко", categoryName: "Проза", published_year: 1887, description: "Соціально-побутовий роман" },
  { title: "Вічний революціонер", authorName: "Іван Франко", categoryName: "Проза", published_year: 1895, description: "Роман про боротьбу ідеї" },
  { title: "Украдене щастя", authorName: "Іван Франко", categoryName: "Драма", published_year: 1889, description: "Драма про кохання та втрати" },


  // Леся Українка
  { title: "Бояриня", authorName: "Леся Українка", categoryName: "Драма", published_year: 1910, description: "Поетична драма" },
  { title: "Одержима", authorName: "Леся Українка", categoryName: "Проза", published_year: 1893, description: "Романтична повість" },
  { title: "Давня казка", authorName: "Леся Українка", categoryName: "Поезія", published_year: 1900, description: "Збірка казок" },
  { title: "Вибране", authorName: "Леся Українка", categoryName: "Поезія", published_year: 1915, description: "Збірка віршів" },
  { title: "Лісова пісня", authorName: "Леся Українка", categoryName: "Драма", published_year: 1911, description: "Драма про легендарні події Карпат" },

  // Панас Мирний
  { title: "Хіба ревуть воли, як ясла повні?", authorName: "Панас Мирний", categoryName: "Проза", published_year: 1880, description: "Соціально-побутовий роман" },
  { title: "Повія", authorName: "Панас Мирний", categoryName: "Проза", published_year: 1885, description: "Повість про важке життя селян" },
  { title: "Степан Радченко", authorName: "Панас Мирний", categoryName: "Проза", published_year: 1886, description: "Роман про інтелігенцію" },
  { title: "Місто", authorName: "Панас Мирний", categoryName: "Проза", published_year: 1890, description: "Соціальна повість" },
  { title: "В сім’ї", authorName: "Панас Мирний", categoryName: "Проза", published_year: 1895, description: "Оповідання про родину" },
  { title: "Стара історія", authorName: "Панас Мирний", categoryName: "Драма", published_year: 1880, description: "Драма про людські стосунки та мораль" },

  // Ольга Кобилянська
  { title: "Царівна", authorName: "Ольга Кобилянська", categoryName: "Проза", published_year: 1896, description: "Психологічна повість" },
  { title: "Земля", authorName: "Ольга Кобилянська", categoryName: "Проза", published_year: 1902, description: "Роман про селянську боротьбу" },
  { title: "В неділю рано зілля копала", authorName: "Ольга Кобилянська", categoryName: "Драма", published_year: 1898, description: "Драма про життя селян і внутрішні конфлікти" },
  { title: "Вальдшнепи", authorName: "Ольга Кобилянська", categoryName: "Проза", published_year: 1901, description: "Повість з психологічним підґрунтям" },

  // Микола Хвильовий
  { title: "Я (Романтика)", authorName: "Микола Хвильовий", categoryName: "Драма", published_year: 1929, description: "Психологічна драма про особистість та суспільство" },
  { title: "Вальдшнепи", authorName: "Микола Хвильовий", categoryName: "Проза", published_year: 1921, description: "Соціальна новела" },
  { title: "Сині троянди", authorName: "Микола Хвильовий", categoryName: "Проза", published_year: 1922, description: "Оповідання" },
  { title: "Відчуження", authorName: "Микола Хвильовий", categoryName: "Проза", published_year: 1923, description: "Роман про інтелігенцію" },
  { title: "Прометей", authorName: "Микола Хвильовий", categoryName: "Проза", published_year: 1924, description: "Новела" },

  // Василь Стефаник
  { title: "Камінний хрест", authorName: "Василь Стефаник", categoryName: "Драма", published_year: 1900, description: "Драма про сімейні трагедії та еміграцію" },
  { title: "Глибокий яр", authorName: "Василь Стефаник", categoryName: "Проза", published_year: 1901, description: "Оповідання" },
  { title: "Сини", authorName: "Василь Стефаник", categoryName: "Проза", published_year: 1902, description: "Про конфлікти поколінь" },
  { title: "Мати", authorName: "Василь Стефаник", categoryName: "Проза", published_year: 1903, description: "Коротка, але сильна повість" },
  { title: "Інші оповідання", authorName: "Василь Стефаник", categoryName: "Проза", published_year: 1904, description: "Збірка соціальної прози" },

  // Григір Тютюнник
  { title: "Три зозулі з поклоном", authorName: "Григір Тютюнник", categoryName: "Проза", published_year: 1960, description: "Оповідання про кохання" },
  { title: "Замість сонця", authorName: "Григір Тютюнник", categoryName: "Проза", published_year: 1962, description: "Оповідання" },
  { title: "Диверсант", authorName: "Григір Тютюнник", categoryName: "Проза", published_year: 1964, description: "Повість" },
  { title: "Дорога на Київ", authorName: "Григір Тютюнник", categoryName: "Проза", published_year: 1965, description: "Оповідання" },
  { title: "Вірші", authorName: "Григір Тютюнник", categoryName: "Поезія", published_year: 1967, description: "Збірка" },
  { title: "Твоя зоря", authorName: "Григір Тютюнник", categoryName: "Драма", published_year: 1965, description: "Драма про любов і втрату" },


  // Іван Котляревський
  { title: "Енеїда", authorName: "Іван Котляревський", categoryName: "Поезія", published_year: 1798, description: "Поема" },
  { title: "Наталка Полтавка", authorName: "Іван Котляревський", categoryName: "Драма", published_year: 1819, description: "Класична українська драма про кохання та обов'язок" },
  { title: "Москаль-чарівник", authorName: "Іван Котляревський", categoryName: "Проза", published_year: 1802, description: "Комедія" },
  { title: "Пан Ярмольчак", authorName: "Іван Котляревський", categoryName: "Проза", published_year: 1805, description: "Гумористичний твір" },
  { title: "Вечори на хуторі біля Диканьки", authorName: "Іван Котляревський", categoryName: "Проза", published_year: 1810, description: "Оповідання" },

  // Пантелеймон Куліш
  { title: "Чорна рада", authorName: "Пантелеймон Куліш", categoryName: "Драма", published_year: 1857, description: "Історична драма про боротьбу за владу та честь" },
  { title: "Маруся", authorName: "Пантелеймон Куліш", categoryName: "Проза", published_year: 1860, description: "Повість" },
  { title: "Записки о Южной Руси", authorName: "Пантелеймон Куліш", categoryName: "Проза", published_year: 1865, description: "Етнографічні нотатки" },
  { title: "Коротка історія України", authorName: "Пантелеймон Куліш", categoryName: "Проза", published_year: 1870, description: "Історичний твір" },
  { title: "Переклади з зарубіжної літератури", authorName: "Пантелеймон Куліш", categoryName: "Проза", published_year: 1875, description: "Переклади" },
];


  for (const book of books) {
    const author = await prisma.authors.findUnique({ where: { name: book.authorName } });
    const category = await prisma.categories.findUnique({ where: { name: book.categoryName } });

    if (author && category) {
      await prisma.books.upsert({
        where: { title: book.title }, // тепер title унікальний
        update: {},
        create: {
          title: book.title,
          description: book.description,
          published_year: book.published_year,
          authors: { connect: { id: author.id } },
          categories: { connect: { id: category.id } },
        },
      });
    }
  }

  console.log('✅ Seed завершено!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });