class Page {
  constructor(title) {
    // page data container

    this.title = title;
  }

  parsePage(page) {
    // parse query results

    console.log(page);

    /*
    res
      continue
        continue ||
        rvcontinue
      limit
        revisions 50
      query
        pages[]
          id
          title
          revision
        */
  }
}

export default Page;
