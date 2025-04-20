
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  full_name: 'full_name',
  phone: 'phone',
  password: 'password',
  status: 'status',
  region_id: 'region_id',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  name: 'name',
  inn: 'inn',
  mfo: 'mfo',
  rs: 'rs',
  bank: 'bank',
  oked: 'oked',
  address: 'address',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  ip_address: 'ip_address',
  date: 'date',
  device: 'device'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.CapacityScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.ToolScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en',
  description_uz: 'description_uz',
  description_ru: 'description_ru',
  description_en: 'description_en',
  price: 'price',
  count: 'count',
  code: 'code',
  brand_id: 'brand_id',
  size_id: 'size_id',
  capacity_id: 'capacity_id',
  isActive: 'isActive',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LevelScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.ProfessionScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en',
  image: 'image',
  isActive: 'isActive'
};

exports.Prisma.LevelsProfessionsScalarFieldEnum = {
  id: 'id',
  profession_id: 'profession_id',
  level_id: 'level_id',
  min_work_hours: 'min_work_hours',
  price_hourly: 'price_hourly',
  price_daily: 'price_daily'
};

exports.Prisma.MasterScalarFieldEnum = {
  id: 'id',
  full_name: 'full_name',
  phone: 'phone',
  isActive: 'isActive',
  year: 'year',
  image: 'image',
  passport_image: 'passport_image',
  about: 'about',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterSkillsScalarFieldEnum = {
  id: 'id',
  min_work_hours: 'min_work_hours',
  price_hourly: 'price_hourly',
  price_daily: 'price_daily',
  experience: 'experience',
  level_id: 'level_id',
  profession_id: 'profession_id',
  master_id: 'master_id'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  total_sum: 'total_sum',
  location: 'location',
  address: 'address',
  date: 'date',
  payment_type: 'payment_type',
  paid: 'paid',
  status: 'status',
  with_delivery: 'with_delivery',
  comment_delivery: 'comment_delivery',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderItemsScalarFieldEnum = {
  id: 'id',
  order_id: 'order_id',
  tool_id: 'tool_id',
  profession_id: 'profession_id',
  level_id: 'level_id',
  count: 'count',
  measure: 'measure',
  time: 'time',
  total_sum: 'total_sum'
};

exports.Prisma.BacketItemsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  profession_id: 'profession_id',
  tool_id: 'tool_id',
  level_id: 'level_id',
  count: 'count',
  measure: 'measure',
  time: 'time'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  text: 'text',
  user_id: 'user_id',
  order_id: 'order_id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MasterRatingsScalarFieldEnum = {
  id: 'id',
  star: 'star',
  master_id: 'master_id',
  comment_id: 'comment_id'
};

exports.Prisma.InfoScalarFieldEnum = {
  id: 'id',
  email: 'email',
  links: 'links',
  phone: 'phone'
};

exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  full_name: 'full_name',
  phone: 'phone',
  address: 'address',
  message: 'message',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FAQScalarFieldEnum = {
  id: 'id',
  question: 'question',
  answer: 'answer',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ShowcaseScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en',
  description_uz: 'description_uz',
  description_ru: 'description_ru',
  description_en: 'description_en',
  image: 'image',
  link: 'link'
};

exports.Prisma.PartnersScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en',
  image: 'image'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.Role = exports.$Enums.Role = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  VIEWER_ADMIN: 'VIEWER_ADMIN',
  USER_FIZ: 'USER_FIZ',
  USER_YUR: 'USER_YUR'
};

exports.PaymentType = exports.$Enums.PaymentType = {
  CLICK: 'CLICK',
  PAYME: 'PAYME',
  CASH: 'CASH'
};

exports.StatusOrder = exports.$Enums.StatusOrder = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  FINISHED: 'FINISHED'
};

exports.Measure = exports.$Enums.Measure = {
  HOUR: 'HOUR',
  DAY: 'DAY'
};

exports.Prisma.ModelName = {
  Region: 'Region',
  User: 'User',
  Company: 'Company',
  Session: 'Session',
  Brand: 'Brand',
  Size: 'Size',
  Capacity: 'Capacity',
  Tool: 'Tool',
  Level: 'Level',
  Profession: 'Profession',
  LevelsProfessions: 'LevelsProfessions',
  Master: 'Master',
  MasterSkills: 'MasterSkills',
  Order: 'Order',
  OrderItems: 'OrderItems',
  BacketItems: 'BacketItems',
  Comment: 'Comment',
  MasterRatings: 'MasterRatings',
  Info: 'Info',
  Contact: 'Contact',
  FAQ: 'FAQ',
  Showcase: 'Showcase',
  Partners: 'Partners'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
