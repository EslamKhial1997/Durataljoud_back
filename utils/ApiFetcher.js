class ApiFeatures {
  constructor(query, queryString) {
    this.query = query; // Mongoose Query
    this.queryString = queryString; // req.query
  }

  // ✅ 1- Filtering (أي key=value في query)
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
      "keyword",
      "startDate",
      "endDate",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // تحويل gte, gt, lte, lt إلى Mongo operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // ✅ 2- Date Filter
  filterByDate() {
    if (this.queryString.startDate && this.queryString.endDate) {
      this.query = this.query.find({
        createdAt: {
          $gte: new Date(this.queryString.startDate),
          $lte: new Date(this.queryString.endDate),
        },
      });
    }
    return this;
  }

  // ✅ 3- Search (الاسم أو الجوال)
  search() {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;
      this.query = this.query.find({
        $or: [
          { firstName: { $regex: keyword, $options: "i" } },
          { lastName: { $regex: keyword, $options: "i" } },
          { phone: { $regex: keyword, $options: "i" } },
          { region: { $regex: keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  // ✅ 4- Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // ✅ 5- Field Limiting
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  // ✅ 6- Pagination
  paginate(countDocuments) {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    this.paginationResult = {
      currentPage: page,
      limit,
      totalPages: Math.ceil(countDocuments / limit),
      totalRecords: countDocuments,
    };

    return this;
  }
}

module.exports = ApiFeatures;
