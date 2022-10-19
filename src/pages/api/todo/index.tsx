import dbConnect from '../../../../util/mongo';
import Todo from '../../../../models/Todo';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SortOrder } from 'mongoose';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    _id: number;
    title: string;
    completed: boolean;
    date: Date;
  };
  query: { data: string };
}

type sortType = Record<string, { [k: string]: SortOrder }>;

const sortBy: sortType = {
  titleasc: { title: 1 },
  titledesc: { title: -1 },
  dateasc: { date: 1 },
  datedesc: { date: -1 },
};

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { method, cookies, query } = req;
  const defaultLimit = 5;
  const defaultPage = 0;
  const defaultFilter = {};
  const defaultSort = sortBy.dateasc;
  console.log('METHOD', method);
  console.log('QUERY', query);

  dbConnect();
  if (method === 'GET') {
    try {
      const parsedData = query?.data ? JSON.parse(query?.data) : {};
      console.log('PARSE JSON', parsedData);
      const sort = sortBy[parsedData.sort] || defaultSort;
      const limit = ~~parsedData?.count || defaultLimit;
      const page = ~~parsedData?.page || defaultPage;
      const filter = parsedData?.filter || defaultFilter;
      console.log('FILTER QUERT', filter);

      const todo = await Todo.find(filter)
        .sort(sort)
        .skip(page * limit)
        .limit(limit);
        
      const count = await Todo.count(filter);

      console.log('TODO COUNT', count);

      res.status(200).json({ list: todo, count: count });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'PUT') {
    try {
      const { _id, completed } = req.body;
      const todo = await Todo.findOneAndUpdate({ _id }, { completed });

      res.status(201).json(todo);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    try {
      const { title, completed, date } = req.body;
      const todo = await Todo.create({ title, completed, date });
      res.status(201).json(todo);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    try {
      const { _id } = req.body;
      const todo = await Todo.deleteOne({ _id });
      res.status(201).json(todo);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
