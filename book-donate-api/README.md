## Book Donate Api

```
This is a simple implementation and demonastration of NODE API. Here, we can store books in bookshelf and any user can borrow them for particular time.
```

### Expected Features exploration
- database seeding
- raw node js built in modules
- database raw queries
-

### Expected Routes

- /bookshelf -list books -get
- /bookshelf/id -single book -get
- /bookshelf - create book -post
- /bookshelf/id -single book -update
- /bookshelf/id -single book -delete
- /bookshelf/donate -book donate -post
- /bookshelf/borrow -book borrow -post
- /user/book -user books donate & borrowed -get
-

### Models

```
`/bookshelf/model`
    id, name, description, issue_date, issn, user_id, author_id, publisher_id, approx_price,

`/user/model`
    id, username, phone, address,

`/author/model`
    id, username, phone, user_id, 

`/publisher/model`
    id, organization_name, 

`/donate/model`
    id, book_id, publisher_id, author_id, approx_price, quantity,

`/borrow/model`
    id, book_id, author_id, publisher_id, user_id, issue_date, returns_date,

`/returns/model`
    id, book_id, publisher_id, author_id, issue_date, returns_date, rating_point,
```
