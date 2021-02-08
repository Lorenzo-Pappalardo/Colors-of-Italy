import * as cheerio from 'cheerio';
import axios from 'axios';
import * as fs from 'fs';

//scrape(); // Uncomment when running this single file

export default async function scrape(): Promise<string[]> {
  const AxiosInstance = axios.create();
  let news: string[] = ['Error!'];

  await AxiosInstance.get('https://www.unict.it/it/news?page=0').then(res => {
    const $: cheerio.Root = cheerio.load(res.data);

    let data: cheerio.Cheerio = $('div[class=view-content]');

    news = [data.text()];

    //toFile(news.join('\n\n'));
  });
  return news;
}

function toFile(text: string) {
  fs.writeFile('res.txt', text, error => {
    if (error) throw error;
  });
  console.log('File has been saved!');
}
