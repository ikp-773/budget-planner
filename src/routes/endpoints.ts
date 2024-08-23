export enum Endpoints {
    test = '/test',

    //For User Authentication
    login = '/login',
    logout = '/logout',
    register = '/register',
    verify = '/verify',

    //For User Details
    user = '/user',
    refreshToken = '/refresh-token',

    //For Expenditure Management
    addExpenditure = '/expenditure',
    getAllExpenditures = '/expenditures',
    expenditureById = '/expenditure/:id',

    //For Category Management
    addCategory = '/category',
    getAllCategories = '/categories',
    categoryById = '/category/:id',

    //For Payment Method Management
    addPaymentMethod = '/payment-method',
    getAllPaymentMethods = '/payment-methods',
    paymentMethodById = '/payment-method/:id',

    //For Spend Type Management
    addSpendType = '/spend-type',
    getAllSpendTypes = '/spend-types',
    spendTypeById = '/spend-type/:id',

    //For User Management [Super Admin]
    getAllUsers = '/users',
    userById = '/user/:id',
}
