import * as cheerio from 'cheerio';
import axios from 'axios';
import * as fs from 'fs';

export default async function scrape(): Promise<string> {
  const AxiosInstance = axios.create();
  let news: string = 'Error!';

  await AxiosInstance.get('https://www.unict.it/it/news?page=0').then(res => {
    const $ = cheerio.load(res.data);

    let data = $('div[class="content"] > div > div > div');
    let contents: string[] = [];
    data.each(function () {
      contents.push($(this).text());
    });

    /* toFile(contents.join());
      console.log('File has been saved!'); */

    news = contents.join(
      '\n------------------------------------------------------------------------\n'
    );
  });
  return news;
}

function toFile(text: string) {
  fs.writeFile('res.txt', text, error => {
    if (error) throw error;
  });
}
