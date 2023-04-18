# README

> This code is meant to illustrate common pitfalls; therefore you are expected to finds bugs, repetitive code etc. We will reflect on all the bad practices.

## Reflection

- Bugs???
- Code duplicates
  - Can we avoid it?
  - Refactoring
- Form: How is it possible that it works?
  - delete & put requests
- Cookies: pros & cons

## app.js

- [cookie-parser](https://www.npmjs.com/package/cookie-parser)

```js
const cookieParser = require('cookie-parser');
//...
app.use(cookieParser());
```

- [method-override](https://www.npmjs.com/package/method-override)

```js
const methodOverride = require('method-override');
//...
// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
```

- [morgan](https://www.npmjs.com/package/morgan)

```js
const morgan = require('morgan');
//...
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
```

## PUT action

- /routes/stories.js

```js
res.render('stories/edit', {
  story,
});
```

- /views/stories/edit.hbs

```handlebars
<form action='/stories/{{story._id}}' method='POST' class='col s12'>
  <input type='hidden' name='_method' value='PUT' />
  <!-- ... -->
</form>
```

## Rendering

- How to render login error?

![Alt text](./email.png 'Error-email')

- How to render

- Helper: `formatDate`
  - [How to display local time](https://stackoverflow.com/questions/32540667/moment-js-utc-to-local-time)
  - [moment](https://www.npmjs.com/package/moment)

## Users' Roles

- How to?
