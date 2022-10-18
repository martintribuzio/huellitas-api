import { Model } from 'objection';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
        type: 'object',
        required: ['email', 'password']
    };
  }
}

export default User