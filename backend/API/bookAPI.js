module.exports = class BookAPI {

    constructor(query, queryString) {

        this.query = query;
        this.queryString = queryString;
    }

    filter() {

        const queryObject = {...this.queryString};
        const mainFields = ['page', 'sort', 'limit'];

        mainFields.forEach(el => delete(queryObject[el]))

        let queryString = JSON.stringify(queryObject);
        let replacedQueryString = queryString.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);

        this.query.find(JSON.parse(replacedQueryString))

        return this;
    }

    sort() {

        if(this.queryString.sort){

            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else{

            this.query = this.query.sort('-createdAt');
        }

        return this;
    }
    
    page() {

        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 14;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}