import { Model } from 'objection';

class Subscription extends Model {
  static get tableName() {
    return 'subscriptions';
  }

  static get jsonSchema() {
    return {
        type: 'object',
        required: ['user_id', 'endpoint', 'public_key', 'auth_token']
    };
  }
}

export default Subscription