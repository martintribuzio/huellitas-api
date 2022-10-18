import {
    ValidationError,
    NotFoundError,
    DBError,
    ConstraintViolationError,
    UniqueViolationError,
    NotNullViolationError,
    ForeignKeyViolationError,
    CheckViolationError,
    DataError
} from 'objection';

export default function (err) {
    if (err instanceof ValidationError) {
        switch (err.type) {
          case 'ModelValidation':
            return {
              message: err.message,
              type: err.type,
              data: err.data,
              status: 400
            }
            break;
          case 'RelationExpression':
            return {
              message: err.message,
              type: 'RelationExpression',
              data: {},
              status: 400
            }
            break;
          case 'UnallowedRelation':
            return {
              message: err.message,
              type: err.type,
              data: {},
              status: 400
            }
            break;
          case 'InvalidGraph':
           return {
              message: err.message,
              type: err.type,
              data: {},
              status: 400
            }
            break;
          default:
            return {
              message: err.message,
              type: 'UnknownValidationError',
              data: {},
              status: 400
            };
            break;
        }
      } else if (err instanceof NotFoundError) {
        return {
          message: err.message,
          type: 'NotFound',
          data: {},
          status: 404
        };
      } else if (err instanceof UniqueViolationError) {
        return {
          message: err.message,
          type: 'UniqueViolation',
          data: {
            columns: err.columns,
            table: err.table,
            constraint: err.constraint
          },
          status: 409
        };
      } else if (err instanceof NotNullViolationError) {
        return {
          message: err.message,
          type: 'NotNullViolation',
          data: {
            column: err.column,
            table: err.table
          },
          status: 400
        };
      } else if (err instanceof ForeignKeyViolationError) {
        return {
          message: err.message,
          type: 'ForeignKeyViolation',
          data: {
            table: err.table,
            constraint: err.constraint
          },
          status: 400
        };
      } else if (err instanceof CheckViolationError) {
        return {
          message: err.message,
          type: 'CheckViolation',
          data: {
            table: err.table,
            constraint: err.constraint
          },
          status: 400
        };
      } else if (err instanceof DataError) {
        return {
          message: err.message,
          type: 'InvalidData',
          data: {},
          status: 400
        };
      } else if (err instanceof DBError) {
        return {
          message: err.message,
          type: 'UnknownDatabaseError',
          data: {},
          status: 500
        }
      } else {
        return false
      }
}