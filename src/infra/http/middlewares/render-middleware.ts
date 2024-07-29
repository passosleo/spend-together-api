import { NextFunction, Request, Response } from 'express';
import { Page } from '../../views/pages/types';
import fs from 'fs';

export function renderPage(page: Page) {
  return (req: Request, res: Response, next: NextFunction) => {
    const pagePath = `${req.app.get('views')}/pages/${page}/index.ejs`;

    fs.readFile(pagePath, 'utf8', (err, data) => {
      if (err) {
        return next(err);
      }
      res.render('pages/layout', { body: data, page });
    });
  };
}
