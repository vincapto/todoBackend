import axios from 'axios';
import { type } from 'os';
import { ITodoField } from './model';

const proxy = 'http://localhost:5000/';

type sortKey = { [key: string]: string };

export async function getData(url: string, sort: sortKey) {
  try {
    const { data } = await axios.get(proxy + url, {
      data: {
        sort: sort,
      },
    });
    console.log(`%cdata response : `, 'font-size:25px', data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

export async function postData(url: string, data: ITodoField) {
  const status = await axios.post(proxy + url, data);
  console.log('STATUS POST', status.data);
  return status;
}

export async function deleteData(url: string, _id: number) {
  const status = await axios.delete(proxy + url, {
    data: { _id },
  });
  console.log('STATUS DELETE', status.data);
}

export async function updateData(url: string, fields: any) {
  const status = await axios.put(proxy + url, fields);
  console.log('STATUS UPDATE', status.data);
}
