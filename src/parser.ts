import * as cheerio from 'cheerio';
import axios from 'axios';
import * as fs from 'fs';

const AxiosInstance = axios.create();

AxiosInstance.get('https://www.unict.it/it/news?page=0').then(res => {
  const $ = cheerio.load(res.data);

  let data = $('div[class="content"] > div > div > div');
  let contents: string[] = [];
  data.each(function () {
    contents.push($(this).text());
  });

  let finalString: string = contents.join();

  toFile(finalString);
  console.log('File has been saved!');
});

function toFile(text: string) {
  fs.writeFile('res.txt', text, error => {
    if (error) throw error;
  });
}
