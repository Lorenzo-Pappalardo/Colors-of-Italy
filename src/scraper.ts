import * as cheerio from 'cheerio';
import axios from 'axios';
import * as fs from 'fs';

interface Area {
  color: string;
  regions: string[];
}

function toFile(text: string) {
  fs.writeFile('res.txt', text, error => {
    if (error) throw error;
  });
  console.log('File has been saved!');
}

export default async function scrape(): Promise<string> {
  const AxiosInstance = axios.create();

  const areas: Area[] = [
    { color: 'Rossa', regions: [] },
    { color: 'Arancione', regions: [] },
    { color: 'Gialla', regions: [] },
    { color: 'Bianca', regions: [] },
  ];

  await AxiosInstance.get(
    'http://www.salute.gov.it/portale/nuovocoronavirus/dettaglioContenutiNuovoCoronavirus.jsp?lingua=italiano&id=5351&area=nuovoCoronavirus&menu=vuoto'
  ).then(res => {
    const $: cheerio.Root = cheerio.load(res.data);
    let color = -1;

    const data: cheerio.Cheerio = $('div[class=col-md-3]').children();
    data.each((index: number, element: cheerio.Element) => {
      if ($(element).text().startsWith('document.write(area')) {
        color += 1;
      } else if ($(element).text() !== 'document.write(noRegione);') {
        const area: Area = areas[color];
        const regions: string[] | undefined = $(element).html()?.split('<br>');
        regions?.forEach((value: string) => {
          if (value !== '') {
            area.regions.push(value);
          }
        });
      }
    });
  });

  // toFile(areas.join('\n\n'));

  let finalResult: string = '';
  areas.forEach((area: Area) => {
    finalResult += '*Zona ';
    finalResult += area.color;
    finalResult += '*\n';
    if (area.regions.length === 0) {
      finalResult += '_Nessuna Regione_\n';
    }
    area.regions.forEach((region: string) => {
      finalResult += region;
      finalResult += '\n';
    });
    finalResult += '\n';
  });

  return finalResult;
}

scrape().catch(err => {
  console.error(err);
});
