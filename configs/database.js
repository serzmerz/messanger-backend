const {
    DB_USERNAME = 'postgres',
    DB_PASSWORD = '244779',
    DB_NAME = 'hyper',
    DB_HOST = '127.0.0.1',
    DB_PORT = '5432',
    DB_DIALECT = 'postgres'
} = process.env

const {
    DB_TEST_USERNAME,
    DB_TEST_PASSWORD,
    DB_TEST_NAME,
    DB_TEST_HOST,
    DB_TEST_PORT,
    DB_TEST_DIALECT
} = process.env

module.exports = {
  'development': {
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'database': DB_NAME,
    'host': DB_HOST,
    'port': DB_PORT,
    'dialect': DB_DIALECT
  },
  'test': {
    'username': DB_TEST_USERNAME,
    'password': DB_TEST_PASSWORD,
    'database': DB_TEST_NAME,
    'host': DB_TEST_HOST,
    'port': DB_TEST_PORT,
    'dialect': DB_TEST_DIALECT
  },
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  }
}
